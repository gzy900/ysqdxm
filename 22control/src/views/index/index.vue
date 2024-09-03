<template>
  <div class="body">

    <div class="menu" :class="openMenu?'menu1':''">
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

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"; // 抗锯齿着色器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let width, height
let scene, camera, renderer, controls;
let hero, localPlane, hero1, localPlane1
let box
let bloomComposer  // 组合通道
let mixer
let clock
let finalComposer

// const ENTIRE_SCENE = 0// 全部的，整个的场景
const BLOOM_SCENE = 1; // 光晕场景
const materials = {}
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });// 跟辉光光晕有关的变量
const bloomLayer = new THREE.Layers();// 光晕层次-创建一个图层对象
bloomLayer.set(BLOOM_SCENE);// 先把光晕层次设置光晕场景的层次1
const bloomIgnore = [];// 跟辉光光晕有关的变量

const default_color = []

let heartLine
let heartLinePoints

let bloomPass
const params = {
  exposure: 1,// 暴露
  bloomStrength: 1.5,// 光晕强度
  bloomThreshold: 0,// 光晕阈值
  bloomRadius: 2,// 光晕半径
};

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
    handleCheckArmourModel(name) {
      this.bindModelVis = false
      this.bindModelName = name
      if (name === '战斗模式') {
        hero1.children[48].layers.enable(1)
        hero1.children[111].layers.enable(1)
        hero1.children[48].material.color.set(0xff0000)
        hero1.children[111].material.color.set(0xff0000)
      } else {
        hero1.children[48].material.color.set('#' + 'ffffff')
        hero1.children[111].material.color.set('#' + 'ffffff')
      }
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
    init() {
      this.viewNode = this.$refs.view3d
      clock = new THREE.Clock();
      console.log(clock)
      /**
       * 创建场景对象Scene
       */
      scene = new THREE.Scene();
      this.setBackgroundLine()

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


      // 0x10f4f2
      const gridHelper = new THREE.GridHelper(200, 10, 0x10f4f2, 0x10f4f2);
      console.log(1234)
      gridHelper.position.set(0, -110, 0)
      const gridHelper1 = new THREE.GridHelper(200, 10, 0x10f4f2, 0x10f4f2);
      console.log(1234)
      gridHelper1.position.set(0, -110, -200)
      const gridHelper2 = new THREE.GridHelper(200, 10, 0x10f4f2, 0x10f4f2);
      console.log(1234)
      gridHelper2.position.set(0, -110, 200)
      const gridHelper3 = new THREE.GridHelper(200, 10, 0x10f4f2, 0x10f4f2);
      console.log(1234)
      gridHelper3.position.set(0, -110, -400)
      const gridHelper4 = new THREE.GridHelper(200, 10, 0x10f4f2, 0x10f4f2);
      console.log(1234)
      gridHelper4.position.set(0, -110, 400)
      console.log(gridHelper)
      // scene.add(gridHelper)
      // scene.add(gridHelper1)
      // scene.add(gridHelper2)
      // scene.add(gridHelper3)
      // scene.add(gridHelper4)
      /**
       * 创建渲染器对象
       */
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
      // loaderGLTF.load('/static/model/animation.glb', function(elem) {
      //   console.log(12344444)
      //   console.log(elem)
      //   scene.add(elem.scene)
      // })
      loaderGLTF.load('/static/model/female.glb', (elem) => {
        console.log(12344444)
        const obj = elem
        const objM = obj.scene
        console.log(elem)
        console.log(objM)
        objM.scale.set(120, 120, 120)
        objM.position.set(0, -70, 0)
        scene.add(objM)

        this.setLine(objM.children[0].children[1])
        console.log(555)

        mixer = new THREE.AnimationMixer(objM);
        // 查看动画数据
        console.log(obj.animations)
        // obj.animations[0]：获得剪辑对象clip
        const AnimationAction = mixer.clipAction(obj.animations[0]);
        console.log(AnimationAction)
        // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        AnimationAction.play();//播放动画
      })
      var loader = new FBXLoader();//创建一个FBX加载器
      // loader.load('/static/model/Running.fbx', (obj) => {
      //   obj.position.set(60, -175, -1)
      //   obj.scale.set(15, 15, 15)
      //   scene.add(obj)
      //
      //   mixer = new THREE.AnimationMixer(obj);
      //   // 查看动画数据
      //   console.log(obj.animations)
      //   // obj.animations[0]：获得剪辑对象clip
      //   const AnimationAction = mixer.clipAction(obj.animations[0]);
      //   console.log(AnimationAction)
      //   // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
      //   // AnimationAction.loop = THREE.LoopOnce; //不循环播放
      //   // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
      //   AnimationAction.play();//播放动画
      // })
      loader.load('/static/model/ironman.FBX', (obj) => {
        // 可以在控制台打印obj对象，找到animations属性
        // obj.layers.set()
        console.log('2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b')
        console.log(14222)
        console.log(obj)
        hero = obj
        hero.rotateY(135)
        hero.position.set(0, 50, -1)
        hero.scale.set(14, 14, 14)
        hero.layers.set(0)


        hero1 = obj.clone()
        hero1.layers.enable(0)
        hero1.position.set(0, -110, -1)
        hero1.scale.set(1, 1, 1)

        console.log(hero)
        console.log('-----')
        console.log(hero1)

        renderer.localClippingEnabled = true;
        box = new THREE.Box3().setFromObject(hero)
        // localPlane = new THREE.Plane(new THREE.Vector3(box.max.x, box.max.y, box.max.z), .5);
        localPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), box.max.y + 12);
        localPlane1 = new THREE.Plane(new THREE.Vector3(0, -1, 0), -box.max.y - 12);

        // hero.children.forEach((item, index) => {
        //   if (item.type === 'Mesh') {
        //     default_color[index] = item.material.color.getHexString()
        //     hero1.children[index].material = new THREE.MeshPhongMaterial().copy(item.material);
        //     hero1.children[index].material.needsUpdate = true;
        //     hero1.children[index].material.clippingPlanes = [localPlane1]
        //     item.layers.set(0)
        //     // hero1.children[index].layers.enable(1)
        //
        //     // item.material.clippingPlanes = [localPlane]
        //   }
        // })
        //
        hero.children.forEach((item) => {
          if (item.type === 'Mesh') {
            item.material.color.set('#' + '666666')
          }
        })

        // const eye = hero.children[111].clone()
        // eye.material = new THREE.MeshPhongMaterial().copy(hero.children[111].material)
        // // const eye1=children[111].layers.set(1)
        // eye.layers.set(1)
        // eye.material.color.set(0xff0000)
        // eye.scale.set(1.5, 1.5, 1.5)
        // // eye.position.setY(hero.position.y + eye.position.y)
        // eye.position.setZ(20)
        // eye.position.setX(60)
        // eye.position.setY(60)
        console.log(scene)


        const effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms["resolution"].value.set(
            0.6 / window.innerWidth,
            0.6 / window.innerHeight
        ); // 渲染区域Canvas画布宽高度  不一定是全屏，也可以是区域值
        effectFXAA.renderToScreen = true;

        // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
        const renderScene = new RenderPass(scene, camera)
        // THREE.UnrealBloomPass(resolution, strength, radius, threshold)
        // resolution 泛光效果的解析图。值太低，那么结果的方块会比较严重
        // strength 该属性定义的是泛光效果强度。值越高，明亮区域越明亮。而且渗入较暗区域的也就越多
        // radius 泛光半径
        // threshold 触发泛光亮度
        bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 2, 0, 0);
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;
        bloomPass.renderToScreen = true;

        //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
        bloomComposer = new EffectComposer(renderer)
        bloomComposer.renderToScreen = false;
        bloomComposer.setSize(width, height)
        bloomComposer.addPass(bloomPass)
        bloomComposer.addPass(renderScene)
        bloomComposer.addPass(effectFXAA)
        // 眩光通道bloomPass插入到composer
        bloomComposer.render()

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
              uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture },
              },
              vertexShader: document.getElementById('vertexshader').textContent,
              fragmentShader: document.getElementById('fragmentshader').textContent,
              defines: {},
            }),
            "baseTexture"
        );
        finalPass.needsSwap = true;
        finalComposer = new EffectComposer(renderer);
        finalComposer.addPass(renderScene);
        finalComposer.addPass(finalPass);
        finalComposer.addPass(effectFXAA);
        console.log(111)

        // hero.clippingPlanes = [localPlane];
        // hero.clippingPlanes[0].constant = 0.4

        //48 眼睛，111，胸口

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
        scene.add(hero, hero1)
        // scene.add(eye);
        // controls = new OrbitControls(hero, renderer.domElement);
        // console.log(controls)

        // this.changeBloom()
        this.render()

      })
    },

    setBackgroundLine() {

      var path = "/static/model/";//设置路径
      var directions = ["px", "nx", "py", "ny", "pz", "nz"];//获取对象
      var format = ".jpg";//格式
//创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
      var skyGeometry = new THREE.BoxGeometry(600, 600, 600);
//设置盒子材质
      var materialArray = [];
      for (var i = 0; i < 6; i++) {
        materialArray.push(new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(path + directions[i] + format),//将图片纹理贴上
          side: THREE.BackSide /*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
        }));
      }
      var skyBox = new THREE.Mesh(skyGeometry, materialArray);//创建一个完整的
      // 天空盒，填入几何模型和材质的参数
      scene.add(skyBox);//在场景中加入天空盒
      skyBox.position.set(0, 0, 0)
      console.log(2222)

    },
    setPlane() {
      console.log(122)
      localPlane.constant = box.max.y + 12 - this.planeIndex
      localPlane1.constant = -(box.max.y + 12) + this.planeIndex
      console.log(122)
    },
    setLine(item) {
      var geo = new THREE.WireframeGeometry(item.geometry); // or WireframeGeometry
      var mat = new THREE.LineBasicMaterial({ color: 0x10f4f2, linewidth: 2 });
      mat.clippingPlanes = [localPlane]
      var wireframe = new THREE.LineSegments(geo, mat);
      item.add(wireframe);
    },
    render() {
      if (this.ArmourLoad) {
        hero.rotateY(0.01);
        hero1.rotateY(0.01);
      }
      if (this.planeStatus) {
        this.planeIndex += 1
        this.setPlane(this.planeIndex)
        if (this.planeIndex > (box.max.y + 12) * 2) {
          this.planeStatus = false
          this.bindInfo.push('一切准备就绪！！！')
          this.bindModelVis = true
        }
      }
      if (heartLinePoints.length > 180) {
        heartLinePoints = []
      }

      this.heartLineSet()
      // mixer.update(clock.getDelta());
      // console.log(1)
      //
      // scene.traverse(this.darkenNonBloomed);  //  隐藏不需要辉光的物体
      // console.log(2)
      //
      // bloomComposer.render();
      // console.log(3)
      //
      // scene.traverse(this.restoreMaterial);  //  还原
      //
      // finalComposer.render();

      requestAnimationFrame(this.render);
    },


    darkenNonBloomed(obj) {
      if (obj instanceof THREE.Scene) { // 此处忽略Scene，否则场景背景会被影响
        materials.scene = obj.background;
        obj.background = null;
        return;
      }
      if (
          obj instanceof THREE.Sprite || // 此处忽略Sprite
          bloomIgnore.includes(obj.type) ||
          (obj.isMesh && bloomLayer.test(obj.layers) === false) // 判断与辉光是否同层
      ) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
      }
    },
    restoreMaterial(obj) {
      if (obj instanceof THREE.Scene) {
        obj.background = materials.scene;
        delete materials.scene;
        return;
      }
      if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
    },

    changeBloom() {
      const gui = new GUI();
      gui.add(params, 'exposure', 0.1, 2).onChange(function(value) {
        renderer.toneMappingExposure = Math.pow(value, 4.0);
      });
      gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function(value) {
        bloomPass.threshold = Number(value);
      });
      gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function(value) {
        bloomPass.strength = Number(value);
      });
      gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function(value) {
        bloomPass.radius = Number(value);
      });
    },
    coloring() {
      console.log(default_color)
      console.log('#' + default_color[2])
      hero.children.forEach((item, index) => {
        if (item.type === 'Mesh') {
          item.material.color.set('#' + default_color[index])
        }
      })
      console.log(hero)
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