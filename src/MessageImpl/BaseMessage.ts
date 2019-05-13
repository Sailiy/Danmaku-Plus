import { IDanmaMessage, Point, Rect } from "../interface/IDanmaMessage";
import { IDanmaTrackInfo } from "../interface/IDanmaTrack";

export abstract class BaseMessage implements IDanmaMessage {
  created: boolean=false;
  distoryed: boolean=false;
  isInit: boolean=false

  position: Point = {
    top: 0,
    left: 0
  }
  size: Rect = {
    width: 0,
    height: 0
  }

  abstract onCreate(): void
  abstract onMeasure(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Rect
  abstract onLayout(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): Point
  abstract onDraw(ctx: CanvasRenderingContext2D, trackInfo: IDanmaTrackInfo): void
  abstract onDestroyed(): void 
}