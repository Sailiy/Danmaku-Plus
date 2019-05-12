import {DanmaTrack} from './DanmaTrack'
import { IDanmaTrack } from './interface/IDanmaTrack';
import { IDanmakuConfig } from './interface/IDanmakuConfig';
// 弹幕库实例
export default class Danmaku {
  public mDanmukuConfig:IDanmakuConfig
  private mCanvas: HTMLCanvasElement
  private mCtx:CanvasRenderingContext2D
  private isPause: boolean = false
  private mDanmuTracks:Array<IDanmaTrack>=new Array<IDanmaTrack>();
  constructor(canvas: HTMLCanvasElement,danmakuConfig:IDanmakuConfig) {
    this.mCanvas = canvas
    this.mDanmukuConfig=danmakuConfig
    this.mCtx = (canvas.getContext('2d') as CanvasRenderingContext2D)
    this.initRender()
  }
  addDanmuTrack(danmuTrack:IDanmaTrack){
    this.mDanmuTracks.push(danmuTrack)
    danmuTrack.setDanmaku(this)
  }
  removeDanmuTrack(danmuTrack: IDanmaTrack){
    this.mDanmuTracks=this.mDanmuTracks.filter((item)=>item!==danmuTrack)
  }
  initRender() {
    this.mCanvas.width=this.mDanmukuConfig.width
    this.mCanvas.height=this.mDanmukuConfig.height
    if (window.requestAnimationFrame) {
      requestAnimationFrame(this.render)
    } else {
      throw new Error("你的浏览器不支持canvas")
    }
  }
  render() {
    if (this.isPause) return
    for(let mDanmuTrack of this.mDanmuTracks){
      mDanmuTrack.render(this.mCtx)
    }
  }
  start() {
    this.isPause = true
  }
  pause() {
    this.isPause = false
  }
}
