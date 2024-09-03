import engine from "engine";
declare type TouchInputEvent = engine.TouchInputEvent;
declare type Entity2D = engine.Entity2D;
declare type Vector2 = engine.Vector2;

export type TouchCallback = (start: engine.Vector2,last: engine.Vector2, current: engine.Vector2) => void;


const TMPZERO = engine.Vector2.ZERO.clone();

export default class TouchLayerBase extends engine.Script {
    public touchInputComp: engine.TouchInputComponent | null = null;
    public _touchStart: TouchCallback | null = null;
    public _touchEnter: TouchCallback | null = null;
    public _touchMove: TouchCallback | null = null;
    public _touchLeave: TouchCallback | null = null;
    public _touchEnd: TouchCallback | null = null;
    public _touchCancel: TouchCallback | null = null;

    private _startTouch: Vector2 = engine.Vector2.ZERO.clone();
    private _lastTouch: Vector2 = engine.Vector2.ZERO.clone();
    private _curTouch: Vector2 = engine.Vector2.ZERO.clone();
      
    constructor(public readonly entity: Entity2D) {
        super(entity);
        this.touchInputComp = this.getComponent<engine.TouchInputComponent>(engine.TouchInputComponent);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnter = this.onTouchEnter.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchLeave = this.onTouchLeave.bind(this);
        this.onTouchCancel = this.onTouchCancel.bind(this);
    }

    public onEnable() {
        if (this.touchInputComp) {
            this.touchInputComp.onTouchStart.add(this.onTouchStart);
            this.touchInputComp.onTouchEnter.add(this.onTouchEnter);
            this.touchInputComp.onTouchEnd.add(this.onTouchEnd);
            this.touchInputComp.onTouchLeave.add(this.onTouchLeave);
            this.touchInputComp.onTouchMove.add(this.onTouchMove);
            this.touchInputComp.onTouchCancel.add(this.onTouchCancel);
          }
    }

    public onDisable() {
        if (this.touchInputComp) {
            this.touchInputComp.onTouchStart.remove(this.onTouchStart);
            this.touchInputComp.onTouchEnter.remove(this.onTouchEnter);
            this.touchInputComp.onTouchEnd.remove(this.onTouchEnd);
            this.touchInputComp.onTouchLeave.remove(this.onTouchLeave);
            this.touchInputComp.onTouchMove.remove(this.onTouchMove);
            this.touchInputComp.onTouchCancel.remove(this.onTouchCancel);
        }
    }
    
    public registTouchStart(cb: TouchCallback) {
        this._touchStart = cb;
    }

    public registTouchEnter(cb: TouchCallback) {
        this._touchEnter = cb;
    }

    public registTouchMove(cb: TouchCallback) {
        this._touchMove = cb;
    }

    public registTouchLeave(cb: TouchCallback) {
        this._touchLeave = cb;
    }

    public registTouchEnd(cb: TouchCallback) {
        this._touchEnd = cb;
    }

    public registTouchCancel(cb: TouchCallback) {
        this._touchCancel = cb;
    }

    private onTouchStart(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._startTouch.x = e.touches[0].position.x;
        this._startTouch.y = e.touches[0].position.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchStart) {
            this._touchStart(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._lastTouch = e.touches[0].position
    }
    
    private onTouchEnter(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchEnter) {
            this._touchEnter(this._startTouch, this._lastTouch, this._curTouch);
        }
    }
    
    private onTouchMove(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchMove) {
            this._touchMove(this._startTouch, this._lastTouch, this._curTouch);
        }
    }
    
    private onTouchLeave(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchLeave) {
            this._touchLeave(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    }
    
    private onTouchEnd(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchEnd) {
            this._touchEnd(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    }

    private onTouchCancel(s: engine.TouchInputComponent, e: TouchInputEvent) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if( this._touchEnd) {
            this._touchEnd(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    }
}