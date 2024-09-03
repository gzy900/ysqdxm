<template>
  <div id="cloud">

  </div>
</template>

<script setup>

import { onMounted } from "vue";
import { mergeGeometries, mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

defineProps({
  msg: String,
})
import * as THREE from 'three'
import { Detector } from './big/Detector.js'

if (!Detector.webgl) Detector.addGetWebGLMessage();

var container;
var camera, scene, renderer;
var mesh, geometry, material;

var mouseX = 0, mouseY = 0;
var start_time = Date.now();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
const spriteList = []

let mesh1, mesh2, composer, renderPass, afterimage

onMounted(() => {
  init()
})

function init() {

  container = document.createElement('div');
  document.getElementById('cloud').appendChild(container);

  // Bg gradient

  // var canvas = document.createElement('canvas');
  // canvas.width = 32;
  // canvas.height = window.innerHeight;

  // var context = canvas.getContext('2d');


  // var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  // gradient.addColorStop(0, "#1e4877");
  // gradient.addColorStop(0.5, "#111");
  //
  // context.fillStyle = gradient;
  // context.fillRect(0, 0, canvas.width, canvas.height);
  //
  // container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
  // container.style.backgroundSize = '32px 100%';

  //

  camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 6000);
  camera.position.z = 4000;
  camera.position.y = -250;

  scene = new THREE.Scene();

  // geometry = new THREE.BoxGeometry();
  geometry = new THREE.BufferGeometry();

  var texture = new THREE.TextureLoader().load('/public/cloud10.png', animate);
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  // 0x4584b4
  var fog = new THREE.Fog(0x112, -100, 3000);

  material = new THREE.ShaderMaterial({
    uniforms: {
      "map": { type: "t", value: texture },
      "fogColor": { type: "c", value: fog.color },
      "fogNear": { type: "f", value: fog.near },
      "fogFar": { type: "f", value: fog.far },

    },
    // vertexShader: document.getElementById('vs').textContent,
    // fragmentShader: document.getElementById('fs').textContent,
    vertexShader: 'varying vec2 vUv;\n' +
        '\t\t\tvoid main() {\n' +
        '\t\t\t\tvUv = uv;\n' +
        '\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
        '\t\t\t}',
    fragmentShader: '\tuniform sampler2D map;\n' +
        '\t\t\tuniform vec3 fogColor;\n' +
        '\t\t\tuniform float fogNear;\n' +
        '\t\t\tuniform float fogFar;\n' +
        '\t\t\tvarying vec2 vUv;\n' +
        '\t\t\tvoid main() {\n' +
        '\t\t\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n' +
        '\t\t\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n' +
        '\t\t\t\tgl_FragColor = texture2D( map, vUv );\n' +
        '\t\t\t\tgl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );\n' +
        '\t\t\t\tgl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n' +
        '\t\t\t}',
    depthWrite: false,
    depthTest: false,
    transparent: true
  });


  const map = new THREE.TextureLoader().load('/public/bg.png', function () {
    scene.background = 'rgba(0,0,0,1)'
    scene.backgroundIntensity = 1
    scene.backgroundBlurriness = 1
  });

  const planes = []

  for (let i = 0; i < 4000; i++) {
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));
    // var plane = new THREE.PlaneGeometry(64, 64)
    plane.position.x = Math.random() * 4000 - 2000;
    plane.position.y = -Math.random() * Math.random() * 50 - 15;
    plane.position.z = i;
    plane.rotation.z = Math.random() * Math.PI;
    plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
    // planes.push(plane.geometry.clone().applyMatrix4(plane.matrixWorld))
    plane.updateMatrix()
    planes.push(plane.geometry.applyMatrix4(plane.matrix))
  }
  geometry = mergeBufferGeometries(planes)


  for (let i = 0; i < 500; i++) {
    const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
    const particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = .2;
    particlesMaterial.sizeAttenuation = true
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.position.z = Math.random() * 4000
    particles.position.x = Math.random() * 4000 - 2000
    particles.position.y = Math.random() * (-1400) - 1400
    particles.material.color = new THREE.Color('#ff0000')
    particles.layers.set(1)
    scene.add(particles)
    spriteList.push(particles)
  }




  mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);

  mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.z = -4000;
  scene.add(mesh2);


  const count = 50
  // const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);


  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

  composer = new EffectComposer(renderer); // 特效组件

  afterimage = new AfterimagePass();
  composer.addPass(afterimage);
  afterimage.uniforms["damp"].value = 0.95;

  // composer = new EffectComposer(renderer); // 特效组件
  renderPass = new RenderPass(scene, camera);
  // composer.addPass(renderPass)
  composer.addPass(renderPass)
  let afterimagePass2 = new AfterimagePass();
  afterimagePass2.uniforms["damp"].value = .95
  composer.addPass(afterimagePass2);
  const smaaPass = new SMAAPass(window.innerWidth * renderer.getPixelRatio(),
      window.innerHeight * renderer.getPixelRatio());
  composer.addPass(smaaPass);

}

function onDocumentMouseMove(event) {

  mouseX = (event.clientX - windowHalfX) * 0.25;
  mouseY = (event.clientY - windowHalfY) * 0.15;

}

function onWindowResize(event) {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  const position = ((Date.now() - start_time) * 0.06) % 4000;

  // camera.position.x += (mouseX - camera.position.x) * 0.1;
  // camera.position.y += (-980 * 0.15 - camera.position.y - 300) * 0.1;
  // camera.position.z = -position + 4000;
  mesh1.position.z = position;
  mesh2.position.z = position - 4000;
  spriteList.forEach((item) => {
    item.position.y += 3
    if (item.position.y > 200) {
      item.position.y = -1400
    }
  })
  // sprite.position.y -= 10
  // console.log(-position + 4000)


  renderer.clear()
  camera.layers.set(1)
  if (composer) {
    composer.render()
  }

  // 清除深度缓存
  renderer.clearDepth()

  camera.layers.set(0)
  renderer.render(scene, camera);

}


</script>


<style scoped>
#cloud {
  width: 100%;
  height: 100%;
}
</style>