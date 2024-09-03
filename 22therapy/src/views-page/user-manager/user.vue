<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">账户名称：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'账户名称'" v-model="listQuery.info" placeholder="账户名称"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary"><i class="el-icon-search"/> 查询</el-button>
                <el-button type="success" @click="handleAddUser"><i class="el-icon-document-add"/> 新增账户</el-button>
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
            <el-button v-if="scope.row.status===1" @click="handleUpStatus(scope.row,0)" type="danger">冻结</el-button>
            <el-button v-if="scope.row.status===0" @click="handleUpStatus(scope.row,1)" type="warning">解冻</el-button>
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
          prop="userName"
          label="账户名称"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="userId"
          label="账户ID"
        >
        </el-table-column>

        <el-table-column
          prop="cellphone"
          label="手机"
          width="180"
        >
        </el-table-column>
      </el-table>
    </el-card>

    <pagination
      ref="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageCount"
      @pagination="getList"
    />

    <el-dialog
      :title="dialogType==='add'?'新增用户':'用户详情'"
      :visible.sync="dialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="账户名称" prop="userName">
          <el-col :span="8">
            <el-input v-model="form.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-col :span="8">
            <el-input v-model="form.cellphone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="8">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType==='add'" type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
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
import { getList, addData } from '@/api/user'

const default_form = {

  username: '',
  id: '',
  cellphone: '',
  password: '',
}
export default {
  name: 'Doctor',
  components: { Pagination },
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
    return {
      total: 0,
      userDataView: true,
      dialogVisible: false,
      dialogType: 'add', // add || edit
      form: deepClone(default_form),
      listQuery: {
        pageCount: 10,
        pageNum: 1,
        parentOrgId: '',
        userName: '2',
        cellphone: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', message: '姓名是必须的！' }],
        cellphone: [{ required: true, trigger: 'blur', message: '手机号有误，请检查！' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码有误，请检查！' },
          { min: 6, trigger: 'blur', message: '密码最少六位！' }
        ]
      },
      tableData: []
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleInfo(row) {
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.form = deepClone(row)
    },
    handleAddUser() {
      this.form = deepClone(default_form)
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            return new Promise((resolve, reject) => {
              addData(this.form).then(response => {
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.dialogVisible = false
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
  }
}
</script>

<style scoped lang="scss">
</style>
