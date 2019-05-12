import DefaultDanmakuConfig from "./ConfigImpl/DefaultDanmakuConfig";

// 弹幕库实例
export default class Danmaku {
  private mConfig:DanmakuConfig=DefaultDanmakuConfig
  private mPool!: DanmakuPool
  private mCanvas!: HTMLCanvasElement
  private isPause:boolean=false
  constructor(config?:DanmakuConfig){
   this.initConfig(config)
  }
  private initConfig(config?: DanmakuConfig){
    if (config) {
      this.mConfig = config
    }
    this.mPool=new DanmakuPool(this.mConfig.POOL_SIZE)
  }
  getDanmakuPool():DanmakuPool{
    return this.mPool
  }
  private initRender(canvas:HTMLCanvasElement){
    this.mCanvas=canvas
    if(window.requestAnimationFrame){
      requestAnimationFrame(this.render)
    }else{
      throw new Error("你的浏览器不支持canvas")
    }
  }
  render(){
    if(this.isPause)return
  }
  start(){
    this.isPause=true
  }
  pause(){
    this.isPause=false
  }
}
