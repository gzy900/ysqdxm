<template>
  <div>
    <el-upload
      ref="upload"
      :action='url+"/action/uploadFile"'
      :headers="{authorization:token,web:'web'}"
      :data="params"
      :multiple="false"
      :name="name"
      :file-list="fileList"
      :on-success="handleUploadSuccess"
      :on-change="handleUploadChange"
      list-type="picture-card"
      :class="{showPush:fileList.length === 1}"
    >
      <i class="el-icon-plus"></i>
      <div style="width:100%;height: 100%;overflow: hidden" slot="file" slot-scope="{file}">
        <img
          v-show="fileType==='img'"
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt="图片加载失败"
        >
        <div
          v-show="fileType==='video'"
          style="width: 100%;height: 100%;background: #c0ccda;display: flex;align-content: center"
        >
          <video @canplay="getDuration" ref="video" width="100%" :src="file.url"></video>
        </div>

        <span class="el-upload-list__item-actions">
          <span
            v-show="fileType==='img'"
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-show="fileType==='video'"
            class="el-upload-list__item-preview"
            @click="handleOpenVideo(file.url)"
          >
            <i class="el-icon-video-play"></i>
          </span>
          <span
            class="el-upload-list__item-preview"
            @click="handleRefresh"
          >
            <i class="el-icon-refresh"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog append-to-body :visible.sync="imgDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog append-to-body :visible.sync="videoDialogVisible">
      <video controls width="100%" :src="dialogVideoUrl" alt=""/>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { deepClone } from "@/utils";

export default {
  name: 'Upload',
  props: {
    file: {
      type: Array,
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    fileType: {
      type: String,
      default: 'img' // img video file
    },
    name: {
      type: String,
      default: 'file'
    }
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API,
      token: getToken(),
      fileList: [],
      dialogImageUrl: '',
      imgDialogVisible: false,
      dialogVideoUrl: '',
      videoDialogVisible: false
    }
  },
  mounted() {
    if (this.file !== null) {
      this.fileList = deepClone(this.file)
    }
  },
  // watch: {
  //   file(val) {
  //     this.fileList = deepClone(val)
  //   }
  // },
  methods: {
    getDuration() {
      if (this.$listeners['getDuration']) {
        this.$emit('getDuration', this.$refs['video'].duration)
      }
    },
    handleUploadChange(file, fileList) {
      console.log(file)
      this.fileList = []
      this.fileList.push(file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRefresh() {
      // this.$refs.upload.clearFiles()
      // this.$refs['upload'][0].$children[0].$refs.input.click()
      this.$refs['upload'].$refs['upload-inner'].handleClick()
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      if (index > -1) {
        this.fileList.splice(index, 1)
      }
      if (this.$listeners['handleRemove']) {
        this.$emit('handleRemove', this.fileList)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handleOpenVideo(url) {
      this.dialogVideoUrl = url
      this.videoDialogVisible = true
    },
    handleDownload(file) {
      window.open(file.url)
    },
    handleUploadSuccess(res, file, fileList) {
      console.log(1234)
      this.fileList = fileList
      if (this.$listeners['handleUploadSuccess']) {
        this.$emit('handleUploadSuccess', this.fileList)
      }
    }
  }
}
</script>

<style lang="scss">
.showPush {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
<style scoped>

</style>
