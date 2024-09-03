"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UIProgressBar_1 = require("../ui/uikit_progressbar/scripts/UIProgressBar");
var engine_1 = require("engine");
var loadBedroom = (function (_super) {
    tslib_1.__extends(loadBedroom, _super);
    function loadBedroom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.percent = 0;
        _this.finishLoading = false;
        return _this;
    }
    loadBedroom.prototype.onAwake = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadBedRoom();
                return [2];
            });
        });
    };
    loadBedroom.prototype.loadBedRoom = function () {
        var _this = this;
        engine_1.default.loader.load('Assets/Scene/Game2D.scene').promise.then(function (Game2DScene) {
            var loaderTask = engine_1.default.loader.load('Assets/Resources/bedroom/bedroom.scene');
            _this.lt = loaderTask;
            _this.lt.promise.then(function (bedRoomScene) {
                engine_1.default.game.playScene(bedRoomScene);
                engine_1.default.game.playScene(Game2DScene);
            }, function (e) {
                _this.retry(e);
            });
        }, function (e) {
            _this.retry(e);
        });
    };
    loadBedroom.prototype.retry = function (e) {
        if (this.retryBtn) {
            this.retryBtn.active = true;
        }
        if (this.errorMessage) {
            var labelComp = this.errorMessage.entity.getComponent(engine_1.default.UILabel);
            if (labelComp) {
                labelComp.text = e.message;
            }
        }
    };
    loadBedroom.prototype.onUpdate = function (dt) {
        if (this.lt && !this.finishLoading) {
            var p = this.lt.progress;
            this.percent = p.current / p.total;
            var barComp = this.entity.getComponent(UIProgressBar_1.default);
            barComp.value = this.percent;
        }
    };
    loadBedroom.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D
        })
    ], loadBedroom.prototype, "retryBtn", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D
        })
    ], loadBedroom.prototype, "errorMessage", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], loadBedroom.prototype, "percent", void 0);
    loadBedroom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("loadBedroom")
    ], loadBedroom);
    return loadBedroom;
}(engine_1.default.Script));
exports.default = loadBedroom;
//# sourceMappingURL=loadBedroom.js.map
