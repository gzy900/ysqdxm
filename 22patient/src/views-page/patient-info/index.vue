<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">患者信息：</p>
              <p class="search-item-input">
                <el-input size="small" clearable :label="'基础信息'" v-model="listQuery.filter"
                          placeholder="姓名/手机号/机构"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary" class="pan-btn blue-btn" @click="handleSearch"><i class="el-icon-search"/> 查询
                </el-button>
                <!--                <el-button type="info" class="pan-btn ash-btn"><i class="el-icon-refresh-right"/> 还原</el-button>-->
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-card class="page-content">
      <div class="page-content-btn">
        <p>
          <!--          <svg-icon icon-class="excel" />-->
          <!--          <svg-icon icon-class="pdf" />-->

          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="component" v-if="userDataView"/>
          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="list" v-else/>
        </p>
        <p>
          <el-button type="info" class="pan-btn ash-btn" @click="handleDownload">
            <svg-icon icon-class="excel"/>
            导出Excel
          </el-button>
          <el-button
            type="info"
            class="pan-btn ash-btn"
            @click="handleDownloadALL"
            v-loading.fullscreen.lock="downLoadLoading">
            <svg-icon icon-class="excel"/>
            导出Excel(全部)
          </el-button>
          <!--          <el-button type="info" class="pan-btn ash-btn" @click="handleDownloadPDF('table')">-->
          <!--            <svg-icon icon-class="pdf"/>-->
          <!--            导出PDF-->
          <!--          </el-button>-->
          <el-button @click="handleAddUser" type="primary" class="pan-btn blue-btn">
            <i class="el-icon-plus"/>
            新增患者
          </el-button>
        </p>
      </div>
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
          width="150"
        >
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope)" type="">详情</el-button>
            <el-button
              v-if="Math.floor(scope.row.frozenStatus)===0"
              @click="handleOpenUserStatus(scope,1)"
              type="danger">冻结
            </el-button>
            <el-button v-else @click="handleOpenUserStatus(scope,0)" type="warning">解冻</el-button>
          </template>
        </el-table-column>


        <el-table-column
          label="用户标签"
          width="200"
        >
          <template slot-scope="scope">
            <!--            <el-tag :type="Math.floor(Math.random()*3)|tagType" closable @close="handleCloseTag">-->
            <!--              {{ Math.floor(Math.random() * 3)| tagName }}-->
            <!--            </el-tag>-->
            <!--            <el-button type="text">-->
            <!--              新增 +-->
            <!--            </el-button>-->

            <el-select v-model="scope.row.tagValue" multiple placeholder="请选择">
              <el-option
                v-for="item in tagOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="账户状态"
          width="80"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.frozenStatus|fitterFrozenStatusType">
              {{ scope.row.frozenStatus| fitterFrozenStatus }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="patientName"
          label="姓名"
          width="150"
        >
        </el-table-column>

        <el-table-column
          prop="patientName"
          label="患者编码"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.id| userCode(orgList,scope.row.orgId) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="gender"
          label="性别"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.gender| genderType }}
          </template>
        </el-table-column>

        <el-table-column
          label="出生日期"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.birthday|parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>

        <el-table-column
          prop="cellphone"
          label="联系方式"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.cellphone| cellphoneList }}

            <el-popover
              v-if="scope.row.cellphone.split(',').length>1"
              placement="bottom"
              width="200"
              trigger="click">
              <span v-for="item in scope.row.cellphone.split(',')">
                {{ item }} <br/>
              </span>
              <span slot="reference" style="cursor: pointer;color: #1890ff">[更多]</span>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          prop="height"
          label="身高(cm)"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="weight"
          label="体重(kg)"
          width="80"
        >
        </el-table-column>

        <el-table-column
          prop="orgName"
          label="机构"
          width="100"
        >
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="手术记录"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.num| numFilterType">-->
        <!--              {{ scope.row.num }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="随访次数"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.num| numFilterType">-->
        <!--              {{ scope.row.num }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="province"-->
        <!--          label="随访需求"-->
        <!--          width="100"-->
        <!--        >-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag :type="scope.row.status| statusFilterType">-->
        <!--              {{ scope.row.status | statusFilterTitle }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          prop="idCard"
          label="身份证号"
        >
        </el-table-column>

        <el-table-column
          label="创建日期"
          width="120px"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime|parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
      </el-table>

      <el-row v-else :gutter="20" class="table-list">
        <el-col :span="6" v-for="(item,index) in tableData" :key="index">
          <el-card class="table-list-item" shadow="hover">
            <el-descriptions class="margin-top" :column="2" size="mini" :colon="true">
              <el-descriptions-item label="姓名" :span="1">{{ item.patientName }}</el-descriptions-item>
              <el-descriptions-item label="性别" :span="1">{{ item.gender| genderType }}</el-descriptions-item>
              <el-descriptions-item label="出生日期" :span="2">{{
                  item.birthday|parseTime('{y}-{m}-{d}')
                }}
              </el-descriptions-item>
              <el-descriptions-item label="联系方式" :span="2">
                {{ item.cellphone }}
                <!--                <el-tag size="small">学校</el-tag>-->
              </el-descriptions-item>
              <el-descriptions-item :span="1" label="身高">{{ item.height }}</el-descriptions-item>
              <el-descriptions-item :span="1" label="体重">{{ item.weight }}</el-descriptions-item>
              <el-descriptions-item :span="2" label="机构">{{ item.orgName }}</el-descriptions-item>
              <el-descriptions-item :span="2" label="身份证号">{{ item.idCard }}</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <sticky :z-index="10" className="pagination-sticky" style="margin-top: 15px;">
      <pagination
        ref="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageCount"
        @pagination="getList"
      />
    </sticky>

    <el-dialog
      title="新增患者"
      :visible.sync="baseinfoDialogVisible"
      width="72%"
    >
      <user-info
        :userInfoDialogType="userInfoDialogType"
        :visible.sync="baseinfoDialogVisible"
        :row="row"
        userInfoLook="user"
        :orgList="orgList"
        @handleRefresh="getList"
      ></user-info>
    </el-dialog>

    <el-dialog
      :title="userInfoDialogType==='add'?'新增患者':'患者详情'"
      :visible.sync="userInfoDialogVisible"
      width="72%"
      top="5vh"
      custom-class="workbench"
    >
      <!--      :destroy-on-close="true"-->

      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 基础信息</span>
          <user-info
            v-if="userInfoDialogVisible"
            :userInfoDialogType="userInfoDialogType"
            userInfoLook="user"
            :visible.sync="userInfoDialogVisible"
            :row="row"
            :orgList="orgList"
            @handleRefresh="getList"
          ></user-info>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 基线数据</span>
          <user-info
            v-if="userInfoDialogVisible"
            :userInfoDialogType="userInfoDialogType"
            :visible.sync="userInfoDialogVisible"
            userInfoLook="base"
            :row="row"
            :orgList="orgList"
            @handleRefresh="getList"
          ></user-info>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 手术信息</span>
          <Operation
            v-if="userInfoDialogVisible"
            :form="'small'"
            :patient-id="row.patientId"
            :patient-name="row.patientName"
            :userInfoDialogType="userInfoDialogType"
          >
          </Operation>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 随访记录</span>
          <visit-list
            v-if="userInfoDialogVisible"
            :form="'small'"
            :patient-id="row.patientId"
            :patient-name="row.patientName"
            :userInfoDialogType="userInfoDialogType"
          >
          </visit-list>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog
      :title="'确认吗?'"
      :visible.sync="userStatusVisible"
      width="400px"
      top="30vh"
    >
      <el-form>
        <el-form-item v-if="userStatus === 1">
          <el-input type="textarea" :rows="3" v-model="userStatusFrom.frozenRemark" placeholder="请输入冻结原因"/>
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button @click="userStatusVisible = false">取消</el-button>
          <el-button @click="handleUpStatus" type="primary">确认{{ userStatus === 1 ? '冻结' : '解冻' }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="seat-100">

    </div>
    <chart/>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import UserInfo from '@/component/UserInfo'
import VisitList from '@/component/Visit/list'
import { parseTime } from '@/utils'
import { getList, upData, upStatus } from '@/api/patient'
import { getList as getOrg } from '@/api/org'
import Operation from '@/component/Operation'
import chart from '@/component/charts'

export default {
  name: 'PatientInfo',
  components: { Pagination, Sticky, UserInfo, VisitList, Operation, chart },
  filters: {
    numFilterType(num) {
      const status = num <= 0 ? '0' : '1'
      const statusMap = {
        '0': 'info',
        '1': ''
      }
      return statusMap[status]
    },
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'info',
        '1': ''
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '近期无随访',
        '1': '近期需随访'
      }
      return statusMap[status]
    },
    genderType(status) {
      status = status || '0'
      const statusMap = {
        '1': '男',
        '0': '女'
      }
      return statusMap[status]
    },
    tagName(status) {
      status = status || 0
      const statusMap = {
        0: '房颤',
        1: '心梗',
        2: '脑梗',
      }
      return statusMap[status]
    },
    tagType(status) {
      status = status || 0
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'warning',
      }
      return statusMap[status]
    },
    fitterFrozenStatus(status) {
      status = status || 0
      const statusMap = {
        0: '正常',
        1: '冻结'
      }
      return statusMap[status]
    },
    fitterFrozenStatusType(status) {
      status = status || 0
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    cellphoneList(phone) {
      const phoneList = phone.split(',')
      return phoneList[0]
    },
    userCode(uid, orgList, orgId) {
      const code = 'NSH'
      let org = ''
      orgList = orgList || []
      orgList.forEach((item) => {
        if (item.orgId === orgId) {
          org = item.id.toString() || ''
        }
      })
      while (org.length < 4) {
        org = '0' + org
      }
      uid = uid.toString() || ''
      while (uid.length < 8) {
        uid = '0' + uid
      }
      const uid1 = uid.substr(0, 4)
      const uid2 = uid.substr(4, 4)
      return code + '-' + org + '-' + uid1 + '-' + uid2
    }
  },
  data() {
    return {
      downLoadLoading: false,
      total: 10,
      userStatus: 0,
      userStatusVisible: false,
      baseinfoDialogVisible: false,
      userDataView: true,
      userInfoDialogVisible: false,
      orgList: [],
      userInfoDialogType: 'add', // add || edit
      userStatusFrom: {
        frozenRemark: '',
        frozenStatus: '',
        patientId: ''
      },
      listQuery: {
        pageNum: 1,
        pageCount: 10,
        filter: '',
        startDate: '',
        endDate: ''
      },
      row: {},
      tableData: [],
      tagOption: [
        {
          label: '房颤',
          value: '房颤',
        },
        {
          label: '心梗',
          value: '心梗',
        },
        {
          label: '脑梗',
          value: '脑梗',
        }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getOrg()
  },
  methods: {
    handleCloseTag(tag, index) {
      console.log(tag)
      console.log(index)
    },
    handleInfo({ row }) {
      this.row = row
      this.userInfoDialogType = 'edit'
      this.userInfoDialogVisible = true
    },
    handleAddUser() {
      this.row = {}
      this.userInfoDialogType = 'add'
      this.baseinfoDialogVisible = true
      // this.userInfoDialogVisible = true
    },
    async getOrg() {
      const data = await getOrg({
        pageNum: 1,
        pageCount: 100,
        status: 2,
        filter: '',
        parentOrgId: ''
      })
      this.orgList = data.data.records
      this.getList()
    },
    handleSearch() {
      console.log(112)
      this.listQuery.pageNum = 1
      this.getList()
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = data.data.records
      this.total = data.data.total
    },
    handleOpenUserStatus({ row }, type) {
      this.userStatus = type
      this.userStatusVisible = true
      this.userStatusFrom.frozenStatus = type
      this.userStatusFrom.patientId = row.patientId
    },
    handleUpStatus() {
      return new Promise((resolve, reject) => {
        upStatus(this.userStatusFrom).then(response => {
          console.log(response)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.userStatusVisible = false
          this.getList()
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({ title: '患者列表', content: this.$refs[ref].$el.innerHTML }))
      const routeData = this.$router.resolve({ path: '/pdf/download' })
      window.open(routeData.href, '_blank')
    },
    async handleDownloadALL() {
      this.downLoadLoading = true
      const data = await getList({
        pageNum: 1,
        pageCount: 1000 * 1000 * 100,
        status: 2,
        filter: '',
        parentOrgId: ''
      })
      const table = data.data.records
      this.handleDownload(table)
      this.downLoadLoading = false
    },
    handleDownload(tableData) {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '性别', '年龄', '身高', '体重', '机构', '身份证号', '联系方式']
        const filterVal = ['patientName', 'gender', 'birthday', 'height', 'weight', 'orgName', 'idCard', 'cellphone']
        let list = []
        if (Object.prototype.toString.call(tableData) === '[object Array]') {
          list = tableData
        } else {
          list = this.tableData
        }
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else if (j === 'gender') {
          if (v[j] === 1) {
            return '男'
          } else if (v[j] === 0) {
            return '女'
          } else {
            return '无'
          }
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.el-tag + .el-button {
  margin-left: 5px;
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
  height: 188px;
  margin: 10px 0;
}
</style>
