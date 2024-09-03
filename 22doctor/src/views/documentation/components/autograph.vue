<template>
  <div id="autograph" />
</template>

<script>
import { init, clear, getImageData } from './js/autograph'
import { base64ToFile } from '@/utils'
import { myUploadImage } from '@/api/uploadImg'
import { editData } from '@/api/autograph'
import { mapGetters } from 'vuex'
export default {
  name: 'Autograph',
  data() {
    return {
      fromData: {
        doctor_sign: '',
        doctorId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    init('autograph')
    this.init()
  },
  methods: {
    init() {
      this.$on('clear-rect', () => {
        clear()
      })
      this.$on('get-img', () => {
        myUploadImage(base64ToFile(getImageData()), this.successImg, this.warningImg)
      })
    },
    successImg(res) {
      this.fromData.doctor_sign = res.data
      this.fromData.doctorId = this.userInfo.doctorId

      return new Promise((resolve, reject) => {
        editData(this.fromData)
          .then(response => {
            if (response.data) {
              this.dialogVisible = false
              this.$notify({
                title: '签名上传成功！',
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify({
                title: response.msg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
      // this.$notify({
      //   title: '图片上传成功！',
      //   type: 'success'
      // })
    },
    warningImg(res) {
    }
  }
}
</script>
<style scoped>
  #autograph{
    width: 100%;
    height: 500px;
    border: 1px solid #666666;
  }
</style>
