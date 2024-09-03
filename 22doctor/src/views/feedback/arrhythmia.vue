<!--
info: 心率失常
author:wanq
time:2020-08-23 14:27:51
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="getList">刷新列表</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-autocomplete
            v-model="listQuery.organization_name"
            clearable
            :fetch-suggestions="organizationQuerySearchAsync"
            :debounce="0"
            placeholder="请输入选择机构"
            value-key="organization_name"
            @select="organizationHandleSearchSelectIdListQuery"
            @input="organizationHandleChangeListQuery"
          />
          <el-select
            v-if="userInfo.rank === '0'"
            v-model="listQueryAdmin.feedback_state"
            clearable
            placeholder="请选择反馈状态"
            @change="handleState"
          >
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-select
            v-if="userInfo.rank !== '0'"
            v-model="queryState"
            clearable
            placeholder="请选择剩余反馈时间"
            @change="handleQueryState"
          >
            <el-option
              v-for="item in setTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-select
            v-if="userInfo.rank !== '0'"
            v-model="listQueryState"
            clearable
            placeholder="请选择反馈状态"
            multiple
            collapse-tags
            @change="handleState"
          >
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-date-picker
            ref="queryDate"
            v-model="queryDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            @change="handleQueryTime"
          />

          <el-button
            type="primary"
            @click="handleSearch"
          >
            搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>

      <el-table-column align="center" label="操作" width="360">
        <template slot-scope="scope">
          <el-button v-if="verifyPower(scope,'fk')" type="success" size="small" @click="getLockInfo(scope,'add')">反馈</el-button>
          <el-button v-if="verifyPower(scope,'xg')" type="warning" size="small" @click="getLockInfo(scope,'edit')">修改反馈</el-button>
          <el-button v-if="verifyPower(scope,'ck')" type="primary" size="small" @click="handleSee(scope)">查看</el-button>
          <!--                2023-5-16 因去掉毛总报告时，删除此功能-->
          <!--          <el-button size="small" @click="handleSeeReport(scope)">智能报告</el-button>-->
          <el-button v-if="scope.row.flag === '1'||scope.row.flag === '5'" size="small" @click="handleSeeReportAI(scope)">移视AI报告</el-button>
          <el-button v-if="verifyPower(scope,'js')" type="info" size="small" @click="handleUnlock(scope)">解锁</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.feedback_state | fstateFilterType">
            {{ scope.row.feedback_state | fstateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="剩余时间" width="90">
        <template slot-scope="scope">
          <el-tag v-if="parseInt(scope.row.feedback_state) !== 1" :type="scope.row.endTime || scope.row.releasetime | surplusType">
            {{ scope.row.endTime || scope.row.releasetime | surplusTime }}
          </el-tag>
          <el-tag v-else type="info">
            已反馈
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="锁定状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.lock_state | lockStateFilterType">
            {{ scope.row.lock_state | lockStateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="锁定医生" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.lock_state === '0'">
            {{ scope.row.lock_doctor_name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.normal_state | fstateFilterNormalState">
            {{ scope.row.normal_state | fstateFilterNormalName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="QTC" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.QTC | filterQTC">
            {{ scope.row.QTC }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="QRS" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.QRS | filterQRS">
            {{ scope.row.QRS }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="平均心率" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.heart_rate_avg | filterHR">
            {{ scope.row.heart_rate_avg }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="测量时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.endTime || scope.row.releasetime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getUserName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getRealName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="机构" width="120">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getOrganization }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户手机" width="120">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getUserPhone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据来源" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.state | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-if="userInfo.rank ==='0'"
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQueryAdmin.pageNo"
      :limit.sync="listQueryAdmin.number"
      @pagination="getList"
    />

    <Pagination
      v-if="userInfo.rank !=='0'"
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      :refresh="true"
      @pagination="getList"
    />

    <!--    //心电信息查看-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true" custom-class="chart-dialog" @close="closeDialog">
      <el-row :getter="20">
        <el-col :span="16">
          <el-tabs v-if="dialogVisible" type="border-card" @tab-click="resizeChart">
            <el-tab-pane label="当前数据" :lazy="true">
              <heart-chart v-if="chartType==='当前数据'" :heart-id="row.heart_id" :report-url="report_url" :sub-title="subTitle" @appendImg="appendImg"/>
              <div style="height: calc( 100% - 300px )">
                <iframe name="ifd" width="100%" height="100%" style="border: 0" :src="report_url"/>
              </div>
              <!--              <arrhythmia-chart ref="arrhythmia-chart" v-if="dialogVisible" width="100%" height="340px" :row="row" :isImport="fromData.isImport" @appendImg="appendImg"/>-->
            </el-tab-pane>
            <el-tab-pane label="历史数据" :lazy="true">
              <arrhythmia-history v-if="chartType==='历史数据'" ref="arrhythmia-history" width="100%" height="340px" :row="row" @appendImg="appendImg"/>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="8">
          <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right" :disabled="dialogDisabled">

            <el-form-item v-if="srcList.length > 0" label="判读依据：">
              <div v-for="(item, index) in srcList" class="src-div">
                <el-image
                  slot="reference"
                  style="width: 100px; height: 100px"
                  :preview-src-list="srcList"
                  class="basis-img"
                  :src="item"
                  :z-index="4000"
                  @click="popDisplay=false"
                />
                <p class="src-see"><i class="el-icon-search"/></p>
                <p class="src-del" @click="delImg(index)"><i class="el-icon-close"/></p>
              </div>
            </el-form-item>

            <el-form-item label="反馈建议：" prop="username">
              <el-input
                v-model="fromData.explain"
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="请输入反馈建议或者点击标签快速回复！"
              />
            </el-form-item>

          </el-form>

          <div class="el-tag-div">
            <tag v-if="dialogVisible" :type="type" :is-import="fromData.isImport" @appendTag="appendTag"/>
          </div>
          <div style="text-align: left;margin-left: 120px">
            <el-button
              type="primary"
              :disabled="!lock || dialogDisabled"
              @click="handleConfirmData('fromData')"
            >
              提交
            </el-button>

            <el-button type="danger" @click="dialogVisible=false">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { deepClone, base64ToFile, parseTime } from '@/utils'
import { getList, getDanDaoById, getAdminList, getLockInfo, unLock, getDandaoAIReport } from '@/api/arrhythmia'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Tag from '@/components/tag'
import heartChart from '@/components/heart-chart'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination
import { myUploadImage } from '@/api/uploadImg'
import { addFeedback, getInfo, editFeedback } from '@/api/feedback'
import arrhythmiaHistory from './charts/arrhythmia-history'
import { getList as getOrganizationList } from '@/api/organization'

/**
 * 新增修改提交字段
 * a
 */
const defaultRow = {
  doctorId: '',
  checkId: '',
  patientId: '',
  privateId: '',
  type: 1,
  explain: '',
  url: '',
  isImport: '',
  feedback_time: ''
}

export default {
  filters: {
    stateFilterName(status) {
      const statusMap = {
        1: '健康计划',
        2: '日常监测'
      }
      return statusMap[status]
    },
    lockStateFilterName(status) {
      const statusMap = {
        0: '已锁定',
        1: '未锁定'
      }
      return statusMap[status] || '未锁定'
    },
    lockStateFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'success'
      }
      return statusMap[status] || 'success'
    },
    getUserName(usersBase) {
      return usersBase ? JSON.parse(usersBase)['username'] : ''
    },
    getRealName(usersBase) {
      return usersBase ? JSON.parse(usersBase)['realname'] : ''
    },
    getUserPhone(usersBase) {
      return usersBase ? JSON.parse(usersBase)['phone'] : ''
    },
    getOrganization(usersBase) {
      return usersBase ? JSON.parse(usersBase)['organization_name'] : ''
    },
    surplusTime(time) {
      const surplusTime = new Date().getTime() - new Date(time).getTime()
      const hh = 1000 * 60 * 60
      let surplusTxt = ''

      if (surplusTime / hh > 24) {
        surplusTxt = '已超时'
      }
      if (surplusTime / hh <= 24 && surplusTime / hh > 23) {
        surplusTxt = Math.floor((24 - surplusTime / hh) * 60) + '分钟'
      }
      if (surplusTime / hh <= 23) {
        surplusTxt = (24 - Math.ceil(surplusTime / hh)) + '小时'
      }
      return surplusTxt
    },
    surplusType(time) {
      const surplusTime = new Date().getTime() - new Date(time).getTime()
      const hh = 1000 * 60 * 60
      let surplusType = ''

      if (surplusTime / hh > 24) {
        surplusType = 0
      }
      if (surplusTime / hh <= 24 && surplusTime / hh > 22) {
        surplusType = 2
      }
      if (surplusTime / hh <= 22) {
        surplusType = 1
      }
      const statusMap = {
        0: 'danger',
        1: '',
        2: 'warning'
      }

      return statusMap[surplusType]
    },
    stateFilterType(status) {
      const statusMap = {
        1: 'info',
        2: ''
      }
      return statusMap[status]
    },
    fstateFilterName(status) {
      const statusMap = {
        0: '未反馈',
        1: '反馈成功',
        2: '反馈失败',
        3: '反馈审核中'
      }
      return statusMap[status]
    },
    fstateFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'danger',
        3: 'info'
      }
      return statusMap[status]
    },
    fstateFilterNormalName(status) {
      const state = status || 0
      const statusMap = {
        0: '正常',
        1: '异常',
        2: '噪音'
      }
      return statusMap[state] || '正常1'
    },
    fstateFilterNormalState(status) {
      const state = status || 0
      const statusMap = {
        0: 'success',
        1: 'warning',
        2: 'info'
      }
      return statusMap[state] || 'success'
    },
    filterQTC(num) {
      let state = 0
      num = parseFloat(num)
      const statusMap = {
        0: 'warning',
        1: 'success'
      }
      if (isNaN(num)) {
        state = 0
      } else if (num > 0) {
        state = 1
      } else {
        state = 0
      }
      return statusMap[state]
    },
    filterQRS(num) {
      let state = 0
      num = parseFloat(num)
      const statusMap = {
        0: 'warning',
        1: 'success'
      }
      if (isNaN(num)) {
        state = 0
      } else if (num > 0) {
        state = 1
      } else {
        state = 0
      }
      return statusMap[state]
    },
    filterHR(num) {
      let state = 0
      num = parseFloat(num)
      const statusMap = {
        0: 'warning',
        1: 'success'
      }
      if (isNaN(num)) {
        state = 0
      } else if (num > 0) {
        state = 1
      } else {
        state = 0
      }
      return statusMap[state]
    }
  },
  components: { Pagination, Tag, arrhythmiaHistory, heartChart },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      row: {},
      type: 1,
      replyNum: 1,
      dataList: null,
      dialogVisible: false,
      dialogType: 'add', // edit
      dialogDisabled: false,
      feedback_time_old: 0,
      organizationOptions: '',

      lock: true,
      setStateOptions: [
        {
          label: '未反馈',
          value: '0'
        },
        {
          label: '反馈成功',
          value: '1'
        },
        {
          label: '反馈失败',
          value: '2'
        },
        {
          label: '反馈审核中',
          value: '3'
        }
      ],
      setTimeOptions: [
        {
          label: '剩余2小时内未反馈',
          value: '0'
        },
        {
          label: '剩余24小时内未反馈',
          value: '1'
        },
        {
          label: '超过24小时未反馈',
          value: '2'
        }
      ],

      srcList: [],
      report_url: '',
      popDisplay: false,
      chartType: '当前数据',
      /**
       * 查询参数
       */
      queryDate: [],
      queryState: '',
      listQueryState: [],
      listQuery: {
        pageNo: 1,
        number: 10,
        content: null,
        state: null,
        flag: '1',
        beginTime: '',
        endTime: '',
        organization_name: '',
        organizationId: ''
      },

      // 管理员查询参数
      listQueryAdmin: {
        pageNo: 1,
        number: 10,
        feedback_state: null,
        flag: '1',
        beginTime: '',
        endTime: ''
      },
      doctorId: '',
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        explain: [
          { required: true, message: '请输入反馈建议', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    subTitle() {
      let subTitle = 'QTC：' + this.row.QTC + '; ' + 'QRS：' + this.row.QRS + '; ' + 'HR：' + this.row.heart_rate_avg + '; '
      if (this.fromData.isImport && this.fromData.isImport.length > 0) {
        subTitle += ' 初步诊断：' + this.fromData.isImport.split('======').join(',')
      }
      return subTitle
    },
    routesData() {
      return this.routes
    },
    dialogTitle() {
      let userInfo = {}
      if (this.row.usersBase) {
        userInfo = JSON.parse(this.row.usersBase) || {}
      }
      let age = ''
      if (userInfo.birthday && userInfo.birthday.length > 0) {
        const year = parseInt(userInfo.birthday.slice(0, 4))
        if (!isNaN(year)) {
          age = new Date().getFullYear() - year
        }
      }
      return '反馈界面 ———— 患者姓名：' + (userInfo.realname || '无') + '， 昵称：' + (userInfo.username || '无') + '， 性别：' + (userInfo.sex || '无') + '， 年龄：' + (age || '无') + ',  病史：' + (userInfo.medical_history || '无')
    }
  },
  watch: {
    dialogVisible(value, oldValue) {
      if (value === false) {
        this.feedback_time_old = 0
      }
    }
  },
  created() {
    this.doctorId = this.userInfo.doctorId
    this.fromData.doctorId = this.userInfo.doctorId
    this.fromData.checkId = this.userInfo.superiorId
    // this.doctorId = '1f04f9e1f6684de0b2aa7e69fd4e031b'
    this.getList()
    this.loadOrganization()
  },
  methods: {
    async handleSeeReport({ row }) {
      if (!row.report_id) {
        // console.log('暂无信息')
        return
      }
      const res = await getDanDaoById({ 'report_id': row.report_id })
      if (res.data.report_url) {
        window.open(res.data.report_url)
      } else {
        // console.log('未查询到智能报告!')
      }
    },
    async handleSeeReportAI({ row }) {
      const res = await getDandaoAIReport({ 'heart_id': row.heart_id })
      if (res.code === '100' && res.data.reportUrl) {
        window.open(res.data.reportUrl)
      } else {
        // console.log('未查询到智能报告!')
        this.$notify({
          title: '未查询到智能报告!',
          type: 'warning'
        })
      }
    },
    // 查询 测量列表
    async getList() {
      if (this.userInfo.rank === '0') {
        if (this.queryDate && this.queryDate.length > 0) {
          this.listQueryAdmin.beginTime = this.queryDate[0]
          this.listQueryAdmin.endTime = this.queryDate[1]
        } else {
          this.listQueryAdmin.beginTime = null
          this.listQueryAdmin.endTime = null
        }

        const les = await getAdminList({ ...this.listQueryAdmin })
        this.dataList = les.data.dataList
        this.pageTotal = les.data.count
        // getAdminList()
      } else {
        if (this.queryDate && this.queryDate.length > 0) {
          this.listQuery.beginTime = this.queryDate[0]
          this.listQuery.endTime = this.queryDate[1]
        } else {
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
        this.listQuery.state = this.listQueryState.join(',')

        // const les = await getList({ ...this.listQuery, doctorId: this.doctorId })
        const les = await getList(this.listQuery)
        this.dataList = les.data.dataList
        this.pageTotal = les.data.count
      }
    },

    // 查询 反馈详情
    async getInfo(privateId) {
      // const les = await getInfo({ privateId: privateId, type: this.type })
      // console.log(les)

      return new Promise((resolve, reject) => {
        getInfo({ privateId: privateId, type: this.type })
          .then(response => {
            if (response.data) {
              // this.$notify({
              //   title: response.msg,
              //   type: 'success'
              // })
              this.fromData.explain = response.data.explain
              this.fromData.isImport = response.data.isImport
              if (response.data.url && response.data.url.length > 0) {
                this.srcList = response.data.url.split(',')
              } else {
                this.srcList = []
              }
            } else {
              // this.$notify({
              //   title: '抱歉，没有找到该条数据的反馈信息',
              //   type: 'error'
              // })
            }
            this.dialogVisible = true
          })
          .catch(error => {
            this.dialogVisible = true
            reject(error)
          })
      })
    },

    // 查询 智能报告
    async getReport(report_id) {
      const res = await getDanDaoById({ 'report_id': report_id })
      this.report_url = res.data.report_url
      this.getInfo(report_id)
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },

    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogDisabled = false
      this.dialogType = 'edit'
      this.replyNum = 1

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []
      //   patientId: '',   患者ID
      //   privateId: '',   测量ID
      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.report_id

      this.fromData.type = this.type

      this.fromData.doctorId = this.userInfo.doctorId
      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.row = deepClone(scope.row)
      this.getReport(this.fromData.privateId)
    },
    /**
     * 打开添加反馈窗口
     */
    handleAdd(scope) {
      this.replyNum = 1
      this.dialogType = 'add'
      this.dialogVisible = true
      this.dialogDisabled = false

      this.feedback_time_old = new Date().getTime()

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      //   patientId: '',   患者ID
      //   privateId: '',   测量ID
      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.report_id

      this.fromData.doctorId = this.userInfo.doctorId
      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.getReport(this.fromData.privateId)
      this.row = deepClone(scope.row)
    },
    /**
     * 打开查看反馈窗口
     */
    handleSee(scope) {
      this.dialogDisabled = true

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []
      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.report_id

      this.row = deepClone(scope.row)
      this.getReport(this.fromData.privateId)
    },

    /**
     * 获取锁定状态
     */

    async getLockInfo(scope, type) {
      const res = await getLockInfo({ lock_doctor: this.userInfo.doctorId, report_id: scope.row.report_id })
      this.lock = res.data.lock_flag || false
      if (type === 'add') {
        this.handleAdd(scope)
      } else if (type === 'edit') {
        this.handleEdit(scope)
      }
      if (!this.lock) {
        setTimeout(() => {
          this.$notify({
            title: '该信息其他医生正在反馈，您无法反馈该信息。',
            type: 'error'
          })
        }, 0)
      }
    },

    // 解锁
    handleUnlock({ row, index }) {
      this.$confirm('确定解锁吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async () => {
          await unLock({ 'report_id': row.report_id })
          this.$message({
            type: 'success',
            message: '解锁成功!'
          })
          this.getList()
        })
        .catch(err => {
          this.$notify({
            title: '数据请求失败，请联系管理员!',
            type: 'warning'
          })
          console.error(err)
        })
    },

    verifyPower({ row }, type) {
      let flag = false
      const lock_state = row.lock_state || '1'
      switch (type) {
        case 'fk':
          // 反馈
          if (row.feedback_state === '0') {
            if (lock_state === '1') {
              flag = true
            }
            if (lock_state === '0' && row.lock_doctor === this.userInfo.doctorId) {
              flag = true
            }
          }
          break
        case 'ck':
          // 查看
          if (row.feedback_state !== '0' && row.feedback_state !== '2') {
            flag = true
          }

          if (lock_state === '0' && row.lock_doctor !== this.userInfo.doctorId) {
            flag = true
          }

          break
        case 'xg':
          // 修改
          if (row.feedback_state === '2') {
            if (lock_state === '1') {
              flag = true
            }

            if (lock_state === '0' && row.lock_doctor === this.userInfo.doctorId) {
              flag = true
            }
          }
          break
        case 'js':
          // 解锁
          if (lock_state === '0' && row.lock_doctor === this.userInfo.doctorId) {
            flag = true
          }
          break
      }
      return flag
    },

    // 上传 反馈信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        this.fromData.url = this.srcList.join(',')
        return new Promise((resolve, reject) => {
          if (this.dialogType === 'add') {
            const feedback_time = new Date().getTime() - this.feedback_time_old
            this.fromData.feedback_time = Math.ceil(feedback_time / 1000 / 60)
            addFeedback(this.fromData)
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
            delete this.fromData.feedback_time
            editFeedback(this.fromData)
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
          }
        })
      })
    },
    appendTag(data) {
      if (this.dialogDisabled) {
        this.$message({
          message: '查看状态不可编辑!'
        })
        return
      }

      if (data.isImport === 0 && data.isSelect === 'select') {
        if (this.fromData.isImport.length > 0) {
          this.fromData.isImport += '======'
        }
        this.fromData.isImport += data.import
      }
      if (data.isImport === 0 && data.isSelect === 'no') {
        const imList = this.fromData.isImport.split('======')
        for (let i = 0; i < imList.length; i++) {
          if (imList[i] === data.import) {
            imList.splice(i, 1)
          }
        }
        this.fromData.isImport = imList.join('======')
        this.fromData.explain.replace(data.import, '1')
        return
      }

      // 自动换行
      if (this.fromData.explain.length > 0) {
        // this.fromData.explain += ('\n\n' + this.replyNum + '、' + data.text)
        this.fromData.explain += ('\n\n' + data.text)
      } else {
        // this.fromData.explain += this.replyNum + '、' + (data.text)
        this.fromData.explain += (data.text)
      }

      this.replyNum++
    },
    appendImg(data) {
      if (this.dialogDisabled) {
        this.$message({
          message: '查看状态不可编辑',
          type: 'error'
        })
        return
      }
      const file = base64ToFile(data)

      myUploadImage(file, this.successImg, this.warningImg)
    },
    successImg(res) {
      this.$notify({
        title: '图片上传成功！',
        type: 'success'
      })
      this.srcList.push(res.data)
    },
    warningImg(res) {
    },
    resizeChart(tag) {
      // if (tag.label === '历史数据') {
      //   this.$refs['cardiac-load-history'].resizeChart()
      // } else {
      //   this.$refs['cardiac-load-chart'].resizeChart()
      // }
      this.chartType = tag.label || '当前数据'
    },
    closeDialog() {
      this.chartType = '当前数据'
      this.getList()
    },
    delImg(index) {
      this.popDisplay = false
      this.srcList.splice(index, 1)
    },
    handleQueryState(el) {
      if (el) {
        this.listQueryState = ['0', '2', '3']
        switch (el) {
          case '0':
            // this.$refs['queryDate'].$emit('pick', {
            //   maxDate: new Date().getTime() - 1000 * 60 * 60 * 24,
            //   minDate: new Date().getTime() - 1000 * 60 * 60 * 24
            // })
            this.queryDate = [parseTime(new Date().getTime() - 1000 * 60 * 60 * 24), parseTime(new Date().getTime() - 1000 * 60 * 60 * 22)]
            break
          case '1':
            this.queryDate = [parseTime(new Date().getTime() - 1000 * 60 * 60 * 24), parseTime(new Date())]
            break
          case '2':
            this.queryDate = [parseTime(new Date('2000-01-01')), parseTime(new Date().getTime() - 1000 * 60 * 60 * 24)]
            break
        }
      }
    },
    handleState(el) {
      this.queryState = ''
    },
    handleQueryTime(el) {
      this.queryState = ''
    },

    async loadOrganization() {
      const les = await getOrganizationList({
        pageNo: 1,
        number: 100,
        audit: 1
      })
      this.organizationOptions = les.data.dataList
    },

    organizationQuerySearchAsync(queryString, cb) {
      const restaurants = this.organizationOptions
      const results = queryString ? restaurants.filter(this.organizationCreateStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    organizationCreateStateFilter(queryString) {
      return (state) => {
        return (state.organization_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    organizationHandleSearchSelectIdListQuery(item) {
      this.listQuery.organizationId = item.organizationId
    },
    organizationHandleChangeListQuery() {
      this.listQuery.organizationId = null
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

.el-tag-div {
  margin-bottom: 12px;
}

.box-card {
  width: 100%;
  height: auto;
}

.basis-img:hover {

}

.el-card {
  height: 100%;
}
</style>
