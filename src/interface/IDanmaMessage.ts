import {IDanmaTrackInfo} from './IDanmaTrack'
export interface Rect{
  width:number
  height:number
}
export interface Point{
  top:number
  left:number
}
export interface IDanmaMessage{
  position:Point
  size:Rect
  onMeasure(ctx: CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo):Rect
  onDraw(ctx:CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo):void
  onLayout(ctx: CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo): Point
}