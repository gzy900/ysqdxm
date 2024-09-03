<template>
  <div class="body">

    <div class="menu" :class="openMenu?'menu1':''" style="display: none">
      <p class="img"></p>
      <div class="menu-item">
        <p class="menu-item-title">
          会员
        </p>
        <p class="menu-item-content">
          <span>
            购买会员
          </span>
        </p>
      </div>
      <div class="menu-item">
        <p class="menu-item-title">
          活动中心
        </p>
        <p class="menu-item-content">
          <span>
            积分兑换
          </span>
          <span>
            其他活动
          </span>
        </p>
      </div>
      <div class="menu-item">
        <p class="menu-item-title">
          个人账户
        </p>
        <p class="menu-item-content">
          <span>
            基础信息
          </span>
          <span>
            紧急联系人
          </span>
        </p>
      </div>
      <div class="menu-item">
        <p class="menu-item-title">
          隐私政策
        </p>
        <p class="menu-item-content">
          <span>
            用户协议
          </span>
          <span>
            隐私协议
          </span>
        </p>
      </div>
    </div>

    <div class="main" :class="openMenu?'main1':''">
      <div ref="view3d" class="view3d"></div>
      <p class="bind" style="top: 50%;left: 0;text-align: left;width: 20%;display: none">
        <span @click="handleTest">测试按钮</span>
      </p>
      <p v-if='bindName' class="bind">
        <span @click="handleOpenBind">{{ bindName }}</span>
        <span @click="handleOpenBindModel">{{ bindModelName + '[切换]' }}</span>
      </p>
      <p v-else style="display: none" class="bind" @click="handleOpenBind"><span class="content">绑定设备</span></p>
      <div v-show="bindVis" class="bindDia">
        <p @click="handleCheckArmour('小龙虾灭绝者')">小龙虾灭绝者</p>
        <p @click="handleCheckArmour('啤酒终结者')">啤酒终结者</p>
      </div>
      <div v-show="bindModelVis" class="bindDia">
        <p @click="handleCheckArmourModel('战斗模式')">战斗模式</p>
        <p @click="handleCheckArmourModel('躺平模式')">躺平模式</p>
      </div>
      <div class="bindInfo" style="display: none;">
        <p v-for="item in bindInfo" :key="item">{{ item }}</p>
      </div>
      <p class="menu-btn" @click="handleOpenMenu">菜单</p>
      <p class="report">前往报告中心>></p>
    </div>


    <div @click="handleCloseMenu" class="menu-close" :class="openMenu?'menu-close-open':''">
      <p class="menu-close-text">
        返回
      </p>
    </div>

  </div>

</template>


<script>
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let width, height
let scene, camera, renderer, controls;
let hero
let mixer
let clock

// const ENTIRE_SCENE = 0// 全部的，整个的场景
const BLOOM_SCENE = 1; // 光晕场景
const bloomLayer = new THREE.Layers();// 光晕层次-创建一个图层对象
bloomLayer.set(BLOOM_SCENE);// 先把光晕层次设置光晕场景的层次1

let heartLine
let heartLinePoints


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
  name: "ThreeIndex",
  data() {
    return {
      openMenu: false,
      viewNode: null,
      bindVis: false,
      bindModelVis: false,
      bindModelName: '',
      bindName: null,
      bindInfo: [],
      bindInfoOption: [
        '正在分析战甲数据。。。',
        '正在封装用户数据包。。。',
        '正在注入用户数据。。。',
        '正在初始化战甲。。。',
      ],
      bindInfoIndex: 0,
      planeIndex: 1,
      planeStatus: false,
      lineIndex: 0,
      ArmourLoad: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleOpenMenu() {
      this.openMenu = true
    },
    handleCloseMenu() {
      this.openMenu = false
    },
    handleOpenBind() {
      this.bindVis = true
    },
    handleOpenBindModel() {
      this.bindModelVis = true
    },
    handleTest() {
      hero.children[111].layers.set(0)
      hero.children[48].layers.set(0)
    },
    handleCheckArmour(name) {
      this.bindVis = false
      this.bindName = name
      // this.coloring()
      this.bindInfo = []
      this.bindInfoIndex = 0

      this.ArmourLoad = true

      // this.planeStatus = true
      window.time = setInterval(() => {
        this.bindInfo.push(this.bindInfoOption[this.bindInfoIndex])
        this.bindInfoIndex++
        if (this.bindInfoIndex >= 4) {
          clearInterval(window.time)
        }
      }, 2000)

      window.lineTime = setInterval(() => {
        this.lineIndex++
        if (this.lineIndex < hero.children.length) {
          this.setLine(hero.children[this.lineIndex])
        } else {
          clearInterval(window.lineTime)
          this.planeStatus = true
        }
      }, 1000 / 10)

    },
    heartLineInit() {
      var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const geometry = new THREE.BufferGeometry()
      heartLinePoints = new Array()
      // heartLinePoints.push(new THREE.Vector3(-90, 50, -50))
      geometry.setFromPoints(heartLinePoints);
      heartLine = new THREE.Line(geometry, lineMaterial);
      scene.add(heartLine)
    },
    heartLineSet() {
      heartLinePoints.push(new THREE.Vector3(-90 + (heartLinePoints.length), random(-10, 10), -50))
      heartLine.geometry.setFromPoints(heartLinePoints)
    },

    setLine(item, obj) {
      const box = new THREE.Box3().setFromObject(obj)
      const localPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), box.max.y + 12);

      var geo = new THREE.WireframeGeometry(item.geometry); // or WireframeGeometry
      var mat = new THREE.LineBasicMaterial({ color: 0x10f4f2, linewidth: 2 });
      mat.clippingPlanes = [localPlane]
      var wireframe = new THREE.LineSegments(geo, mat);
      obj.children[0].add(wireframe);
      console.log(123456)
      console.log(obj)
    },
    init() {
      this.viewNode = this.$refs.view3d
      clock = new THREE.Clock();
      console.log(clock)
      /**
       * 创建场景对象Scene
       */
      scene = new THREE.Scene();

      /**
       * 创建网格模型
       */
      // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
      // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      // var material = new THREE.MeshLambertMaterial({
      //   color: 0x0000ff
      // }); //材质对象Material
      // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      // scene.add(mesh); //网格模型添加到场景中
      /**
       * 光源设置
       */
          // 点光源
      var point = new THREE.PointLight(0x999999);
      point.position.set(0, 180, 200); //点光源位置
      scene.add(point); //点光源添加到场景中  // 点光源
      var point1 = new THREE.PointLight(0x999999);
      point1.position.set(0, 100, -80); //点光源位置
      scene.add(point1); //点光源添加到场景中
      // var point2 = new THREE.PointLight(0x999999);
      // point2.position.set(0, 100, -80); //点光源位置
      // point2.layers.enable(1)
      // scene.add(point2); //点光源添加到场景中
      // var point3 = new THREE.PointLight(0x999999);
      // point3.position.set(0, 100, 100); //点光源位置
      // point3.layers.enable(1)
      // scene.add(point3); //点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0xcccccc);
      scene.add(ambient);
      // console.log(scene)
      // console.log(scene.children)
      /**
       * 相机设置
       */
      width = this.viewNode.clientWidth; //窗口宽度
      height = this.viewNode.clientHeight; //窗口高度
      // var k = width / height; //窗口宽高比
      // var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      // camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
      camera.position.set(0, 0, 450); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)


      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0x111111, 1); //设置背景颜色
      renderer.autoClear = false
      this.viewNode.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数

      // const axisHelper = new THREE.AxesHelper(250);
      // scene.add(axisHelper);


      controls = new OrbitControls(camera, renderer.domElement);
      console.log(controls)

      this.heartLineInit()
      clock = new THREE.Clock();
      console.log(mixer)

      var loaderGLTF = new GLTFLoader();
      loaderGLTF.load('/static/model/shirt.gltf', (elem) => {
        const obj = elem
        const objM = obj.scene
        console.log('闪电')
        console.log(elem)
        console.log(objM)
        objM.scale.set(120, 120, 120)
        objM.position.set(0, -70, 0)
        // objM.children[0].children[1].material.transparent = true
        // objM.children[0].children[1].material.opacity = 1
        // objM.children[0].children[1].material.wireframe = true
        // objM.children[0].children[1].material.clipIntersection = true
        // console.log(objM.children[0].children[1])
        // scene.add(objM)

        console.log(555)

        // mixer = new THREE.AnimationMixer(objM);
        // 查看动画数据
        // console.log(obj.animations)
        // obj.animations[0]：获得剪辑对象clip
        // const AnimationAction = mixer.clipAction(obj.animations[0]);
        // console.log(AnimationAction)
        // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        scene.add(objM)

        this.setLine(objM.children[0].children[1].geometry, objM)

        // AnimationAction.play();//播放动画

      })
      var loader = new FBXLoader();//创建一个FBX加载器
      // const url = '/static/2bgirl/2b.fbx'
      const url = '/static/model/ironman.FBX'
      loader.load(url, (obj) => {
        // 可以在控制台打印obj对象，找到animations属性
        // obj.layers.set()
        console.log('钢铁侠')
        console.log(obj)
        hero = obj
        hero.position.set(0, -100, -1)
        hero.scale.set(1, 1, 1)
        hero.layers.set(0)
        hero.rotateY(5.5)

        // mixer = new THREE.AnimationMixer(hero);
        // // 查看动画数据
        // console.log(hero.animations)
        // // obj.animations[0]：获得剪辑对象clip
        // const AnimationAction = mixer.clipAction(hero.animations[0]);
        // console.log(AnimationAction)
        // // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
        // // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        // AnimationAction.play();//播放动画
        // scene.add(hero)
        this.render()

      })
    },
    render() {
      renderer.render(scene, camera);
      // mixer.update(clock.getDelta());
      requestAnimationFrame(this.render);
    },

  }
}
</script>

<style scoped lang="css">
.body {
  width: 100%;
  height: 100%;
  background: #2c3e50;
  position: relative;
  overflow: hidden;
}

.bind {
  width: 150px;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: calc(40% - 75px);
  left: calc(50% - 75px);
  text-align: center;
  color: #fff;
  border-radius: 5px;
  overflow: hidden;
  /*box-shadow: 0 0 5px #000;*/
}

.bind::before {
  content: ' ';
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  background: red;
  animation: btnBorderRotate 2s infinite linear;
  /*transform: ;*/
  transform-origin: 0 0;
}

@keyframes btnBorderRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.bind .content {
  width: 146px;
  height: 46px;
  top: 2px;
  left: 2px;
  background: #2c3e50;
  display: inline-block;
  position: absolute;
  z-index: 2;
  border-radius: 5px;
}

.bindInfo {
  width: 100%;
  height: auto;
  bottom: 50%;
  right: 0;
  position: absolute;
  color: #ffffff;
  text-align: right;
  pointer-events: none;
}

.bindDia {
  width: 40%;
  height: auto;
  position: absolute;
  top: 10%;
  left: 30%;
  background: #666;
}

.main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1) translateX(0);
  transition-property: transform;
  transition-duration: .3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
}

.main1 {
  transform: scale(.90) translateX(84%);
}

.menu {
  width: 75%;
  height: 94%;
  position: absolute;
  top: 3%;
  left: 3%;
  background: rgba(255, 255, 255, .8);
  border-radius: 8px;

  transform: scale(.85) translateX(-90%);
  transition-property: transform;
  transition-duration: .3s;
  transition-timing-function: ease-out;
  transition-delay: 0s;
}

.menu1 {
  transform: scale(1) translateX(0);

}

.menu-close {
  width: 20%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  color: #ffffff;
}

.menu-close-text {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}

.menu-close-open {
  display: block;
}

.menu .img {
  width: 40%;
  aspect-ratio: 1;
  margin-top: 40px;
  margin-left: 30%;
  border-radius: 50%;
  text-align: center;
  line-height: 1;
  border: 1px solid #42b983;
}

.menu-btn {
  width: auto;
  height: auto;
  position: absolute;
  top: 15px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  color: #ffffff;
}

.bindDia p {
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.view3d {
  width: 100%;
  height: 100%;
}

.menu-item {
  width: 100%;
  text-indent: 40px;
}

.menu-item-title {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  text-indent: 20px;
}

.menu-item-content {
  font-size: 14px;
}

.menu-item-content span {
  width: 100%;
  display: block;
  margin: 5px 0;
}

.report {
  width: 50%;
  text-align: right;
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #ffffff;
}


</style>