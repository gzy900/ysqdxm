<!--
info:套餐管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建套餐</el-button>
      </el-col>
<!--      <el-col :span="18">-->
<!--        <div class="form-search">-->
<!--          <el-input-->
<!--            clearable-->
<!--            placeholder="请输入ID/名称">-->
<!--          </el-input>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            @click="handleSearch">搜索-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </el-col>-->
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <!--          <el-button type="danger" size="small" @click="handleDelete(scope)">停用</el-button>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.taocan_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐名称" width="160">
        <template slot-scope="scope">
          {{ scope.row.taocan_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐天数" width="100">
        <template slot-scope="scope">
          {{ scope.row.taocan_days }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="100">
        <template slot-scope="scope">
          {{ scope.row.taocan_price }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.taocan_desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图像" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.taocan_photo"
            :preview-src-list="scope.row.taocan_photo | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="H5链接" width="220">
        <template slot-scope="scope">
          {{ scope.row.taocan_url }}
        </template>
      </el-table-column>

    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"/>

    <el-dialog width="70%" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'" @close="closeDialog">
      <el-form ref="fromData" :model="fromData" label-width="140px" :rules="rules" label-position="right" :disabled="dialogType==='edit'">
        <el-input v-model="fromData.taocan_id" type="hidden" />
        <el-form-item label="套餐名称：" prop="taocan_name">
          <el-col :span="10">
            <el-input v-model="fromData.taocan_name" placeholder="请输入名称" />
          </el-col>
        </el-form-item>
        <el-form-item label="套餐价格：" prop="taocan_price">
          <el-col :span="10">
            <el-input-number
              controls-position="right"
              v-model="fromData.taocan_price"
              :min="0"
              :max="1000000"
              :precision="2"
              :step="10">
            </el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="绑定健康计划：" prop="bigPlanTitle">
          <el-col :span="10">
            <el-autocomplete
              v-model="fromData.bigPlanTitle"
              :fetch-suggestions="querySearchAsync"
              :placeholder="'请搜索选择健康计划'"
              @select="handleSearchSelectId"
              value-key='title'
            >
            </el-autocomplete>
          </el-col>
        </el-form-item>

        <el-form-item label="套餐时常（天）：" prop="taocan_days">
          <el-col :span="10">
            <el-select v-model="fromData.taocan_days" :placeholder="daysType?'请先选择健康计划':'请选择套餐天数'" :disabled="daysType">
              <el-option
                v-for="item in taocanDaysOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="套餐描述：" prop="taocan_desc">
          <el-input
            v-model="fromData.taocan_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入描述"
          />
        </el-form-item>

        <el-form-item label="H5链接：" prop="taocan_url">
          <el-col :span="24">
            <el-input v-model="fromData.taocan_url" placeholder="请输入H5链接" />
          </el-col>
        </el-form-item>

        <el-form-item label="图片：" prop="taocan_photo">
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
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button v-show="dialogType!=='edit'" type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, addData, getBigPlanList } from '@/api/set-meal'
import { myUploadImage } from '@/api/uploadImg'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  taocan_name: null,
  taocan_days: null,
  taocan_price: null,
  taocan_desc: null,
  bigId: null,
  taocan_photo: null,
  taocan_url: null,
  bigPlanTitle: null

}
export default {
  filters: {
    photoList(photo) {
      let photoList = []
      photoList.push(photo)
      return photoList
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      imgList: [],
      image: null,
      isImgUpload: true,
      bigPlanList: [],
      daysType: true,
      audit: null,
      taocanDaysOptions: [
        {
          label: '7',
          value: '7'
        },
        {
          label: '31',
          value: '31'
        },
        {
          label: '93',
          value: '93'
        },
        {
          label: '372',
          value: '372'
        },
      ],
      wTcDaysOptions: [
        {
          label: '7',
          value: '7'
        }
      ],
      mTcDaysOptions: [
        {
          label: '31',
          value: '31'
        },
        {
          label: '93',
          value: '93'
        },
        {
          label: '372',
          value: '372'
        }
      ],
      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10
      },
      pageTotal: 0,

      /**
       * 表单验证
       */
      rules: {
        taocan_name: [
          { required: true, message: '请输入套餐名', trigger: 'blur' },
          { min: 2, max: 20, message: '请输入 2 至 20 个字 ', trigger: 'blur' }

        ],
        taocan_days: [
          { required: true, message: '请输入套餐时常', trigger: 'blur' },
          { type: 'number', message: '请输入正确的数字类型', transform(value) { return parseInt(value) }, trigger: 'blur' }
        ],
        bigPlanTitle: [
          { required: true, message: '请绑定健康计划', trigger: 'change' }
        ],
        taocan_price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入正确的价格', transform(value) { return parseFloat(value) }, trigger: 'blur' }
        ],
        taocan_desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        taocan_url: [
          { max: 50, message: '最多五十个字', trigger: 'blur' }
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
    // Mock: get all routes and roles list from server
    this.getList()
    this.getPlanList()
  },
  watch: {
    'audit'() {
      this.fromData.taocan_days = ''
      if (this.audit === 'M' || this.audit === 'BM') {
        this.daysType = false
        this.taocanDaysOptions = this.mTcDaysOptions
      } else if (this.audit === 'W') {
        this.daysType = false
        this.taocanDaysOptions = this.wTcDaysOptions
      } else {
        this.daysType = true
      }
    }
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data
    },
    async getPlanList() {
      const res = await getBigPlanList()
      this.bigPlanList = res.data
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.isImgUpload = true
      this.imgList = []
      this.fromData = Object.assign({}, defaultRow)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.fromData = deepClone(scope.row)
      this.isImgUpload = false
      this.imgList = []
      this.imgList.push({
        'name': this.fromData.taocan_photo,
        'url': this.fromData.taocan_photo
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
        if (this.image === null || this.isImgUpload === false) {
          this.handleConfirmData()
        } else {
          this.handleBeforeUpload()
        }
      })
    },
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        delete this.fromData.taocan_id
        addData(this.fromData)
          .then(response => {
            if (response.data) {
              this.dialogVisible = false
              this.image = null
              this.$notify({
                title: '添加成功',
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
          message: '请选择一张图片！'
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
      this.fromData.taocan_photo = null
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
      this.fromData.taocan_photo = res.data
      this.handleConfirmData()
    },
    /**
     * 搜索选择
     */
    querySearchAsync(queryString, cb) {
      let restaurants = this.bigPlanList
      queryString = queryString || ''
      let results = restaurants.filter(this.createStateFilter(queryString))

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.title.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSearchSelectId(item) {
      this.audit = item.audit
      this.fromData.bigId = item.bigId
    },
    closeDialog() {
      this.$refs['fromData'].resetFields()
      this.audit = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }

</style>
