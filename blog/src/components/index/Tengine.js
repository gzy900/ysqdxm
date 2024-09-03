import { Fog, Scene, WebGLRenderer, PerspectiveCamera, Vector3, AnimationMixer, Color } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ThreeEngine {
    dom = null; // 挂载的 DOM
    scene = null; // 场景
    renderer = null //渲染器
    camera = null // 相机

    // 构造器函数
    constructor(dom) {
        this.renderer = new WebGLRenderer({
            antialias: true
        })
        dom.appendChild(this.renderer.domElement)
        //初始化渲染器
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        // 初始化场景
        this.scene = new Scene()
        this.scene.background = new Color(0x050505);
        this.scene.fog = new Fog(0x050505, 2, 19);
        //初始化相机
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)
        this.camera.position.set(-11, 5, -17)
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.camera.up = new Vector3(0, 1, 0)
        this.dom = dom

        let orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    addModel(model) {
        if (Object.prototype.toString.call(model) === '[object Array]') {
            model.forEach(elem => {
                this.scene.add(elem)  // 场景添加模型
            })
        } else {
            this.scene.add(model)
        }
    }

}
