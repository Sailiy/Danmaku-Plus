interface Rect{
  width:number
  height:number
}
interface Point{
  top:number
  left:number
}
interface TrackInfo{
  trackID:number
  maxLeft:number
}
interface IDanmaMessage{
  mTrackInfo?:TrackInfo
  onMeasure(canvas: CanvasRenderingContext2D):Rect
  onDraw(canvas:CanvasRenderingContext2D):void
  onLayout(canvas: CanvasRenderingContext2D): Point
}