import { IDanmaTrack, IDanmaTrackInfo} from './interface/IDanmaTrack'
import Danmaku from "./Danmaku"
import { IDanmaMessage } from './interface/IDanmaMessage';
import { DanmakuPool } from './DanmakuPool';
export class DanmaTrack implements IDanmaTrack {
  mDanmaku?: Danmaku
  mDanmuPool: DanmakuPool
  mDanmaMessages: IDanmaMessage[] = new Array<IDanmaMessage>()
  mTrackInfo: IDanmaTrackInfo = {
    maxWidth: 0,
    top: 0,
    height: 0
  }
  mDanmuTrackConfig:IDanmaTrackConfig={
    top:0,
    height:0
  }
  constructor(danmuPool: DanmakuPool, danmaTrackConfig: IDanmaTrackConfig) {
    this.mDanmuPool = danmuPool
    this.initConfig(danmaTrackConfig)
  }
  setDanmaku(danmaku: Danmaku): void {
    this.mDanmaku=danmaku
  }

  initConfig(danmaTrackConfig: IDanmaTrackConfig){
    this.mDanmuTrackConfig = danmaTrackConfig
    this.mTrackInfo.top=danmaTrackConfig.top
    this.mTrackInfo.height=danmaTrackConfig.height
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.refreshMessage(ctx)
    for (let i = 0; i < this.mDanmaMessages.length; i++) {
      let currentDanmaMessage=this.mDanmaMessages[i]
      if(!currentDanmaMessage.created){
        currentDanmaMessage.onCreate()
      }else{
        currentDanmaMessage.onMeasure(ctx, this.mTrackInfo)
        currentDanmaMessage.onLayout(ctx, this.mTrackInfo)
        currentDanmaMessage.onDraw(ctx, this.mTrackInfo)
        currentDanmaMessage.onDestroyed()
      }
      if (i === this.mDanmaMessages.length - 1) {
        this.mTrackInfo.maxWidth = currentDanmaMessage.position.left + currentDanmaMessage.size.width
      }
    }
  }
  refreshMessage(ctx: CanvasRenderingContext2D){
    this.removeMessage()
    this.AddMessage(ctx)
  }
  AddMessage(ctx: CanvasRenderingContext2D) {
    if(!this.mDanmaMessages.length||this.mTrackInfo.maxWidth<(ctx.canvas.width-10)){
      let msg=this.mDanmuPool.getMessage()
      if(msg){
        this.mDanmaMessages.push(msg)
      }
    }
  }
  removeMessage(){
    this.mDanmaMessages=this.mDanmaMessages.filter((item)=>!item.distoryed)
  }
}