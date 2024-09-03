<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="container">
    <div class="ball">

    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #121212;
}

.ball {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  filter: blur(7px) contrast(100);
  background-color: #000;
}

.ball:after {
  content: ' ';
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  animation: rightLeft 3.5s infinite alternate;

}

.ball:before {
  content: ' ';
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-100%, -50%, 0);
  animation: leftRight 3.5s infinite alternate;
}


@keyframes leftRight {
  from {
    transform: translate3d(-100%, -50%, 0)
  }
  to {
    transform: translate3d(50%, -50%, 0)
  }
}

@keyframes rightLeft {
  from {
    transform: translate3d(50%, -50%, 0)
  }
  to {
    transform: translate3d(-100%, -50%, 0)
  }
}
</style>











