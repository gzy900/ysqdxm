<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">处方名称：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'视频名称'" v-model="listQuery.info" placeholder="视频名称"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <p class="search-item-title">处方状态：</p>
              <p class="search-item-input">
                <el-input :label="'基础信息'" v-model="listQuery.info" placeholder="视频状态"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary"><i class="el-icon-search"/> 查询</el-button>
                <el-button type="success" @click="handleAdd"><i class="el-icon-refresh-right"/> 新增处方模板</el-button>
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
            <el-button v-if="isDelete(scope.row)" @click="handleDel(scope)" type="danger">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="sportStatus"
          label="处方状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status| statusFilterType">
              {{ scope.row.status | statusFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="sportName"
          label="处方名称"
          width="200"
        >
        </el-table-column>

        <el-table-column
          label="处方类型"
          width="110"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.isTemplate| templateFilterType">
              {{ scope.row.isTemplate | templateFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="lastTime"
          label="运动总量"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="frequency"
          label="运动频率/周"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="sportPower"
          label="运动强度"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="maxHeartrate"
          label="最大心率"
          width="100"
        >
        </el-table-column>


        <el-table-column
          prop="targetHeartrate"
          label="目标心率"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="restHeartrate"
          label="静息心率"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="createUsername"
          label="创建人"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
        >
        </el-table-column>

        <!--        <el-table-column-->
        <!--          prop="totaltime"-->
        <!--          label="总时长"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="patientId"-->
        <!--          label="用户Id"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="sevenDays"-->
        <!--          label="患者总运动天数"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="sucDays"-->
        <!--          label="患者运动达标天数"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="sevenDays"-->
        <!--          label="患者七日运动时长"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="usedDays"-->
        <!--          label="处方使用天数"-->
        <!--        >-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="usedSucDays"-->
        <!--          label="处方达标天数"-->
        <!--        >-->
        <!--        </el-table-column>-->

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
      :title="userInfoDialogType==='add'?'新增处方模板':'处方详情'"
      :visible.sync="userInfoDialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
      @close="dialogClose"
    >
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="处方名称">
          <el-col :span="12">
            <el-input v-model="form.sportName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="运动总量(周)">
          <el-col :span="6">
            <el-input-number :min="4" :max="12" controls-position="right" v-model="form.lastTime"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="运动频率(天/周)">
          <el-col :span="6">
            <el-input-number :min="0" :max="7" controls-position="right" v-model="form.frequency"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="运动强度">
          <el-col :span="6">
            <el-input-number
              :min=".5"
              :max="1"
              :step="0.1"
              controls-position="right"
              v-model="form.sportPower"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="最大心率">
          <el-col :span="6">
            <el-input-number :min="0" controls-position="right" v-model="form.maxHeartrate"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="目标心率">
          <el-col :span="6">
            <el-input-number :min="0" controls-position="right" v-model="form.targetHeartrate"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="静息心率">
          <el-col :span="6">
            <el-input-number :min="0" controls-position="right" v-model="form.restHeartrate"></el-input-number>
          </el-col>
        </el-form-item>
        <template v-if="!userInfo.isDoctor">
          <el-form-item label="是否通用模板">
            <el-col :span="18">
              <el-switch
                v-model="form.isTemplate"
                inactive-text="医生专用"
                :inactive-value="1"
                active-text="通用模板"
                :active-value="2"
                @change="handleChangeCommon"
              >
              </el-switch>
            </el-col>
          </el-form-item>

          <el-form-item label="模板所属医生" v-show="form.isTemplate===1">
            <el-col :span="12">
              <el-select
                v-model="form.createUserId"
                placeholder="输入医生名称搜索并在下拉框中选择"
                filterable
              >
                <el-option
                  v-for="item in doctorList"
                  :label="item.username"
                  :value="item.doctorId"
                  :key="item.doctorId"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </template>

        <!--        <el-form-item label="运动总时长">-->
        <!--          <el-col :span="6">-->
        <!--            <el-input-number disabled :min="0" controls-position="right" v-model="form.totaltime"></el-input-number>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->

        <el-form-item label="运动计划">
          <el-col :span="24">
            <el-badge
              v-for="item in 7"
              :key="item"
              :value="videoLength(item)"
              :type="videoLength(item)>0?'primary':'warning'"
              class="plan-el-badge"
            >
              <el-tag
                class="plan-el-tag"
                size="medium"
                type=""
                :effect="planTagIndex===item-1?'dark':'plain'"
                @click="handleClickPlanTag(item)"
              >
                {{ '周' + item }}
              </el-tag>
            </el-badge>
          </el-col>
        </el-form-item>

        <!--        actionList: []-->
        <el-form-item v-for="(item,index) in typeOption" :label="item.label">
          <el-col :span="20">
            <el-select
              filterable
              clearable
              multiple
              v-model="item.checkListId"
              @change="handleSelectAction($event,index,item.label)"
              placeholder="请选择"
            >
              <el-option
                v-for="o_item in item.option"
                :label="o_item.actionName"
                :value="o_item.actionId"
              >
                <span style="float: left;">{{ o_item.actionName }}</span>
                <el-tag type="primary" style="margin-left: 20px;">{{ o_item.partType }}</el-tag>
                <el-tag type="info" style="margin-left: 20px">{{ o_item.instrumentType }}</el-tag>
                <el-button @click.stop="handlePreview(o_item.url)" style="float: right" type="text">预览</el-button>

              </el-option>
            </el-select>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="10">
              <el-col
                style="margin-top: 10px"
                :xl="6"
                :lg="8"
                :md="12"
                v-for="(c_item,c_index) in checkList[planTagIndex][item.label]"
              >
                <el-card class="action-card" :body-style="{ padding: '0px',overflow:'hidden' }">
                  <div class="card-info">
                    <el-image
                      style="width: 100%;height:88px;display: block;overflow: hidden;cursor: pointer;"
                      :src="c_item.videoCover"
                      fit="fill"
                      @click="handlePreview(c_item.url)"

                    ></el-image>
                    <p class="action-card-name"><span>{{ c_item.actionName }}</span>
                      <el-tag type="danger" @click="handleUnSelect(c_index,item.label)">删除</el-tag>
                    </p>
                  </div>
                  <div class="card-form">
                    <el-form-item
                      v-if="c_item.specialType===0"
                      label="次数"
                      label-width="50px"
                      style="margin-bottom: 2px">
                      <el-col :span="24">
                        <el-input size="mini" placeholder="请输入内容" v-model="c_item.actionTime"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item
                      v-if="c_item.specialType===1"
                      label="时间"
                      label-width="50px"
                      style="margin-bottom: 2px">
                      <el-col :span="24">
                        <el-select size="mini" placeholder="请输入内容" v-model="c_item.actionTime">
                          <el-option label="10秒" :value="10"></el-option>
                          <el-option label="20秒" :value="20"></el-option>
                          <el-option label="30秒" :value="30"></el-option>
                          <el-option label="40秒" :value="40"></el-option>
                          <el-option label="50秒" :value="50"></el-option>
                          <el-option label="60秒" :value="60"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="组次" label-width="50px" style="margin-bottom: 2px">
                      <el-col :span="24">
                        <el-input
                          size="mini"
                          placeholder="请输入内容"
                          v-model="c_item.actionRate"
                          v-if="c_item.specialType===0"
                        >
                        </el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="休息" label-width="50px" style="margin-bottom: 2px">
                      <el-col :span="24">
                        <el-input size="mini" placeholder="请输入内容" v-model="c_item.restTime">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </div>

                  <!--                  <p class="action-card-tag">-->
                  <!--                    <el-tag type="primary">-->
                  <!--                      {{ c_item.partType }}-->
                  <!--                    </el-tag>-->
                  <!--                    <el-tag type="info">-->
                  <!--                      {{ c_item.instrumentType }}-->
                  <!--                    </el-tag>-->
                  <!--                  </p>-->
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="isSubmit"
            type="primary"
            @click="handleSubmit">提交
          </el-button>
          <el-button @click="userInfoDialogVisible = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="videoDialogVisible"
      width="60%"
      append-to-body
    >
      <video controls width="100%" :src="videoDialogUrl" alt=""/>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Upload from '@/component/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import { getList, addData, upData, getInfo, delData } from '@/api/material'
import { getList as getAction } from '@/api/video-Material'
import { getList as getDoctorList } from '@/api/doctor'
import { mapGetters } from 'vuex'

const default_form = {
  sportId: '',
  sportName: '',
  sportPower: '',
  lastTime: '',
  totaltime: 0,
  frequency: '',
  isTemplate: '1', // 0 用户处方，1，医生模板，2，通用模板
  targetHeartrate: '',
  restHeartrate: '',
  maxHeartrate: '',
  createUserId: '',
  createUsername: '',
  actionList: []
}
const default_action_form = {
  actionRate: '2',
  actionTime: '8',
  restTime: '15',
}
const default_typeOption = [
  {
    label: '热身',
    value: '热身',
    checkList: [],
    checkListId: [],
    option: []
  },
  {
    label: '有氧',
    value: '有氧',
    checkList: [],
    checkListId: [],
    option: []
  },
  {
    label: '柔韧',
    value: '柔韧',
    checkList: [],
    checkListId: [],
    option: []
  },
  {
    label: '抗阻',
    value: '抗阻',
    checkList: [],
    checkListId: [],
    option: []
  },
  {
    label: '平衡',
    value: '平衡',
    checkList: [],
    checkListId: [],
    option: []
  },
  {
    label: '放松',
    value: '放松',
    checkList: [],
    option: []
  },
]
const default_checkList = []
const checkObj = {}

console.log(1234567)
console.log(default_typeOption)
default_typeOption.forEach((item) => {
  checkObj[item.value] = []
})
for (let i = 0; i < 7; i++) {
  default_checkList.push(checkObj)
}
console.log(default_checkList)

export default {
  name: 'Material',
  components: { Pagination },
  filters: {
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'success',
        '1': 'warning'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '使用中',
        '1': '已停用'
      }
      return statusMap[status]
    },
    templateFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'info',
        '1': 'success',
        '2': 'primary'
      }
      return statusMap[status]
    },
    templateFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '患者处方',
        '1': '自定义模板',
        '2': '标准模板',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      planTagIndex: 0,
      total: 10,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit
      form: Object.assign({}, default_form),
      listQuery: {
        pageCount: 10,
        pageNum: 1,
        // isCommon: '1',
        isTemplate: '',
        doctorId: ''
      },
      tableData: [],
      typeOption: deepClone(default_typeOption),
      checkList: deepClone(default_checkList),
      actionOption: [],
      listQueryAction: {
        actionName: '',
        actionType: '',
        partType: '',
        instrumentType: '',
      },
      actionList: {},
      doctorList: [],

      videoDialogVisible: false,
      videoDialogUrl: null,
    }
  },
  created() {
  },
  mounted() {
    if (this.userInfo.isDoctor) {
      this.listQuery.doctorId = this.userInfo.userId
    }
    this.getList()
    this.getAction()
    this.getDoctorList()
    default_form.createUsername = this.userInfo.userName
    default_form.createUserId = this.userInfo.userId
  },
  beforeMount() {
    // default_typeOption = null
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    videoLength: (res) => {
      return (index) => {
        const list = res.checkList[index - 1]
        let length = 0
        for (const item in list) {
          length += list[item].length
        }
        return length
      }
    },
    isDelete: (res) => {
      return (row) => {
        console.log(12345)
        console.log(res)
        console.log(row)
        let flag = false
        if (res.userInfo.isDoctor) {
          if (res.userInfo.userId === row.createUserId) {
            flag = true
          }
        } else {
          flag = true
        }
        return flag
      }
    },
    isSubmit: (res) => {
      let flag = true
      if (res.userInfo.isDoctor) {
        if (res.form.isTemplate === 2) {
          flag = false
        }
      }
      return flag
    }
  },
  methods: {
    handleUploadSuccess(res) {
      console.log(1111)
      console.log(res)
    },

    handleAdd() {
      this.form = Object.assign({}, default_form)
      console.log(this.form)
      // this.typeOption = deepClone(default_typeOption)

      if (this.userInfo.isDoctor) {
        this.form.isTemplate = 1
      }
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },
    handleInfo(row) {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'edit'
      this.getInfo(row)
    },
    dialogClose() {
      this.form = deepClone(default_form)
      this.checkList = deepClone(default_checkList)
    },
    async getInfo(row) {
      const data = await getInfo({ sportId: row.sportId })
      this.form = deepClone(data.data)
      this.form.sportId = row.sportId
      this.form.isTemplate = row.isTemplate
      this.form.createUserId = row.createUserId
      // this.typeOption = deepClone(default_typeOption)
      this.washInfo(deepClone(this.form.actionList))
    },
    washInfo(list) {
      const option = {
        mon: 0,
        tue: 1,
        wed: 2,
        thu: 3,
        fri: 4,
        sat: 5,
        sun: 6,
      }
      this.form.actionList = []
      for (const item in list) {
        const index = option[item]
        const v_list = list[item]
        this.form.actionList[index] = v_list
        v_list.forEach(v_item => {
          if (!this.checkList[index][v_item.actionType]) {
            this.checkList[index][v_item.actionType] = []
          }
          this.checkList[index][v_item.actionType].push(
            v_item
          )
        })
      }
      this.form.lastTime = this.form.lastTime / 7
    },
    handleChangeCommon(value) {
      if (value === 1) {
        this.form.createUserId = this.userInfo.userId
        this.form.createUsername = this.userInfo.userName
      } else {
        this.form.createUserId = ''
        this.form.createUsername = ''
      }
    },

    handlePreview(url) {
      this.videoDialogUrl = url
      this.videoDialogVisible = true
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    async getDoctorList() {
      const data = await getDoctorList({ pageCount: 1, pageSize: 100 * 100 * 1000 })
      this.doctorList = data.data.records
      console.log(this.doctorList)
    },
    async getAction() {
      const data = await getAction(this.listQueryAction)
      this.actionOption = deepClone(data.data)
      this.washAction(data.data)
    },
    washAction(data) {
      data = data || []
      data.forEach(item => {
        this.typeOption.forEach(t_item => {
          if (item.actionType === t_item.value) {
            t_item.option.push(item)
          }
        })
      })
    },
    handleClickPlanTag(index) {
      this.planTagIndex = index - 1
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
    },
    handleUnSelect(c_index, name) {
      this.checkList[this.planTagIndex][name].splice(c_index, 1)
    },
    handleSelectAction(value, index, name) {
      console.log(index)
      console.log(name)
      console.log(value)
      console.log(this.typeOption)
      const action_form = deepClone(default_action_form)
      this.typeOption[index].option.forEach(item => {
        value.forEach(v_item => {
          if (item.actionId === v_item) {
            console.log(1234444)
            console.log(item)
            if (item.specialType === 1) {
              action_form.actionTime = 10
            }
            this.checkList[this.planTagIndex][name].push(
              {
                ...item,
                ...action_form
              }
            )
          }
        })
      })
      console.log(this.checkList)

      this.typeOption[index].checkListId = []
    },
    async handleUpStatus(row, status) {
      row.status = status
      delete row.updateTime
      delete row.createTime
      await upData(row)
    },
    setSubmitData() {
      console.log(this.checkList)
      this.checkList.forEach((item, index) => {
        const list = []
        for (const c_item in item) {
          item[c_item].forEach((k_item) => {
            list.push(k_item)
          })
        }
        console.log(list)
        console.log(index)
        this.form.actionList[index] = list
        console.log(this.form.actionList)

      })
      console.log(this.form.actionList)
    },
    handleDel({ row }) {
      console.log(row)
      this.$confirm('确定删除操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          delData({ sportId: row.sportId }).then(response => {
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.getList()
            resolve(true)
          }).catch(() => {
            this.$message({
              message: '失败！请联系管理员',
              type: 'warning'
            })
            reject(false)
          })
        })
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.doctorList.forEach((item) => {
            if (item.doctorId === this.form.createUserId) {
              this.form.createUsername = item.username
            }
          })
          this.setSubmitData()
          const formData = deepClone(this.form)
          delete formData.patientId
          // formData.lastTime = formData.lastTime * 7
          if (this.userInfoDialogType === 'add') {
            return new Promise((resolve, reject) => {
              addData(formData).then(response => {
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
              upData(formData).then(response => {
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
    }
  }
}
</script>

<style scoped lang="scss">
.action-card {
  width: 100%;
  height: auto;
}

.card-info {
  width: 100%;
  float: left;
}

.card-form {
  width: 100%;
  float: left;
}

.plan-el-badge {
}

.plan-el-badge + .plan-el-badge {
  margin-left: 20px;
}

.plan-el-tag {

  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}

.plan-el-tag {

  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}

.plan-el-tag:hover {
  background: #409eff;
  color: #ffffff;
}

.action-card-name {
  padding: 5px;
  margin: 0;
  font-size: 14px;
  color: #666666;
  overflow: hidden;

  span {
    width: calc(100% - 50px);
    float: left;
    overflow: hidden;
    line-height: 22px;
    overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-tag {
    width: 50px;
    float: right;
    cursor: pointer;
  }
}

.action-card-tag {
  padding: 0 5px;
  margin: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
