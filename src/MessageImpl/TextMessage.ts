import { IDanmaMessage, Point, Rect } from "../interface/IDanmaMessage";
import { IDanmaTrackInfo } from "../interface/IDanmaTrack";

export class TextMessage implements IDanmaMessage {
  isInit: boolean=false
  mMsg:string
  position: Point = {
    top: 0,
    left: 0
  }
  size: Rect = {
    width: 0,
    height: 0
  }

  constructor(msg:string){
    this.mMsg=msg
  }
  onInit(): void {
    throw new Error("Method not implemented.");
  }
  onCreate(): void {
    throw new Error("Method not implemented.");
  }
  onDistory(): void {
    throw new Error("Method not implemented.");
  }
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    throw new Error("Method not implemented.");
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    throw new Error("Method not implemented.");
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    throw new Error("Method not implemented.");
  }
}