import { IDanmaTrack, IDanmaTrackInfo} from './interface/IDanmaTrack'
import Danmaku from "./Danmaku"
import { IDanmaMessage } from './interface/IDanmaMessage';
export class DanmaTrack implements IDanmaTrack {
  mDanmaku?: Danmaku;
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
    for (let i = 0; i < this.mDanmaMessages.length; i++) {
      this.mDanmaMessages[i].onMeasure(ctx, this.mTrackInfo)
      this.mDanmaMessages[i].onLayout(ctx, this.mTrackInfo)
      this.mDanmaMessages[i].onDraw(ctx, this.mTrackInfo)
      if (i === this.mDanmaMessages.length - 1) {
        this.mTrackInfo.maxWidth = this.mDanmaMessages[i].position.left + this.mDanmaMessages[i].size.width
      }
    }
  }
}