import engine from "engine";
import EventManager from "../event/EventManager"
import PlayerController from "./PlayerController";
import CameraController from "./CameraController";


const ROTATE_KEY = 'rotate'
const SPEED_KEY = 'speed';


@engine.decorators.serialize("PawnController")
export default class PawnController extends engine.Script {
    //animation
    public animator: null | engine.Animator;

    public rotateSpeed: number = 120;

    public onAwake() {
        this.animator = this.getComponent<engine.Animator>(engine.Animator);
    }

    public updateMoveAnime(dirX:number,dirY:number) {
        if(dirY!=0)
        {
            dirY=dirY<0.3?0.3:dirY;
        }
        this.animator.setFloat(SPEED_KEY, dirY)
        //右手坐标系下，导出后动画的paramter设置相反，所以这里旋转角度不同
        let turnAmount = -Math.atan2(dirX, dirY);
        
        this.animator.setFloat(ROTATE_KEY, turnAmount);
    }

    public updateIdleAnime() {
        this.animator.setFloat(SPEED_KEY, 0);
        this.animator.setFloat(ROTATE_KEY, 0);
    }

}