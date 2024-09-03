"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var loadBedroom_1 = require("./loadBedroom");
var retryBtn = (function (_super) {
    tslib_1.__extends(retryBtn, _super);
    function retryBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        return _this;
    }
    retryBtn.prototype.onClick = function () {
        this.entity.transform2D.active = false;
        if (this.loadingBarComp) {
            this.loadingBarComp.loadBedRoom();
        }
    };
    retryBtn.prototype.onAwake = function () {
    };
    retryBtn.prototype.onUpdate = function (dt) {
    };
    retryBtn.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], retryBtn.prototype, "name", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: loadBedroom_1.default
        })
    ], retryBtn.prototype, "loadingBarComp", void 0);
    retryBtn = tslib_1.__decorate([
        engine_1.default.decorators.serialize("retryBtn")
    ], retryBtn);
    return retryBtn;
}(engine_1.default.Script));
exports.default = retryBtn;
//# sourceMappingURL=retryBtn.js.map
