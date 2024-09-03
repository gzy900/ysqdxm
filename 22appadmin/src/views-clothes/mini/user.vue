<template>
  <div class="app-container">
    <el-row>
      <!--      <el-col :span="6">-->
      <!--        <el-button type="primary" @click="handleAdd">新增医生</el-button>-->
      <!--      </el-col>-->
      <el-col :span="24">
        <div class="form-search">
          <el-input
            clearable
            v-model="listQuery.inviteCode"
            placeholder="邀请码">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>


    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="scope.row.vip===0" type="primary" size="small" @click="handleOnVip(scope)">升级VIP</el-button>
          <el-button v-else type="warning" size="small" @click="handleOffVip(scope)">取消VIP</el-button>
          <el-button type="" size="small" @click="handleEdit(scope)">修改折扣码</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邀请码" width="220">
        <template slot-scope="scope">
          {{ scope.row.inviteCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="uuid" width="300">
        <template slot-scope="scope">
          {{ scope.row.uuid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="VIP" width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.vip | vipFilterType">
            {{ scope.row.vip | vipFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享售出" width="160">
        <template slot-scope="scope">
          {{ scope.row.sale }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageSize"
      :limit.sync="listQuery.pageNum"
      @pagination="getList"/>

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible"
               :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden"/>
        <el-form-item label="uuid：" prop="zhuzhi_name">
          <el-col :span="10">
            <el-input v-model="fromData.uuid" placeholder="" disabled/>
          </el-col>
        </el-form-item>

        <!--        <el-form-item label="VIP：" prop="hospital">-->
        <!--          <el-col :span="10">-->
        <!--            <el-input v-model="fromData.hospital" placeholder="" disabled/>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->

        <el-form-item label="折扣码：" prop="bd_code">
          <el-col :span="24">
            <el-select v-model="fromData.discount">
              <el-option v-for="item in dicOption" :label="item.field" :value="item.did"></el-option>
            </el-select>
            <!--            <el-input v-model="fromData.discount" placeholder="请选择折扣码"/>-->
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
import { getList, editData } from '@/api/clothes/mini/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { getOption } from '@/api/clothes/dictionaries'

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {

  uuid: null,
  vip: null,
  discount: null,
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
        pageNum: 10,
        pageSize: 1,
        inviteCode: null
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {},
      dicOption: []
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
      this.getDic()
    },

    async getDic() {
      const res = await getOption({ did: '3fc7e9bbc12c499181ca469e5753cb55' })
      this.dicOption = res.data
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

    handleOffVip({ row }) {
      this.$confirm('确认撤销该用户VIP吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = deepClone(row)
        formData.vip = 0
        this.updateVip(formData)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    handleOnVip({ row }) {
      this.$confirm('确认升级该用户为VIP吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const formData = deepClone(row)
        formData.vip = 1
        this.updateVip(formData)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
          await deleteData({ 'id': row.id })
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
        if (this.fromData.id !== '' && this.fromData.id !== null && this.fromData.id !== undefined) {
          editData(this.fromData)
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
