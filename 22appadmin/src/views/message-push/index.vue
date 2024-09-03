
<!--
info:健康大计划
author:wanq
time:2020-05-18 09:19:39
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建消息</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-select v-model="listQuery.checkState" clearable placeholder="请选择审核状态">
            <el-option
              v-for="item in checkStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            clearable
            placeholder="请输入标题"
            v-model="listQuery.title">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="消息标题" width="260">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="消息内容">
        <template slot-scope="scope">
          {{ scope.row.alert }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送类别" width="100">
        <template slot-scope="scope">
          {{ scope.row.state | typeFilterName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.checkState | stateFilterTag">
            {{ scope.row.checkState | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转类别" width="100">
        <template slot-scope="scope">
          {{ scope.row.go | goFilterName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转URL" width="100">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-show="scope.row.checkState === '3'" type="success" size="small" @click="handleExamine(scope)">审核</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.title" type="hidden" />
        <el-form-item label="消息标题：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入消息标题" />
          </el-col>
        </el-form-item>

        <el-form-item label="消息内容：" prop="alert">
          <el-input
            v-model="fromData.alert"
            :autosize="{ minRows: 2, maxRows: 10}"
            type="textarea"
            placeholder="请输入消息内容"
          />
        </el-form-item>

        <el-form-item label="推送类型：" prop="state">
          <el-col :span="10">
            <el-select v-model="fromData.state" placeholder="请选择推送类型" disabled>
              <el-option
                v-for="item in auditOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

<!--        <el-form-item label="推送时间：" prop="title">-->
<!--          <el-col :span="24">-->
<!--            <el-input v-model="fromData.title" placeholder="请输入消息标题" />-->
<!--          </el-col>-->
<!--        </el-form-item>-->

        <el-form-item label="跳转类型：">
          <el-col :span="10">
            <el-select v-model="fromData.go" placeholder="请选择跳转类型">
              <el-option
                v-for="item in goOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="跳转URL：">
          <el-col :span="24">
            <el-input v-if="fromData.go === '2'" v-model="fromData.url" placeholder="请输入跳转链接" />

            <el-select v-else-if="fromData.go === '1'" v-model="fromData.url" placeholder="请选择跳转URL">
              <el-option
                v-for="item in appUrl"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button v-show="fromData.checkState !== '1'" type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="stateDialogVisible" :title="'审核'">
      <el-form ref="fromState" :model="fromData" label-width="120px" :rules="stateRules" label-position="right">
        <el-form-item label="选择：" prop="checkState">
          <el-col :span="20">
            <el-radio v-model="fromData.checkState" label="1">通过</el-radio>
            <el-radio v-model="fromData.checkState" label="2">不通过</el-radio>
            <!--            <el-radio v-model="fromData.state" label="0">待定</el-radio>-->
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="stateDialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleExamineData('fromState')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, editData, addData, deleteData, examineData } from '@/api/message-push'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * title	是	string	推送的标题
 alert	是	string	推送的内容
 state	是	string	推送类型，0，全推（广播），1，组推
 startTime	否	string	信息准备推送的时间
 url	否	string	跳转到指定页面
 go	否	string	需要跳转的页面
 */
const defaultRow = {
  title: null,
  alert: null,
  state: '0',
  startTime: null,
  url: '',
  go: null
}
export default {
  filters: {
    typeFilterName(status) {
      const statusMap = {
        '0': '全推',
        '1': '组推'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        '1': '审核通过',
        '2': '审核失败',
        '3': '审核中'
      }
      return statusMap[status]
    },
    stateFilterTag(status) {
      const statusMap = {
        '1': 'success',
        '2': 'danger',
        '3': 'warning'
      }
      return statusMap[status]
    },
    goFilterName(status) {
      const statusMap = {
        '1': '跳转APP',
        '2': '其他跳转'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',

      stateDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkStateOptions: [
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核不通过',
          value: '2'
        },
        {
          label: '未审核',
          value: '3'
        }
      ],
      auditOptions: [
        {
          label: '全推',
          value: '0'
        },
        {
          label: '组推',
          value: '1'
        }
      ],
      goOptions: [
        {
          label: 'APP内跳转',
          value: '1'
        },
        {
          label: '其他跳转',
          value: '2'
        }
      ],
      appUrl: [
        {
          label: '首页',
          value: 'index'
        }
      ],
      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        checkState: '',
        title: ''
      },
      pageTotal: 0,

      /**
       * 表单验证
       */
      rules: {
        title: [
          { required: true, message: '请输入消息标题', trigger: 'blur' },
          { min: 2, max: 20, message: '请输入 2 至 20 个字 ', trigger: 'blur' }
        ],
        alert: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择推送类型', trigger: 'blur' }
        ]
      },
      stateRules: {
        checkState: [
          { type: 'enum', enum: ['1', '2'], required: true, message: '请选择审核状态', trigger: 'blur' }
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
      this.dialogVisible = true
      this.fromData = deepClone(scope.row)
    },
    /**
     * 打开审核窗口
     */
    handleExamine(scope) {
      this.stateDialogVisible = true
      this.fromData = deepClone(scope.row)
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
          await deleteData({ 'id': row.id })
          this.dataList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 审核
     */
    handleExamineData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        this.$confirm('确定此操作吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '返回',
          type: 'warning'
        })
          .then(async() => {
            await examineData({ 'id': this.fromData.id, 'checkState': this.fromData.checkState })
            this.stateDialogVisible = false
            this.getList()
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      })
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
          if (this.fromData.id !== '' && this.fromData.id !== null && this.fromData.id !== undefined) {
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
            delete this.fromData.id
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
