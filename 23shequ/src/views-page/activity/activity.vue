<template>
  <div class="container" style="padding: 20px">
    <el-card>
      <el-calendar>
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div class="activityBody">
            <p class="activityTitle">
              {{ data.day.split('-').slice(1).join('-') }}
              <el-tag type="success" @click="handleAdd(date)">
                {{ '新增(' + (dataList[date.getTime()] ? dataList[date.getTime()].length : '0') + ')' }}
              </el-tag>
            </p>
            <p>
              <el-tag @click="handleInfo(item)" v-for="item in dataList[date.getTime()]">
                {{ item.partName }}
                <span v-if="item.classTeacher">
                  <icon class="el-icon-star-on"></icon>
                  {{ item.classTeacher }}
                </span>
              </el-tag>
            </p>
          </div>
        </template>
      </el-calendar>
    </el-card>

    <el-dialog
      :title="dialogType==='add'?'新增':'详情'"
      :visible.sync="dialogVisible"
      width="72%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="活动名称">
          <el-col :span="8">
            <el-input v-model="form.partName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="8">
            <el-input v-model="form.time" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="活动地点">
          <el-col :span="24">
            <el-input v-model="form.place"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="参与人员">
          <el-col :span="24">
            <el-input v-model="form.participant"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="讲课老师">
          <el-col :span="8">
            <el-input v-model="form.classTeacher"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="等级">
          <el-col :span="8">
            <el-select
              v-model="form.partLevel"
              filterable
              allow-create
              default-first-option
              placeholder="请选择或输入等级">
              <el-option
                v-for="item in partLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="备注">
          <el-col :span="8">
            <el-input v-model="form.description"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addData, upData, delData } from '@/api/activity'
import { deepClone, parseTime } from '@/utils'

const defaultForm = {
  'partName': '',
  'place': '',
  'time': 0,
  'participant': '',
  'partLevel': '一般',
  'description': '无',
  classTeacher: ''
}

export default {
  name: 'Activity',
  data() {
    return {
      form: Object.assign({}, defaultForm),
      dataList: {},
      listQuery: {
        page: 0,
        limit: 10000,
        // start: 0,
        // end: 0
      },
      dialogType: 'add',
      dialogVisible: false,

      partLevelOptions: [
        {
          label: '一般',
          value: '一般'
        },
        {
          label: '重要',
          value: '重要'
        },
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleInfo(row) {
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.form = deepClone(row)
    },
    handleAdd(date) {
      this.form = deepClone(defaultForm)
      this.form.time = date.getTime() / 1000
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    async getList() {
      const data = await getList(this.listQuery)
      // this.listQuery
      const list = deepClone(data.data.records)
      this.dataList = {}
      // this.dataList = deepClone(data.data.records)
      list.forEach((item) => {
        const day = new Date(parseTime(item.time * 1000, '{y}-{m}-{d}')).getTime()
        console.log(day)
        item.timeDay = day
        if (!this.dataList[day]) {
          this.$set(this.dataList, day, [])
        }
        this.dataList[day].push(item)
      })
      console.log(this.dataList)
      // this.total = data.data.total
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
          if (this.dialogType === 'add') {
            return new Promise((resolve, reject) => {
              addData(this.form).then(response => {
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
      })
    }
  }
}
</script>

<style scoped>
.activityBody {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.activityBody:hover .activityTitle .el-tag {
  display: inline-block;
}

.activityBody .activityTitle .el-tag {
  display: none;
}

.el-tag {
  margin-right: 1px;
}

.activityBody:hover {
  overflow: initial;
  min-height: 100%;
  height: auto;
  background-color: inherit;
}
</style>
