import Danmaku from "../Danmaku";
import {IDanmaMessage} from './IDanmaMessage'
export interface IDanmaTrack{
  mDanmaMessages:Array<IDanmaMessage>
  setDanmaku(danmaku:Danmaku):void
  render(ctx: CanvasRenderingContext2D):void
}
export interface IDanmaTrackInfo{
  maxWidth:number
  top:number
  height:number
}