import engine from "engine";
import TouchLayerBase from "./TouchLayerBase";
import EventManager from "../event/EventManager" 
declare type TouchInputEvent = engine.TouchInputEvent;


@engine.decorators.serialize("TouchInviteLayer")
export default class TouchInviteLayer extends TouchLayerBase {


     public onAwake()
     {
         this.onCustomTouchStart=this.onCustomTouchStart.bind(this);
         this.registTouchStart(this.onCustomTouchStart);
     }
        
     private onCustomTouchStart(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2)
     {
        EventManager.emit(EventManager.InvitePlayer);
     }


}