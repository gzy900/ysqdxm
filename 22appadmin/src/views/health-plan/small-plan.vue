
<!--
info:健康小计划
author:wanq
time:2020-05-18 09:19:39
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建小计划</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-input
            clearable
            placeholder="请输入ID/名称">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="大计划Id" width="80">
        <template slot-scope="scope">
          {{ scope.row.bigId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="大计划标题" width="260">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="大计划描述">
        <template slot-scope="scope">
          {{ scope.row.introduce }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="小计划列表">
        <template slot-scope="scope">
          {{ scope.row.survey }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">停用</el-button>
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
      <el-form ref="fromData" :model="fromData" label-width="200px" :rules="rules" label-position="right">
        <el-input v-model="fromData.title" type="hidden" />
        <el-form-item label="小计划标题：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入小计划标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="所属大计划：" prop="title">
          <el-col :span="24">
            <el-autocomplete
              v-model="setMeal"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入选择套餐"
              value-key='taocan_name'
              @select="handleSearchSelectId">
            </el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item label="大计划计划周期：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入小计划标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="小计划计划执行器：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入小计划标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="小计划计划执行时间：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入小计划标题" />
          </el-col>
        </el-form-item>

        <el-form-item label="小计划内容：">
          <el-input
            v-model="fromData.introduce"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, editData, addData, deleteData } from '@/api/small-plan'
import { getBigList } from '@/api/big-plan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 *
 * bigId	是	string	大计划id
 period	是	string	大计划计划周期
 days	是	string	小计划计划执行期
 title	是	string	小计划标题
 plan	是	string	小计划内容
 plannedTime	是	string	小计划计划执行时间段
 *
 */
const defaultRow = {
  bigId: null,
  period: null,
  days: null,
  title: null,
  plan: null,
  plannedTime: null
}
export default {
  components: { Pagination },
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
      userType: null,
      userTypeOptions: [
        {
          label: '医生',
          value: '0'
        },
        {
          label: '患者',
          value: '1'
        }
      ],
      setMeal: null,
      sex: null,
      sexOptions: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        }
      ],
      /**
       * 分页参数
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
        title: [
          { required: true, message: '请输入套餐名', trigger: 'blur' },
          { min: 2, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入正确的价格', transform(value) { return parseFloat(value) }, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.dataList
      this.pageTotal = res.data.count
    },

    async getBigList() {
      const res = await getBigList()
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
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData({ 'bigId': row.bigId })
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
          if (this.fromData.smallId !== '' && this.fromData.smallId !== null && this.fromData.smallId !== undefined) {
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
            delete this.fromData.bigId
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
    },
    querySearchAsync(queryString, cb) {
      let restaurants = this.setMealOptions
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.taocan_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSearchSelectId(item) {
      this.fromData.bigId = item.bigId
      console.log(this.fromData.bigId)
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
