<!--
info:用户管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="form-search">
          <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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

      <el-table-column align="center" label="操作" width="440">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='3'" type="success" size="small" @click="editState(scope,1)">通过</el-button>
          <el-button v-if="scope.row.state==='3'" type="danger" size="small" @click="editState(scope,2)">打回</el-button>
          <el-button type="primary" size="small" @click="handleSee(scope)">详情</el-button>
          <el-button type="" size="small" @click="handleSeeReport(scope)">智能报告</el-button>
          <el-button type="" size="small" @click="handleSeeReportAI(scope)">移视AI报告</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | fstateFilterType">
            {{ scope.row.state | fstateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类别" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | typeFilterType">
            {{ scope.row.type | typeFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈内容">
        <template slot-scope="scope">
          {{ scope.row.explain }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="判读依据" width="120">
        <template slot-scope="scope">
          <!--          {{ scope.row.url }}-->
          <el-image
            v-if="scope.row.url && scope.row.url.length > 0"
            style="width: 24px; height: 24px"
            :src="scope.row.url.split(',')[0]"
            :preview-src-list="scope.row.url.split(',')"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.releasetime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈医生" width="120">
        <template slot-scope="scope">
          {{ scope.row.doctor_username }}
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

    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />

    <!--    //审核-->
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
                :report-id="fromData.privateId"
                :heart-id="row.heart_id"
                :report-url="report_url"
                :sub-title="subTitle"
                @appendImg="appendImg"
              />
            </el-tab-pane>
            <el-tab-pane label="历史数据" :lazy="true">
              <arrhythmia-history
                v-if="chartType==='历史数据'"
                ref="arrhythmia-history"
                :flag="type.toString()"
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
            <tag v-if="dialogVisible" :type="tagType" :is-import="fromData.isImport" @appendTag="appendTag" />
          </div>
          <div style="text-align: left;margin-left: 120px;margin-bottom: 20px">

            <el-button v-if="fromData.state === '3'" type="success" @click="editState({row: fromData},1)">通过
            </el-button>
            <el-button v-if="fromData.state === '3'" type="danger" @click="editState({row: fromData},2)">打回</el-button>

            <el-button type="primary" :disabled="dialogDisabled" @click="handleConfirmData('fromData')">提交</el-button>
            <el-button @click="dialogVisible=false">返回</el-button>
          </div>
        </el-col>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>
import { deepClone, base64ToFile } from '@/utils'
import { getList, editState } from '@/api/verify'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Tag from '@/components/tag'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination
import { myUploadImage } from '@/api/uploadImg'

import arrhythmiaHistory from '@/views/feedback/charts/arrhythmia-history'

import { editFeedback } from '@/api/feedback'
import heartChart from '@/components/heart-chart'
import { getDanDaoById, getDandaoAIReport } from '@/api/arrhythmia'

/**
   * 新增修改提交字段
   doctorId  是  string  提交反馈的医生的唯一标识
   patientId  是  string  患者端的用户的唯一标识
   checkId  是  string  审核人(所对应的主管)的唯一标识
   privateId  是  string  所对应五种运动的信息的唯一主键
   type  是  string  所对应五种运动的类型,1，心律失常，2，血压，3，BMI,4,吸烟，5，心脏负荷，6，运动
   explain  是  string  反馈说明
   url  是  string  反馈链接
   */
const defaultRow = {
  doctorId: '',
  checkId: '',

  patientId: '',
  privateId: '',
  type: 2,
  explain: '',
  url: '',
  isImport: ''
}

export default {
  filters: {
    getUserName(usersBase) {
      return usersBase ? JSON.parse(usersBase)['username'] : ''
    },
    getRealName(usersBase) {
      return usersBase ? JSON.parse(usersBase)['realname'] : ''
    },
    getUserPhone(usersBase) {
      return usersBase ? JSON.parse(usersBase)['phone'] : ''
    },
    typeFilterName(status) {
      const statusMap = {
        1: '心律失常',
        2: '血压',
        3: 'BMI',
        4: '吸烟',
        5: '心脏负荷',
        6: '运动',
        7: '心肌缺血'
      }
      return statusMap[status]
    },
    typeFilterType(status) {
      const statusMap = {
        1: '',
        2: '',
        3: 'info',
        4: 'info',
        5: '',
        6: 'info',
        7: 'info'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '健康计划',
        2: '日常监测'
      }
      return statusMap[status]
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
        1: '审核通过',
        2: '审核失败',
        3: '审核中'
      }
      return statusMap[status]
    },
    fstateFilterType(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        3: 'warning'
      }
      return statusMap[status]
    }
  },
  components: { Pagination, Tag, arrhythmiaHistory, heartChart },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      doctorId: '1f04f9e1f6684de0b2aa7e69fd4e031b',
      dataList: null,
      dialogVisible: false,
      dialogDisabled: true,
      setStateOptions: [
        {
          label: '审核中',
          value: '3'
        },
        {
          label: '审核成功',
          value: '1'
        },
        {
          label: '审核失败',
          value: '2'
        }
      ],

      row: {},
      fromDataRow: {},
      srcList: [],
      popDisplay: false,
      report_url: '',
      type: 1,
      replyNum: 1,
      tagType: 1,
      chartType: '当前数据',
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        state: null
      },
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
      let subTitle = ''

      if (this.type === 1) {
        subTitle = 'QTC：' + this.row.PSI + '; ' + 'QRS：' + this.row.QRS + '; ' + 'HR：' + this.row.heart_rate_avg + '; '
      } else {
        subTitle = 'SDN：' + this.row.heart_change + '; ' + 'PSI：' + this.row.PSI + '; ' + 'HR：' + this.row.heart_rate_avg + '; '
      }
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
      if (this.fromDataRow.usersBase) {
        userInfo = JSON.parse(this.fromDataRow.usersBase) || {}
      }
      let age = ''
      if (userInfo.birthday && userInfo.birthday.length > 0) {
        const year = parseInt(userInfo.birthday.slice(0, 4))
        if (!isNaN(year)) {
          age = new Date().getFullYear() - year
        }
      }
      return '审核界面 ———— 患者姓名：' + (userInfo.realname || '无') + '， 昵称：' + (userInfo.username || '无') + '， 性别：' + (userInfo.sex || '无') + '， 年龄：' + (age || '无')
    }
  },
  created() {
    // doctorId: '',
    //   checkId: '',
    this.fromData.doctorId = this.userInfo.doctorId
    this.fromData.checkId = this.userInfo.superiorId
    this.getList()
  },
  methods: {

    async handleSeeReport({ row }) {
      if (!row.privateId) {
        console.log('暂无信息')
        return
      }
      const res = await getDanDaoById({ 'report_id': row.privateId })
      if (res.data.report_url) {
        window.open(res.data.report_url)
      } else {
        // console.log('未查询到智能报告!')
      }
    },

    async handleSeeReportAI({ row }) {
      if (!row.privateId) {
        console.log('暂无信息')
        return
      }
      const res = await getDanDaoById({ 'report_id': row.privateId })
      if (res.code !== '100') {
        this.$notify({
          title: '未查询到智能报告!',
          type: 'warning'
        })
        return
      }
      const res_ai = await getDandaoAIReport({ 'heart_id': res.data.heart_id })
      if (res_ai.code === '100') {
        window.open(res_ai.data.reportUrl)
      } else {
        this.$notify({
          title: '未查询到智能报告!',
          type: 'warning'
        })
      }
    },

    // 查询
    async getList() {
      const les = await getList({ ...this.listQuery, checkId: this.userInfo.doctorId })
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    /**
     * 打开查看反馈窗口
     */
    async handleSee(scope) {
      const res = await getDanDaoById({ 'report_id': scope.row.privateId })
      this.row = res.data
      this.fromDataRow = deepClone(scope.row)
      if (scope.row.url && scope.row.url.length > 0) {
        this.srcList = scope.row.url.split(',')
      } else {
        this.srcList = []
      }

      this.type = parseInt(scope.row.type)
      this.type === 1 ? this.tagType = this.type : this.tagType = 2
      this.fromData = deepClone(scope.row)
      this.dialogVisible = true

      if (this.fromData.state === '3') {
        this.dialogDisabled = false
      } else {
        this.dialogDisabled = true
      }
    },

    // 审核，修改状态
    editState({ $index, row }, state) {
      this.$confirm('确定吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await editState({ 'feedbackId': row.feedbackId, 'checkId': this.userInfo.doctorId, 'state': state })
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          this.getList()
          this.dialogVisible = false
        })
        .catch(err => {
          this.$notify({
            title: '审核失败!',
            type: 'warning'
          })
          console.error(err)
        })
    },

    // 上传 反馈信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        this.fromData.url = this.srcList.join(',')
        return new Promise((resolve, reject) => {
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
        })
      })
    },

    closeDialog() {
      this.chartType = '当前数据'
      this.$refs.fromData.resetFields()
      this.replyNum = 1
      this.srcList = []
    },

    resizeChart(tag) {
      this.chartType = tag.label || '当前数据'
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
        this.fromData.isImport += data.text
      }
      if (data.isImport === 0 && data.isSelect === 'no') {
        const imList = this.fromData.isImport.split('======')
        for (let i = 0; i < imList.length; i++) {
          if (imList[i] === data.text) {
            imList.splice(i, 1)
          }
        }
        this.fromData.isImport = imList.join('======')
        this.fromData.explain.replace(data.text, '1')
        return
      }

      if (this.fromData.explain.length > 0) {
        this.fromData.explain += ('\n\n' + this.replyNum + '、' + data.text)
      } else {
        this.fromData.explain += this.replyNum + '、' + (data.text)
      }
      this.replyNum++
    },
    delImg(index) {
      this.popDisplay = false
      this.srcList.splice(index, 1)
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
    padding: 10px 0;
  }

  .box-card {
    width: 100%;
    height: auto;
  }

</style>

