import { IDanmaMessage, Point, Rect } from '../interface/IDanmaMessage'
import { IDanmaTrackInfo } from '../interface/IDanmaTrack'
import { BaseMessage } from './BaseMessage'
interface TextMessageConfig {
  mMsg: string
  color: string
  strokeColor: string
  fontSize: number
  fontFamily: string
}
export default class TextMessage extends BaseMessage {
  private textMessageConfig: TextMessageConfig = {
    mMsg: '',
    color: '#FFF',
    strokeColor: '#000',
    fontSize: 30,
    fontFamily: '黑体'
  }
  constructor(msg: TextMessageConfig) {
    super()
    this.textMessageConfig = Object.assign({}, this.textMessageConfig, msg)
  }
  onCreate(callback: Function) {
    callback(true)
  }
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.font = `${this.textMessageConfig.fontSize}px ${this.textMessageConfig.fontFamily}`
    let res = ctx.measureText(this.textMessageConfig.mMsg)
    return {
      width: res.width,
      height: trackInfo.height
    }
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    if (!this.isLayout) {
      this.isLayout = true
      return {
        top: trackInfo.top + trackInfo.height / 2,
        left: ctx.canvas.width
      }
    }
    this.position.left -= 3
    return this.position
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    ctx.fillStyle = this.textMessageConfig.strokeColor
    ctx.strokeText(this.textMessageConfig.mMsg, this.position.left, this.position.top)
    ctx.fillStyle = this.textMessageConfig.color
    ctx.fillText(this.textMessageConfig.mMsg, this.position.left, this.position.top)
  }
  onDestroyed(): boolean {
    return this.position.left < -this.size.width
  }
}
