"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var TouchLayerBase_1 = require("./TouchLayerBase");
var EventManager_1 = require("../event/EventManager");
var CUSOR_RANGE = 30;
var MoveTouchLayer = (function (_super) {
    tslib_1.__extends(MoveTouchLayer, _super);
    function MoveTouchLayer(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.cursor = null;
        _this._pos = engine_1.default.Vector2.ZERO.clone();
        _this._dir = engine_1.default.Vector2.ZERO.clone();
        return _this;
    }
    MoveTouchLayer.prototype.onUpdate = function () {
    };
    MoveTouchLayer.prototype.onAwake = function () {
        this.cursor = this.entity.transform2D.findChildByName('Cursor').entity;
        this.onCustomMove = this.onCustomMove.bind(this);
        this.onCustomTouchEnd = this.onCustomTouchEnd.bind(this);
        this.onCustomTouchCancel = this.onCustomTouchCancel.bind(this);
        this.registTouchMove(this.onCustomMove);
        this.registTouchEnd(this.onCustomTouchEnd);
        this.registTouchCancel(this.onCustomTouchCancel);
    };
    MoveTouchLayer.prototype.onCustomTouchCancel = function (start, last, current) {
        this.setCursorPos(0, 0);
        EventManager_1.default.emit(EventManager_1.default.CharacterMoveStop);
    };
    MoveTouchLayer.prototype.onCustomTouchEnd = function (start, last, current) {
        this.setCursorPos(0, 0);
        EventManager_1.default.emit(EventManager_1.default.CharacterMoveStop);
    };
    MoveTouchLayer.prototype.onCustomMove = function (start, last, current) {
        this.setCursorPos(current.x, current.y);
        this._dir.x = current.x;
        this._dir.y = current.y;
        this._dir.normalize(this._dir);
        EventManager_1.default.emit(EventManager_1.default.CharacterMove, this._dir);
    };
    MoveTouchLayer.prototype.setCursorPos = function (x, y) {
        this._pos.x = x;
        this._pos.y = y;
        if (this._pos.length() > CUSOR_RANGE) {
            this._pos.normalize(this._pos);
            this._pos.scale(CUSOR_RANGE, this._pos);
        }
        this.cursor.transform2D.position = this._pos;
    };
    MoveTouchLayer = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MoveTouchLayer")
    ], MoveTouchLayer);
    return MoveTouchLayer;
}(TouchLayerBase_1.default));
exports.default = MoveTouchLayer;
//# sourceMappingURL=MoveTouchLayer.js.map
