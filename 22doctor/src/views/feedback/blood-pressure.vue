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
          <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="listQuery.content"
            clearable
            placeholder="请输入ID/名称"
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

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.feedback_state==='0'" type="success" size="small" @click="handleAdd(scope)">反馈</el-button>
          <el-button v-else-if="scope.row.feedback_state==='2'" type="warning" size="small" @click="handleEdit(scope)">修改反馈</el-button>
          <el-button v-else type="primary" size="small" @click="handleSee(scope)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.feedback_state | fstateFilterType">
            {{ scope.row.feedback_state | fstateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据来源" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.state | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="高压" width="120">
        <template slot-scope="scope">
          {{ scope.row.high_pressure }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="低压" width="120">
        <template slot-scope="scope">
          {{ scope.row.low_pressure }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="平均心率" width="120">
        <template slot-scope="scope">
          {{ scope.row.heart_rate_avg }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="测量时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.releasetime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.username }}
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

    <!--    //反馈-->
    <el-dialog :visible.sync="dialogVisible" :title="'反馈'" :fullscreen="true" @close="closeDialog">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <LineMarker height="720px" width="100%" :uuid="fromData.patientId" :row="row" @appendImg="appendImg" />
          </el-card>
        </el-col>
        <el-col :span="12">

          <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right" :disabled="dialogDisabled">
            <el-form-item v-if="srcList.length > 0" label="判读依据：">
              <el-col :span="24">
                <el-popover
                  v-for="(item, index) in srcList"
                  v-model="popDisplay"
                  placement="top"
                  width="200"
                  trigger="hover"
                >
                  <p>1，点击图片查看大图<br>2，点击删除可删除图片</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="delImg(index)">删除</el-button>
                  </div>

                  <el-image
                    slot="reference"
                    style="width: 100px; height: 100px"
                    :preview-src-list="srcList"
                    class="basis-img"
                    :src="item"
                    :z-index="4000"
                    @click="popDisplay=false"
                  />
                </el-popover>

              </el-col>
            </el-form-item>

            <el-form-item label="反馈建议：" prop="explain">
              <el-input
                v-model="fromData.explain"
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="请输入反馈建议或者点击标签快速回复！"
              />
            </el-form-item>
          </el-form>

          <div class="el-tag-div">
            <tag :type="2" @appendTag="appendTag" />
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
import { getList } from '@/api/blood-pressure'
import { myUploadImage } from '@/api/uploadImg'
import { addFeedback, getInfo } from '@/api/feedback'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Tag from '@/components/tag'
import LineMarker from './charts/bp-chart'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination

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
  privateId: '',
  type: 2,
  explain: '',
  url: '',
  isImport: ''
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
    }
  },
  components: { Pagination, Tag, LineMarker },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      doctorId: '1f04f9e1f6684de0b2aa7e69fd4e031b',
      dataList: null,
      type: 2,
      dialogVisible: false,
      dialogDisabled: true,
      srcList: [],
      row: {},
      popDisplay: false,
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

      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10
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
    routesData() {
      return this.routes
    }
  },
  created() {
    // doctorId: '',
    //   checkId: '',
    this.fromData.doctorId = this.userInfo.doctorId
    this.doctorId = this.userInfo.doctorId
    this.fromData.checkId = this.userInfo.superiorId
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList({ ...this.listQuery, doctorId: this.doctorId })
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
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      this.dialogVisible = true
      this.dialogDisabled = false

      //   patientId: '',   患者ID
      //   privateId: '',   测量ID
      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.bid

      this.fromData.type = this.type
      this.fromData.doctorId = this.userInfo.doctorId
      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }

      this.row = deepClone(scope.row)

      this.getInfo(this.fromData.privateId)
    },
    /**
     * 打开添加反馈窗口
     */
    handleAdd(scope) {
      this.dialogVisible = true
      this.dialogDisabled = false

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []

      //   patientId: '',   患者ID
      //   privateId: '',   测量ID
      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.bid
      this.row = deepClone(scope.row)

      this.fromData.doctorId = this.userInfo.doctorId

      if (this.userInfo.superiorId && this.userInfo.superiorId.length > 0) {
        this.fromData.checkId = this.userInfo.superiorId
      } else {
        this.fromData.checkId = this.userInfo.doctorId
      }
    },
    /**
     * 打开查看反馈窗口
     */
    handleSee(scope) {
      this.dialogVisible = true
      this.dialogDisabled = true

      this.fromData = Object.assign({}, defaultRow)
      this.srcList = []
      this.row = deepClone(scope.row)

      this.fromData.patientId = scope.row.uuid
      this.fromData.privateId = scope.row.bid

      this.getInfo(this.fromData.privateId)
    },

    // 获取 反馈详情
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
        this.fromData.explain.replace(data.text, '1')
        return
      }

      if (this.fromData.explain.length > 0) {
        this.fromData.explain += ('\n\n' + data.text)
      } else {
        this.fromData.explain += (data.text)
      }
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
    closeDialog() {
      this.$refs.fromData.resetFields()
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
    margin-bottom: 12px;
  }

</style>
