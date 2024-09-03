<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">医生名称：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'医生名称'" v-model="listQuery.info" placeholder="医生名称"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">账户状态：</p>
              <p class="search-item-input">
                <el-input :label="'账户状态'" v-model="listQuery.info" placeholder="账户状态"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary"><i class="el-icon-search"/> 查询</el-button>
                <el-button type="success" @click="handleAddUser"><i class="el-icon-document-add"/> 新增医生</el-button>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-card class="page-content">
      <el-table
        v-if="userDataView"
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope.row)" type="">详情</el-button>
            <el-button @click="handleChangePhoto(scope)" type="">更换头像</el-button>
            <!--            <el-button v-if="scope.row.status===1" @click="handleUpStatus(scope.row,0)" type="danger">冻结</el-button>-->
            <!--            <el-button v-if="scope.row.status===0" @click="handleUpStatus(scope.row,1)" type="warning">解冻</el-button>-->
          </template>
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="账户状态"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.status| statusFilterType">-->
        <!--              {{ scope.row.status | statusFilterTitle }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          prop="username"
          label="医生名称"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="doctorId"
          label="医生ID"
        >
        </el-table-column>

        <el-table-column
          prop="activeCode"
          label="医生码"
        >
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机"
          width="180"

        >
        </el-table-column>

        <el-table-column
          prop="hospital"
          label="所属医院"
          width="180"

        >
        </el-table-column>

        <el-table-column
          prop="dept"
          label="科室"
          width="180"

        >
        </el-table-column>

        <el-table-column
          prop="title"
          label="职称"
          width="180"

        >
        </el-table-column>

        <el-table-column
          prop="pic"
          label="头像"
          width="180"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px;cursor: pointer"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      ref="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageCount"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="userInfoDialogType==='add'?'新增医生':'医生详情'"
      :visible.sync="userInfoDialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="医生名称" prop="username">
          <el-col :span="8">
            <el-input v-model="form.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-col :span="8">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="8">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <!--        <el-form-item label="账户状态">-->
        <!--          <el-col :span="8">-->
        <!--            <el-select v-model="form.status" placeholder="请选择状态">-->
        <!--              <el-option label="正常" :value="1"></el-option>-->
        <!--              <el-option label="冻结" :value="0"></el-option>-->
        <!--            </el-select>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <el-form-item label="所属医院" prop="hospital">
          <el-col :span="8">
            <el-input v-model="form.hospital"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="科室" prop="dept">
          <el-col :span="8">
            <el-input v-model="form.dept"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-col :span="8">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <!--        <el-form-item label="医生验证码">-->
        <!--          <el-col :span="8">-->
        <!--            <el-input v-model="form.activeCode"></el-input>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="userInfoDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="更换头像"
      :visible.sync="photoDialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="头像">
          <el-col :span="16">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="actionUrl+'/doctor/updPhoto'"
              name="multipartFile"
              :show-file-list="false"
              :headers="headers"
              :data="photoForm"
              :on-success="handlePhotoSuccess"
              :auto-upload="false"
              :on-change="handlePhotoChange">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitPhoto">提交</el-button>
          <el-button @click="photoDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Upload from '@/component/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone, validatePhone } from '@/utils'
import { getList, addData, upData } from '@/api/doctor'
import { getToken } from '@/utils/auth'


const defaultForm = {
  dept: '',
  doctorId: '95f6b364fd4b4d3aaa1cf618b24eb428',
  hospital: '',
  password: '',
  patientList: null,
  phone: '',
  pic: '',
  title: '',
  username: '',
  // activeCode: '',
}
export default {
  name: 'Doctor',
  components: { Pagination, Upload },
  filters: {
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '冻结',
        '1': '正常'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePassword = (rule, value, callback) => {

      const passwordreg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/
      const isValid = passwordreg.test(value)
      if (isValid) {
        callback()
      } else {
        callback(new Error('密码必须包含大小写字母，数字，至少八位!'))
      }
    }
    return {
      actionUrl: process.env.VUE_APP_BASE_API,
      total: 10,
      photoDialogVisible: false,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit
      form: Object.assign({}, defaultForm),
      listQuery: {
        pageCount: 1,
        pageSize: 10,
        parentOrgId: '',
        status: '2',
        filter: ''
      },
      photoForm: {
        doctorId: '',
      },
      headers: {
        Authorization: 'test',
        web: 'web'
      },
      imageUrl: null,
      tableData: [],
      rules: {
        username: [{ required: true, trigger: 'blur', message: '姓名是必须的！' }],
        phone: [
          { required: true, trigger: 'blur', message: '手机号有误，请检查！' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码是必须的' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        dept: [{ required: true, trigger: 'blur', message: '科室有误，请检查！' }],
        hospital: [{ required: true, trigger: 'blur', message: '医院有误，请检查！' }],
        title: [{ required: true, trigger: 'blur', message: '职称有误，请检查！' }],
      },

      // dept: '',
      // doctorId: '95f6b364fd4b4d3aaa1cf618b24eb428',
      // hospital: '',
      // password: '',
      // patientList: null,
      // phone: '',
      // pic: '',
      // title: '',
      // username: '',
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleInfo(row) {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'edit'
      this.form = deepClone(row)
    },
    handleAddUser() {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    async handleUpStatus(row, status) {
      row.status = status
      delete row.updateTime
      delete row.createTime
      await upData(row)
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.userInfoDialogType === 'add') {
            return new Promise((resolve, reject) => {
              addData(this.form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.getList()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              upData(this.form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.getList()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }

        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
        }
      })
    },
    handlePhotoSuccess(file) {
      this.$message({
        message: '提交成功！',
        type: 'success'
      })
      this.photoDialogVisible = false
      this.getList()
    },
    handlePhotoChange(file) {
      console.log(123)
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleSubmitPhoto() {
      this.$refs.upload.submit()
    },
    handleChangePhoto({ row }) {
      this.photoDialogVisible = true
      this.photoForm.doctorId = row.doctorId
    },
    handleUploadSuccess(res) {
      console.log(res)
      this.form.pic = res[0].response.data.data
    },
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
<style scoped lang="scss">
.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader img {
  width: 178px;
  height: auto;
}

</style>
