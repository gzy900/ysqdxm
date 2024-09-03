"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var EventManager_1 = require("../event/EventManager");
var CameraController = (function (_super) {
    tslib_1.__extends(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetPos1st = engine_1.default.Vector3.createFromNumber(0, 1, 0);
        _this._offsetPos = _this.offsetPos1st;
        _this._focusLockOnXAxis = true;
        _this._angleSum = 0;
        _this._angleMax = 30;
        _this._speed = 1;
        _this._rotSpeed = 0.2;
        _this._moveDir = engine_1.default.Vector2.ZERO;
        _this._moveable = false;
        _this.bind_entity = null;
        return _this;
    }
    CameraController.prototype.onAwake = function () {
        this.initEvent();
    };
    CameraController.prototype.onUpdate = function () {
        this.move();
    };
    CameraController.prototype.initEvent = function () {
        var _this = this;
        EventManager_1.default.on(EventManager_1.default.CameraRotate, function (rotation) {
            _this.rotate(rotation);
        });
        EventManager_1.default.on(EventManager_1.default.CharacterMove, function (dir) {
            _this.startMove(dir);
        });
        EventManager_1.default.on(EventManager_1.default.CharacterMoveStop, function () {
            _this.endMove();
        });
    };
    CameraController.prototype.startMove = function (dir) {
        this._moveable = true;
        this._moveDir = dir;
    };
    CameraController.prototype.endMove = function () {
        this._moveable = false;
        this._moveDir = engine_1.default.Vector2.ZERO;
    };
    CameraController.prototype.move = function () {
        if (this._moveable) {
            var forward = this.entity.transform.forward;
            var right = this.entity.transform.right;
            var pos = this.entity.transform.position;
            var offsetF = forward.scale(-this._moveDir.y * this._speed);
            var offsetR = right.scale(-this._moveDir.x * this._speed);
            var offset = offsetF.add(offsetR);
            this.entity.transform.position = pos.add(offset);
        }
    };
    CameraController.prototype.rotateX = function (rotation) {
        this._angleSum += (-rotation / 5) * this._rotSpeed;
        if (this._focusLockOnXAxis) {
            if (this._angleSum < -this._angleMax)
                this._angleSum = -this._angleMax;
            if (this._angleSum > this._angleMax)
                this._angleSum = this._angleMax;
        }
        this.entity.transform.euler.x = (this._angleSum * Math.PI) / 180;
    };
    CameraController.prototype.rotateY = function (rotation) {
        var rotateQuat = engine_1.default.Quaternion.fromEulerAngles(engine_1.default.Vector3.createFromNumber(0, (-rotation / 120) * this._rotSpeed, 0));
        this._offsetPos = engine_1.default.Vector3.transformQuat(this._offsetPos, rotateQuat);
        this.entity.transform.rotate(engine_1.default.Vector3.createFromNumber(0, (-rotation / 120) * this._rotSpeed, 0), false);
    };
    CameraController.prototype.rotate = function (rot) {
        this.rotateX(rot.y);
        this.rotateY(rot.x);
    };
    CameraController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("CameraController")
    ], CameraController);
    return CameraController;
}(engine_1.default.Script));
exports.default = CameraController;
//# sourceMappingURL=CameraController.js.map
