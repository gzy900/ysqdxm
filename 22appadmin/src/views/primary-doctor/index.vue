<!--
info:主治医生
author:wanq
time:2020-05-27 11:27:08
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增医生</el-button>
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
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生姓名" width="120">
        <template slot-scope="scope">
          {{ scope.row.zhuzhi_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式" width="160">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属机构" width="120">
        <template slot-scope="scope">
          {{ scope.row.hospital }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间" width="140">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="二维码code">
        <template slot-scope="scope">
          {{ scope.row.bd_code }}
        </template>
      </el-table-column>

    </el-table>

<!--    <pagination-->
<!--      v-show="pageTotal > 0"-->
<!--      :total="pageTotal"-->
<!--      :page.sync="listQuery.pageNo"-->
<!--      :limit.sync="listQuery.number"-->
<!--      @pagination="getList" />-->

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden" />
        <el-form-item label="医生姓名：" prop="zhuzhi_name">
          <el-col :span="10">
            <el-input v-model="fromData.zhuzhi_name" placeholder="请输入医生姓名" />
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式：" prop="telephone">
          <el-col :span="10">
            <el-input v-model="fromData.telephone" placeholder="请输入联系方式" />
          </el-col>
        </el-form-item>

        <el-form-item label="所属机构：" prop="hospital">
          <el-col :span="10">
            <el-input v-model="fromData.hospital" placeholder="请输入所属机构" disabled />
          </el-col>
        </el-form-item>

        <el-form-item label="绑定二维码：" prop="bd_code">
          <el-col :span="24">
            <el-input v-model="fromData.bd_code" placeholder="请输入绑定二维码" />
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
import { getList, editData, addData, deleteData } from '@/api/primary-doctor'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {

  // id	int	主治医生ID
  // zhuzhi_name	string	主治医生姓名
  // telephone	string	手机号
  // hospital	string	所属医院
  // bd_code	string	绑定二维码
  // creatime_date	string	添加时间
  id: null,
  zhuzhi_name: null,
  telephone: null,
  hospital: '移视科技',
  bd_code: null
}
export default {
  filters: {
    stateFilterType(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        3: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '已审核',
        2: '未通过',
        3: '未审核'
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
        zhuzhi_name: [
          { required: true, message: '请输入医生姓名', trigger: 'blur' },
          { min: 1, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        hospital: [
          { required: true, message: '请输入所属机构', trigger: 'blur' }
        ],
        bd_code: [
          { required: true, message: '请输入绑定二维码', trigger: 'blur' },
          { max: 100, message: '最多输入100个字', trigger: 'blur' }
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
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data
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
