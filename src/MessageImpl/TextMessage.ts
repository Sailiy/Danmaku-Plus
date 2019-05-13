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
    ctx.textBaseline="middle"
    ctx.font=`${this.textMessageConfig.fontSize}px ${this.textMessageConfig.fontFamily}`
    let res=ctx.measureText(this.textMessageConfig.mMsg)
    console.log(res)
    return {
      width: res.width,
      height:trackInfo.height
    }
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    if(!this.isLayout){
      this.isLayout=true
      return {
        top: (trackInfo.top + trackInfo.height / 2),
        left: ctx.canvas.width
      }
    }
    console.log(this.position)
    this.position.left-=3
    return this.position
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    ctx.fillStyle=this.textMessageConfig.color
    ctx.fillText(this.textMessageConfig.mMsg,this.position.left,this.position.top)
  }
  onDestroyed(): boolean {
    return this.position.left<0
  }
}