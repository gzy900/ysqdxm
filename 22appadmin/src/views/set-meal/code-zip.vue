<template>
  <div>
    <el-button
      type="primary"
      @click="down"
    >下载
    </el-button>
    <div class="qrDiv">
      <div
        v-for="item in arr"
        :key="item.code_id"
        :ref="item.code_ccid"
        class="qrCode"
      >
        <p style="text-align: center;">{{ item.code_ccid }}</p>
        <QrcodeVue
          :logoSrc="imageUrl"
          :text="item.code_ccid"
          :logoScale="5"
          :size="200"/>
        <!--        <p style="text-align: center; height: 40px">{{ item.code_ccid }}</p>-->
        <p style="text-align: center;">{{ '脉迩生活年度兑换码' }}</p>

      </div>
    </div>
  </div>
</template>
<script>

import QrcodeVue from 'vue-qr'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

let zipLoading = null
let zipLoadTime = null
export default {
  name: 'qrcode',
  components: {
    QrcodeVue
  },
  props: {
    arr: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      random: '1',
      index: 0,
      imageUrl: require('../../assets/img/logo.png'),
      qrcodeArr: [],
      zipLoadText: '正在打包文件...'
    }
  },
  watch: {
    'fullscreenLoading'(data) {
      if (data) {
        console.log(132)
        zipLoadTime = setInterval(() => {
          zipLoading.setText('正在开小差...')
        }, 1000)
      } else {
        clearInterval(zipLoadTime)
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    down() {
      this.createImg()
    },
    createImg() {
      if (!this.arr) {
        return
      }
      zipLoading = this.$loading({
        lock: true,
        text: this.zipLoadText,
        // spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.fullscreenLoading = true
      setTimeout(() => {
        this.arr.forEach((item, index) => {
          const that = this
          const shareContent = that.$refs[item.code_ccid][0]
          const canvas = document.createElement('canvas')
          const width = 200
          const height = 280
          const scale = 1
          canvas.width = width * scale
          canvas.height = height * scale
          canvas.style.width = (width * scale) / 100 + 'rem'
          canvas.style.height = (width * scale) / 100 + 'rem'
          canvas.getContext('2d').scale(scale, scale)
          const opts = {
            scale: scale,
            canvas: canvas,
            logging: false,
            width: width,
            height: height,
            useCORS: true
          }
          html2canvas(shareContent, opts)
            .then(function (canvas) {
              const qrContentImage = canvas.toDataURL('image/jpeg', 1.0)
              if (that.index <= that.arr.length - 1) {
                that.qrcodeArr.push({
                  url: qrContentImage,
                  name: that.arr[that.index].code_ccid
                })
              }
              if (that.qrcodeArr.length === that.arr.length) {
                that.packageImages()
              }
              that.index++
            })
            .catch(function (reason) {
              console.log(reason)
            })
        })
      }, 1000)
    },
    packageImages() {
      this.$nextTick(() => {
        zipLoading.close()
      })
      this.fullscreenLoading = false
      const that = this
      const zip = new JSZip()
      const cache = {}
      setTimeout(_ => {
        const arr = that.qrcodeArr
        arr.forEach((item, index) => {
          let fileName = item.name
          zip.file(fileName + '.jpg', item.url.substring(22), { base64: true })
          cache[fileName] = item.url
        })
        that.index = 0
        that.qrcodeArr = []
        zip.generateAsync({ type: 'blob' }).then(content => {
          FileSaver.saveAs(content, '二维码.zip')
        })
      }, 0)
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
.qrDiv {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.qrCode {
  width: 200px;
  height: 280px;
  display: inline-block;
  overflow: hidden;
  float: left;

  img {
    display: block;
    width: 100%;
    float: left;
  }

  p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin: 0;
    padding: 0;
    float: left;
  }
}
</style>
