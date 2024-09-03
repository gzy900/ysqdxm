
<!--
info:健康大计划
author:wanq
time:2020-05-18 09:19:39
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建小计划模板</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-select @change="getList" v-model="listQuery.str" placeholder="请选择模板类型">
            <el-option
              v-for="item in auditOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input-->
<!--            clearable-->
<!--            placeholder="请输入ID/名称">-->
<!--          </el-input>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            @click="handleSearch">搜索-->
<!--          </el-button>-->
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="小计划Id" width="80">
        <template slot-scope="scope">
          {{ scope.row.smallId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小计划标题" width="200">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="第几天执行" width="100">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="执行时间段" width="100">
        <template slot-scope="scope">
          {{ scope.row.plannedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | stateFilterType">
            {{ scope.row.type | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          {{ scope.row.plan }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"/>

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right" :disabled="dialogType==='edit'">
        <el-input v-model="fromData.title" type="hidden" />
        <el-form-item label="计划标题：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入计划标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="计划类型：" prop="type">
          <el-col :span="12">
            <el-select v-model="fromData.type" placeholder="请选择计划类型">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="模板类型：" prop="str">
          <el-col :span="12">
            <el-select v-model="fromData.str" placeholder="请选择模板类型">
              <el-option
                v-for="item in auditOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="计划时间：" prop="date">
          <el-col :span="12">
            <el-select v-model="fromData.date" placeholder="请选择">
              <el-option
                v-for="item in daysOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="计划时间段：" prop="startTime">
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="fromData.startTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
                maxTime: fromData.endTime
              }">
            </el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="endTime">
          <el-col :span="12">
            <el-time-select
              placeholder="结束时间"
              v-model="fromData.endTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
                minTime: fromData.startTime
              }">
            </el-time-select>
          </el-col>
        </el-form-item>

        <el-form-item label="早晨额外加分：" prop="date">
          <el-col :span="12">
            <el-select v-model="fromData.clazz" placeholder="请选择">
              <el-option
                v-for="item in isAdditional"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="计划内容：" prop="plan">
          <el-col :span="24">
            <el-input
              v-model="fromData.plan"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入描述"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button v-show="dialogType!=='edit'" type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, editData, addData, deleteData } from '@/api/small-plan-tem'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 *date	是	string	第几天
 type	否	string	类型（1：测量型 2：监测型）
 title	否	string	小计划标题
 plan	否	string	小计划内容
 plannedTime	否	string	计划时间段
 str	是	string	小计划模板类型 （M:月 W：周）
 */
const defaultRow = {
  title: null,
  plan: null,
  type: null,
  str: null,
  date: null,
  clazz: null,
  plannedTime: null,
  startTime: null,
  endTime: null
}
export default {
  filters: {
    stateFilterType(status) {
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        '1': '测量型',
        '2': '监测型'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  watch: {
    'fromData.startTime'() {
      this.fromData.plannedTime = this.fromData.startTime + '-' + this.fromData.endTime
    },
    'fromData.endTime'() {
      this.fromData.plannedTime = this.fromData.startTime + '-' + this.fromData.endTime
    },
    'fromData.str'() {
      if (this.dialogType === 'new') {
        this.fromData.date = null
      }
    }
  },
  computed: {
    daysOptions: {
      get() {
        let days = 0
        if (this.fromData.str === 'W') {
          days = 7
        } else if (this.fromData.str === 'M' || this.fromData.str === 'BM') {
          days = 31
        } else {
          days = 0
        }
        return days
      }
    }
  },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      isAdditional: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      auditOptions: [
        {
          label: '周',
          value: 'W'
        },
        {
          label: '月',
          value: 'M'
        },
        {
          label: '心电监测管理',
          value: 'BM'
        }
      ],
      typeOptions: [
        {
          label: '测量型',
          value: '1'
        },
        {
          label: '监测型',
          value: '2'
        }
      ],
      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        str: 'W'
      },
      pageTotal: 0,

      /**
       * 表单验证
       */

      // title: null,
      // plan: null,
      // type: null,
      // str: null,
      // date: null,
      // plannedTime: null,
      // startTime: null,
      // endTime: null
      rules: {
        title: [
          { required: true, message: '请输入套餐名', trigger: 'blur' },
          { min: 2, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择计划类型', trigger: 'blur' }
        ],
        str: [
          { required: true, message: '请选择模板类型', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择计划执行于第几天', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        plan: [
          { required: true, message: '请选择计划内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.dataList
      this.pageTotal = res.data.count
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.fromData = Object.assign({}, defaultRow)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.fromData = deepClone(scope.row)
      this.dialogVisible = true
      this.fromData.str = this.listQuery.str
      const timeList = this.fromData.plannedTime.split('-')
      this.fromData.startTime = timeList[0]
      this.fromData.endTime = timeList[1]
    },
    /**
     * 关闭窗口
     */
    handleDialogClose() {
      this.dialogVisible = false
      this.$refs['fromData'].resetFields()
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData({ 'smallId': row.smallId,'str' : this.listQuery.str })
          this.dataList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 提交
     */
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          if (this.fromData.bigId !== '' && this.fromData.bigId !== null && this.fromData.bigId !== undefined) {
            editData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '修改成功',
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
            addData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '添加成功',
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

</style>
