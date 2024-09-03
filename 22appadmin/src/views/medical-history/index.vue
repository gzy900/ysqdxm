<!--
info:病史模板
author:wanq
time:2020-05-27 11:27:08
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增病史</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <!--          <el-input-->
          <!--            clearable-->
          <!--            v-model="listQuery.pd_type"-->
          <!--            placeholder="id">-->
          <!--          </el-input>-->
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
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button v-show="scope.row.audit === '1'" type="warning" size="small" @click="editState(scope,1)">冻结</el-button>
          <el-button v-show="scope.row.audit === '0'" type="danger" size="small" @click="editState(scope,0)">解冻</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.caseId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.audit | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.medical_history }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList" />

    <!--    <pagination-->
    <!--      v-show="pageTotal > 0"-->
    <!--      :total="pageTotal"-->
    <!--      :page.sync="listQuery.pageNo"-->
    <!--      :limit.sync="listQuery.number"-->
    <!--      @pagination="getList" />-->

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-form-item label="病史标题：" prop="medical_history">
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="3"
              v-model="fromData.medical_history"
              placeholder="请输入病史标题"
            />
          </el-col>
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
import { getList, editData, addData } from '@/api/medical-history'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  id: null,
  medical_history: null,
}
export default {
  filters: {
    stateFilterType(status) {
      const statusMap = {
        0: 'danger',
        1: 'success',
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        0: '冻结',
        1: '正常',
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
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },

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
        medical_history: [
          { required: true, message: '请输入病史标题', trigger: 'blur' }
        ],
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
      this.listQuery.pageNo = 1
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
      this.checkStrictly = true
      this.fromData = deepClone(scope.row)
    },
    /**
     * 关闭窗口
     */
    handleDialogClose() {
      this.dialogVisible = false
      this.$refs['fromData'].resetFields()
    },

    editState({ $index, row }, state) {
      let msg
      state === 1 ? msg = '冻结' : msg = '解冻'
      this.$confirm('确定' + msg + '吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await editData({ 'caseId': row.caseId, 'audit': state })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
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
        this.handleConfirmData()
      })
    },
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        delete this.fromData.id
        addData(this.fromData)
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
