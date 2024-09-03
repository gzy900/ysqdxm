<template>
  <div id="body" ref="body" class="body">
    <!--    <div class="article-title">-->
    <!--      {{ this.dataObj.title || this.dataObj.essayTitle }}-->
    <!--    </div>-->
    <section class="article-content" ref="content" v-html="content"
    >
      <div class="loading-div"
           v-loading="loading"
      >
      
      </div>
    </section>
    <!--    <div class="article-other">-->
    <!--      <span>{{ this.dataObj.registerTime || this.dataObj.essayRegisterTime }}</span>-->
    <!--      <span>{{ this.dataObj.authors || this.dataObj.essayAuthors }}</span>-->
    <!--    </div>-->
    <div style="position: absolute;top: 0; left: 0;width: 100%;background-color: rgba(0,0,0,.3)" id="bodyMask">
    
    </div>
  </div>

</template>

<script>
  import {isAndroid, isIos} from "../../utils";

  window.imgNum = 0
  window.bodyDiv = null
  window.imgLoad = function () {
    window.imgNum--
    if (window.imgNum <= 0) {
      console.log(document.getElementById('body').clientHeight)
      if (isAndroid()) {
        // window.android.setWebViewHeight(document.getElementById('body').offsetHeight)
      }
      if (isIos()) {
        console.log('Ios')
      }

    }
  };
  import {getList} from "../../api/article-details";

  export default {
    metaInfo() {
      return {
        title: this.title,
      }
    },
    name: "article-details",
    data() {
      return {
        title: '文章详情',
        dataObj: {},
        starRequestUrl: 'famous/selApp_faousDoctorsById',
        medicalRequestUrl: 'ylzx/detWz',
        content: '',
        loading: true
      }
    },
    created() {
      window.bodyDiv = this.$refs.body
      this.init()
    },
    updated() {
      console.log(window.devicePixelRatio)
      console.log(this.$refs.body.clientHeight)
      if (isAndroid()) {
        window.android.setWebViewHeight(this.$refs.body.offsetHeight)
      }
      if (isIos()) {
        console.log('ios')
      }
    },
    methods: {
      init() {
        this.getList()
      },
      async getList() {
        let res
        if (parseInt(this.$route.params.type)) {
          res = await getList({'essayId': this.$route.params.id}, this.medicalRequestUrl)
        } else {
          res = await getList({'id': this.$route.params.id}, this.starRequestUrl)
        }
        const resCode = parseInt(res.code)
        if (resCode === 100) {
          this.dataObj = Object.assign({}, res.data.base)
          let activeContent = this.dataObj.content || this.dataObj.essayContent

          let regex = new RegExp('<img', 'g')
          let result = activeContent.match(regex)
          window.imgNum = !result ? 0 : result.length
          this.content = activeContent.replace(regex, '<img onload="imgLoad(this)"')
        }
        if (resCode === 102) {
          this.dataObj.title = '请求错误'
          this.dataObj.registerTime = '2020-6-19'
          this.dataObj.authors = '移视科技'
          this.content = '十分抱歉，该文章或资源已被删除或下架！'
        }
      }
    },
    watch: {
      '$route'() {
        this.init()
      }
    }
  }
</script>

<style>
  .article-content img {
    width: 100% !important;
    height: auto !important;
    /*margin: .5rem 0;*/
  }
</style>

<style scoped lang="scss">
  .body {
    width: 100%;
    padding: 1rem;
    color: #868686;
  }
  
  .loading-div {
    width: 100%;
    padding: 80px 0;
  }
  
  .article-title {
    width: 100%;
    font-size: .8rem;
    color: #262626;
    font-weight: bold;
    line-height: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  
  .article-content {
    font-size: .7rem;
    overflow: hidden;
    line-height: 1.4rem;
    letter-spacing: 1px;
    /*padding: .5rem 0;*/
    
    //保留换行空格问题
    /*white-space: pre-wrap;*/
    //富文本换行
    word-wrap: break-word;
    table-layout: fixed;
    word-break: break-all;
  }
  
  .article-content > > > img {
    width: 100% !important;
  }
  
  .article-other {
    font-size: .6rem;
    overflow: hidden;
    line-height: .6rem;
    padding: .5rem 0;
    
    span {
      float: right;
      margin-left: .5rem;
    }
  }
</style>
