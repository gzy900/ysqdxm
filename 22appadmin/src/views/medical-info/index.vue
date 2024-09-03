<!--
info:医疗资讯
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">

    <!--    轮播图板块-->
    <el-card class="box-card" :body-style='{ padding: 0 }'>
      <div slot="header" class="clearfix">
        <span>医疗咨询轮播图</span>
        <el-switch
          style="float: right; padding: 3px 0"
          v-model="switchImgCard"
          active-color="#13ce66"
          :content="switchImgCard"
          inactive-color="#ff4949">
        </el-switch>
      </div>
      <el-collapse-transition>
        <div v-show="switchImgCard" class="box-card-main">
          <el-row>
            <el-button type="primary" @click="handleAddImg">新增轮播图</el-button>
          </el-row>
          <el-row>
            <el-col>
              <el-carousel :autoplay="false" :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in imgDataList" :key="item.id">
                  <h3 class="medium">
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="item.slideshowImage">
                      <!--                      :preview-src-list="imgDataList"-->
                    </el-image>
                    <div class="imgMask">
                      <p>{{ item.essayTitle }}</p>
                      <div>
                        <i @click="handleDeleteImg(item)" class="el-icon-delete fz-36" />
                        <!--                      <i class="el-icon-search fz-36" />-->
                      </div>
                    </div>
                  </h3>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>

    </el-card>

    <!--    文章板块-->
    <el-card class="box-card mt20" :body-style='{ padding: 0 }'>
      <div slot="header" class="clearfix">
        <span>医疗资讯文章列表</span>
        <el-switch
          style="float: right; padding: 3px 0"
          v-model="switchTxtCard"
          active-color="#13ce66"
          :content="switchTxtCard"
          inactive-color="#ff4949">
        </el-switch>
      </div>
      <el-collapse-transition>
        <div v-show="switchTxtCard" class="box-card-main">
          <el-row>
            <el-col :span="6">
              <el-button type="primary" @click="handleAdd">新建文章</el-button>
            </el-col>
<!--            <el-col :span="18">-->
<!--              <div class="form-search">-->
<!--                <el-input-->
<!--                  clearable-->
<!--                  placeholder="请输入ID/名称">-->
<!--                </el-input>-->
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  @click="handleSearch">搜索-->
<!--                </el-button>-->
<!--              </div>-->
<!--            </el-col>-->
          </el-row>
          <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="ID" width="80">
              <template slot-scope="scope">
                {{ scope.row.essayId }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="标题">
              <template slot-scope="scope">
                {{ scope.row.essayTitle }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="作者">
              <template slot-scope="scope">
                {{ scope.row.essayAuthors }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="封面图" width="120">
              <template slot-scope="scope">
                <el-image
                  style="width: 30px; height: 30px"
                  :src="scope.row.essayImage"
                  :preview-src-list="scope.row.essayImage | photoList">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="120">
              <template slot-scope="scope">
                <el-tag :type="scope.row.essayAudit | stateFilterType">
                  {{ scope.row.essayAudit | stateFilterName}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="发布时间" width="200">
              <template slot-scope="scope">
                {{ scope.row.essayRegisterTime | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="pageTotal > 0"
            :total="pageTotal"
            :page.sync="listQuery.pageNo"
            :limit.sync="listQuery.number"
            @pagination="getList" />
        </div>
      </el-collapse-transition>

    </el-card>

    <!--    新增轮播图弹窗-->
    <el-dialog :visible.sync="imgDialogVisible" :title="'新增图片'">
      <el-form ref="imgFromData" :model="imgFromData" label-width="120px" :rules="imgRules" label-position="right">

        <el-form-item label="选择图片：" prop="photo" disabled>
          <el-upload
            ref="upload"
            action="*"
            accept="image/png, image/jpg, image/jpeg"
            list-type="picture-card"
            :show-file-list="true"
            :file-list="imgList"
            :auto-upload="false"
            :multiple="false"
            :on-remove="handleRemove"
            :on-change="handleChange"
          >
            <i class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip" style="color: black">只能上传1M以内的文件</div>
          </el-upload>
        </el-form-item>


        <el-form-item label="图片跳转文章：" prop="essayTitle">
          <el-col :span="24">
<!--            <el-input v-model="imgFromData.slideshowUrl" placeholder="请输入名称" />-->
            <el-autocomplete
              v-model="imgFromData.essayTitle"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入选择文章标题"
              @select="handleSearchSelectId"
              value-key='essayTitle'
            >
            </el-autocomplete>
          </el-col>
        </el-form-item>

        <el-form-item label="图片跳转链接：" prop="slideshowUrl">
          <el-input v-model="imgFromData.slideshowUrl" disabled />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="imgDialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirmImg('imgFromData')">提交</el-button>
      </div>
    </el-dialog>

    <!--    新增文章弹窗-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">

        <el-form-item label="文章标题：" prop="essayTitle">
          <el-col :span="20">
            <el-input v-model="fromData.essayTitle"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="作者：" prop="essayAuthors">
          <el-col :span="10">
            <el-input v-model="fromData.essayAuthors"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面图：" prop="essayImage">
          <el-col :span="24">
            <el-upload
              ref="upload"
              action="*"
              accept="image/png, image/jpg, image/jpeg"
              list-type="picture-card"
              :show-file-list="true"
              :file-list="imgList"
              :auto-upload="false"
              :multiple="false"
              :on-remove="handleRemove"
              :on-change="handleChange"
            >
              <i class="el-icon-plus" />
              <div slot="tip" class="el-upload__tip" style="color: black">只能上传1M以内的文件</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="文章内容：" prop="essayContent">
          <el-col :span="20">
            <tinymce ref="tinymce" v-model="fromData.essayContent" :height="300" />
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { addImg, getList, getImgList, deleteImg, addData, deleteData, editData, getActiveList } from '@/api/medical-info'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { myUploadImage } from '@/api/uploadImg'
import Tinymce from '@/components/Tinymce'

/**
 * 新增修改提交字段
 *
 essayTitle	是	string	文章标题
 essayAuthors	是	string	文章作者
 essayContent	是	string	文章内容（富文本格式）
 essayImage
 */

const defaultRowTxt = {
  essayTitle: '',
  essayAuthors: '',
  essayContent: '',
  essayImage: ''
}
const defaultRowImg = {
  slideshowImage: '',
  slideshowUrl: '',
  essayId: ''
}
export default {
  filters: {
    photoList(photo) {
      let photoList = []
      photoList.push(photo)
      return photoList
    },
    stateFilterType(status) {
      const statusMap = {
        1: 'success',
        0: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '正常',
        0: '下架'
      }
      return statusMap[status]
    }
  },
  components: { Pagination, Tinymce },
  data() {
    return {
      /**
       * 文章相关
       */
      fromData: Object.assign({}, defaultRowTxt),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      articleDataList: null,
      /**
       * 轮播图相关
       */
      imgFromData: Object.assign({}, defaultRowImg),
      imgDataList: [],
      imgDialogVisible: false,
      imgDialogType: 'new',

      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      imgList: [],
      image: null,
      isImgUpload: true,
      switchTxtCard: true,
      switchImgCard: true,
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 5
      },
      pageTotal: 0,

      /**
       * 表单验证
       */
      imgRules: {
        slideshowImage: [
          { required: true, message: '请选择轮播图', trigger: 'blur' }
        ],
        slideshowUrl: [
          { required: true, message: '请搜索选择文章，生成轮播图跳转链接', trigger: 'blur' }
        ],
        essayTitle: [
          { required: true, message: '请选择标题', trigger: 'change' },
          { min: 1, max: 30, message: '最多输入30个字', trigger: 'change' }
          // { pattern: /[a-zA-z]+:\/\/[^\s]*/, message: '请输入正确的URL', trigger: 'blur' }
        ]
      },
      rules: {
        essayTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 30, message: '最多输入30个字', trigger: 'blur' }
        ],
        essayAuthors: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 10, message: '最多输入10个字', trigger: 'blur' }
        ],
        essayContent: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getList()
    this.getImgList()
    this.getActiveList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.dataList
      this.pageTotal = res.data.count
    },
    async getImgList() {
      const res = await getImgList(this.listQuery)
      this.imgDataList = res.data.dataList
      // this.pageTotal = res.data.totalRecord
    },

    async getActiveList() {
      const res = await getActiveList()
      this.articleDataList = res.data
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageNo = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      if (!!this.$refs['tinymce']) {
        this.$refs['tinymce'].setContent('')
      }
      this.fromData = Object.assign({}, defaultRowTxt)
      this.imgList = []
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },

    /**
     * 打开新增轮播图窗口
     */
    handleAddImg() {
      this.imgList = []
      if (this.imgDataList.length >= 4) {
        this.$message({
          type: 'warning',
          message: '只能上传四张图片!'
        })
        return
      }
      this.imgFromData = Object.assign({}, defaultRowImg)
      this.imageUrl = []
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.imgDialogType = 'new'
      this.imgDialogVisible = true
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.fromData = deepClone(scope.row)

      if (!!this.$refs['tinymce']) {
        this.$refs['tinymce'].setContent(this.fromData.essayContent)
      }

      this.isImgUpload = false
      this.imgList = []
      this.imgList.push({
        'name': this.fromData.essayImage,
        'url': this.fromData.essayImage
      })
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData({ 'essayId': row.essayId })
          this.dataList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 删除轮播图
     */
    handleDeleteImg({ slideshowId }) {
      this.$confirm('确定删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteImg({ 'slideshowId': slideshowId })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImgList()
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 新增轮播图
     */
    handleConfirmImg(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.handleBeforeUpload()
      })
    },
    handleConfirmImgData(formName) {
      return new Promise((resolve, reject) => {
        addImg(this.imgFromData)
          .then(response => {
            this.image = null
            this.imgDialogVisible = false
            this.$notify({
              title: '上传成功',
              type: 'success'
            })
            this.getImgList()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    /**
     * 提交
     */
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.isImgUpload ? this.handleBeforeUpload() : this.handleConfirmData()
      })
    },
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        if (this.dialogType === 'edit') {
          editData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$notify({
                  title: response.msg,
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
        } else {
          addData(this.fromData)
            .then(response => {
              this.dialogVisible = false
              this.image = null
              this.$notify({
                title: response.msg,
                type: 'success'
              })
              this.getList()
              // this.$notify({
              //   title: response.msg,
              //   type: 'error'
              // })
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },

    // 文件状态发生时，添加选择文件时
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.isImgUpload = true
      if (fileList[0].raw === null) {
        this.$notify.error({
          title: '警告',
          message: '请选择一张图片作为头像！'
        })
        return
      }
      if (
        !(
          fileList[0].raw.type === 'image/png' ||
          fileList[0].raw.type === 'image/jpg' ||
          fileList[0].raw.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/jpg, image/jpeg的图片'
        })
        fileList.splice(0, 1)
        this.image = null
        return
      }
      const isLt2M = fileList[0].raw.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        fileList.splice(0, 1)
        this.image = null
        return
      }
      this.image = fileList[0].raw
    },

    // 上传文件之前
    handleBeforeUpload() {
      console.log(this.image)
      if (this.image === null) {
        this.$notify.error({
          title: '警告',
          message: '请选择一张图片！'
        })
        return
      }
      if (
        !(
          this.image.type === 'image/png' ||
          this.image.type === 'image/jpg' ||
          this.image.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/jpg, image/jpeg的图片'
        })
        return
      }
      const isLt2M = this.image.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return
      }
      myUploadImage(this.image, this.handleSuccess, this.handleError)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.image = null
      this.isImgUpload = true
    },
    handleError() {
      this.$notify.warning({
        title: '警告',
        message:
          '图片上传失败'
      })
    },
    handleSuccess(res) {
      if (this.imgDialogVisible) {
        this.imgFromData.slideshowImage = res.data
        this.handleConfirmImgData()
      } else {
        this.fromData.essayImage = res.data
        this.handleConfirmData()
      }
    },
    /**
     * 搜索选择文章
     */
    querySearchAsync(queryString, cb) {
      let restaurants = this.articleDataList
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.essayTitle.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSearchSelectId(item) {
      this.imgFromData.slideshowUrl = 'https://app.maillife.cn/h5/#/article-details/' + item.essayId + '/1'
      this.imgFromData.essayId = item.essayId
      console.log(item.essayId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card-main{
    padding: 20px;
  }
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .medium{
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .medium:hover .imgMask{
    display: flex;
    align-items: start;
    text-align: center;
    flex-direction: column;
  }
  .imgMask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    display: none;
    color: #fff;

    i:hover{
      color: #F56C6C;
    }
    p,div{
      width: 100%;
      height: auto;
      line-height: normal;
    }
    p{
      line-height: 32px;
      background-color: rgba(0,0,0,.4);
      padding: 0;
      margin: 0;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
    }
    div{
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .image-slot i{
    font-size: 18px;
    line-height: 30px
  }

</style>
