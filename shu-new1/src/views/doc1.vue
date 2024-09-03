<script setup>
import { onMounted, ref, render, defineAsyncComponent, defineComponent, h } from "vue"
import { info } from "./doc/info.js"
import docInfo from '../components/docInfo.vue'
import { Search } from "@element-plus/icons-vue";


onMounted(async () => {


})


async function getMusic() {
  return fetch(url).then((r) => r.arrayBuffer())
}

async function decode(buffer) {
  audioContext = new AudioContext({ latencyHint: "balanced" });
  return audioContext.decodeAudioData(buffer)
}


let audioContext
let analyser
const url = 'http://192.168.10.60:8081/daping/public/yzy.wav'

async function handleClickMusic() {
  const buffer = await getMusic()
  console.log(buffer)

  const z = await decode(buffer)

  const source = audioContext.createBufferSource()
  source.buffer = z
  source.connect(audioContext.destination)
  source.start(10)

  console.log(1)

  console.log(z)

  analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  loop()
}

let i = 20

function loop() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(dataArray)
  // analyser.getByteTimeDomainData(dataArray)
  console.log(dataArray)

  if (i > 0) {
    i--
    requestAnimationFrame(loop)
  }
}


let dialogVisible = ref(false)
let dialogVisibleTitle = ref('提示')
let dialogVisibleContent = ref('')
let dataInfo = ref(info)
const infoBody = ref(null)

function handleOpenInfo(item) {
  dialogVisible.value = true
  dialogVisibleTitle.value = item.name
  dialogVisibleContent.value = item.content
}
</script>


<template>
  <div class="container mangping" style="color: #343434">
    <header class="yinying-tu">古诗词学唱宝典</header>
    <div class="container-body">
      <div class="lunbo mt1">
        <p class="lunbo-item">
          <img src="public/2.jpg"/>
        </p>
        <p class="lunbo-item" style="left: -90%">
          <img src="public/1.webp"/>

        </p>
        <p class="lunbo-item" style="left: 100%">
          <img src="public/3.jpg"/>

        </p>
      </div>
      <div class="search">
        <div class="search-type">
          <div>

            <p>古诗</p>
            <p>儿童歌曲</p>
            <p>民谣</p>
            <p>古词</p>
            <p>舞曲</p>
            <p>说唱</p>

          </div>
        </div>
        <div class="search-btn">
          <el-icon>
            <Search/>
          </el-icon>
        </div>
      </div>
      <section class="section">
        <el-row :gutter="20">
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item" @click="handleClickMusic">
              <p>游子吟<span>孟郊</span>
              </p>
              <p>
                <el-icon>
                  <StarFilled/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>木兰诗<span>南北朝-佚名</span>
              </p>
              <p>
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>悯农<span>唐-李绅</span>
              </p>
              <p>
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>咏柳<span>唐-贺知章</span>
              </p>
              <p>
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>七子之歌<span>现代-闻一多</span>
              </p>
              <p>
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>清平乐<span>宋-李清照</span>
              </p>
              <p>
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
          <!--          <el-col :sm="24" :xs="24" :lg="12">-->
          <!--            <div class="section-body-item">-->
          <!--              <p>虞兮叹<span>闻人听書_</span>-->
          <!--              </p>-->
          <!--              <p>-->
          <!--                <el-icon>-->
          <!--                  <Star/>-->
          <!--                </el-icon>-->
          <!--              </p>-->
          <!--            </div>-->
          <!--          </el-col>-->
          <el-col :sm="24" :xs="24" :lg="12">
            <div class="section-body-item">
              <p>浣溪沙<span>宋-李清照</span>
              </p>
              <p>
                <!--                <span>1211</span>-->
                <el-icon>
                  <Star/>
                </el-icon>
              </p>
            </div>
          </el-col>
        </el-row>
      </section>

    </div>
    <div class="foot yinying-tu">
      <p class="yinying-ao">
        <el-icon>
          <HomeFilled/>
        </el-icon>
        <span>主页</span>

      </p>
      <p>

        <el-icon>
          <StarFilled/>
        </el-icon>
        <span>收藏</span>

      </p>
      <p>

        <el-icon>
          <UserFilled/>
        </el-icon>

        <span>我的</span>
      </p>
    </div>
  </div>
</template>

<style scoped>


.section-body-item p {
  display: flex;
  align-items: center;
}

.section-body-item > p > span {
  font-size: .5rem;
  color: #777;
  margin: 0 .3rem;
}


.search {
  display: flex;
  font-size: .7rem;
  align-items: center;
}

.search-type {
  width: calc(100% - 1.5rem);
  flex: auto;
}

.search-btn {
  width: 1.5rem;
  height: 1.5rem;
  flex: none;
  line-height: 1.5rem;
  text-align: center;
  font-size: 1rem;
  background-color: #ebecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -4px -4px 10px #fff, 4px 4px 10px #babecc;
  border-radius: .3rem;

}

.search-type div {
  width: 100%;
  display: flex;
  /*overflow-x: auto;*/
  padding: 1rem 0;
  overflow: hidden;
  margin: 0 -.4rem;
}

.search-type p {
  float: left;
  display: inline-block;
  line-height: 1.5rem;
  height: 1.5rem;
  box-shadow: -4px -4px 10px #fff, 4px 4px 10px #babecc;
  padding: 0 .5rem;
  margin: 0 .4rem;
  flex: none;
  border-radius: .3rem;

}

.mt1 {
  margin-top: 1rem;
}

.lunbo {
  width: 100%;
  height: 140px;
  position: relative;
}

header {
  font-size: .7rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .5rem 0;


  text-shadow: 0px -1px 0px #858585, 0px 1px 5px rgba(3, 3, 3, 0.4), 0px 6px 1px rgba(3, 3, 3, 0.1) /*,0px 0px 5px rgba(0, 0, 0, 0.2)*/, 0px 1px 3px rgba(3, 3, 3, 0.3) /*,0px 3px 5px rgba(0, 0, 0, 0.2)*/, 0px 7px 10px rgba(3, 3, 3, 0.25) /*,0px 15px 10px rgba(0, 0, 0, 0.2)*/, 0px 25px 15px rgba(3, 3, 3, 0.15);
}

.mangping {
  display: flex;
  flex-direction: column;
}

.mangping .section {
  flex: auto;
}

.foot {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: bold;
  flex: none;
  justify-content: space-around;
  padding: .5rem 0;
  height: 3.5rem;

}

.foot p {
  height: 2.5rem;
  width: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mt10 {
  margin-top: .5rem;
}

.yinying-tu {
  box-shadow: -4px -4px 10px #fff, 4px 4px 10px #babecc;


}

.yinying-ao {
  border-radius: .5rem;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;

}

.lunbo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: .3rem;

}

.lunbo-item {
  width: 90%;
  height: 100%;
  line-height: 2rem;
  padding: .5rem;
  font-size: .7rem;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  border-radius: .3rem;
  box-shadow: -4px -4px 10px #fff, 4px 4px 10px #babecc;
  transition: all 0.2s ease-in-out;

  display: flex;
  justify-content: space-between;

  position: absolute;
  left: 5%;
  overflow: hidden;
}

.lunbo-item:hover {
  box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;

}

.lunbo-item:active {
  box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
}

h5 {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}

.container {
  background-color: #ebecf0;
  overflow-x: hidden;
  overflow-y: auto;
}

.section {
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
  border-radius: .5rem;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
}

.container-body {
  padding: 0 1rem;
  flex: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}

.section + .section {
  margin-top: 2rem;
}

.section-body {
  width: 100%;
  height: auto;
}

.section-body-item {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  font-size: .7rem;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  border-radius: .3rem;
  box-shadow: -4px -4px 10px #fff, 4px 4px 10px #babecc;
  transition: all 0.2s ease-in-out;

  display: flex;
  justify-content: space-between;
}

.section-body-item:hover {
  box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
}

.section-body-item:active {
  box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
}

.el-col {
  margin-bottom: 1rem;
}

</style>


<style>

.el-dialog__header {
  padding-top: 10px !important;
}

.el-dialog__headerbtn {
  top: 0;
}

.el-dialog__body {
  padding-top: 10px;
}

.el-overlay-dialog {
  padding: 0 1rem;
}

.el-dialog {
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.el-dialog__header {
  flex: none;
  font-size: .8rem;
  font-weight: bold;
}

.el-dialog__body {
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
}


.doc-Info {

}

.doc-Info p {
  margin-bottom: 1rem;
}

.doc-Info pre {
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
  border-radius: .2rem;
  background-color: #ebecf0;
  height: auto;
  overflow-x: auto;
}

.el-tag + .el-tag {
  margin-left: 1rem;
}

.stress {
  font-weight: bold;
  color: #962832;
}


</style>



























