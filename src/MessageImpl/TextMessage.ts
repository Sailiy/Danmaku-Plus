import { IDanmaMessage, Point, Rect } from "../interface/IDanmaMessage";
import { IDanmaTrackInfo } from "../interface/IDanmaTrack";
import { BaseMessage } from "./BaseMessage";

export class TextMessage extends BaseMessage{
  mMsg: string
  constructor(msg: string) {
    super()
    this.mMsg = msg
  }
  onCreate(): void {
    this.created=true
  }  
  onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect {
    throw new Error("Method not implemented.");
  }
  onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point {
    throw new Error("Method not implemented.");
  }
  onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void {
    throw new Error("Method not implemented.");
  }
  onDestroyed(): void {
    throw new Error("Method not implemented.");
  }
}