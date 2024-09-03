<!--
info:用户健康计划
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建套餐</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-input
            clearable
            placeholder="请输入ID/名称">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="套餐ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.taocan_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="160">
        <template slot-scope="scope">
          {{ scope.row.taocan_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图像" width="140">
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
      <el-table-column align="center" label="价格" width="100">
        <template slot-scope="scope">
          {{ scope.row.taocan_price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="H5链接" width="220">
        <template slot-scope="scope">
          {{ scope.row.taocan_url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.taocan_desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <!--          <el-button type="danger" size="small" @click="handleDelete(scope)">停用</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden" />
        <el-form-item label="名称：" prop="taocan_name">
          <el-col :span="10">
            <el-input v-model="fromData.taocan_name" placeholder="请输入名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="H5链接：" prop="taocan_url">
          <el-col :span="10">
            <el-input v-model="fromData.taocan_url" placeholder="请输入H5链接" />
          </el-col>
        </el-form-item>
        <el-form-item label="价格：" prop="taocan_price">
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

        <el-form-item label="图片：" prop="taocan_photo">
          <el-upload
            ref="upload"
            action="*"
            accept="image/png, image/jpg, image/jpeg"
            list-type="picture-card"
            :show-file-list="false"
            :auto-upload="true"
            :multiple="false"
            :http-request="handleBeforeUpload"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
          >
            <img v-if="fromData.taocan_photo" :src="fromData.taocan_photo" class="avatar">
            <i v-else class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip" style="color: black">只能上传1M以内的文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述：">
          <el-input
            v-model="fromData.taocan_desc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入描述"
          />
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
import { getList, editData, addData, deleteData } from '@/api/set-meal'
import { myUploadImage } from '@/api/uploadImg'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  taocan_id: null,
  taocan_name: null,
  taocan_photo: null,
  taocan_price: null,
  taocan_url: null,
  taocan_desc: null
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
      userType: null,
      userTypeOptions: [
        {
          label: '医生',
          value: '0'
        },
        {
          label: '患者',
          value: '1'
        }
      ],
      sex: null,
      sexOptions: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
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
          { min: 2, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        taocan_price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入正确的价格', transform(value) { return parseFloat(value) }, trigger: 'blur' }
        ],
        taocan_photo: [
          { required: true, message: '请为套餐选择一张图片', trigger: 'change' }
        ],
        taocan_url: [
          { required: true, message: '请输入套餐H5链接', trigger: 'blur' },
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
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data
      // this.pageTotal = res.count
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
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 提交
     */
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          if (this.fromData.taocan_id !== '' && this.fromData.taocan_id !== null && this.fromData.taocan_id !== undefined) {
            editData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '修改成功',
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
            delete this.fromData.taocan_id
            addData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
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
          }
        })
      })
    },

    // 上传文件之前的钩子
    handleBeforeUpload(data) {
      if (
        !(
          data.file.type === 'image/png' ||
          data.file.type === 'image/gif' ||
          data.file.type === 'image/jpg' ||
          data.file.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
        return
      }
      myUploadImage(data.file, this.handleSuccess, this.handleError)
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
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
      this.$notify.success({
        title: '通知',
        message:
          '图片上传成功'
      })
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
