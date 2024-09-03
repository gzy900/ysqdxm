<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary" @click="handleAddUser"><i class="el-icon-document-add"/> 新增版本</el-button>
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
            <el-button v-if="scope.row.status===1" @click="handleUpStatus(scope.row,0)" type="danger">停用</el-button>
            <el-button v-if="scope.row.status===0" @click="handleUpStatus(scope.row,1)" type="success">启用</el-button>
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
          prop="appName"
          label="app名称"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.appName | appFilterType">
              {{ scope.row.appName | appFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="portName"
          label="开发端名称"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.portName | portFilterType">
              {{ scope.row.portName | portFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="versionNum"
          label="版本号"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilterType">
              {{ scope.row.status | statusFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="content"
          label="更新内容"
        >
        </el-table-column>

        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180"
        >

          <template slot-scope="scope">
            {{ scope.row.updateTime | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>

        <el-table-column
          prop="url"
          label="跳转链接"
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
      :title="dialogType==='add'?'新增版本':'版本详情'"
      :visible.sync="dialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="app名称">
          <el-col :span="10">
            <el-select v-model="form.appName">
              <el-option label="医生端" :value="1"></el-option>
              <el-option label="患者端" :value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="系统来源">
          <el-col :span="10">
            <el-select v-model="form.portName">
              <el-option label="IOS" :value="1"></el-option>
              <el-option label="安卓" :value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>


        <el-form-item label="状态">
          <el-col :span="10">
            <el-select v-model="form.status">
              <el-option label="停用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="版本号">
          <el-col :span="10">
            <el-input v-model="form.versionNum"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-col :span="10">
            <el-input v-model="form.url"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="更新内容">
          <el-col :span="22">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import { getList, addData, upData } from '@/api/edition'

const form_default = {
  appName: null,
  id: null,
  portName: null,
  versionNum: null,
  content: null,
  status: null,
  url: null
}

export default {
  name: 'Doctor',
  components: { Pagination },
  filters: {
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'warning',
        '1': 'success'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '停用',
        '1': '启用'
      }
      return statusMap[status]
    },
    appFilterType(status) {
      status = status || '0'
      const statusMap = {
        '1': 'success',
        '2': 'primary'
      }
      return statusMap[status]
    },
    appFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '1': '医生端',
        '2': '患者端'
      }
      return statusMap[status]
    },
    portFilterType(status) {
      status = status || '0'
      const statusMap = {
        '1': 'success',
        '2': 'primary'
      }
      return statusMap[status]
    },
    portFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '1': 'IOS',
        '2': '安卓'
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
      form: deepClone(form_default),
      listQuery: {
        pageSize: 1,
        pageNum: 10,
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
      this.form = deepClone(form_default)
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleUpStatus(row, status) {
      this.$confirm('确定' + (status ? '停用' : '启用') + '此版本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = deepClone(row)
        this.form.status = status
        this.dialogType = 'edit'
        this.handleSubmit('yes')
      })
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    handleSubmit(isUpStatus) {
      let valid = false
      if (isUpStatus === 'yes') {
        valid = true
      } else {
        this.$refs['form'].validate((valid1) => {
          valid = valid1
        })
      }
      if (valid) {
        if (this.dialogType === 'add') {
          delete this.form.id
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
              this.dialogVisible = false
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
    },
  }
}
</script>

<style scoped lang="scss">
</style>
