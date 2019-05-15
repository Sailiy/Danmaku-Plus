import { IDanmaMessage, Point, Rect } from '../interface/IDanmaMessage'
import { IDanmaTrackInfo } from '../interface/IDanmaTrack'
import { BaseMessage } from './BaseMessage'
import omggif from 'omggif'
interface ImgMessageConfig {
  url: string
  width: number
  height: number
}
export default class ImgMessage extends BaseMessage {
  private ImgMessageConfig: ImgMessageConfig = {
    url: '',
    width: 0,
    height: 0
  }
  private mImg: HTMLImageElement = new Image()
  constructor(msg: ImgMessageConfig) {
    super()
    this.ImgMessageConfig = Object.assign({}, this.ImgMessageConfig, msg)
  }
  onCreate(callback: Function) {
    this.mImg.onload = () => {
      callback(true)
    }
    this.mImg.onerror = () => {
      document.body.removeChild(this.mImg)
      callback(false)
    }
    this.mImg.src = this.ImgMessageConfig.url
    this.mImg.style.position = 'fixed'
    this.mImg.style.top = '-1000px'
    this.mImg.style.left = '-1000px'
    document.body.append(this.mImg)
  }
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    return {
      width: this.mImg.width,
      height: this.mImg.height
    }
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
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
      this.mImg,
      this.position.left,
      this.position.top,
      this.size.width,
      this.size.height
    )
  }
  onDestroyed(): boolean {
    let result = this.position.left < -this.size.width
    if (result) {
      document.body.removeChild(this.mImg)
    }
    return result
  }
}
