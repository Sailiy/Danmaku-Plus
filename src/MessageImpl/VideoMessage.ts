import { IDanmaMessage, Point, Rect } from '../interface/IDanmaMessage'
import { IDanmaTrackInfo } from '../interface/IDanmaTrack'
import { BaseMessage } from './BaseMessage'
interface VideoMessageConfig {
  url: string
  width: number
  height: number
}
export default class VideoMessage extends BaseMessage {
  private VideoMessageConfig: VideoMessageConfig = {
    url: '',
    width: 300,
    height: 200
  }
  private mIsPlay:boolean=false
  private mVideo: HTMLVideoElement = document.createElement('video')
  constructor(msg: VideoMessageConfig) {
    super()
    this.VideoMessageConfig = Object.assign({}, this.VideoMessageConfig, msg)
  }
  onCreate(callback: Function) {
    this.mVideo.addEventListener('canplay',()=>{
      callback(true)
    })
    this.mVideo.addEventListener('error',() => {
      document.body.removeChild(this.mVideo)
      callback(false)
    })
    this.mVideo.src = this.VideoMessageConfig.url
    this.mVideo.style.position = 'fixed'
    this.mVideo.style.top = '-4000px'
    this.mVideo.style.left = '-4000px'
    this.mVideo.preload ='auto'
    this.mVideo.loop=true
    document.body.append(this.mVideo)
  }
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    if (!this.mIsPlay){
      this.mIsPlay=true
      this.mVideo.play()
    }
    return {
      width: this.VideoMessageConfig.width,
      height: this.VideoMessageConfig.height
    }
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    console.log(this.size)
    if (!this.isLayout) {
      this.isLayout = true
      return {
        top: trackInfo.top,
        left: ctx.canvas.width
      }
    }
    this.position.left -= 3
    return this.position
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    ctx.drawImage(
      this.mVideo,
      this.position.left,
      this.position.top,
      this.size.width,
      this.size.height
    )
  }
  onDestroyed(): boolean {
    let result = this.position.left < -this.size.width
    if (result) {
      document.body.removeChild(this.mVideo)
    }
    return result
  }
}
