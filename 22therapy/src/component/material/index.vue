<template>
  <div>
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="使用模板">
        <el-col :span="12">
          <el-select
            @change="handleMaterialChange"
            v-model="sportValue"
            filterable
            placeholder="请选择">
            <el-option
              v-for="item in materialList"
              :label="item.sportName"
              :value="item.sportId">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="处方名称">
        <el-col :span="12">
          <el-input v-model="form.sportName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="运动总量(周)">
        <el-col :span="6">
          <el-input-number :max="12" :min="4" controls-position="right" v-model="form.lastTime"></el-input-number>
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
            @input="changeTargetHr"
            :min=".5"
            :max="1"
            :step="0.1"
            controls-position="right"
            v-model="form.sportPower"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="最大心率">
        <el-col :span="6">
          <el-input-number
            :precision="0"
            @input="changeTargetHr"
            :min="0"
            controls-position="right"
            v-model="form.maxHeartrate"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="静息心率">
        <el-col :span="6">
          <el-input-number
            :precision="0"
            @input="changeTargetHr"
            :min="0"
            controls-position="right"
            v-model="form.restHeartrate"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="目标心率">
        <el-col :span="6">
          <el-input-number
            :precision="0"
            :min="0"
            controls-position="right"
            v-model="form.targetHeartrate"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="是否通用模板" v-if="materialType==='temp'">
        <el-col :span="18">
          <el-switch
            v-model="form.isTemplate"
            active-text="医生专用"
            :active-value="1"
            inactive-text="通用模板"
            :inactive-value="2"
            @change="handleChangeCommon"
          >
          </el-switch>
        </el-col>
      </el-form-item>

      <el-form-item label="模板所属医生" v-if="materialType==='temp'" v-show="form.isTemplate===1">
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
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <!--        <el-form-item label="运动总时长">-->
      <!--          <el-col :span="6">-->
      <!--            <el-input-number disabled :min="0" controls-position="right" v-model="form.totaltime"></el-input-number>-->
      <!--          </el-col>-->
      <!--        </el-form-item>-->

      <el-form-item label="运动计划">
        <el-col :span="24">
          <el-badge
            v-for="item in 7"
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
                      <el-input v-if="c_item.specialType===0" size="mini" placeholder="请输入内容" v-model="c_item.actionRate">
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
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="videoDialogVisible"
      width="60%"
      append-to-body
    >
      <video controls width="100%" :src="videoDialogUrl" alt=""/>
    </el-dialog>

  </div>
</template>

<script>

import { deepClone } from "@/utils";
import { mapGetters } from "vuex";
import { addData, getInfo, getList, upData } from "@/api/material";
import { getList as getDoctorList } from "@/api/doctor";
import { getList as getAction } from "@/api/video-Material";

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
  actionRate: '1',
  actionTime: '1',
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

default_typeOption.forEach((item) => {
  checkObj[item.value] = []
})
for (let i = 0; i < 7; i++) {
  default_checkList.push(checkObj)
}
console.log(default_checkList)

export default {
  name: 'Material',
  props: {
    materialType: {
      type: String,
      default: 'temp' // recipel temp
    },
    patientId: {
      type: String,
      default: null
    },
    show: {
      type: Boolean,
      default: true
    },
    row: {
      type: Object,
      default: null
    },
    sportDefault: {
      type: Object,
      default: null
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
      sportValue: null,
      materialList: [],
      actionList: {},
      doctorList: [],
      videoDialogVisible: false,
      videoDialogUrl: null,

    }
  },
  created() {
  },
  mounted() {
    this.getAction()
    this.getDoctorList()
    this.getMaterialList()
    console.log(33333)
    console.log(this.row)
    console.log(deepClone(this.form))
    if (this.row !== null) {
      this.form = Object.assign({}, default_form, this.row)
      console.log(1234)
      console.log(this.form)
      this.washInfo(this.row.actionList)
    }
    if (this.userInfo.isDoctor) {
      this.listQuery.doctorId = this.userInfo.userId
    }
    default_form.createUsername = this.userInfo.userName
    default_form.createUserId = this.userInfo.userId
    console.log(555)
    console.log(this.sportDefault.maxHr)
    this.form.maxHeartrate = this.sportDefault.maxHr
    this.form.restHeartrate = this.sportDefault.rhr
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
  },
  methods: {
    changeTargetHr() {
      console.log(123)
      this.form.targetHeartrate = (this.form.maxHeartrate - this.form.restHeartrate) * this.form.sportPower + this.form.restHeartrate
    },
    closeDialog() {
      this.$emit('closeMaterial', false)
    },

    async handleMaterialChange(value) {
      const data = await getInfo({ sportId: value })
      this.form = deepClone(data.data)
      this.checkList = deepClone(default_checkList)
      this.washInfo(this.form.actionList)
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
    async getMaterialList() {
      const data = await getList(this.listQuery)
      this.materialList = data.data.records
      console.log(data)
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

      console.log(list)
      const list1 = deepClone(list)
      console.log(list1)

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
      const action_form = deepClone(default_action_form)

      this.typeOption[index].option.forEach(item => {
        value.forEach(v_item => {
          if (item.actionId === v_item) {
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

      this.typeOption[index].checkListId = []
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
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.doctorList.forEach((item) => {
            if (item.doctorId === this.form.createUserId) {
              this.form.createUsername = item.username
            }
          })
          this.setSubmitData()
          if (this.materialType === 'recipel') {
            this.form.isTemplate = 0
            this.form.createUserId = this.userInfo.userId
            this.form.createUsername = this.userInfo.userName
            this.form.patientId = this.patientId
          } else {
            delete this.form.patientId
          }
          const formData = deepClone(this.form)
          if (this.userInfoDialogType === 'add') {
            return new Promise((resolve, reject) => {
              addData(formData).then(response => {
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

.plan-el-badge {
  margin-right: 10px;
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
