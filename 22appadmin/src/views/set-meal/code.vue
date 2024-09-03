<!--
info:兑换码管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">生成兑换码</el-button>
        <el-button @click="handleAddTwo">生成二维码</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-input
            v-model="listQuery.organization_name"
            clearable
            placeholder="请输入机构名称">
          </el-input>
<!--          <el-autocomplete-->
<!--            clearable-->
<!--            v-model="queryOrganization"-->
<!--            :fetch-suggestions="organizationQuerySearchAsync"-->
<!--            placeholder="请输入选择机构"-->
<!--            value-key='organization_name'-->
<!--            @select="queryOrganizationHandleSearchSelectId">-->
<!--          </el-autocomplete>-->
          <el-autocomplete
            clearable
            v-model="setMeal"
            :value="listQuery.taocan_id"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入选择套餐"
            value-key='taocan_name'
            @select="handleSearchSelectId">
          </el-autocomplete>
          <el-select clearable v-model="listQuery.is_used" placeholder="是否使用">
            <el-option
              v-for="item in is_usedOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            v-model="listQuery.condition"
            clearable
            placeholder="请输入兑换码">
          </el-input>

          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table @selection-change="tableSelect" :data="dataList" style="width: 100%;margin-top:30px;" border>
<!--      <el-table-column align="center" label="操作" width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.code_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="兑换码" width="220">
        <template slot-scope="scope">
          {{ scope.row.code_ccid }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否使用" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_used | stateFilterType">
            {{ scope.row.is_used | stateFilterName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构" width="220">
        <template slot-scope="scope">
          {{ scope.row.organization_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.create_date | parseTime('{y}-{m}-{d}')}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联套餐名称" width="140">
        <template slot-scope="scope">
          {{ scope.row.taocan_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联套餐描述">
        <template slot-scope="scope">
          {{ scope.row.taocan_desc }}
        </template>
      </el-table-column>

    </el-table>

    <Pagination
      v-show="pageTotal>0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">

        <el-form-item label="选择套餐：" prop="taocan_id" disabled>
          <el-col :span="10">
            <el-autocomplete
              v-model="setMealData"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入并选择套餐"
              @select="handleConfirmSelectId"
              value-key='taocan_name'
              @input="handleConfirmSelectIdChange"
            >
            </el-autocomplete>
          </el-col>
        </el-form-item>

        <el-form-item label="选择机构：" prop="organizationId" disabled>
          <el-col :span="10">
            <el-autocomplete
              clearable
              v-model="organizationValue"
              :fetch-suggestions="organizationQuerySearchAsync"
              :debounce="0"
              placeholder="请输入选择机构"
              value-key='organization_name'
              @select="organizationHandleSearchSelectId"
              @input="organizationHandleChange"
            >
            </el-autocomplete>
          </el-col>
        </el-form-item>

        <el-form-item label="生成数量：" prop="counts">
          <el-col :span="10">
            <el-input-number
              controls-position="right"
              v-model="fromData.counts"
              :min="1"
              :precision="0"
              :step="10">
            </el-input-number>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog width="80%" :visible.sync="dialogVisibleAddTwo">
      <code-zip :arr="codeTwoList" />
    </el-dialog>
  </div>
</template>

<script>
import { getCodeList, addCode, getList } from '@/api/set-meal'
import { getList as getOrganizationList } from '@/api/organization'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import codeZip from './code-zip'

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  taocan_id: '',
  taocan_days: '',
  bigId: '',
  organizationId: '',
  counts: ''
}
export default {
  filters: {
    stateFilterType(status) {
      const statusMap = {
        0: 'success',
        1: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        0: '否',
        1: '是'
      }
      return statusMap[status]
    }
  },
  components: { Pagination, codeZip },
  data() {
    return {
      dialogVisibleAddTwo: false,
      codeTwoList: [],
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      queryOrganization: null,
      organizationValue: null,
      organizationOptions: null,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      imageUrl: [],
      setMeal: null,
      setMealData: null,
      setMealOptions: [
        {
          label: '套餐1',
          value: '0'
        },
        {
          label: '套餐2',
          value: '1'
        }
      ],
      is_usedOption: [
        {
          label: '已使用',
          value: '1'
        },
        {
          label: '未使用',
          value: '0'
        }
      ],
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        condition: null,
        taocan_id: null,
        organizationId: null,
        organization_name: null,
        is_used: null
      },
      pageTotal: 0,

      /**
       * 表单验证
       */
      rules: {
        taocan_id: [
          { required: true, message: '请选择套餐', trigger: 'change' }
        ],
        organizationId: [
          { required: true, message: '请选择机构', trigger: 'change' }
        ],
        counts: [
          { required: true, message: '请输入生成数量（1及以上）', min: 1, trigger: 'change', type: 'number' }
        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
    this.loadAll()
    this.loadOrganization()
  },
  methods: {
    // 生成二维码
    handleAddTwo() {
      if (this.codeTwoList.length > 0) {
        this.dialogVisibleAddTwo = true
      } else {
        this.$notify({
          title: '未选择任何数据，请在表格第一列勾选要生成的二维码',
          type: 'warning'
        })
      }
    },
    tableSelect(selection) {
      this.codeTwoList = selection
    },
    async loadAll() {
      const les = await getList()
      this.setMealOptions = les.data
    },
    async loadOrganization() {
      const les = await getOrganizationList({
        pageNo: 1,
        number: 100
      })
      this.organizationOptions = les.data.dataList
    },
    async getList() {
      const res = await getCodeList(this.listQuery)
      this.dataList = res.data.result
      this.pageTotal = res.data.totalRecord
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageNo = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.fromData = Object.assign({}, defaultRow)
      this.imageUrl = []
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData(row.key)
          this.rolesList.splice($index, 1)
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
          this.fromData.taocan_id = parseInt(this.fromData.taocan_id)
          addCode(this.fromData)
            .then(response => {
              this.dialogVisible = false
              this.$notify({
                title: '添加成功',
                type: 'success'
              })
              this.getList()
              // this.$notify({
              //   title: response.msg,
              //   type: 'error'
              // })
            })
            .catch(error => {
              reject(error)
            })
        })
      })
    },

    querySearchAsync(queryString, cb) {
      let restaurants = this.setMealOptions
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.taocan_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      };
    },

    organizationQuerySearchAsync(queryString, cb) {
      let restaurants = this.organizationOptions
      let results = queryString ? restaurants.filter(this.organizationCreateStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    organizationCreateStateFilter(queryString) {
      return (state) => {
        return (state.organization_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSearchSelectId(item) {
      this.listQuery.taocan_id = item.taocan_id
    },
    organizationHandleSearchSelectId(item) {
      this.fromData.organizationId = item.organizationId
    },
    organizationHandleChange() {
      this.fromData.organizationId = null
    },
    queryOrganizationHandleSearchSelectId(item) {
      this.listQuery.organizationId = item.organizationId
    },
    handleConfirmSelectId(item) {
      this.fromData.taocan_id = item.taocan_id
      this.fromData.bigId = item.bigId
      this.fromData.taocan_days = item.taocan_days
    },
    handleConfirmSelectIdChange() {
      this.fromData.taocan_id = null
      this.fromData.bigId = null
      this.fromData.taocan_days = null
    },
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
