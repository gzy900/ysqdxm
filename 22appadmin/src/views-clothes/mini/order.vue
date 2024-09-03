<template>
  <div class="app-container">
    <el-row>
      <!--      <el-col :span="6">-->
      <!--        <el-button type="primary" @click="handleAdd">新增医生</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="18">-->
      <!--        <div class="form-search">-->
      <!--          &lt;!&ndash;          <el-input&ndash;&gt;-->
      <!--          &lt;!&ndash;            clearable&ndash;&gt;-->
      <!--          &lt;!&ndash;            v-model="listQuery.pd_type"&ndash;&gt;-->
      <!--          &lt;!&ndash;            placeholder="id">&ndash;&gt;-->
      <!--          &lt;!&ndash;          </el-input>&ndash;&gt;-->
      <!--          <el-button-->
      <!--            type="primary"-->
      <!--            @click="handleSearch">搜索-->
      <!--          </el-button>-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <!--      <el-table-column align="center" label="操作" width="200">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button v-if="scope.row.vip===0" type="primary" size="small" @click="handleOnVip(scope)">升级VIP</el-button>-->
      <!--          <el-button v-else type="warning" size="small" @click="handleOffVip(scope)">取消VIP</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="订单ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.orderId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务类型" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.serviceType | typeFilterType">
            {{ scope.row.serviceType | typeFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买人uuid" width="280">
        <template slot-scope="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享人代码" width="110">
        <template slot-scope="scope">
          {{ scope.row.inviteCode === 'null' ? ' ' : scope.row.inviteCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="礼物" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gift | giftFilterType">
            {{ scope.row.gift | giftFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用人姓名" width="160">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄" width="80">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="size" width="80">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身高" width="80">
        <template slot-scope="scope">
          {{ scope.row.height }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="体重" width="80">
        <template slot-scope="scope">
          {{ scope.row.weight }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式" width="120">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货地址">
        <template slot-scope="scope">
          {{ scope.row.address + scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="140">
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
        <el-form-item label="医生姓名：" prop="zhuzhi_name">
          <el-col :span="10">
            <el-input v-model="fromData.zhuzhi_name" placeholder="请输入医生姓名"/>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式：" prop="telephone">
          <el-col :span="10">
            <el-input v-model="fromData.telephone" placeholder="请输入联系方式"/>
          </el-col>
        </el-form-item>

        <el-form-item label="所属机构：" prop="hospital">
          <el-col :span="10">
            <el-input v-model="fromData.hospital" placeholder="请输入所属机构" disabled/>
          </el-col>
        </el-form-item>

        <el-form-item label="绑定二维码：" prop="bd_code">
          <el-col :span="24">
            <el-input v-model="fromData.bd_code" placeholder="请输入绑定二维码"/>
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
import { getList } from '@/api/clothes/mini/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  address: '',
  age: 0,
  area: '',
  createTime: 0,
  createUser: '',
  gift: 0,
  giftUser: '',
  height: 0,
  id: 0,
  inviteCode: '',
  orderId: '',
  phone: '',
  serviceType: 0,
  sex: 0,
  size: '',
  updateTime: 0,
  userName: '',
  weight: 0
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
    },
    typeFilterType(type) {
      const statusMap = {
        1: 'info',
        2: 'warning',
        3: 'success',
        4: '',
      }
      return statusMap[type]
    },
    typeFilterName(type) {
      const statusMap = {
        1: '灵心一月',
        2: '灵心一季',
        3: '灵心半年',
        4: '灵心一年',
      }
      return statusMap[type]
    },
    giftFilterType(type) {
      const statusMap = {
        0: 'info',
        1: '',
      }
      return statusMap[type]
    },
    giftFilterName(type) {
      const statusMap = {
        0: '自购',
        1: '礼物',
      }
      return statusMap[type]
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
