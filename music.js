const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodeID3 = require('node-id3');
const app = express();
const port = 9000;
const musicFolderPath = path.join(__dirname, 'music'); // 音乐文件夹路径

app.use(cors({
    origin: '*' // 允许所有来源
}));

// API 路由，这是用于本地调试的
app.get('/api/music-files', (req, res) => {
    fs.readdir(musicFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '无法读取音乐文件夹' });
        }

        const musicFilesPromises = files
            .filter(file => file.endsWith('.mp3') || file.endsWith('.flac'))
            .map(file => {
                const title = path.parse(file).name;
                const src = `${req.protocol}://${req.get('host')}/music/${file}`; // 音乐文件路径
                const lyricsSrc = `${req.protocol}://${req.get('host')}/lyrics/${title}.lrc`; // 歌词文件路径

                return new Promise((resolve, reject) => {
                    // 使用 node-id3 提取 ID3 标签
                    const tags = nodeID3.read(path.join(musicFolderPath, file));
                    const artist = tags.artist || '未知艺术家'; // 获取艺术家
                    const albumArt = tags.image; // 获取封面图

                    let coverSrc = null;

                    if (albumArt) {
                        // 生成封面图片路径
                        coverSrc = `${req.protocol}://${req.get('host')}/music/${title}-cover.jpg`;
                        // 保存封面图到文件
                        fs.writeFileSync(path.join(musicFolderPath, `${title}-cover.jpg`), albumArt.imageBuffer); 
                    }

                    resolve({
                        name: title,  // 歌曲名称
                        artist: artist, // 歌手
                        url: src,  // 歌曲文件URL
                        cover: coverSrc,  // 封面图片URL
                        lrc: lyricsSrc  // 歌词文件URL
                    });
                });
            });

        Promise.all(musicFilesPromises).then(musicFiles => {
            res.json(musicFiles);
        });
    });
});
//API路由，这是用于服务器端的
// app.get('/api/music-files', (req, res) => {
//     fs.readdir(musicFolderPath, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: '无法读取音乐文件夹' });
//         }

//         const musicFilesPromises = files
//             .filter(file => file.endsWith('.mp3') || file.endsWith('.flac'))
//             .map(file => {
//                 const title = path.parse(file).name;
//                 const src = `https://${req.headers.host}/music/${file}`; // 使用请求的主机名
//                 const lyricsSrc = `https://${req.headers.host}/lyrics/${title}.lrc`; // 使用请求的主机名

//                 return new Promise((resolve, reject) => {
//                     // 使用 node-id3 提取 ID3 标签
//                     const tags = nodeID3.read(path.join(musicFolderPath, file));
//                     const artist = tags.artist || '未知艺术家'; // 获取艺术家
//                     const albumArt = tags.image; // 获取封面图

//                     let coverSrc = null;

//                     if (albumArt) {
//                         // 生成封面图片路径
//                         coverSrc = `${req.protocol}://${req.get('host')}/music/${title}-cover.jpg`;
//                         // 保存封面图到文件
//                         fs.writeFileSync(path.join(musicFolderPath, `${title}-cover.jpg`), albumArt.imageBuffer); 
//                     }

//                     resolve({
//                         name: title,  // 歌曲名称
//                         artist: artist, // 歌手
//                         url: src,  // 歌曲文件URL
//                         cover: coverSrc,  // 封面图片URL
//                         lrc: lyricsSrc  // 歌词文件URL
//                     });
//                 });
//             });

//         Promise.all(musicFilesPromises).then(musicFiles => {
//             res.json(musicFiles);
//         });
//     });
// });
// 提供歌词文件服务
app.get('/lyrics/:filename', (req, res) => {
    const filename = req.params.filename;

    if (!filename.endsWith('.lrc')) {
        return res.status(400).send('文件格式不正确');
    }

    const lyricsFilePath = path.join(musicFolderPath, filename);

    fs.stat(lyricsFilePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send('歌词文件未找到');
        }

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        fs.createReadStream(lyricsFilePath).pipe(res);
    });
});

// 提供封面图片服务
app.use('/music', express.static(musicFolderPath));

// 启动服务器
app.listen(port, () => {
    console.log(`音乐服务器已启动 地址：http://localhost:${port}/api/music-files`);
});
