<template>
  <div style="width: 100%;height: 100%;overflow: hidden">
    <div id="pdf"></div>
  </div>
</template>

<script>
import Pdfh5 from 'pdfh5'

export default {
  name: "index",
  data() {
    return {
      pdfh5: null,
      urlType: 'user',
      url: {
        'user': './static/pdf/user.pdf',
        'doctor': './static/pdf/doctor.pdf',
      }
    }
  },
  mounted() {
    this.urlType = this.$route.params.type
    if (this.urlType !== 'user' && this.urlType !== 'doctor') {
      this.urlType = 'user'
    }

    this.pdfh5 = new Pdfh5("#pdf", {
      pdfurl: this.url[this.urlType]
    });
    //监听完成事件
    this.pdfh5.on("complete", function(status, msg, time) {
      console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
    })
  }
}
</script>

<style scoped>
@import "~pdfh5/css/pdfh5.css";
</style>