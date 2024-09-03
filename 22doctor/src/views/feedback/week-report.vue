<!--
info:周报反馈
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <!--      <el-col :span="6">-->
      <!--        <el-tooltip class="item" effect="dark" content="" placement="top">-->
      <!--          <div slot="content">此功能用于给，上周，无任何测量用户，发送一份基础提醒周报。<br />使用时请于表格处勾选相应用户然后点击此处！<br />注意：有数据用户与已发送周报用户不支持此功能所以无法选中!</div>-->
      <!--          <el-button>发送提醒测量周报</el-button>-->
      <!--        </el-tooltip>-->
      <!--      </el-col>-->
      <el-col :span="24">
        <div class="form-search">
          <!--          医生搜索-->
          <el-select
            v-if="userInfo.rank !=='0'"
            v-model="listQueryState"
            clearable
            multiple
            collapse-tags
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-if="userInfo.rank !=='0'"
            v-model="listQuery.type"
            placeholder="请选择上周是否活跃用户"
          >
            <el-option
              v-for="item in setTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <!--          管理员搜索-->

          <el-select
            v-if="userInfo.rank ==='0'"
            v-model="listQueryAdmin.type"
            placeholder="请选择上周是否活跃用户"
          >
            <el-option
              v-for="item in setTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-select
            v-if="userInfo.rank ==='0'"
            v-model="listQueryAdmin.state"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-input
            v-if="userInfo.rank ==='0'"
            v-model="listQueryAdmin.phone"
            placeholder="请输入用户手机号码"
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
      <el-table-column
        type="selection"
        :selectable="checkSelectable"
        width="55"
      />

      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='0'" type="success" size="small" @click="handleAdd(scope,1)">反馈</el-button>
          <el-button v-else-if="scope.row.state==='2'" type="danger" size="small" @click="handleEdit(scope,2)">修改</el-button>
          <el-button v-else type="primary" size="small" @click="handleSee(scope)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.state | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="剩余时间(周一24点前)" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state==='1'" type="info">
            {{ '已反馈' }}
          </el-tag>
          <el-tag v-else :type="reTime==='周一前未反馈'|| reTime==='0小时'?'danger':'warning'">
            {{ reTime }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank !== '0'" align="center" label="用户昵称">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="上周数据" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDataNum | isDataNumFilterType">
            {{ scope.row.isDataNum | isDataNumFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="用户昵称" width="160">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getUserName }}
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="用户手机号码" width="140">
        <template slot-scope="scope">
          {{ scope.row.usersBase | getUserPhone }}
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="反馈依据" width="80">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.url && scope.row.url.length > 0"
            style="width: 24px; height: 24px"
            :src="scope.row.url.split(',')[0]"
            :preview-src-list="scope.row.url.split(',')"
          />
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="反馈内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="初步诊断">
        <template slot-scope="scope">
          {{ scope.row.isImport }}
        </template>
      </el-table-column>

      <!--      <el-table-column align="center" label="所属医生">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.doctorId }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column v-if="userInfo.rank === '0'" align="center" label="所属医生">
        <template slot-scope="scope">
          {{ scope.row.doctor_username }}
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
      @pagination="getList"
    />

    <!--    //周报反馈弹窗-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :fullscreen="true" custom-class="chart-dialog" @close="closeDialog">

      <el-row :getter="20">
        <el-col v-if="dialogVisible" :span="16">
          <el-tabs v-if="dialogVisible" type="border-card" @tab-click="resizeChart">
            <el-tab-pane label="心律失常" :lazy="true">
              <arrhythmia-history v-if="chartType==='心律失常'" ref="arrhythmia-history" :begin-time="reBeginTime" :end-time="reEndTime" flag="1" width="100%" height="340px" :row="row" @appendImg="appendImg" />
            </el-tab-pane>

            <el-tab-pane label="心脏负荷" :lazy="true">
              <arrhythmia-history v-if="chartType==='心脏负荷'" ref="arrhythmia-history" :begin-time="reBeginTime" :end-time="reEndTime" flag="5" width="100%" height="340px" :row="row" @appendImg="appendImg" />
            </el-tab-pane>

            <el-tab-pane label="血压" :lazy="true">
              <LineMarker v-if="chartType==='血压'" ref="line-marker" height="720px" width="100%" :uuid="fromData.patientId" @appendImg="appendImg" />
              <!--              <LineMarker height="720px" width="100%" uuid="7b1c780a78fb463aad8d21ef6745e629" @appendImg="appendImg" />-->
            </el-tab-pane>

            <el-tab-pane label="BMI" :lazy="true">
              <BMIChart v-if="chartType==='BMI'" ref="bmi-chart" height="260px" width="100%" :uuid="fromData.patientId" @appendImg="appendImg" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="8">
          <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right" :disabled="dialogDisabled">
            <el-form-item v-if="srcList.length > 0" label="判读依据：">
              <el-col :span="24">

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

              </el-col>
            </el-form-item>

            <el-form-item label="反馈建议：" prop="content">
              <el-col :span="24">
                <el-input
                  v-model="fromData.content"
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入反馈建议或者点击标签快速回复！"
                />
              </el-col>
            </el-form-item>
          </el-form>

          <div class="el-tag-div">
            <tag v-if="dialogVisible" :is-import="fromData.isImport" @appendTag="appendTag" />
          </div>
          <div style="text-align: left;margin-left: 120px">
            <el-button type="primary" :disabled="dialogDisabled" @click="handleConfirmData('fromData')">提交</el-button>
            <el-button type="danger" @click="dialogVisible=false">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone, base64ToFile } from '@/utils'
import { getList, addData, getInfo, editData, getAdminList } from '@/api/week-report'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex' // Secondary package based on el-pagination

import { myUploadImage } from '@/api/uploadImg'

import Tag from '@/components/tag'
import arrhythmiaHistory from './charts/arrhythmia-history'
import LineMarker from './charts/bp-chart'
import cardiacLoad from './charts/cardiac-load-history'
import BMIChart from './charts/BMI-chart'
import { parseTime } from '../../utils'

/**
 * 新增修改提交字段
 doctorId	是	string	提交反馈的医生的唯一标识
 patientId	是	string	患者端的用户的唯一标识
 checkId	是	string	审核人(所对应的主管)的唯一标识
 privateId	是	string	所对应五种运动的信息的唯一主键
 type	是	string	所对应五种运动的类型,1，心律失常，2，血压，3，BMI,4,吸烟，5，心脏负荷，6，运动
 explain	是	string	反馈说明
 url	是	string	反馈链接
 */
const defaultRow = {
  doctorId: '',
  checkId: '',
  patientId: '',
  content: '',
  isImport: '',
  url: ''
}

export default {
  filters: {
    stateFilterName(status) {
      const statusMap = {
        0: '未反馈',
        1: '反馈成功',
        2: '反馈失败',
        3: '审核中'
      }
      return statusMap[status]
    },
    timeFilterName(time) {
      const date = new Date()
      const day = date.getDay()
      let text = ''
      if (day === 1) {
        text = (24 - date.getHours()) + '小时'
      } else {
        text = '周一前未反馈'
      }
      return text
    },
    timeFilterType(time) {
      const statusMap = {
        0: '未反馈',
        1: '反馈成功',
        2: '反馈失败',
        3: '审核中'
      }
      return statusMap[status]
    },
    getUserName(usersBase) {
      return usersBase ? JSON.parse(usersBase)['username'] : ''
    },
    getUserPhone(usersBase) {
      return usersBase ? JSON.parse(usersBase)['phone'] : ''
    },
    stateFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'danger',
        3: ''
      }
      return statusMap[status]
    },
    isDataNumFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'success'
      }
      return statusMap[status]
    },
    isDataNumFilterName(status) {
      const statusMap = {
        0: '无数据',
        1: '有数据'
      }
      return statusMap[status]
    }
  },
  components: { Pagination, Tag, arrhythmiaHistory, LineMarker, cardiacLoad, BMIChart },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      doctorId: '1f04f9e1f6684de0b2aa7e69fd4e031b',
      dataList: null,
      dialogVisible: false,
      dialogDisabled: true,
      dialogType: 'add',
      chartType: '心律失常',

      row: {},
      srcList: [],
      popDisplay: false,
      wid: null,

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

      setTypeOptions: [
        {
          label: '上周有测量记录',
          value: '1'
        },
        {
          label: '上周无测量记录',
          value: '0'
        }
      ],

      /**
       * 查询参数
       */
      // 0 没有, 1有
      listQuery: {
        pageNo: 1,
        number: 10,
        state: '',
        type: '1'
      },

      /**
       * 管理员查询参数
       */
      listQueryAdmin: {
        pageNo: 1,
        number: 10,
        state: '',
        phone: '',
        type: '1'
      },
      listQueryState: [],
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        content: [
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
    routesData() {
      return this.routes
    },
    reBeginTime() {
      const date = new Date()
      const time = date.getTime()
      const day = date.getDay()
      let dayTime = 0
      if (day === 0) {
        dayTime = 1000 * 60 * 60 * 24 * (7 + 6)
      } else {
        dayTime = 1000 * 60 * 60 * 24 * (day + 6)
      }
      return parseTime(time - dayTime, '{y}-{m}-{d}')
    },
    reEndTime() {
      const date = new Date()
      const time = date.getTime()
      const day = date.getDay()
      let dayTime = 0
      if (day === 0) {
        dayTime = 1000 * 60 * 60 * 24 * (7)
      } else {
        dayTime = 1000 * 60 * 60 * 24 * (day)
      }
      return parseTime(time - dayTime, '{y}-{m}-{d}')
    },
    reTime() {
      const date = new Date()
      const day = date.getDay()
      let text = ''
      if (day === 1) {
        text = (24 - date.getHours()) + '小时'
      } else {
        text = '周一前未反馈'
      }
      return text
    },
    dialogTitle() {
      return '反馈界面 ———— 昵称：' + (this.row.username || '无')
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

    // 查询
    async getList() {
      if (this.userInfo.rank === '0') {
        const les = await getAdminList({ ...this.listQueryAdmin })
        les.data.dataList.forEach((item, index) => {
          item.isDataNum = this.listQueryAdmin.type
        })
        this.dataList = les.data.dataList
        this.pageTotal = les.data.count
      } else {
        this.listQuery.state = this.listQueryState.join(',')
        const les = await getList({ ...this.listQuery, doctorId: this.userInfo.doctorId })
        les.data.dataList.forEach((item, index) => {
          item.isDataNum = this.listQuery.type
        })
        this.dataList = les.data.dataList
        this.pageTotal = les.data.count
      }
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },

    /**
     * 打开添加反馈窗口
     */
    handleAdd(scope) {
      this.dialogVisible = true
      this.dialogDisabled = false
      this.dialogType = 'add'

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      //   patientId: '',   患者ID
      this.fromData.patientId = scope.row.patientId

      this.fromData.doctorId = this.userInfo.doctorId

      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.row = deepClone(scope.row)
      this.row.uuid = scope.row.patientId

      this.fromData.content = ''
    },

    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogDisabled = false
      this.dialogType = 'edit'

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      //   patientId: '',   患者ID
      this.fromData.patientId = scope.row.patientId

      this.row = deepClone(scope.row)
      this.row.uuid = scope.row.patientId

      this.getInfo(scope.row.patientId)
    },

    /**
     * 打开查看反馈窗口
     */
    handleSee(scope) {
      this.dialogDisabled = true

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      this.fromData.patientId = scope.row.patientId

      this.row = deepClone(scope.row)
      this.row.uuid = scope.row.patientId
      this.getInfo(scope.row.patientId)
    },

    async getInfo(patientId) {
      return new Promise((resolve, reject) => {
        getInfo({ patientId: patientId })
          .then(response => {
            if (response.data) {
              this.fromData.content = response.data.content
              this.fromData.isImport = response.data.isImport || ''
              this.wid = response.data.wid
              if (response.data.url && response.data.url.length > 0) {
                this.srcList = response.data.url.split(',')
              } else {
                this.srcList = []
              }
              this.dialogVisible = true
            } else {
              this.$notify({
                title: '抱歉，没有找到该条数据的反馈信息',
                type: 'error'
              })
            }
            this.dialogVisible = true
          })
          .catch(error => {
            this.dialogVisible = true
            reject(error)
          })
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
          if (this.dialogType === 'add') {
            addData(this.fromData)
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
            editData({ wid: this.wid, ...this.fromData })
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
        this.fromData.content.replace(data.text, '1')
        return
      }

      if (this.fromData.content.length > 0) {
        this.fromData.content += ('\n\n' + data.text)
      } else {
        this.fromData.content += (data.text)
      }
    },
    closeDialog() {
      this.chartType = '心律失常'
      this.$refs.fromData.resetFields()
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
      this.chartType = tag.label || '心律失常'
    },
    checkSelectable(row) {
      return parseInt(row.isDataNum) === 0 && parseInt(row.state) === 0
    },
    delImg(index) {
      this.popDisplay = false
      this.srcList.splice(index, 1)
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
  .el-tag-div{
    padding: 10px 0;
  }

</style>

