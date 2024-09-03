import engine from "engine";
import TouchLayerBase from "./TouchLayerBase";
import EventManager from "../event/EventManager" 

declare type Entity2D = engine.Entity2D;

// Cusor移动范围
const CUSOR_RANGE = 30;
const MINUS_DIS = 5;
@engine.decorators.serialize("RotateTouchLayer")
export default class RotateTouchLayer extends TouchLayerBase {
    private rotationXSpeed: number = 20;
    private rotationYSpeed: number = 20;
    private beginGesture: boolean = false;
    private isVertical: boolean = false;

    private diff: engine.Vector2 = engine.Vector2.ZERO.clone();

    constructor(public readonly entity: Entity2D) {
        super(entity);
    }

    public onUpdate() {

    }

    public onAwake() {
        this.onCustomMove = this.onCustomMove.bind(this);
        this.onCustomTouchEnd = this.onCustomTouchEnd.bind(this);
        this.onCustomTouchCancel = this.onCustomTouchCancel.bind(this);

        this.registTouchMove(this.onCustomMove);
        this.registTouchEnd(this.onCustomTouchEnd)
        this.registTouchCancel(this.onCustomTouchCancel);
    }

    private onCustomTouchCancel(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        this.beginGesture = false;
    }

    private onCustomTouchEnd(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        this.beginGesture = false;
    }

    private onCustomMove(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        if(!this.beginGesture) {
            current.sub(start, this.diff);
            if(this.diff.length() > MINUS_DIS) {
                this.beginGesture = true;
            }
        }
        current.sub(last, this.diff);
        EventManager.emit(EventManager.CameraRotate, this.diff);

    }
}