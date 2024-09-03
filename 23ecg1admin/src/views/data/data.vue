<template>
  <div>

    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">设备编号：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'设备编号'" v-model="listQuery.filter" placeholder="设备编号"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">机构名称：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'机构名称'" v-model="listQuery.filter" placeholder="机构名称"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">患者姓名：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'患者姓名'" v-model="listQuery.filter" placeholder="患者姓名"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">记录时间：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'记录时间'" v-model="listQuery.filter" placeholder="记录时间"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button @click="handleSearch" type="primary" class="pan-btn blue-btn"><i class="el-icon-search"/> 查询</el-button>
                <!--                <el-button type="info" class="pan-btn ash-btn"><i class="el-icon-refresh-right"/> 还原</el-button>-->
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-card class="page-content" :class="userDataView||'dark'">

      <el-table
        v-if="userDataView"
        :data="tableData"
        border
        style="width: 100%;"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <!--            <el-button @click="handleInfo(scope.row)" type="primary">详情</el-button>-->
            <el-button @click="handleDownloadData(scope)" type="">下载</el-button>
            <el-button v-if="scope.row.status===1" @click="handleUpStatus(scope.row,0)" type="danger">冻结</el-button>
            <el-button v-if="scope.row.status===0" @click="handleUpStatus(scope.row,1)" type="warning">解冻</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="dataId"
          label="数据id"
          width="160"
        >
        </el-table-column>

        <el-table-column
          prop="recordTime"
          label="记录开始时间"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="recordLength"
          label="记录时长"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="patientName"
          label="患者"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.patientName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="患者手机"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="age"
          label="年龄"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="deviceNo"
          label="设备编号"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="deviceCate"
          label="设备类型"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.deviceCate | deviceCateName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="state"
          label="使用状态"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.state | stateName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="orgId"
          label="机构"
          width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.orgName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="reportState"
          label="反馈状态"
          width="100"

        >
        </el-table-column>

        <el-table-column
          prop="reportDoctor"
          label="反馈医生"
          width="100"

        >
        </el-table-column>

        <el-table-column
          prop="reportTime"
          label="反馈时间"
          width="140"
        >
        </el-table-column>

        <el-table-column
          prop="reviewState"
          label="审核状态"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="reviewDoctor"
          label="审核人"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="comments"
          label="评论"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="diagnosis"
          label="诊断"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="drug"
          label="药物"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="disease"
          label="疾病"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="uploadUserName"
          label="上传人"
        >
        </el-table-column>

      </el-table>

      <el-row v-else :gutter="20" class="table-list" style="height: 600px">
        <chart ref="child" height="100%" width="100%"/>
      </el-row>
    </el-card>

    <sticky :z-index="10" className="pagination-sticky" style="margin-top: 15px;">
      <pagination
        ref="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </sticky>

    <el-dialog
      :title="userInfoDialogType==='add'?'新增设备':'设备详情'"
      :visible.sync="userInfoDialogVisible"
      width="72%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="设备编号">
          <el-col :span="8">
            <el-input v-model="form.deviceNo"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-col :span="8">
            <el-select v-model="form.deviceCate">
              <el-option value="1" label="一代心电衣"></el-option>
              <el-option value="2" label="三合一"></el-option>
              <el-option value="3" label="单导联"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="机构">
          <el-col :span="8">
            <el-select v-model="form.orgId">
              <el-option v-for="item in orgList" :value="item.id" :label="item.orgName"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="是否使用">
          <el-col :span="8">
            <el-select v-model="form.state">
              <el-option value="0" label="否"></el-option>
              <el-option value="1" label="是"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="设备所在地">
          <el-col :span="8">
            <el-input v-model="form.location"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="自定义序列号">
          <el-col :span="8">
            <el-input v-model="form.label"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import Chart from '@/components/Charts/MixChart'
import { getList } from '@/api/ECG1/data'
import { getList as getOrg } from '@/api/org'

let orgList = []

const defaultForm = {
  deviceCate: '',
  deviceNo: '',
  state: '',
  location: '',
  orgId: '',
  label: '',
}
export default {
  name: 'PatientInfo',
  components: { Pagination, Sticky, Chart },
  filters: {
    orgName(id) {
      console.log(orgList)
      let name = ''
      orgList.forEach((item) => {
        if (item.id.toString() === id) {
          name = item.orgName
        }
      })
      return name
    },
    stateName(state) {
      state = state || '0'
      const statusMap = {
        '1': '是',
        '0': '否',
      }
      return statusMap[state]
    },
    deviceCateName(status) {
      status = status || '1'
      const statusMap = {
        '1': '一代心电衣',
        '2': '三合一',
        '3': '单导联',
      }
      return statusMap[status]
    },
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
      total: 10,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit
      form: Object.assign({}, defaultForm),
      listQuery: {
        page: 1,
        limit: 10,
        orgId: 14
      },
      orgQuery: {
        pageCount: 50,
        pageNum: 1,
        parentOrgId: '',
        status: '2',
        filter: ''
      },
      orgList: [],
      tableData: []
    }
  },
  created() {
  },
  async mounted() {
    await this.getOrg()
    await this.getList()
  },
  methods: {
    handleChangeOrg(value) {
      const row = orgList.find((item) => {
        return item.id.toString() === value
      })
      this.form.orgName = row.orgName
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleInfo(row) {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'edit'
      this.form = deepClone(row)
      console.log(this.form)
      delete this.form.updateTime
      delete this.form.createTime
      delete this.form.doctorSign
      delete this.form.noteCode
      delete this.form.signFile
      // delete this.form.createTime
    },
    handleAddUser() {
      this.form = deepClone(defaultForm)
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.list)
      this.total = data.data.total

    },
    async getOrg() {
      const res = await getOrg(this.orgQuery)
      this.orgList = res.data.records
      if (orgList.length <= 0) {
        orgList = deepClone(res.data.records)
        orgList.unshift({
          id: 0,
          orgName: '无'
        })
      }
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
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
    handleDownloadData({ row }) {
      window.open(row.dataUrl)
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({ title: '患者列表', content: this.$refs[ref].$el.innerHTML }))
      const routeData = this.$router.resolve({ path: '/pdf/download' })
      window.open(routeData.href, '_blank')
    },
    handleDownloadChart() {
      this.$refs.child.exportChart()
    },
  }
}
</script>

<style scoped lang="scss">
.dark {
  background-color: #344b58;

  .toggleView {
    color: #ffffff;
  }
}

.table-list-item-info-btn {
  color: #1890ff;
  cursor: pointer;
}

.table-list-item-info-btn:hover {
  text-decoration: underline;

}

.table-list {
  margin-top: -10px;
  margin-bottom: -10px;
}

.table-list-item {
  height: 168px;
  margin: 10px 0;
}

</style>
