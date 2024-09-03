"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
var tslib_1 = require("tslib");
var EventEmitter = require("eventemitter3");
var EventEmitterManager = (function (_super) {
    tslib_1.__extends(EventEmitterManager, _super);
    function EventEmitterManager() {
        var _this = _super.call(this) || this;
        _this.CharacterMove = 'MoveEvent';
        _this.CharacterMoveStop = 'MoveStop';
        _this.CameraRotateX = 'CameraRotateX';
        _this.CameraRotateY = 'CameraRotateY';
        _this.CameraRotate = 'CameraRotate';
        _this.SwitchView = 'SwitchView';
        _this.InvitePlayer = 'InvitePlayer';
        _this.RoomInfoChange = 'onRoomInfoChange';
        _this.AddPlayer = 'AddPlayer';
        _this.SendRoomId = 'SendRoomId';
        _this.CreateRoom = 'CreateRoom';
        return _this;
    }
    return EventEmitterManager;
}(EventEmitter));
exports.EventManager = new EventEmitterManager();
exports.default = exports.EventManager;
//# sourceMappingURL=EventManager.js.map
