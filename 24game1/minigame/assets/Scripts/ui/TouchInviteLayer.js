"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var TouchLayerBase_1 = require("./TouchLayerBase");
var EventManager_1 = require("../event/EventManager");
var TouchInviteLayer = (function (_super) {
    tslib_1.__extends(TouchInviteLayer, _super);
    function TouchInviteLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchInviteLayer.prototype.onAwake = function () {
        this.onCustomTouchStart = this.onCustomTouchStart.bind(this);
        this.registTouchStart(this.onCustomTouchStart);
    };
    TouchInviteLayer.prototype.onCustomTouchStart = function (start, last, current) {
        EventManager_1.default.emit(EventManager_1.default.InvitePlayer);
    };
    TouchInviteLayer = tslib_1.__decorate([
        engine_1.default.decorators.serialize("TouchInviteLayer")
    ], TouchInviteLayer);
    return TouchInviteLayer;
}(TouchLayerBase_1.default));
exports.default = TouchInviteLayer;
//# sourceMappingURL=TouchInviteLayer.js.map
