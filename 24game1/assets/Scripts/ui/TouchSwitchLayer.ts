import engine from "engine";
import TouchLayerBase from "./TouchLayerBase";
import EventManager from "../event/EventManager" 


@engine.decorators.serialize("TouchSwitchLayer")
export default class TouchSwitchLayer extends TouchLayerBase {


     public onAwake()
     {
         this.onCustomTouchStart=this.onCustomTouchStart.bind(this);
         this.registTouchStart(this.onCustomTouchStart);
      //  let input:engine.TouchInputComponent=this.entity.getComponent(engine.TouchInputComponent)
      //  input.onClick.add(this.onCustomTouchClick);

     }
        
     private onCustomTouchStart(start: engine.Vector2, last: engine.Vector2, current: engine.Vector2)
     {
        EventManager.emit(EventManager.SwitchView);
     }


}