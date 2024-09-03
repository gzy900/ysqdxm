"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var EventManager_1 = require("../event/EventManager");
var JoinRoom = (function (_super) {
    tslib_1.__extends(JoinRoom, _super);
    function JoinRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchInputComp = null;
        return _this;
    }
    JoinRoom.prototype.onAwake = function () {
        this.touchInputComp = this.getComponent(engine_1.default.TouchInputComponent);
        this.onClick = this.onClick.bind(this);
        this.touchInputComp.onClick.add(this.onClick);
    };
    JoinRoom.prototype.onClick = function (s, e) {
        console.log("发送了房间号" + this.textInput.text);
        EventManager_1.default.emit(EventManager_1.default.SendRoomId, this.textInput.text);
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.UITextInput
        })
    ], JoinRoom.prototype, "textInput", void 0);
    JoinRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("JoinRoom")
    ], JoinRoom);
    return JoinRoom;
}(engine_1.default.Script));
exports.default = JoinRoom;
//# sourceMappingURL=JoinRoom.js.map
