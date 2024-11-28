# <center>HeoMusicSever</center>

![](/img/01_1.webp)

基于HeoMusic开发的音乐后端组件，可播放自己存储的任意歌曲。不受限制。[演示地址](https://music.2leo.top)

## 使用方法

1.在本地准备好music文件夹，存放带有歌曲元信息的歌曲和歌词。
2.初始化项目,然后运行`npm install`。
3.运行项目后端，地址为`http://localhost:9000/api/music-files`。

4.运行后得到的数据格式如下：

```
  {
    "name": "BY2 - 凑热闹",
    "artist": "BY2",
    "url": "http://localhost:9000/music/BY2 - 凑热闹.mp3",
    "cover": "http://localhost:9000/music/BY2 - 凑热闹-cover.jpg",
    "lrc": "http://localhost:9000/lyrics/BY2 - 凑热闹.lrc"
  },
  ```
5.打开music.html，修改` var remoteMusic = "http://localhost:9000/api/music-files"`

6.修改`js\localEngine.js`代码
```
var encodedLocalMusic = localMusic.map(item => ({
  name: item.name,
  artist: item.artist,
  url: item.url ? encodeNonAscii(item.url) : "", // 如果 url 为空，则返回空字符串
  cover: item.cover ? encodeNonAscii(item.cover) : "", // 如果 cover 为空，则返回空字符串
  lrc: item.lrc ? encodeNonAscii(item.lrc) : "" // 如果 lrc 为空，则返回空字符串
}));

document.getElementById('heoMusic-page').classList.add('localMusic');

// 处理非 ASCII 字符的编码
function encodeNonAscii(str) {
  // 如果传入的 str 是 null 或 undefined，返回空字符串
  if (str == null) return "";
  return str.replace(/[^\x00-\x7F]/g, function(c) {
    return encodeURIComponent(c);
  });
}

// 初始化 APlayer 播放器
const ap = new APlayer({
  container: document.getElementById('heoMusic-page'),
  lrcType: 3,
  audio: encodedLocalMusic // 将已编码的音乐数据传递给播放器
});

// 设置媒体会话处理器
heo.setupMediaSessionHandlers(ap);
```
7.直接打开`music.html`查看效果即可。

## 小Bug

1.播放到含有中文歌词和其他语言的歌词时，优先显示的还是中文歌词。大佬们发挥一下。俺有点不会哦！中文歌曲是没有问题的！

![](/img/02_1.webp)
2.暂时没得。

## 代码来源

[@张洪Heo](https://github.com/zhheo/HeoMusic) 

## 许可

项目中包含的[Aplayer](https://github.com/DIYgod/APlayer)及[MetingJS](https://github.com/metowolf/Meting)的修改版本，他们均使用 MIT 协议

图标采用remixicon，使用 Apache 协议

## 结语

感谢大佬的开源，提供了这么漂亮的静态播放器呢，膜拜大佬啦！

