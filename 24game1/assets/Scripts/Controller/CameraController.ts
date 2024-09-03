/*
 * @Athour: kumozheng
 * @Date: 2021-08-31 15:46:58
 * @LastEditors: kumozheng
 * @LastEditTime: 2021-09-01 15:53:10
 * @Description:
 * @FilePath: /RenderDemo copy/assets/Scripts/Controller/CameraController.ts
 */
import engine from "engine";
import EventManager from "../event/EventManager";

@engine.decorators.serialize("CameraController")
export default class CameraController extends engine.Script {
  public offsetPos1st: engine.Vector3 = engine.Vector3.createFromNumber(
    0,
    1,
    0
  );
  private _offsetPos: engine.Vector3 = this.offsetPos1st;

  private _focusLockOnXAxis: boolean = true;
  private _angleSum: number = 0;
  private _angleMax: number = 30;
  private _speed: number = 1;
  private _rotSpeed: number = 0.2;
  private _moveDir: engine.Vector2 = engine.Vector2.ZERO;
  private _moveable: boolean = false;

  //相机要追踪的对象
  public bind_entity: engine.Entity | null = null;

  public onAwake() {
    this.initEvent();
  }

  public onUpdate() {
      this.move();
  }

  public initEvent() {
    EventManager.on(EventManager.CameraRotate, (rotation: engine.Vector2) => {
      this.rotate(rotation);
    });
    EventManager.on(EventManager.CharacterMove, (dir: engine.Vector2) => {
      this.startMove(dir);
    });
    EventManager.on(EventManager.CharacterMoveStop, () => {
        this.endMove();
      });
  }

  //
  public startMove(dir: engine.Vector2) {
    this._moveable = true;
    this._moveDir = dir;
  }

  public endMove(){
    this._moveable = false;
    this._moveDir = engine.Vector2.ZERO;
  }

  public move(){
      if(this._moveable){
        const forward = this.entity.transform.forward;
        const right = this.entity.transform.right;
        const pos = this.entity.transform.position;

        let offsetF = forward.scale(-this._moveDir.y * this._speed);
        let offsetR = right.scale(-this._moveDir.x * this._speed);
        let offset = offsetF.add(offsetR);
        this.entity.transform.position = pos.add(offset);
      }
  }

  // 相机在X-axis上旋转
  public rotateX(rotation: number) {
    this._angleSum += (-rotation / 5)*this._rotSpeed;
    if (this._focusLockOnXAxis) {
      if (this._angleSum < -this._angleMax) this._angleSum = -this._angleMax;
      if (this._angleSum > this._angleMax) this._angleSum = this._angleMax;
    }
    this.entity.transform.euler.x = (this._angleSum * Math.PI) / 180;
  }
  
  // 相机在Y-axis上旋转
  public rotateY(rotation: number) {
    let rotateQuat = engine.Quaternion.fromEulerAngles(
      engine.Vector3.createFromNumber(0, (-rotation / 120) * this._rotSpeed, 0)
    );
    this._offsetPos = engine.Vector3.transformQuat(this._offsetPos, rotateQuat);
    this.entity.transform.rotate(
      engine.Vector3.createFromNumber(0, (-rotation / 120) * this._rotSpeed, 0),
      false
    );
  }

  public rotate(rot: engine.Vector2){
    this.rotateX(rot.y);
    this.rotateY(rot.x);
  }


}
