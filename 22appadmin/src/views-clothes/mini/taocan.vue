<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleDelete(scope)">删除</el-button>
          <!--          <el-button type="warning" size="small" @click="handleDelete(scope)">冻结</el-button>-->
          <!--          <el-button type="primary" size="small" @click="handleDelete(scope)">启用</el-button>-->
          <el-button type="" size="small" @click="handleEdit(scope)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐名字" width="220">
        <template slot-scope="scope">
          {{ scope.row.taocanName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="300">
        <template slot-scope="scope">
          {{ scope.row.originalPrice }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="300">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后修改时间">
        <template slot-scope="scope">
          {{ scope.row.updateTime | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"/>

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible"
               :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden"/>
        <el-form-item label="套餐名字：" prop="taocanName">
          <el-col :span="12">
            <el-input v-model="fromData.taocanName" placeholder="请输入套餐名字"/>
          </el-col>
        </el-form-item>
        <el-form-item label="价格：" prop="originalPrice">
          <el-col :span="12">
            <el-input v-model="fromData.originalPrice" placeholder="原始价格"/>
          </el-col>
        </el-form-item>
        <el-form-item label="套餐内容：" prop="content">
          <el-col :span="12">
            <el-input type="textarea" :rows="4" v-model="fromData.content" placeholder="套餐内容,多个以逗号隔开"/>
          </el-col>
        </el-form-item>
        <el-form-item label="启用状态：" prop="enableFlag">
          <el-col :span="12">
            <el-select v-model="fromData.enableFlag">
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="冻结"></el-option>
            </el-select>
            <!--            <el-input v-model="fromData.enableFlag" placeholder="原始价格"/>-->
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
import { getList, upData, addData, delData } from '@/api/clothes/mini/taocan'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  taocanName: null,
  originalPrice: null,
  enableFlag: 1,
  content: ''
}
export default {
  name: 'ClothesUser',
  filters: {
    vipFilterType(status) {
      const statusMap = {
        0: '',
        1: 'success'
      }
      return statusMap[status]
    },
    vipFilterName(status) {
      const statusMap = {
        0: '普通用户',
        1: 'VIP',
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
        pageNum: 1,
        pageSize: 10,
        enableFlag: null
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {}
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
      console.log(res.data.records)
      this.dataList = res.data.records
      this.pageTotal = res.data.total
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

    async updateVip(formData) {
      const res = await editData(formData)
      this.getList()
      if (res.code = '200') {
        this.$message({
          type: 'success',
          message: '成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '失败，请联系管理员!'
        })
      }
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

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async () => {
          await delData({ 'id': row.id })
          this.dataList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
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
        this.handleConfirmData()
      })
    },
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        if (this.dialogType === 'edit') {
          upData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$notify({
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$notify({
                  title: response.message,
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
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$notify({
                  title: response.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        }
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
