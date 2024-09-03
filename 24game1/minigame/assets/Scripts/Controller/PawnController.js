"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var ROTATE_KEY = 'rotate';
var SPEED_KEY = 'speed';
var PawnController = (function (_super) {
    tslib_1.__extends(PawnController, _super);
    function PawnController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rotateSpeed = 120;
        return _this;
    }
    PawnController.prototype.onAwake = function () {
        this.animator = this.getComponent(engine_1.default.Animator);
    };
    PawnController.prototype.updateMoveAnime = function (dirX, dirY) {
        if (dirY != 0) {
            dirY = dirY < 0.3 ? 0.3 : dirY;
        }
        this.animator.setFloat(SPEED_KEY, dirY);
        var turnAmount = -Math.atan2(dirX, dirY);
        this.animator.setFloat(ROTATE_KEY, turnAmount);
    };
    PawnController.prototype.updateIdleAnime = function () {
        this.animator.setFloat(SPEED_KEY, 0);
        this.animator.setFloat(ROTATE_KEY, 0);
    };
    PawnController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PawnController")
    ], PawnController);
    return PawnController;
}(engine_1.default.Script));
exports.default = PawnController;
//# sourceMappingURL=PawnController.js.map
