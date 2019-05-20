import { IDanmaMessage, Point, Rect } from '../interface/IDanmaMessage'
import { IDanmaTrackInfo } from '../interface/IDanmaTrack'
import { BaseMessage } from './BaseMessage'
import { ajax } from '../utils/xhr'
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
  private mGifReader?: omggif.GifReader
  private numFrames: number = 0
  private currentFrameIndex: number = 0
  private pixels: Uint8ClampedArray = new Uint8ClampedArray(0)

  private lastFrameDate: number = new Date().getTime()

  constructor(msg: ImgMessageConfig) {
    super()
    this.ImgMessageConfig = Object.assign({}, this.ImgMessageConfig, msg)
  }
  onCreate(cal: Function) {
    let _this = this
    ajax({
      url: this.ImgMessageConfig.url,
      callback(err, res: ArrayBuffer) {
        if (err) {
          console.log(err)
          cal(false)
        } else {
          // tslint:disable-next-line: no-floating-promises
          _this.newMethod(res)
        }
      }
    })
  }
  private newMethod(res: ArrayBuffer) {
    // tslint:disable-next-line: no-floating-promises
    this.mGifReader = new omggif.GifReader(res as any)
    this.numFrames = this.mGifReader.numFrames()
    let frame0Info = this.mGifReader.frameInfo(0)
    let [width, height] = [frame0Info.width, frame0Info.height]
    this.pixels = new Uint8ClampedArray(width * height * 4)
  }

  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    let reader = this.mGifReader
    if (this.currentFrameIndex >= this.numFrames) {
      this.currentFrameIndex = 0
    }
    let frameInfo = {
      width: this.ImgMessageConfig.width,
      height: this.ImgMessageConfig.height
    }
    if (reader) {
      frameInfo = reader.frameInfo(this.currentFrameIndex)
      // this.lastFrameDate = new Date().getTime() + frameInfo.delay
      reader.decodeAndBlitFrameRGBA(this.currentFrameIndex, this.pixels as any)
    }

    return {
      width: this.ImgMessageConfig.width,
      height: this.ImgMessageConfig.height
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
    let imageData = new ImageData(this.pixels, this.size.width, this.size.height)
    ctx.putImageData(imageData, this.position.left, this.position.top)
  }
  onDestroyed(): boolean {
    let result = this.position.left < -this.size.width
    return result
  }
}
