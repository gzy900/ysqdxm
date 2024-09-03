<template>
  <div class="error404">
    <img :src="imgUrl" @click="urlLoad"/>
    <p>好像出了点错误哦，点击图片刷新试试</p>
  </div>
</template>

<script>


    import {pageLoad} from '../../utils/index'

    export default {
        metaInfo: {
            title: '404'
        },
        name: "error",
        data() {
            return {
                imgUrl: require('../../assets/img/404.png'),
            }
        },
        methods: {
            urlLoad() {
                pageLoad()
            }
        }
    }
</script>

<style scoped lang="scss">
  
  .error404 {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    p {
      font-size: .7rem;
      line-height: 2.6rem;
      color: #888888;
    }
  }
</style>
