import engine from "engine";
import EventManager from "../event/EventManager";
import { TouchInputEvent } from "engine";

@engine.decorators.serialize("JoinRoom")
export default class JoinRoom extends engine.Script {

    public touchInputComp: engine.TouchInputComponent | null = null;
    @engine.decorators.property({
        type: engine.UITextInput
      })
    public textInput;
    public textInputComp;
    
    public onAwake()
    {
        this.touchInputComp = this.getComponent<engine.TouchInputComponent>(engine.TouchInputComponent);
        this.onClick=this.onClick.bind(this);
        this.touchInputComp.onClick.add(this.onClick);
        
    }
       
    private onClick(s: engine.TouchInputComponent, e: TouchInputEvent)
    {
       console.log("发送了房间号"+this.textInput.text);
       EventManager.emit(EventManager.SendRoomId,this.textInput.text);
    }
}