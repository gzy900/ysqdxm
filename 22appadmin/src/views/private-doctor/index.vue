<!--
info:私人医生
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增医生</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-input
            clearable
            v-model="listQuery.pd_type"
            placeholder="请输入医生科室">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.pd_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生姓名" width="160">
        <template slot-scope="scope">
          {{ scope.row.pd_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="140">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.pd_photo"
            :preview-src-list="scope.row.pd_photo | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="科室" width="100">
        <template slot-scope="scope">
          {{ scope.row.pd_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="职位" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_position }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医院" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_hospital }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="格言" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_dictum }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="擅长领域" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_adept }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="教育背景" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_education }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="点赞数量" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_likeCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="咨询人数" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_advisoryCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.registerTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户状态" width="220">
        <template slot-scope="scope">
          <el-tag :type="scope.row.pd_audit | stateFilterType">
            {{ scope.row.pd_audit | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学术研究/成就" width="220">
        <template slot-scope="scope">
          {{ scope.row.pd_achievement }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList" />

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden" />
        <el-form-item label="医生姓名：" prop="pd_name">
          <el-col :span="10">
            <el-input v-model="fromData.pd_name" placeholder="请输入名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="所属科室：" prop="pd_type">
          <el-col :span="10">
            <el-input v-model="fromData.pd_type" placeholder="请输入所属科室" />
          </el-col>
        </el-form-item>

        <el-form-item label="医生职位：" prop="pd_position">
          <el-col :span="10">
            <el-input v-model="fromData.pd_position" placeholder="请输入医生职位" />
          </el-col>
        </el-form-item>

        <el-form-item label="擅长领域：" prop="pd_adept">
          <el-col :span="10">
            <el-input v-model="fromData.pd_adept" placeholder="请输入擅长领域" />
          </el-col>
        </el-form-item>

        <el-form-item label="教育背景：" prop="pd_education">
          <el-col :span="10">
            <el-input v-model="fromData.pd_education" placeholder="请输入教育背景" />
          </el-col>
        </el-form-item>

        <el-form-item label="所属医院：" prop="pd_hospital">
          <el-col :span="10">
            <el-input v-model="fromData.pd_hospital" placeholder="请输入所属医院" />
          </el-col>
        </el-form-item>

        <el-form-item label="医生头像：" prop="pd_photo">
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

        <el-form-item label="学术研究：" prop="pd_achievement">
          <el-input
            v-model="fromData.pd_achievement"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入学术研究/成就"
          />
        </el-form-item>

        <el-form-item label="格言：" prop="pd_dictum">
          <el-input
            v-model="fromData.pd_dictum"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入格言"
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
import { getList, editData, addData, deleteData } from '@/api/private-doctor'
import { myUploadImage } from '@/api/uploadImg'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {

  // pd_name	String	私人医生姓名
  // pd_photo	String	医生头像
  // pd_type	String	医生所属科室
  // pd_position	String	医生在此科室中的职位
  // pd_hospital	String	所属医院
  // pd_dictum	String	格言
  // pd_adept	String	擅长领域
  // pd_education	String	医疗教育背景
  // pd_achievement	String	学术研究以及成就
  // pd_likeCount	int	点赞数量
  // pd_advisoryCount	int	咨询人数
  // pd_audit	String	0，此医生已被删除，1，正常
  // registerTime   入驻时间
  pd_id: null,
  pd_name: null,
  pd_photo: null,
  pd_type: null,
  pd_position: null,
  pd_hospital: null,
  pd_dictum: null,
  pd_adept: null,
  pd_education: null,
  pd_achievement: null,
  pd_likeCount: null,
  pd_advisoryCount: null,
  pd_audit: null,
  registerTime: null
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
        2: 'danger',
        3: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '已审核',
        2: '未通过',
        3: '未审核'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      imgList: [],
      image: null,
      isImgUpload: true,
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
        number: 10,
        pd_type: null
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        pd_name: [
          { required: true, message: '请输入医生姓名', trigger: 'blur' },
          { min: 1, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        // pd_photo: [
        //   { required: true, message: '请上传医生头像', trigger: 'change' }
        // ],
        pd_type: [
          { required: true, message: '请输入医生所属科室', trigger: 'blur' },
          { max: 10, message: '最多输入10个字', trigger: 'blur' }
        ],
        pd_position: [
          { required: true, message: '请输入医生在此科室中的职位', trigger: 'blur' },
          { max: 10, message: '最多输入10个字', trigger: 'blur' }

        ],
        pd_hospital: [
          { required: true, message: '请输入所属医院', trigger: 'blur' },
          { max: 30, message: '最多输入30个字', trigger: 'blur' }

        ],
        pd_dictum: [
          { required: true, message: '请输入格言', trigger: 'blur' },
          { max: 50, message: '最多输入50个字', trigger: 'blur' }

        ],
        pd_adept: [
          { required: true, message: '请输入擅长领域', trigger: 'blur' },
          { max: 255, message: '最多输入50个字', trigger: 'blur' }

        ],
        pd_education: [
          { required: true, message: '请输入医疗教育背景', trigger: 'blur' },
          { max: 255, message: '最多输入50个字', trigger: 'blur' }

        ],
        pd_achievement: [
          { required: true, message: '请输入学术研究/成就', trigger: 'blur' },
          { max: 255, message: '最多输入50个字', trigger: 'blur' }

        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
    // tableImg(imgList) {
    //   let tableImg
    //   if (Object.prototype.toString.call(o) === '[object Array]'){
    //     for (let img in imgList) {
    //
    //     }
    //   }
    //   return tableImg
    // }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.dataList
      this.pageTotal = res.data.count
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
      this.imgList = []
      this.isImgUpload = true
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
      this.isImgUpload = false
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.fromData = deepClone(scope.row)
      this.opened()
    },
    /**
     * 关闭窗口
     */
    handleDialogClose() {
      this.dialogVisible = false
      this.$refs['fromData'].resetFields()
    },
    opened() {
      // 弹框加载绑定值
      this.imgList = []
      this.imgList.push({
        'name': this.fromData.pd_photo,
        'url': this.fromData.pd_photo
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
          await deleteData({ 'pd_id': row.pd_id })
          this.dataList.splice($index, 1)
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
        this.isImgUpload ? this.handleBeforeUpload() : this.handleConfirmData()
      })
    },
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        if (this.fromData.pd_id !== '' && this.fromData.pd_id !== null && this.fromData.pd_id !== undefined) {
          editData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.image = null
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
          delete this.fromData.pd_id
          delete this.fromData.pd_likeCount
          delete this.fromData.pd_advisoryCount
          delete this.fromData.pd_audit
          addData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.image = null
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
      this.fromData.pd_photo = null
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
      this.fromData.pd_photo = res.data
      this.handleConfirmData()
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
