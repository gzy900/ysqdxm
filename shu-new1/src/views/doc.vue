<script setup>
import { ref, render, defineAsyncComponent, defineComponent, h } from "vue"
import { info } from "./doc/info.js"
import docInfo from '../components/docInfo.vue'

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
  <div class="container" style="color: #343434">
    <section class="section" v-for="info in dataInfo">
      <h5>{{ info.title }}</h5>
      <el-row :gutter="20">
        <el-col :sm="6" :xs="12" :lg="4" v-for="item in info.children">
          <div class="section-body-item" @click="handleOpenInfo(item)">
            <p>{{ item.name }}
              <!--              <el-icon>-->
              <!--                <StarFilled/>-->
              <!--              </el-icon>-->
            </p>
            <p>
              <el-icon><Select/></el-icon>
              <el-icon>
                <SemiSelect/>
              </el-icon>
              <!--              <el-icon><Comment /></el-icon>-->
            </p>
          </div>
        </el-col>
      </el-row>
    </section>
    <el-dialog
        v-model="dialogVisible"
        :title="dialogVisibleTitle"
        width="100%"
        destroy-on-close
    >
      <!--      v-html="dialogVisibleContent"-->
      <div style="font-size: 14px" class="doc-Info" ref="infoBody">
        <doc-info :info="dialogVisibleContent"></doc-info>

      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

.mt10 {
  margin-top: .5rem;
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
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.section {
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border-radius: .5rem;
  font-family: "Montserrat", sans-serif;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
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
  margin-top: 1rem;
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



























