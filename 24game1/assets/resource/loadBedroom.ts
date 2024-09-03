import UIProgressBar from '../ui/uikit_progressbar/scripts/UIProgressBar'
import LoadTask from '!!Only Export Engine Module, Cant Use Internal Module：engine/assets/load-task';
import engine from "engine";

@engine.decorators.serialize("loadBedroom")
export default class loadBedroom extends engine.Script {

  @engine.decorators.property({
    type: engine.Transform2D
  })
  public retryBtn: engine.Transform2D

  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public percent: number = 0

  public finishLoading: boolean = false
  public lt: LoadTask<unknown> | undefined
  
  public async onAwake() {
    this.loadBedRoom()
  }

  public loadBedRoom() {
    engine.loader.load('Assets/Scene/Game2D.scene').promise.then((Game2DScene) => {
      const loaderTask = engine.loader.load('Assets/Resources/bedroom/bedroom.scene')

      this.lt = loaderTask

      this.lt.promise.then((bedRoomScene) => {
        engine.game.playScene(bedRoomScene as engine.Scene)
        engine.game.playScene(Game2DScene as engine.Scene)
      }, () => {
        this.retry()
      })
    }, (e) => {
      this.retry()
    })
  }

  public retry() {
    if (this.retryBtn) {
       this.retryBtn.active = true
    }
  }

  public onUpdate(dt) {
    if (this.lt && !this.finishLoading) {
      const p = this.lt.progress
      this.percent = p.current / p.total
      const barComp = this.entity.getComponent<UIProgressBar>(UIProgressBar)
      barComp.value = this.percent
    }
  }
  public onDestroy() {

  }
}
