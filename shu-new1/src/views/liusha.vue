<template>
  <div ref="body" class="body" @scroll="scroll">
    <div ref="content" class="content">
      <div id="cover" :style="{maskPosition:maskPosition+'% 50%'}"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
// $(window).scroll(function (e) {
//   frames = 17;
//   let step = ($('body').height() - $(window).height()) / frames;
//   let scrollStep = parseInt($(window).scrollTop() / step);
//   let maskPosition = (100 / frames) * scrollStep;
//   $('#cover').css({
//     'mask-position': maskPosition + '% 50%',
//     '-webkit-mask-position': maskPosition + '% 50%'
//   })
// });

let maskPosition = ref(0)

const style = reactive({
  'mask-position': '',
  '-webkit-mask-position': '',
})


const frames = 17
const body = ref(null)
const content = ref(null)
let step = 0
nextTick(() => {
  step = Math.floor((content.value.clientHeight - body.value.clientHeight) / frames)

})

function scroll(e) {
  let scrollStep = Math.floor(e.target.scrollTop / step);
  maskPosition.value = (100 / frames) * scrollStep;
  console.log(maskPosition)
}


</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.content {
  height: 2000px;

}

h1 {
  position: fixed;
  top: 50%;
  left: 50%;
  font-family: sans-serif;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

h1 svg {
  width: 14px;
  display: block;
  margin: 10px auto;
}

h1 svg .arrow {
  -webkit-animation: scroll .35s ease-in alternate infinite;
  animation: scroll .35s ease-in alternate infinite;
}

@-webkit-keyframes scroll {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
}

@keyframes scroll {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
}

#cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/bg.jpg');
  background-repeat: repeat;
  background-size: auto 100%;
  background-position: center;
  mask: url("/video-clip-mask.png?v=1");
  -webkit-mask: url("/video-clip-mask.png?v=1");
  -webkit-mask-size: 1800% 100%;
  mask-size: 1800% 100%;
  pointer-events: none;
}
</style>