import { DanmaTrack } from './DanmaTrack'
import { IDanmaTrack } from './interface/IDanmaTrack'
import { IDanmakuConfig } from './interface/IDanmakuConfig'
// 弹幕库实例
export default class Danmaku {
  public mDanmukuConfig: IDanmakuConfig
  private mCanvas: HTMLCanvasElement
  private mCtx: CanvasRenderingContext2D
  private isPause: boolean = false
  private lastRenderTime: number = 0
  private mDanmuTracks: Array<IDanmaTrack> = new Array<IDanmaTrack>()
  constructor(canvas: HTMLCanvasElement, danmakuConfig: IDanmakuConfig) {
    this.mCanvas = canvas
    this.mDanmukuConfig = danmakuConfig
    this.mCtx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.initRender()
  }
  addDanmuTrack(danmuTrack: IDanmaTrack) {
    this.mDanmuTracks.push(danmuTrack)
    danmuTrack.setDanmaku(this)
  }
  removeDanmuTrack(danmuTrack: IDanmaTrack) {
    this.mDanmuTracks = this.mDanmuTracks.filter(item => item !== danmuTrack)
  }
  initRender() {
    this.mCanvas.width = this.mDanmukuConfig.width
    this.mCanvas.height = this.mDanmukuConfig.height
    if (window.requestAnimationFrame) {
      this.renderByAnimationFrame()
    } else {
      this.renderBySetInterval()
    }
  }
  renderByAnimationFrame() {
    this.render()
    requestAnimationFrame(this.renderByAnimationFrame.bind(this))
  }
  renderBySetInterval() {
    setInterval(this.render.bind(this), 0)
  }
  render() {
    if (this.isPause) return
    // let currentTime = new Date().getTime()
    // if (currentTime - this.lastRenderTime < 16) {
    //   return
    // }
    // this.lastRenderTime = currentTime
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height)
    for (let mDanmuTrack of this.mDanmuTracks) {
      mDanmuTrack.render(this.mCtx)
    }
    // this.mCtx.restore()
  }
  start() {
    this.isPause = false
  }
  pause() {
    this.isPause = true
  }
}
