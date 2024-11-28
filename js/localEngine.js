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
