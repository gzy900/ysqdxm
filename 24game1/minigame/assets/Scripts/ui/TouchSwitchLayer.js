"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var TouchLayerBase_1 = require("./TouchLayerBase");
var EventManager_1 = require("../event/EventManager");
var TouchSwitchLayer = (function (_super) {
    tslib_1.__extends(TouchSwitchLayer, _super);
    function TouchSwitchLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchSwitchLayer.prototype.onAwake = function () {
        this.onCustomTouchStart = this.onCustomTouchStart.bind(this);
        this.registTouchStart(this.onCustomTouchStart);
    };
    TouchSwitchLayer.prototype.onCustomTouchStart = function (start, last, current) {
        EventManager_1.default.emit(EventManager_1.default.SwitchView);
    };
    TouchSwitchLayer = tslib_1.__decorate([
        engine_1.default.decorators.serialize("TouchSwitchLayer")
    ], TouchSwitchLayer);
    return TouchSwitchLayer;
}(TouchLayerBase_1.default));
exports.default = TouchSwitchLayer;
//# sourceMappingURL=TouchSwitchLayer.js.map
