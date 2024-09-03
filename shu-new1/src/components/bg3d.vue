<script setup>
import { onMounted, ref } from "vue";
import * as THREE from 'three'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { mergeBufferGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { vs, fs } from './bg3d/shader.js'


let scene, camera, renderer, controls
let composer, afterimage, renderPass
let spriteList
let cloud1, cloud2
const bgDom = ref(null)

function init() {
  scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera(50, 1, 0.1, 3000);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 3000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false
  bgDom.value.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);


  const geometry = new THREE.BoxGeometry(1300, 209, 250);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  material.transparent = true
  material.opacity = 0
  const cube = new THREE.Mesh(geometry, material);
  console.log(cube)
  // cube.material.wireframe = true
  scene.add(cube);

  camera.position.z = 350;

  initPass()
  // createPlane()
  createCloud()
}

function initPass() {
  composer = new EffectComposer(renderer); // 特效组件

  // afterimage = new AfterimagePass();
  // composer.addPass(afterimage);
  // afterimage.uniforms["damp"].value = 0.95;

  // composer = new EffectComposer(renderer); // 特效组件
  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass)
  let afterimagePass2 = new AfterimagePass();
  afterimagePass2.uniforms["damp"].value = .95
  composer.addPass(afterimagePass2);
  const smaaPass = new SMAAPass(window.innerWidth * renderer.getPixelRatio(),
      window.innerHeight * renderer.getPixelRatio());
  composer.addPass(smaaPass);
}

function createSpirit() {
  spriteList = []
  for (let i = 0; i < 200; i++) {
    const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
    const particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = .2;
    particlesMaterial.sizeAttenuation = true
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.speed = Math.random() * .5 + .5
    particles.position.z = Math.random() * 3300 - 3000
    particles.position.x = Math.random() * 1300 - 460
    particles.position.y = -109
    particles.material.color = new THREE.Color('#ff0000')
    // particles.layers.enable(1)
    scene.add(particles)
    spriteList.push(particles)
  }
}


function createPlane() {
  const texture = new THREE.TextureLoader().load('/public/ground.png', () => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    const normal = new THREE.Vector3(0, 1, 0)
    const geometry = new THREE.PlaneGeometry(3000, 3000)

    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, })
    const plane = new THREE.Mesh(geometry, material)
    plane.material.map.repeat.set(
        5, 5
    )

    plane.rotation.set(-0.5 * Math.PI, 0, 0)
    plane.position.set(0, -109, -1300)
    scene.add(plane)
  })
}

function createCloud() {
  const texture = new THREE.TextureLoader().load('/public/cloud10.png', () => {
    texture.magFilter = THREE.LinearMipMapLinearFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter

    // 0x4584b4
    const fog = new THREE.Fog(0x112, -100, 3000)

    let material = new THREE.ShaderMaterial({
      uniforms: {
        "map": { type: "t", value: texture },
        "fogColor": { type: "c", value: fog.color },
        "fogNear": { type: "f", value: fog.near },
        "fogFar": { type: "f", value: fog.far },
      },
      vertexShader: vs,
      fragmentShader: fs,
      depthWrite: true,
      depthTest: true,
      transparent: true
    });


    const planes = []

    for (let i = 0; i < 2500; i++) {
      let plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), material);
      plane.position.x = Math.random() * 3000 - 1500;
      plane.position.y = 109;
      plane.position.z = i * 2 - (2500 * 2) + 300;
      plane.rotation.z = Math.random() * Math.PI;
      plane.scale.x = plane.scale.y = Math.random() * Math.random() * .5 + 0.5;

      plane.updateMatrix()
      planes.push(plane.geometry.applyMatrix4(plane.matrix))

      // scene.add(plane);

    }
    let cloud = mergeBufferGeometries(planes)

    cloud1 = new THREE.Mesh(cloud, material);
    scene.add(cloud1);

    cloud2 = new THREE.Mesh(cloud, material);
    cloud2.position.z = -2200;
    // scene.add(cloud2);

    createSpirit()

    animate()

  });

}


function animate() {
  requestAnimationFrame(animate)

  for (let i = 0; i < spriteList.length; i++) {
    spriteList[i].position.y += spriteList[i].speed
    if (spriteList[i].position.y > 109 + 200) {
      spriteList[i].position.y = -109
    }
  }

  // cloud1.position.z += 1

  renderer.clear()
  // camera.layers.set(1)
  if (composer) {
    composer.render()
  }

  // 清除深度缓存
  // renderer.clearDepth()
  //
  // camera.layers.set(0)
  // renderer.render(scene, camera);
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="bgDom" ref="bgDom"></div>
</template>

<style scoped>
.bgDom {
  background: #000000;
}
</style>