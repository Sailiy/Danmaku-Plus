import Danmaku from './Danmaku'
import { DanmakuPool } from './DanmakuPool'
import { DanmaTrack } from './DanmaTrack'
import TextMessage from './MessageImpl/TextMessage'
import ImgMessage from './MessageImpl/ImgMessage'
import VideoMessage from './MessageImpl/VideoMessage'

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

export default {
  Danmaku,
  DanmakuPool,
  TextMessage,
  ImgMessage,
  VideoMessage,
  DanmaTrack
}
