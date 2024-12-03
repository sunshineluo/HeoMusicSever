const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodeID3 = require('node-id3'); // 引入 node-id3 用于提取 ID3 标签
const Redis = require('ioredis');  // 引入 Redis
const app = express();
const port = 9000;
const musicFolderPath = path.join(__dirname, 'music'); // 音乐文件夹路径

const redis = new Redis({
    host: 'localhost', // Redis 服务地址
    port: 6379,        // Redis 端口
    db: 2,             // 连接到数据库 2
});

app.use(cors({
    origin: '*' // 允许所有来源
}));

// 处理专辑封面的异步函数
async function handleAlbumCover(title, albumArt, req) {
    if (!albumArt || !albumArt.imageBuffer) {
        return null;
    }
    
    // 使用原始文件名，不进行 URL 编码
    const coverFileName = `${title}-cover.jpg`;
    const coverPath = path.join(musicFolderPath, coverFileName);
    
    try {
        // 检查文件是否存在
        try {
            await fs.promises.access(coverPath);
        } catch {
            // 文件不存在时才写入
            await fs.promises.writeFile(coverPath, albumArt.imageBuffer);
        }
        
        // 返回 URL 时再进行编码
        return `${req.protocol}://${req.get('host')}/music/${encodeURIComponent(coverFileName)}`;
    } catch (error) {
        console.error('保存封面图片失败:', error);
        return null;
    }
}

app.get('/api/music-files', async (req, res) => {
    try {
        // 强制刷新缓存的查询参数
        const forceRefresh = req.query.refresh === 'true';
        
        // 如果不是强制刷新，尝试从 Redis 获取缓存
        if (!forceRefresh) {
            const cachedData = await redis.get('musicFilesCache');
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
        }

        // 读取音乐文件夹
        const files = await fs.promises.readdir(musicFolderPath);
        
        // 处理音乐文件
        const musicFilesPromises = files
            .filter(file => file.endsWith('.mp3') || file.endsWith('.flac'))
            .map(async file => {
                const title = path.parse(file).name;
                const src = `${req.protocol}://${req.get('host')}/music/${file}`;
                const lyricsSrc = `${req.protocol}://${req.get('host')}/lyrics/${title}.lrc`;

                // 读取 ID3 标签
                const tags = nodeID3.read(path.join(musicFolderPath, file));
                const artist = tags.artist || '未知艺术家';
                
                // 处理封面图片
                const coverSrc = await handleAlbumCover(title, tags.image, req);

                return {
                    name: title,
                    artist: artist,
                    url: src,
                    cover: coverSrc,
                    lrc: lyricsSrc
                };
            });

        const musicFiles = await Promise.all(musicFilesPromises);
        
        // 更新 Redis 缓存
       // await redis.set('musicFilesCache', JSON.stringify(musicFiles), 'EX', 60 * 5); // 缓存时间改为5分钟
        await redis.set('musicFilesCache', JSON.stringify(musicFiles)); // 设置为永久有效
        return res.json(musicFiles);
    } catch (error) {
        console.error('处理音乐文件失败:', error);
        return res.status(500).json({ error: '服务器处理错误' });
    }
});

// 提供歌词文件服务
app.get('/lyrics/:filename', async (req, res) => {
    try {
        // 获取并净化文件名
        const filename = path.basename(req.params.filename);

        // 检查文件扩展名
        if (!filename.endsWith('.lrc')) {
            return res.status(400).json({ error: '文件格式不正确' });
        }

        const lyricsFilePath = path.join(musicFolderPath, filename);

        // 使用 async/await 检查文件是否存在
        try {
            await fs.promises.access(lyricsFilePath, fs.constants.F_OK);
        } catch (error) {
            return res.status(404).json({ error: '歌词文件未找到' });
        }

        // 设置响应头
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 缓存24小时
        
        // 使用 stream 发送文件
        const stream = fs.createReadStream(lyricsFilePath);
        
        stream.on('error', (error) => {
            console.error('读取歌词文件错误:', error);
            res.status(500).json({ error: '读取歌词文件失败' });
        });

        stream.pipe(res);
    } catch (error) {
        console.error('处理歌词请求错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 提供封面图片服务
app.use('/music', express.static(musicFolderPath));

// 启动服务器
app.listen(port, () => {
    console.log(`音乐服务器已启动 地址：http://localhost:${port}/api/music-files`);
});
