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
  isInit:boolean
  created:boolean
  distoryed:boolean
  onCreate():void
  onMeasure(ctx: CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo):Rect
  onLayout(ctx: CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo): Point
  onDraw(ctx:CanvasRenderingContext2D,trackInfo:IDanmaTrackInfo):void
  onDestroyed():void
}