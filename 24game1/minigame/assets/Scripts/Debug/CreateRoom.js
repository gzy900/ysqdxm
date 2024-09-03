"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var EventManager_1 = require("../event/EventManager");
var CreateRoom = (function (_super) {
    tslib_1.__extends(CreateRoom, _super);
    function CreateRoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchInputComp = null;
        return _this;
    }
    CreateRoom.prototype.onAwake = function () {
        this.touchInputComp = this.getComponent(engine_1.default.TouchInputComponent);
        this.onClick = this.onClick.bind(this);
        this.touchInputComp.onClick.add(this.onClick);
    };
    CreateRoom.prototype.onClick = function (s, e) {
        console.log("创建房间中……");
        EventManager_1.default.emit(EventManager_1.default.CreateRoom);
    };
    CreateRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("CreateRoom")
    ], CreateRoom);
    return CreateRoom;
}(engine_1.default.Script));
exports.default = CreateRoom;
//# sourceMappingURL=CreateRoom.js.map
