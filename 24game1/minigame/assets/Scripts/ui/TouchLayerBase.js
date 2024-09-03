"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var TMPZERO = engine_1.default.Vector2.ZERO.clone();
var TouchLayerBase = (function (_super) {
    tslib_1.__extends(TouchLayerBase, _super);
    function TouchLayerBase(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.touchInputComp = null;
        _this._touchStart = null;
        _this._touchEnter = null;
        _this._touchMove = null;
        _this._touchLeave = null;
        _this._touchEnd = null;
        _this._touchCancel = null;
        _this._startTouch = engine_1.default.Vector2.ZERO.clone();
        _this._lastTouch = engine_1.default.Vector2.ZERO.clone();
        _this._curTouch = engine_1.default.Vector2.ZERO.clone();
        _this.touchInputComp = _this.getComponent(engine_1.default.TouchInputComponent);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchEnter = _this.onTouchEnter.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onTouchLeave = _this.onTouchLeave.bind(_this);
        _this.onTouchCancel = _this.onTouchCancel.bind(_this);
        return _this;
    }
    TouchLayerBase.prototype.onEnable = function () {
        if (this.touchInputComp) {
            this.touchInputComp.onTouchStart.add(this.onTouchStart);
            this.touchInputComp.onTouchEnter.add(this.onTouchEnter);
            this.touchInputComp.onTouchEnd.add(this.onTouchEnd);
            this.touchInputComp.onTouchLeave.add(this.onTouchLeave);
            this.touchInputComp.onTouchMove.add(this.onTouchMove);
            this.touchInputComp.onTouchCancel.add(this.onTouchCancel);
        }
    };
    TouchLayerBase.prototype.onDisable = function () {
        if (this.touchInputComp) {
            this.touchInputComp.onTouchStart.remove(this.onTouchStart);
            this.touchInputComp.onTouchEnter.remove(this.onTouchEnter);
            this.touchInputComp.onTouchEnd.remove(this.onTouchEnd);
            this.touchInputComp.onTouchLeave.remove(this.onTouchLeave);
            this.touchInputComp.onTouchMove.remove(this.onTouchMove);
            this.touchInputComp.onTouchCancel.remove(this.onTouchCancel);
        }
    };
    TouchLayerBase.prototype.registTouchStart = function (cb) {
        this._touchStart = cb;
    };
    TouchLayerBase.prototype.registTouchEnter = function (cb) {
        this._touchEnter = cb;
    };
    TouchLayerBase.prototype.registTouchMove = function (cb) {
        this._touchMove = cb;
    };
    TouchLayerBase.prototype.registTouchLeave = function (cb) {
        this._touchLeave = cb;
    };
    TouchLayerBase.prototype.registTouchEnd = function (cb) {
        this._touchEnd = cb;
    };
    TouchLayerBase.prototype.registTouchCancel = function (cb) {
        this._touchCancel = cb;
    };
    TouchLayerBase.prototype.onTouchStart = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._startTouch.x = e.touches[0].position.x;
        this._startTouch.y = e.touches[0].position.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchStart) {
            this._touchStart(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._lastTouch = e.touches[0].position;
    };
    TouchLayerBase.prototype.onTouchEnter = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchEnter) {
            this._touchEnter(this._startTouch, this._lastTouch, this._curTouch);
        }
    };
    TouchLayerBase.prototype.onTouchMove = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchMove) {
            this._touchMove(this._startTouch, this._lastTouch, this._curTouch);
        }
    };
    TouchLayerBase.prototype.onTouchLeave = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchLeave) {
            this._touchLeave(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    };
    TouchLayerBase.prototype.onTouchEnd = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchEnd) {
            this._touchEnd(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    };
    TouchLayerBase.prototype.onTouchCancel = function (s, e) {
        this._lastTouch.x = this._curTouch.x;
        this._lastTouch.y = this._curTouch.y;
        this._curTouch.x = e.touches[0].position.x;
        this._curTouch.y = e.touches[0].position.y;
        if (this._touchEnd) {
            this._touchEnd(this._startTouch, this._lastTouch, this._curTouch);
        }
        this._startTouch.x = 0;
        this._startTouch.y = 0;
    };
    return TouchLayerBase;
}(engine_1.default.Script));
exports.default = TouchLayerBase;
//# sourceMappingURL=TouchLayerBase.js.map
