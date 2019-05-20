import Danmaku from './Danmaku'
import { DanmakuPool } from './DanmakuPool'
import { DanmaTrack } from './DanmaTrack'
import TextMessage from './MessageImpl/TextMessage'
import ImgMessage from './MessageImpl/ImgMessage'
import GifMessage from './MessageImpl/GifMessage'

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

export default {
  Danmaku,
  DanmakuPool,
  TextMessage,
  ImgMessage,
  GifMessage,
  DanmaTrack
}
