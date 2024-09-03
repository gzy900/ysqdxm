<template>
  <div class="three-canvas" ref="TEDom">
  </div>
</template>

<script setup>
import { ThreeEngine } from './index/Tengine.js'
import { ref, onMounted, nextTick } from "vue";
import { loadModel, allHelper } from './index/TbaseObject.js'
import { PointLight, MeshPhysicalMaterial, MeshNormalMaterial, AmbientLight, SpotLight, SRGBColorSpace, RepeatWrapping, AnimationMixer, Clock, Box3, Vector3, Box3Helper, TextureLoader, PlaneGeometry, MeshPhongMaterial, Mesh } from "three"
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

const TEDom = ref(null)
let TE = null
let modelList = null
let mixer
let clock

function initTE() {
  nextTick(() => {
    TE = new ThreeEngine(TEDom.value)
    load()
  })
}

async function load() {
  modelList = await loadModel()
  init()
}


function init() {
  console.log(modelList[0])
  const hero = modelList[0]

  // hero.scene.scale.set(7, 7, 7)

  const box = new Box3().setFromObject(hero.scene)
  const center = new Vector3()
  box.getCenter(center)
  hero.scene.position.copy(center).multiplyScalar(-1)

  hero.scene.position.set(0, -.4, 0)

  hero.scene.traverse((child) => {
    // if (child.isMesh) {
    //   const geometry = child.geometry;
    //   geometry.computeBoundingBox()
    //   let duckBox = geometry.boundingBox;
    //
    //   let boxHelper = new Box3Helper(geometry.boundingBox, 0xffff00);
    //   TE.scene.add(boxHelper);
    //   console.log(duckBox);
    // }

    if (child.name === 'metarig_26') {
      child.position.set(0, 0, -5)
    }

    if (child.isMesh === true) {
      const map = child.material.map
      const material = new MeshPhysicalMaterial({
        map
      })
      child.material = material
    }

    child.castShadow = true
  })


  // hero.scene.geometry.computeBoundingBox()

  // console.log(hero.scene.geometry.boundingBox, 'boundingBox');

  TE.addModel(hero.scene)
  TE.addModel(allHelper)

  mixer = new AnimationMixer(hero.scene)
  const AnimationAction = mixer.clipAction(hero.animations[0])
  clock = new Clock()
  AnimationAction.time = 2; //默认1，可以调节播放速度
  AnimationAction.timeScale = .5; //默认1，可以调节播放速度
  AnimationAction.loop = 10000; //不循环播放
  AnimationAction.play()

  const textureLoader = new TextureLoader();

  const gt = textureLoader.load('/textures/grasslight-big.jpg')
  const gg = new PlaneGeometry(40, 40)
  const gm = new MeshPhongMaterial({ color: 0xffffff, map: gt })

  const ground = new Mesh(gg, gm)
  ground.rotation.x = -Math.PI / 2;
  ground.material.map.repeat.set(8, 8);
  ground.material.map.wrapS = ground.material.map.wrapT = RepeatWrapping;
  ground.material.map.colorSpace = SRGBColorSpace;
  ground.receiveShadow = true;
  TE.scene.add(ground);


  const light1 = new SpotLight(0xffffff, 150)
  light1.position.set(1, 10, 15)
  light1.angle = 0.3
  light1.penumbra = .6

  light1.castShadow = true
  light1.shadow.mapSize.width = 1024
  light1.shadow.mapSize.height = 1024

  TE.scene.add(light1)

  const light2 = new SpotLight(0xffffff, 150)
  light2.position.set(1, 10, 15)
  light2.angle = 0.3
  light2.penumbra = .6

  light2.castShadow = true
  light2.shadow.mapSize.width = 1024
  light2.shadow.mapSize.height = 1024

  TE.scene.add(light2)


  const lf0 = textureLoader.load('/textures/lf0.png')
  const lf3 = textureLoader.load('/textures/lf3.png')

  // addLight(0.55, 0.9, 0.5, 20, 0, 30);
  addLight(0, 0, .95, 0, 5, 20);

  // addLight(0.995, 0.5, 0.9, 50, 50, -10);

  function addLight(h, s, l, x, y, z) {

    const light = new PointLight(0xffffff, 1.5, 2000, .1);
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    TE.scene.add(light);

    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(lf0, 500, 0, light.color));
    lensflare.addElement(new LensflareElement(lf3, 60, 0.4));
    lensflare.addElement(new LensflareElement(lf3, 70, 0.5));
    lensflare.addElement(new LensflareElement(lf3, 120, 0.2));
    lensflare.addElement(new LensflareElement(lf3, 70, 1));
    light.add(lensflare);

  }

  // TE.scene.add(new AmbientLight(0x222222));

  animate()
}


let animate = () => {
  TE.renderer.render(TE.scene, TE.camera)  // 渲染器渲染场景和相机
  mixer.update(clock.getDelta())
  requestAnimationFrame(animate);
}

onMounted(() => {
  initTE()
})

</script>

<style scoped>

.three-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #747bff;
}
</style>
