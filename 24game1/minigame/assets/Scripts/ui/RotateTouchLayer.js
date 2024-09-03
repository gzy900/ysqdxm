"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var TouchLayerBase_1 = require("./TouchLayerBase");
var EventManager_1 = require("../event/EventManager");
var CUSOR_RANGE = 30;
var MINUS_DIS = 5;
var RotateTouchLayer = (function (_super) {
    tslib_1.__extends(RotateTouchLayer, _super);
    function RotateTouchLayer(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.rotationXSpeed = 20;
        _this.rotationYSpeed = 20;
        _this.beginGesture = false;
        _this.isVertical = false;
        _this.diff = engine_1.default.Vector2.ZERO.clone();
        return _this;
    }
    RotateTouchLayer.prototype.onUpdate = function () {
    };
    RotateTouchLayer.prototype.onAwake = function () {
        this.onCustomMove = this.onCustomMove.bind(this);
        this.onCustomTouchEnd = this.onCustomTouchEnd.bind(this);
        this.onCustomTouchCancel = this.onCustomTouchCancel.bind(this);
        this.registTouchMove(this.onCustomMove);
        this.registTouchEnd(this.onCustomTouchEnd);
        this.registTouchCancel(this.onCustomTouchCancel);
    };
    RotateTouchLayer.prototype.onCustomTouchCancel = function (start, last, current) {
        this.beginGesture = false;
    };
    RotateTouchLayer.prototype.onCustomTouchEnd = function (start, last, current) {
        this.beginGesture = false;
    };
    RotateTouchLayer.prototype.onCustomMove = function (start, last, current) {
        if (!this.beginGesture) {
            current.sub(start, this.diff);
            if (this.diff.length() > MINUS_DIS) {
                this.beginGesture = true;
            }
        }
        current.sub(last, this.diff);
        EventManager_1.default.emit(EventManager_1.default.CameraRotate, this.diff);
    };
    RotateTouchLayer = tslib_1.__decorate([
        engine_1.default.decorators.serialize("RotateTouchLayer")
    ], RotateTouchLayer);
    return RotateTouchLayer;
}(TouchLayerBase_1.default));
exports.default = RotateTouchLayer;
//# sourceMappingURL=RotateTouchLayer.js.map
