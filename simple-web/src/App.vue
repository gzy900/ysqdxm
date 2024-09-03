<!-- App.vue Created by xh on 2017-10-9  -->
<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import 'normalize.css'
import './assets/less/common.less'
import 'amfe-flexible'
// import Tab from './components/tab'

export default {

}

</script>

<style lang="less">
    #app, .container{
        width: 100%;
        height: 100%;
    }
    .container{
        position: absolute;
        left: 0;
        top: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #ecf4ff;
        -webkit-overflow-scrolling: touch;
    }
</style>
