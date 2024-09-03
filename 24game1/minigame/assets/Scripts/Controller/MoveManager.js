"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var PlayerController_1 = require("./PlayerController");
var PawnController_1 = require("./PawnController");
var config_1 = require("../multiPlayer/config");
var VIEW = {
    FIRSTVIEW: 0,
    THIRDVIEW: 1
};
var MoveManager = (function (_super) {
    tslib_1.__extends(MoveManager, _super);
    function MoveManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._viewMode = VIEW.THIRDVIEW;
        _this.PlayerState = config_1.default.PlayerState.IDLE;
        _this.dir = engine_1.default.Vector2.ZERO.clone();
        _this.inputDir = engine_1.default.Vector2.ZERO.clone();
        _this.frameMov = engine_1.default.Vector3.ZERO.clone();
        _this.frameRot = engine_1.default.Vector3.ZERO.clone();
        _this.dest = _this.entity.transform.position;
        _this.destRot = _this.entity.transform.euler;
        _this.predictDest = _this.dest;
        _this.predictDestRot = _this.destRot;
        _this.cameraRotate = 0;
        return _this;
    }
    MoveManager.prototype.onAwake = function () {
        this.initController();
    };
    MoveManager.prototype.initController = function () {
        this.playerController = this.getComponent(PlayerController_1.default);
        this.pawnController = this.getComponent(PawnController_1.default);
    };
    MoveManager.prototype.characterMove = function (x, y, PlayerState) {
        this.PlayerState = config_1.default.PlayerState.MOVE;
        var v3dir = engine_1.default.Vector3.createFromNumber(-x, 0, y);
        var rotateQuat;
        rotateQuat = engine_1.default.Quaternion.fromEulerAngles(engine_1.default.Vector3.createFromNumber(0, this.cameraRotate, 0));
        v3dir = engine_1.default.Vector3.transformQuat(v3dir, rotateQuat);
        this.dir.x = v3dir.x;
        this.dir.y = v3dir.z;
    };
    MoveManager.prototype.characterIdle = function (PlayerState) {
        this.PlayerState = config_1.default.PlayerState.IDLE;
        this.dir = engine_1.default.Vector2.ZERO.clone();
    };
    MoveManager.prototype.cameraRotateY = function (rotation) {
        this.cameraRotate = (this.cameraRotate + rotation / 50) % (2 * Math.PI);
        this.playerController.entity.transform.rotate(engine_1.default.Vector3.createFromNumber(0, rotation / 50, 0));
    };
    MoveManager.prototype.switchView = function () {
        switch (this._viewMode) {
            case VIEW.FIRSTVIEW:
                this._viewMode = VIEW.THIRDVIEW;
                this.cameraRotate = this.entity.transform.euler.y;
                break;
            case VIEW.THIRDVIEW:
                this._viewMode = VIEW.FIRSTVIEW;
                this.cameraRotate = this.entity.transform.euler.y;
                break;
        }
    };
    MoveManager.prototype.renderUpdate = function (dt) {
        switch (this.PlayerState << 1 | this._viewMode) {
            case config_1.default.PlayerState.MOVE << 1 | VIEW.FIRSTVIEW:
                this.pawnController.updateMoveAnime(this.inputDir.x, Math.abs(this.inputDir.y));
                break;
            case config_1.default.PlayerState.MOVE << 1 | VIEW.THIRDVIEW:
                this.pawnController.updateMoveAnime(this.inputDir.x, this.inputDir.y);
                break;
            case config_1.default.PlayerState.IDLE << 1 | VIEW.FIRSTVIEW:
                this.pawnController.updateIdleAnime();
                break;
            case config_1.default.PlayerState.IDLE << 1 | VIEW.THIRDVIEW:
                this.pawnController.updateIdleAnime();
                break;
        }
        var position = this.entity.transform.position;
        var euler = this.entity.transform.euler;
        if (this.dest.x != position.x || this.dest.y != position.y) {
            var disVec = this.dest.add(this.entity.transform.position.scale(-1));
            var dis = dt / (1 / config_1.default.fps) * config_1.default.playerSpeed / 1000 * config_1.default.fps;
            var percent = dis / (disVec.length());
            if (percent < 0)
                percent = 0;
            if (percent > 1)
                percent = 1;
            this.playerController.characterController.move(disVec.scale(percent));
        }
        if (this.destRot.y != euler.y) {
            var disVec = this.destRot.add(this.entity.transform.euler.scale(-1));
            var dis = dt / (1 / config_1.default.fps) * this.rotSpeed / 1000 * config_1.default.fps;
            var percent = dis / (disVec.length());
            if (percent < 0)
                percent = 0;
            if (percent > 1)
                percent = 1;
            this.entity.transform.euler = this.entity.transform.euler.add(disVec.scale(percent));
        }
    };
    MoveManager.prototype.logicUpdate = function (dt) {
        var v3dir = this.entity.transform.localMatrix.inverse().transformDirection(engine_1.default.Vector3.createFromNumber(this.dir.x, 0, this.dir.y)).normalize();
        this.inputDir = engine_1.default.Vector2.createFromNumber(v3dir.x, v3dir.z);
        switch (this.PlayerState << 1 | this._viewMode) {
            case config_1.default.PlayerState.MOVE << 1 | VIEW.FIRSTVIEW:
                this.playerController.update1stMove(this.dir.x, this.dir.y, dt, this.frameMov);
                this.dest = this.dest.add(this.frameMov);
                break;
            case config_1.default.PlayerState.MOVE << 1 | VIEW.THIRDVIEW:
                this.playerController.update3rdMove(dt, this.frameMov);
                this.rotSpeed = this.playerController.update3rdRotate(this.inputDir.x, this.inputDir.y, dt, this.frameRot);
                this.dest = this.dest.add(this.frameMov);
                this.destRot = this.destRot.add(this.frameRot);
                break;
        }
    };
    MoveManager.prototype.preditUpdate = function (dt) {
        var v3dir = this.entity.transform.localMatrix.inverse().transformDirection(engine_1.default.Vector3.createFromNumber(this.dir.x, 0, this.dir.y)).normalize();
        this.inputDir = engine_1.default.Vector2.createFromNumber(v3dir.x, v3dir.z);
        switch (this.PlayerState << 1 | this._viewMode) {
            case config_1.default.PlayerState.MOVE << 1 | VIEW.FIRSTVIEW:
                this.playerController.update1stMove(this.dir.x, this.dir.y, dt, this.frameMov);
                this.predictDest = this.dest.add(this.frameMov);
                break;
            case config_1.default.PlayerState.MOVE << 1 | VIEW.THIRDVIEW:
                this.playerController.update3rdMove(dt, this.frameMov);
                this.rotSpeed = this.playerController.update3rdRotate(this.inputDir.x, this.inputDir.y, dt, this.frameRot);
                this.predictDest = this.dest.add(this.frameMov);
                this.predictDestRot = this.destRot.add(this.frameRot);
                break;
        }
    };
    MoveManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MoveManager")
    ], MoveManager);
    return MoveManager;
}(engine_1.default.Script));
exports.default = MoveManager;
//# sourceMappingURL=MoveManager.js.map
