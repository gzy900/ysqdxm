import engine from 'engine'
import PlayerController from './PlayerController'
import CameraController from './CameraController'
import PawnController from './PawnController';
import EventManager from '../event/EventManager';
import config from '../multiPlayer/config';



const VIEW = {
    FIRSTVIEW: 0,
    THIRDVIEW: 1
};

@engine.decorators.serialize("MoveManager")
export default class MoveManager extends engine.Script{

    private _viewMode: number = VIEW.THIRDVIEW;
    public PlayerState: number = config.PlayerState.IDLE;

    public playerController:PlayerController;
    public pawnController:PawnController;

    private dir:engine.Vector2=engine.Vector2.ZERO.clone();
    private inputDir:engine.Vector2=engine.Vector2.ZERO.clone();

    private frameMov:engine.Vector3=engine.Vector3.ZERO.clone();
    private frameRot:engine.Vector3=engine.Vector3.ZERO.clone();
    private rotSpeed:number;

    private dest:engine.Vector3=this.entity.transform.position;
    private destRot:engine.Vector3=this.entity.transform.euler;
    private predictDest:engine.Vector3=this.dest;
    private predictDestRot:engine.Vector3=this.destRot;


    //cameraRotate记录【仅】由相机引起的旋转角度
    private cameraRotate:number=0;


    public onAwake()
    {
        this.initController();
    }

    public initController() {
        this.playerController = this.getComponent<PlayerController>(PlayerController);
        this.pawnController = this.getComponent<PawnController>(PawnController);
    }

    public characterMove(x:number,y:number, PlayerState:number){
        this.PlayerState = config.PlayerState.MOVE;
        let v3dir=engine.Vector3.createFromNumber(-x,0,y);
        let rotateQuat;

        rotateQuat = engine.Quaternion.fromEulerAngles(engine.Vector3.createFromNumber(0, 
            this.cameraRotate, 0));

        v3dir=engine.Vector3.transformQuat(v3dir, rotateQuat);
        this.dir.x=v3dir.x;
        this.dir.y=v3dir.z;
    }

    public characterIdle(PlayerState:number){
        this.PlayerState = config.PlayerState.IDLE;
        this.dir= engine.Vector2.ZERO.clone();
    }

    public cameraRotateY(rotation:number){
        //由于视角巡视累积的相机旋转角度
        this.cameraRotate=(this.cameraRotate+rotation/50)%(2*Math.PI);
        this.playerController.entity.transform.rotate(engine.Vector3.createFromNumber(0,rotation/50,0));
    }

    public switchView(){
        switch (this._viewMode) {
            case VIEW.FIRSTVIEW:
                this._viewMode = VIEW.THIRDVIEW;
                this.cameraRotate=this.entity.transform.euler.y;
                break;
            case VIEW.THIRDVIEW:
                this._viewMode = VIEW.FIRSTVIEW;
                this.cameraRotate=this.entity.transform.euler.y;
                break;
        }
    }


    public renderUpdate(dt:number){
        switch(this.PlayerState<<1|this._viewMode)
        {
            case config.PlayerState.MOVE<<1|VIEW.FIRSTVIEW:
                //Math.abs保证前进与后退，都有动画行为
                this.pawnController.updateMoveAnime(this.inputDir.x,Math.abs(this.inputDir.y));
                break;
            case config.PlayerState.MOVE<<1|VIEW.THIRDVIEW:
                this.pawnController.updateMoveAnime(this.inputDir.x,this.inputDir.y);
                break;
            case config.PlayerState.IDLE<<1|VIEW.FIRSTVIEW:
                this.pawnController.updateIdleAnime();
                break;
            case config.PlayerState.IDLE<<1|VIEW.THIRDVIEW:
                this.pawnController.updateIdleAnime();
                break;
        }

        let position=this.entity.transform.position;
        let euler=this.entity.transform.euler;

        // if(this.predictDest.x!=position.x||this.predictDest.y!=position.y)
        // {
        //     let disVec=this.predictDest.add(this.entity.transform.position.scale(-1));
        if(this.dest.x!=position.x||this.dest.y!=position.y)
        {
            let disVec=this.dest.add(this.entity.transform.position.scale(-1));
            let dis=dt/(1/config.fps)*config.playerSpeed/1000*config.fps;
            let percent=dis/(disVec.length());
            if(percent<0)
                percent=0;
            if(percent>1)
                percent=1;
        
          //  this.entity.transform.position=this.entity.transform.position.add(disVec.scale(percent));
          this.playerController.characterController.move(disVec.scale(percent));
        }

        // if(this.predictDestRot.y!=euler.y)
        // {
        //     let disVec=this.predictDestRot.add(this.entity.transform.euler.scale(-1));
        if(this.destRot.y!=euler.y)
         {
             let disVec=this.destRot.add(this.entity.transform.euler.scale(-1));
            let dis=dt/(1/config.fps)*this.rotSpeed/1000*config.fps;
            let percent=dis/(disVec.length());
            if(percent<0)
                percent=0;
            if(percent>1)
                percent=1;

            this.entity.transform.euler=this.entity.transform.euler.add(disVec.scale(percent));
        }
    }

    public logicUpdate(dt){
        let v3dir= this.entity.transform.localMatrix.inverse().transformDirection(engine.Vector3.createFromNumber(
        this.dir.x,0,this.dir.y)).normalize();
        this.inputDir=engine.Vector2.createFromNumber(v3dir.x,v3dir.z);
        
        switch(this.PlayerState<<1|this._viewMode)
        {
            case config.PlayerState.MOVE<<1|VIEW.FIRSTVIEW:
                //这里调用了全局坐标系下的移动方向
                this.playerController.update1stMove(this.dir.x,this.dir.y,dt,this.frameMov);
                this.dest=this.dest.add(this.frameMov);
                break;
            case config.PlayerState.MOVE<<1|VIEW.THIRDVIEW:
                this.playerController.update3rdMove(dt,this.frameMov);
                this.rotSpeed=this.playerController.update3rdRotate(this.inputDir.x,this.inputDir.y,dt,this.frameRot);
                this.dest=this.dest.add(this.frameMov);
                this.destRot=this.destRot.add(this.frameRot);
                break;
        }
    }

    public preditUpdate(dt){
        let v3dir= this.entity.transform.localMatrix.inverse().transformDirection(engine.Vector3.createFromNumber(
        this.dir.x,0,this.dir.y)).normalize();
        this.inputDir=engine.Vector2.createFromNumber(v3dir.x,v3dir.z);
        switch(this.PlayerState<<1|this._viewMode)
        {
            case config.PlayerState.MOVE<<1|VIEW.FIRSTVIEW:
                //这里调用了全局坐标系下的移动方向
                this.playerController.update1stMove(this.dir.x,this.dir.y,dt,this.frameMov);
                this.predictDest=this.dest.add(this.frameMov);
                break;
            case config.PlayerState.MOVE<<1|VIEW.THIRDVIEW:
                this.playerController.update3rdMove(dt,this.frameMov);
                this.rotSpeed=this.playerController.update3rdRotate(this.inputDir.x,this.inputDir.y,dt,this.frameRot);
                this.predictDest=this.dest.add(this.frameMov);
                this.predictDestRot=this.destRot.add(this.frameRot);
                break;
        }
    }


   



}

   