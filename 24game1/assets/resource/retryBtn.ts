
import engine from "engine";
import LoadBedroom from './loadBedroom'

@engine.decorators.serialize("retryBtn")
export default class retryBtn extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  @engine.decorators.property({
    type: LoadBedroom
  })
  public loadingBarComp: LoadBedroom

  public onClick() {
    this.entity.transform2D.active = false
    if (this.loadingBarComp) {
      this.loadingBarComp.loadBedRoom()
    }
  }
  
  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
