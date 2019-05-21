# Danmaku-Plus

一个canvas实现的高性能得弹幕库，支持文字消息，图片消息，视频消息。

如果你之前看过我的[80行代码实现高性能弹幕](http://www.rainx.org/2016/12/22/html5-canvas%E5%AE%9E%E7%8E%B0%E9%AB%98%E5%B9%B6%E5%8F%91%E8%A7%86%E9%A2%91%E5%BC%B9%E5%B9%95%E5%8A%9F%E8%83%BD/),你就会这个实现弹幕的思想还是很不错的，这个弹幕库使用TypeScript重构，不管是性能，还是易用性和扩展灵活性，都大大提高。

查看在线demo

![](https://github.com/Sailiy/Danmaku-Plus/blob/dev/screen/demo.png)

## install （安装）

```
npm i danmaku-plus --save
```

## Importing library （导入）

引入弹幕舞台，弹幕轨道，消息缓存池，普通文字消息，图片消息，视频消息

```javascript
import {DanmakuPool, DanmaTrack, Danmaku, TextMessage, ImgMessage,VideoMessage} from 'danmuku-plus'
```

你可以引入BaseMessage，覆盖其中的方法实现自定义消息，目前自定义消息可以查看源代码（普通文字消息，图片消息，视频消息）的实现
借助这个高性能，灵活的弹幕框架，你会发现实现自定义的消息，实在太简单了

```javascript
import BaseMessage from 'danmuku-plus/dist/lib/BaseMessage'
```

## Usage（使用方法）
html部分

```html
<canvas id="cav">你的浏览器不支持canvas</canvas>
<style>
      canvas {
        width: 1280px;
        height: 720px;
        background-color: rgba(0, 0, 0, 0.2);
      }
</style>
```
#### 发送文字消息
```
// 导入danmuku-plus
const { DanmakuPool, DanmaTrack, Danmaku, TextMessage, ImgMessage,VideoMessage } = danmakuPlus
//获取canvas
var canvas = document.getElementById('cav')
var danmuku = new Danmaku(canvas, {
  width: 1280,
  height: 720
})
danmuku.start()
//创建一个消息池子，池子得大小能容纳300条消息
var danmuPool = new DanmakuPool(300)

//创建多个弹幕轨道，并且共用一个消息池子
for (var i = 0; i < 6; i++) {
  //创建多个弹幕轨道，每个轨道应该定义距离弹幕舞台（canvas）顶部得top以及弹幕轨道得高度
  var danmuTrack = new DanmaTrack(danmuPool, {
    top: (10 + 30) * i + 10,
    height: 30
  })
  //在弹幕舞台中添加该轨道
  danmuku.addDanmuTrack(danmuTrack)
}

//发送单条文字消息
function sendDanmu() {
  danmuPool.addMessage(
    new TextMessage({
      mMsg: parseInt(Math.random() * 10000000) + ''
    })
  )
}

//发送多条文字消息
function sendDanmuMtu() {
  var message = []
  for (var i = 0; i < 100; i++) {
    message.push(new TextMessage({ mMsg: parseInt(Math.random() * 10000000) + '' }))
  }
  danmuPool.addMessages(message)
}
//绑定事件监听
document.getElementById('btn_send').addEventListener('click', sendDanmu)
document.getElementById('btn_send_mut').addEventListener('click', sendDanmuMtu)

```

#### 发送图片消息

```
//创建一个图片消息得缓冲池
var imgDanmuPool = new DanmakuPool(10)
//创建一个图片得轨道
var imgDanmuTrack = new DanmaTrack(imgDanmuPool, {
  top: 20,
  height: 40
})
// 把轨道添加到舞台
danmuku.addDanmuTrack(imgDanmuTrack)

function sendDanmuImg() {
  //创建一个图片消息
  var imgDanmu = new ImgMessage({
    url: 'http://img.gifhome.com/gif/s/20181004/081793df4f47143ff86d950bee221ac0.gif'
  })
  //把消息添加到图片消息缓冲池
  imgDanmuPool.addMessage(imgDanmu)
}
document.getElementById('btn_send_img').addEventListener('click', sendDanmuImg)
```
#### 发送视频弹幕消息
```
//创建一个图片消息得缓冲池
var videoDanmuPool = new DanmakuPool(10)
//创建一个图片得轨道
var videoDanmuTrack = new DanmaTrack(videoDanmuPool, {
  top: 200,
  height: 200
})
// 把轨道添加到舞台
danmuku.addDanmuTrack(videoDanmuTrack)

function sendDanmuVideo() {
  //创建一个视频消息
  var videoDanmu = new VideoMessage({
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    width:300,
    height:200
  })
  //把视频消息添加到视频消息缓冲池
  videoDanmuPool.addMessage(videoDanmu)
}
document.getElementById('btn_send_video').addEventListener('click', sendDanmuVideo)
```

#### 总结
多个轨道可以共享同一个弹幕池子
建议：不同消息类型之间最好把缓冲池和轨道区分开

#### 其他事件
```
//暂停
function handlePause() {
  danmuku.pause()
}
//播放
function handleStart() {
  danmuku.start()
}
document.getElementById('btn_pause').addEventListener('click', handlePause)
document.getElementById('btn_start').addEventListener('click', handleStart)

```

# 二次开发
## 获取代码

```bash
git clone https://github.com/Sailiy/Danmaku-Plus.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

## NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
 - `npm run demo`: view demo
