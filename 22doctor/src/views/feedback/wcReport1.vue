<!--
info: 微信单导
author:wanq
time:2022-07-08 14:27:51
-->
<template>
  <div class="app-container">
    <el-row>
      <!--      <el-col :span="6">-->
      <!--&lt;!&ndash;        <el-button type="primary" @click="getList">刷新列表</el-button>&ndash;&gt;-->
      <!--      </el-col>-->
      <el-col :span="24">
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
          <!--          <el-button type="success" size="small" @click="handleCheck(scope,2)">通过</el-button>-->
          <!--          <el-button type="danger" size="small" @click="handleCheck(scope,3)">打回</el-button>-->
          <el-button v-if="verifyPower(scope,'fk')" type="success" size="small" @click="getLockInfo(scope,'add')">反馈
          </el-button>
          <el-button v-if="verifyPower(scope,'xg')" type="warning" size="small" @click="getLockInfo(scope,'edit')">
            修改反馈
          </el-button>
          <el-button v-if="verifyPower(scope,'ck')" type="primary" size="small" @click="handleSee(scope)">查看</el-button>
          <el-button size="small" @click="handleSeeReport(scope)">移视AI报告</el-button>
          <el-button v-if="verifyPower(scope,'js')" type="info" size="small" @click="handleUpLock(scope.row,1)">解锁
          </el-button>
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
          <el-tag
            v-if="parseInt(scope.row.feedback_state) !== 1"
            :type="scope.row.create_time | surplusType"
          >
            {{ scope.row.create_time | surplusTime }}
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
          {{ scope.row.lock_doctor_name }}
        </template>
      </el-table-column>

      <!--      <el-table-column align="center" label="数据状态" width="80">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.normal_state | fstateFilterNormalState">-->
      <!--            {{ scope.row.normal_state | fstateFilterNormalName }}-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column align="center" label="心脏压力指数" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cardiacStress | filterQTC">
            {{ scope.row.cardiacStress }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="疲劳指数" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.fatigue | filterQRS">
            {{ scope.row.fatigue }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="兴奋指数" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.excitement | filterHR">
            {{ scope.row.excitement }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="平均心率" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hrMean | filterHR">
            {{ scope.row.hr_mean }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="心率变异性" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sdnn | filterHR">
            {{ scope.row.sdnn }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="测量时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime }}
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />
    <!--    :refresh="true"-->

    <!--    //心电信息查看-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :fullscreen="true"
      custom-class="chart-dialog"
      @close="closeDialog"
    >
      <el-row :getter="20">
        <el-col :span="16">
          <el-tabs v-if="dialogVisible" type="border-card" @tab-click="resizeChart">
            <el-tab-pane label="当前数据" :lazy="true">
              <heart-chart
                v-if="chartType==='当前数据'"
                :heart-id="row.heart_id"
                :report-url="report_url"
                :sub-title="subTitle"
                @appendImg="appendImg"
              />
              <div style="height: calc( 100% - 300px )">
                <iframe name="ifd" width="100%" height="100%" style="border: 0" :src="report_url" />
              </div>
              <!--              <arrhythmia-chart ref="arrhythmia-chart" v-if="dialogVisible" width="100%" height="340px" :row="row" :isImport="fromData.isImport" @appendImg="appendImg"/>-->
            </el-tab-pane>
            <el-tab-pane label="历史数据" :lazy="true">
              <arrhythmia-history
                v-if="chartType==='历史数据'"
                ref="arrhythmia-history"
                width="100%"
                height="340px"
                :row="row"
                @appendImg="appendImg"
              />
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="8">
          <el-form
            ref="fromData"
            :model="fromData"
            label-width="120px"
            :rules="rules"
            label-position="right"
            :disabled="dialogDisabled"
          >

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
                <p class="src-see"><i class="el-icon-search" /></p>
                <p class="src-del" @click="delImg(index)"><i class="el-icon-close" /></p>
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
            <tag v-if="dialogVisible" :type="type" :is-import="fromData.isImport" @appendTag="appendTag" />
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
import { deepClone, base64ToFile, parseTime, toHump } from '@/utils'
import { getDanDaoById, getAdminList, getLockInfo, unLock, getDandaoAIReport } from '@/api/arrhythmia'
import { getList, upData, upStatus, upLock, getLockState } from '@/api/wc-report'

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
  checkId: '',
  checkIdName: '',
  doctorId: '',
  doctorIdName: '',
  explain: '',
  feedbackExplain: '',
  feedbackDelayed: '',
  feedbackState: '',
  feedbackTime: '',
  id: '',
  isImport: '',
  lockDoctor: '',
  lockDoctorName: '',
  lockState: '',
  normalState: '',
  orgName: '',
  updateTime: '',
  url: ''
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
      const surplusTime = new Date().getTime() - Math.floor(time)
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
      const surplusTime = new Date().getTime() - Math.floor(time)
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
        1: '审核中',
        2: '反馈成功',
        3: '审核未通过'
      }
      return statusMap[status]
    },
    fstateFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'info',
        2: 'success',
        3: 'danger'
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
        pageSize: 10
        // uuid: undefined,
        // feedbackState: undefined, // 反馈状态
        // orgName: undefined, // 机构代码
        // startTime: undefined,
        // endTime: undefined,
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
      let subTitle = '平均心率：' + (this.row.hrMean || '无') + '; ' + '心脏压力：' + (this.row.cardiacStress || '无') + '; ' + '疲劳指数：' + (this.row.fatigue || '无') + '; ' + '兴奋指数：' + (this.row.excitement || '无') + '; ' + '心率变异性：' + (this.row.sdnn || '无') + '; '
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
      return '反馈界面'
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
      window.open(row.reportUrl)
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
      if (this.queryDate && this.queryDate.length > 0) {
        this.listQuery.startTime = this.queryDate[0]
        this.listQuery.endTime = this.queryDate[1]
      } else {
        delete this.listQuery.startTime
        delete this.listQuery.endTime
      }
      // this.listQuery.state = this.listQueryState.join(',')

      // const les = await getList({ ...this.listQuery, doctorId: this.doctorId })
      const les = await getList(this.listQuery)
      this.dataList = les.data.result
      this.pageTotal = les.data.totalRecord
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

      const row = {}
      for (const item in scope.row) {
        const i1 = toHump(item)
        row[i1] = scope.row[item]
      }
      this.fromData = Object.assign({}, defaultRow, row)
      this.fromData.explain = this.fromData.feedbackExplain

      this.fromData = Object.assign({}, defaultRow, row)
      this.fromData.explain = this.fromData.feedbackExplain
      if (this.fromData.url && this.fromData.url.length > 0) {
        this.srcList = this.fromData.url.split(',')
      } else {
        this.srcList = []
      }

      this.fromData.doctorId = this.userInfo.doctorId
      this.fromData.doctorIdName = this.userInfo.username

      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.dialogVisible = true

      this.row = deepClone(scope.row)
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

      const row = {}
      for (const item in scope.row) {
        const i1 = toHump(item)
        row[i1] = scope.row[item]
      }
      this.fromData = Object.assign({}, defaultRow, row)
      this.fromData.explain = this.fromData.feedbackExplain
      this.srcList = []

      this.fromData.doctorId = this.userInfo.doctorId
      this.fromData.doctorIdName = this.userInfo.username
      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.fromData.lockDoctor = this.userInfo.doctorId
      this.fromData.lockDoctorName = this.userInfo.username
      this.fromData.explain = this.fromData.feedbackExplain
      if (this.fromData.url && this.fromData.url.length > 0) {
        this.srcList = this.fromData.url.split(',')
      } else {
        this.srcList = []
      }
      this.dialogVisible = true

      this.row = deepClone(scope.row)
    },
    /**
     * 打开查看反馈窗口
     */
    handleSee(scope) {
      this.dialogDisabled = true

      this.srcList = []

      this.row = deepClone(scope.row)
      const row = {}
      for (const item in scope.row) {
        const i1 = toHump(item)
        row[i1] = scope.row[item]
      }
      this.fromData = {}
      this.fromData = Object.assign({}, defaultRow, row)

      this.fromData.explain = this.fromData.feedbackExplain
      if (this.fromData.url && this.fromData.url.length > 0) {
        this.srcList = this.fromData.url.split(',')
      } else {
        this.srcList = []
      }
      this.dialogVisible = true
    },

    /**
     * 获取锁定状态
     */

    async getLockInfo(scope, type) {
      const res = await getLockState({ id: scope.row.id })
      if (res.data.lock_state === '0' && res.data.lock_doctor !== this.userInfo.doctorId) {
        this.lock = false
      } else {
        this.lock = true
      }
      console.log(res.data.lock_state === '0')
      console.log(res.data.lock_doctor !== this.userInfo.doctorId)
      console.log(res.data.lock_doctor)
      console.log(this.userInfo.doctorId)
      if (type === 'add') {
        this.handleAdd(scope, res)
      } else if (type === 'edit') {
        this.handleEdit(scope)
      }
      if (this.lock) {
        if (res.data.lock_state === '1') {
          this.handleUpLock(scope.row, 0)
        }
      } else {
        setTimeout(() => {
          this.$notify({
            title: '该信息其他医生正在反馈，您无法反馈该信息。',
            type: 'error'
          })
        }, 0)
      }
    },
    // 审核
    handleCheck({ row }, status) {
      const data = Object.assign({}, {
        id: row.id,
        checkId: this.userInfo.doctorId,
        checkIdName: this.userInfo.username,
        feedbackState: status
      })

      return new Promise((resolve, reject) => {
        upStatus(data)
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
      })
    },
    // 锁定解锁
    handleUpLock(row, status) {
      const data = Object.assign({}, {
        id: row.id,
        lockDoctor: this.userInfo.doctorId,
        lockDoctorName: this.userInfo.username,
        lockState: status
      })
      if (status === 1) {
        data.lockDoctor = ''
        data.lockDoctorName = ''
      }
      return new Promise((resolve, reject) => {
        upLock(data)
          .then(response => {
            if (response.data) {
              if (status === 1) {
                this.dialogVisible = false
                this.$notify({
                  title: response.msg,
                  type: 'success'
                })
                this.getList()
              }
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
      // })
    },
    // 解锁
    handleUnlock({ row, index }) {
      this.$confirm('确定解锁吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
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
        if (row.feedback_state !== '0' && row.feedback_state !== '3') {
          flag = true
        }

        if (lock_state === '0' && row.lock_doctor !== this.userInfo.doctorId) {
          flag = true
        }

        break
      case 'xg':
        // 修改
        if (row.feedback_state === '3') {
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
        const data = this.fromData
        data.url = this.srcList.join(',')
        const feedback_time = new Date().getTime() - this.feedback_time_old
        data.feedbackTime = Math.ceil(feedback_time / 1000 / 60)
        data.feedbackDelayed = Math.floor((new Date().getTime() - data.createTime) / (1000 * 60 * 60) * 100) / 100
        data.feedbackExplain = this.fromData.explain
        data.feedbackState = 1
        delete data.explain
        return new Promise((resolve, reject) => {
          upData(data)
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
