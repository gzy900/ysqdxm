"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var config_1 = require("../multiPlayer/config");
var GRAVITY = 9.8;
var UP = engine_1.default.Vector3.createFromArray([0, 0, 1]);
var VIEW = {
    FIRSTVIEW: 0,
    THIRDVIEW: 1
};
var PlayerController = (function (_super) {
    tslib_1.__extends(PlayerController, _super);
    function PlayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = config_1.default.playerSpeed;
        _this.rotateVec = engine_1.default.Vector3.ZERO.clone();
        _this.rotateQuat = new engine_1.default.Quaternion();
        _this.curQuaternion = new engine_1.default.Quaternion();
        _this.rotateAccumulate = 0;
        _this._viewMode = VIEW.THIRDVIEW;
        return _this;
    }
    PlayerController.prototype.onAwake = function () {
        this.characterController = this.getComponent(engine_1.default.CharacterController);
        this.characterController.center = engine_1.default.Vector3.createFromArray([0, 0.5, 0]);
    };
    PlayerController.prototype.update1stMove = function (dirX, dirY, dt, dstMov) {
        var moveDir = engine_1.default.Vector3.createFromNumber(dirX, 0, dirY);
        dstMov.set(moveDir.scale(this.speed * dt));
    };
    PlayerController.prototype.update3rdMove = function (dt, dstMov) {
        dstMov.set(this.entity.transform.forward.scale(-this.speed * dt));
    };
    PlayerController.prototype.update3rdRotate = function (dirX, dirY, dt, dstRot) {
        var turnAmount = Math.atan2(dirX, dirY);
        var turnSpeed = Math.PI + Math.PI * Math.abs(dirY);
        dstRot.set(engine_1.default.Vector3.createFromNumber(0, turnAmount * turnSpeed * dt, 0));
        return turnSpeed;
    };
    PlayerController.prototype.rotateY = function (rotation, dstRot) {
        dstRot.set(engine_1.default.Vector3.createFromNumber(0, rotation / 50, 0));
    };
    PlayerController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerCtrl")
    ], PlayerController);
    return PlayerController;
}(engine_1.default.Script));
exports.default = PlayerController;
//# sourceMappingURL=PlayerController.js.map
