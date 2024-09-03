<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="body">
    <div class="container">
      <p>移视科技M.A.I.L.</p>
    </div>
  </div>
</template>

<style scoped>

.body {
  width: 100%;
  height: 100%;
  background-color: #646cff;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #000;
  filter: contrast(30);
  display: flex;
  align-items: center;
  justify-content: center;

  mix-blend-mode: screen;

  /*animation: lysis1 3s infinite alternate;*/

}

.container p {
  /*-webkit-font-smoothing: antialiased;*/
  color: #ffffff;
  /*background-image: linear-gradient(to right, #ffffff, #000000);*/
  /*background-clip: text;*/
  /*color: linear-gradient(to right, red, yellow);*/
  font-size: 60px;
  text-align: center;
  font-weight: bold;
  animation: lysis 3s 1;
  filter: blur(0px);
  letter-spacing: 12px;

  transform: rotate(360deg) translateZ(0);
}

@keyframes lysis {
  from {
    /*letter-spacing: -30px;*/
    filter: blur(24px);
  }
  to {
    /*letter-spacing: 10px;*/
    filter: blur(0px);
  }
}

@keyframes lysis1 {
  from {
    /*letter-spacing: -30px;*/
    filter: contrast(30);

  }
  to {
    /*letter-spacing: 10px;*/
    filter: contrast(0);

  }
}
</style>





