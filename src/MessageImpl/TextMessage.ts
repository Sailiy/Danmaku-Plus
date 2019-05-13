import { IDanmaMessage, Point, Rect } from "../interface/IDanmaMessage";
import { IDanmaTrackInfo } from "../interface/IDanmaTrack";
import { BaseMessage } from "./BaseMessage";
interface TextMessageConfig{
  mMsg:string
  color:string
  fontSize:number
  fontFamily:string
}
export class TextMessage extends BaseMessage{
  textMessageConfig:TextMessageConfig={
    mMsg:'',
    color:'#FFF',
    fontSize:30,
    fontFamily:"黑体"
  }
  constructor(msg: TextMessageConfig) {
    super()
    this.textMessageConfig = Object.assign({},this.textMessageConfig,msg)
  }
  onCreate(): boolean {
    return true
  }  
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    ctx.textAlign="left"
    ctx.textBaseline="top"
    ctx.font=`${this.textMessageConfig.fontSize}px ${this.textMessageConfig.fontFamily}`
    let res=ctx.measureText(this.textMessageConfig.mMsg)
    console.log(res)
    return {
      width: res.width,
      height:0
    }
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    return {
      top:0,
      left:0
    }
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    console.log()
  }
  onDestroyed(): boolean {
    return this.position.left<0
  }
}