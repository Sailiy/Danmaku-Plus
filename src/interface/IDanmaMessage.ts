import { IDanmaTrackInfo } from './IDanmaTrack'
export interface Rect {
  width: number
  height: number
}
export interface Point {
  top: number
  left: number
}
export interface IDanmaMessage {
  position: Point
  size: Rect
  created: boolean
  distoryed: boolean
  onBaseCreate(): void
  onBaseMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void
  onBaseLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void
  onBaseDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void
  onBaseDestroyed(): void
  onCreate(callback: Function): void
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void
  onDestroyed(): boolean
}
