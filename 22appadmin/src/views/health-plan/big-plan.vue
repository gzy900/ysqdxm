
<!--
info:健康大计划
author:wanq
time:2020-05-18 09:19:39
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建大计划</el-button>
      </el-col>
<!--      <el-col :span="18">-->
<!--        <div class="form-search">-->
<!--          <el-input-->
<!--            clearable-->
<!--            placeholder="请输入ID/名称">-->
<!--          </el-input>-->
<!--          <el-button-->
<!--            type="primary"-->
<!--            @click="handleSearch">搜索-->
<!--          </el-button>-->
<!--        </div>-->
<!--      </el-col>-->
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
      <el-table-column align="center" label="计划标识" width="120">
        <template slot-scope="scope">
          {{ scope.row.sign | auditAllOptions }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="周期" width="100">
        <template slot-scope="scope">
          {{ scope.row.audit | stateFilterName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
<!--          <el-button type="danger" size="small" @click="handleDelete(scope)">停用</el-button>-->
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
      <el-form ref="fromData" :model="fromData" label-width="140px" :rules="rules" label-position="right">
        <el-input v-model="fromData.title" type="hidden" />
        <el-form-item label="大计划标题：" prop="title">
          <el-col :span="24">
            <el-input v-model="fromData.title" placeholder="请输入大计划标题" />
          </el-col>
        </el-form-item>

        <el-form-item label="选择周期：" prop="audit">
          <el-col :span="24">
            <el-select v-model="fromData.audit" placeholder="请选择">
              <el-option
                v-for="item in auditOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="计划标识：" prop="sign">
          <el-col :span="24">
            <el-select v-model="fromData.sign" placeholder="请选择">
              <el-option
                v-for="item in auditAllOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="描述：" prop="introduce">
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
import { getList, editData, addData, deleteData } from '@/api/big-plan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  bigId: null,
  title: null,
  introduce: null,
  sign: null,
  audit: null
}
export default {
  filters: {
    stateFilterName(status) {
      const statusMap = {
        'W': '周',
        'M': '月',
        'BM': '心电监测-月'
      }
      return statusMap[status]
    },
    auditAllOptions(status) {
      const statusMap = {
        '0': '周计划',
        '1': '月计划',
        '2': '季度计划',
        '3': '年度计划',
        '4': '心电监测管理',
        '5': '健康管理教练'
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
      defaultProps: {
        children: 'children',
        label: 'title'
      },
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
          label: '心电监测-月',
          value: 'BM'
        }
      ],
      auditAllOptions: [
        {
          label: '周计划',
          value: '0'
        },
        {
          label: '月计划',
          value: '1'
        },
        {
          label: '季度计划',
          value: '2'
        },
        {
          label: '年度计划',
          value: '3'
        },
        {
          label: '心电监测管理',
          value: '4'
        },
        {
          label: '健康管理教练',
          value: '5'
        },
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
          { required: true, message: '请输入大计划名称', trigger: 'blur' },
          { min: 2, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择周期', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        sign: [
          { required: true, message: '请选择标识', trigger: 'blur' }
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
      this.dataList = res.data
      // this.pageTotal = res.count
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
