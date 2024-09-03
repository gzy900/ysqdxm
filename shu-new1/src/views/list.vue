<script setup>
import { ref } from 'vue'
import textLysis from './textLysis.vue'
import Loading from "./loading.vue";

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="container">
    <div class="item">
      <div class="item-body">
        <textLysis></textLysis>
      </div>
      <p>
        <span>文字溶解</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <Loading></Loading>
      </div>
      <p>
        <span>Loading</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
<!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>button</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
<!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>Tips</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
<!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>error</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
<!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>实时心电图</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
<!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>长时心电图</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>水滴</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>毛玻璃</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>粒子爆炸</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>水纹</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>平滑弧形</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>能量形状</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>3D人物</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>3D人物骨骼运动</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>3D定点碎片控制</span>
      </p>
    </div>
    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>赛博朋克</span>
      </p>
    </div>

    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>火</span>
      </p>
    </div>

    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>图片融合</span>
      </p>
    </div>

    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>光线</span>
      </p>
    </div>

    <div class="item">
      <div class="item-body">
        <!--        <textLysis></textLysis>-->
      </div>
      <p>
        <span>内侧阴影</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #000;
  /*display: flex;*/
  overflow-x: hidden;
  overflow-y: auto;
}

.item {
  width: 20%;
  aspect-ratio: 1/1;
  flex: none;
  float: left;
  position: relative;

  /*border: 1px solid #ffffff;*/
  /*box-shadow: 0 0 5px rgba(255, 255, 255, 1);*/
}

.item-body {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  overflow: hidden;
}

.item p {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  width: 100%;
  padding: 10px;
}

.item p span{
  border-bottom: 3px solid #ffffff;
  display: inline-block;
  width: 100%;
}
</style>
