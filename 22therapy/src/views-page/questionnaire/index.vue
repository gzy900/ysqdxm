<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="search-item">
              <p class="search-item-title">问卷：</p>
              <p class="search-item-input">
                <el-cascader
                  placeholder="选择或者搜索想要查看的问卷"
                  :options="dicList"
                  :props="dicProp"
                  @change="handleDicChange"
                  filterable
                ></el-cascader>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="success" @click="handleAddQuestion"><i class="el-icon-search"/> 新增问题</el-button>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-card class="page-content question" v-for="(item,d_index) in dataList">
        <el-row>
          <el-col :span="20">
            <el-form-item label="问题名称">
              <el-input v-model="item.questionName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item label-width="20px">
              <el-button @click="handleDelQue(item,d_index)" type="text">删除问题</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-for="(a_item,index) in item.answers" :key="index">
          <el-col :span="14">
            <el-form-item label-width="100px" :label="'答案'+(index+1)">
              <el-input v-model="a_item.answerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="20px">
              <el-input v-model="a_item.score">
                <template slot="prepend">分值</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="20px">
              <el-button @click="handleDelAns(a_item,index,item)" type="text">删除答案</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="24">
          <el-form-item label-width="100px">
            <el-button type="primary" @click="handleAddAnswer(item)">新增答案</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item label="问题排序">
            <el-input v-model="item.orderNum"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item label="问题备注">
            <el-input v-model="item.remark"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="14">
          <el-form-item label="操作">
            <el-button type="success" @click="handleSubmit(item)">提交</el-button>
          </el-form-item>
        </el-col>

      </el-card>
    </el-form>
  </div>
</template>

<script>

import {parseTime, deepClone} from '@/utils'
import {getList, addData, upData, delQuest, delAnswer} from '@/api/questionnaire'
import {getList as getDicList} from '@/api/dictionary'

const defaults_form_question = {
  answers: [],
  orderNum: '',
  questionName: '',
  questionType: '',
  score: '',
  remark: ''
}
const defaults_form_answer = {
  answerName: '',
  score: ''
}

export default {
  name: 'PatientInfo',
  components: {},
  filters: {
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
      dataList: [],
      form: {},
      dicList: [],
      dicProp: {
        label: 'field',
        value: 'did'
      },
      listQuery: {
        questionType: null
      }
    }
  },
  created() {
  },
  mounted() {
    this.getDicList()
  },
  methods: {
    handleAddAnswer(item) {
      const data = deepClone(defaults_form_answer)
      item.answers.push(data)
    },
    handleAddQuestion() {
      if (!this.listQuery.questionType || this.listQuery.questionType.length <= 0) {
        this.$message({
          message: '请先选择问卷！',
          type: 'error'
        })
        return
      }
      this.form = deepClone(defaults_form_question)
      this.form.questionType = this.listQuery.questionType
      this.dataList.unshift(this.form)
    },

    async getDicList() {
      const data = await getDicList({parentId: '081d9e95d3dc4b0b82a4a9e2fe3f3d4e'})
      this.dicList = data.data
      this.washDicData(this.dicList)
      console.log(this.dicList)
    },
    handleDelQue(item, index) {
      if (item.questionId && item.questionId.length > 0) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            delQuest({questionId: item.questionId}).then(response => {
              console.log(response)
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.handleDelQueData(index)
              resolve(true)
            }).catch(() => {
              reject(false)
            })
          })
        })
      } else {
        this.handleDelQueData(index)
      }
    },
    handleDelQueData(index) {
      this.dataList.splice(index, 1)
    },
    handleDelAns(item, index, d_item) {
      if (item.answerId && item.answerId.length > 0) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            delAnswer({answerId: item.answerId}).then(response => {
              console.log(response)
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.handleDelAnsData(index, d_item)
              resolve(true)
            }).catch(() => {
              reject(false)
            })
          })
        })

      } else {
        this.handleDelAnsData(index, d_item)
      }
    },
    handleDelAnsData(index, d_item) {
      d_item.answers.splice(index, 1)
    },
    washDicData(list) {
      if (Object.prototype.toString.call(list) !== '[object Array]') {
        return
      }
      list.forEach((item) => {
        if (item.children && item.children.length <= 0) {
          item.children = null
        }
        if (item.children && item.children.length > 0) {
          this.washDicData(item.children)
        }
      })

    },
    async getList() {
      const data = await getList(this.listQuery)
      this.dataList = data.data
    },
    handleDicChange(value) {
      console.log(value)
      this.listQuery.questionType = value[value.length - 1]
      this.getList()
    },
    handleSubmit(data) {

      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (data.questionId && data.questionId.length > 0) {
            const list = []
            list.push(data)
            return new Promise((resolve, reject) => {
              upData(list).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.getList()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            const list = []
            list.push(this.form)
            return new Promise((resolve, reject) => {
              addData(list).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.dataList.shift()
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

<style scoped lang="scss">
.question {
  width: 66%;
  margin-bottom: 20px;
}
</style>
