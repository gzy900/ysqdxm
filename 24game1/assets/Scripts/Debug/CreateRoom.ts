import engine from "engine";
import EventManager from "../event/EventManager";
import { TouchInputEvent } from "engine";

@engine.decorators.serialize("CreateRoom")
export default class CreateRoom extends engine.Script {

    public touchInputComp: engine.TouchInputComponent | null = null;

    public onAwake()
    {
        this.touchInputComp = this.getComponent<engine.TouchInputComponent>(engine.TouchInputComponent);
        this.onClick=this.onClick.bind(this);
        this.touchInputComp.onClick.add(this.onClick);
    }
       
    private onClick(s: engine.TouchInputComponent, e: TouchInputEvent)
    {
        console.log("创建房间中……");
       EventManager.emit(EventManager.CreateRoom);
    }
}