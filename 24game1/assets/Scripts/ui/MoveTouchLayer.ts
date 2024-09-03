/*
 * @Athour: kumozheng
 * @Date: 2021-08-31 15:56:47
 * @LastEditors: kumozheng
 * @LastEditTime: 2021-08-31 20:32:43
 * @Description: 
 * @FilePath: /RenderDemo copy/assets/Scripts/ui/MoveTouchLayer.ts
 */
import engine from "engine";
import TouchLayerBase from "./TouchLayerBase";
import EventManager from "../event/EventManager" 

declare type Entity2D = engine.Entity2D;

// Cusor移动范围
const CUSOR_RANGE = 30;

@engine.decorators.serialize("MoveTouchLayer")
export default class MoveTouchLayer extends TouchLayerBase {
    public cursor: engine.Entity | null = null;

    private _pos: engine.Vector2 = engine.Vector2.ZERO.clone();
    private _dir: engine.Vector2 = engine.Vector2.ZERO.clone();

    constructor(public readonly entity: Entity2D) {
        super(entity);
    }

    public onUpdate() {

    }

    public onAwake() {
        this.cursor = this.entity.transform2D.findChildByName('Cursor').entity;
        this.onCustomMove = this.onCustomMove.bind(this);
        this.onCustomTouchEnd = this.onCustomTouchEnd.bind(this);
        this.onCustomTouchCancel = this.onCustomTouchCancel.bind(this);
        
        this.registTouchMove(this.onCustomMove);
        this.registTouchEnd(this.onCustomTouchEnd)
        this.registTouchCancel(this.onCustomTouchCancel);
    }

    private onCustomTouchCancel(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        // 返回中心位置
        this.setCursorPos(0, 0);
        EventManager.emit(EventManager.CharacterMoveStop);
    }

    private onCustomTouchEnd(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        // 返回中心位置
        this.setCursorPos(0, 0);
        EventManager.emit(EventManager.CharacterMoveStop);
    }

    private onCustomMove(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2) {
        this.setCursorPos(current.x, current.y);
        this._dir.x = current.x;
        this._dir.y = current.y;
        this._dir.normalize(this._dir);
        // 通知角色move
        EventManager.emit(EventManager.CharacterMove, this._dir);
    }

    private setCursorPos(x: number, y: number) {
        this._pos.x = x;
        this._pos.y = y;
        if(this._pos.length() > CUSOR_RANGE) {
            this._pos.normalize(this._pos);
            this._pos.scale(CUSOR_RANGE, this._pos);
        } 
        this.cursor.transform2D.position = this._pos;
    }
}