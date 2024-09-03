import engine from "engine";
import EventManager from "../event/EventManager"
import config from "../multiPlayer/config";
import PawnController from "./PawnController";


const GRAVITY = 9.8;
const UP = engine.Vector3.createFromArray([0, 0, 1]);

const VIEW = {
    FIRSTVIEW: 0,
    THIRDVIEW: 1
};

@engine.decorators.serialize("PlayerCtrl")
export default class PlayerController extends engine.Script {


     //控制该对象的移动旋转
    public bind_entity:engine.Entity;

    public speed: number = config.playerSpeed;


    public rotateVec: engine.Vector3 = engine.Vector3.ZERO.clone();

    public rotateQuat: engine.Quaternion = new engine.Quaternion();
    public curQuaternion: engine.Quaternion = new engine.Quaternion();
    public rotateAccumulate: number = 0;

    public rotation:number;
    public characterController: null | engine.CharacterController;
    private _viewMode: number = VIEW.THIRDVIEW;


    public onAwake() {
        this.characterController = this.getComponent<engine.CharacterController>(engine.CharacterController);
        this.characterController.center = engine.Vector3.createFromArray([0, 0.5, 0]);
    }

    public update1stMove(dirX:number,dirY:number,dt:number,dstMov?:engine.Vector3) {
        let moveDir = engine.Vector3.createFromNumber(dirX, 0, dirY);
        dstMov.set(moveDir.scale(this.speed*dt));
        //simpleMove的是世界坐标
        //this.characterController.simpleMove(moveDir.scale(this.speed));
    }

    public update3rdMove(dt:number,dstMov?:engine.Vector3) {
        // 移动动画,forward指向-z方向
        dstMov.set(this.entity.transform.forward.scale(-this.speed*dt));
        //this.characterController.simpleMove(this.entity.transform.forward.scale(-this.speed));
    }

    public update3rdRotate(dirX:number,dirY:number,dt:number,dstRot?:engine.Vector3):number{
        let turnAmount = Math.atan2(dirX, dirY);
        let turnSpeed = Math.PI+Math.PI*Math.abs(dirY);
        dstRot.set(engine.Vector3.createFromNumber(0,turnAmount* turnSpeed * dt,0));
        //this.entity.transform.rotate(engine.Vector3.createFromNumber(0, turnAmount* turnSpeed * dt, 0),true,false);
        return turnSpeed;
    }

     //控制bind_entity在Y轴上的旋转
     public rotateY(rotation:number,dstRot?:engine.Vector3){
         dstRot.set(engine.Vector3.createFromNumber(0,rotation/50,0));
        //this.entity.transform.rotate(engine.Vector3.createFromNumber(0, rotation/50, 0));
    }


}