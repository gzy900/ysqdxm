<!--
info:回复管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">

    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新建</el-button>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
          <el-button type="" size="small" @click="handleUp(scope)">修改</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="160">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.context }}
        </template>
      </el-table-column>

    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getCategoryList"
    />

    <!--    //新增修改-->
    <el-dialog width="60%" append-to-body :visible.sync="dialogVisible" :title="'新增/修改'" @close="closeDialog">

      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">

        <el-form-item label="标题：" prop="context">
          <el-col :span="18">
            <el-input v-model="fromData.context" placeholder="请输入标题" />
          </el-col>
        </el-form-item>

      </el-form>
      <div style="text-align: left;margin-left: 120px">
        <el-button type="primary" @click="handleConfirmData('fromData')">提交</el-button>
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getCategoryList, addData, deleteData, upData } from '@/api/category'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * context: "快速回复1"
 */
const defaultRow = {
  id: '',
  context: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: [],
      dialogVisible: false,
      dialogVisibleType: 'add',
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        context: [
          { required: true, message: '请输入标题', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.getCategoryList()
  },
  methods: {

    async getCategoryList() {
      const les = await getCategoryList({ pageNo: 1, pageSize: 100 })
      this.dataList = les.data.result
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getCategoryList()
    },
    /**
     * 提交
     */
    handleAdd() {
      this.dialogVisibleType = 'add'
      this.dialogVisible = true
    },
    handleUp({ $index, row }) {
      this.fromData = deepClone(row)
      this.dialogVisibleType = 'up'
      this.dialogVisible = true
    },
    handleDel({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData({ id: row.id })
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
          this.dataList.splice($index, 1)
          // this.getList()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 新增 修改信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          if (this.dialogVisibleType === 'add') {
            delete this.fromData.id
            addData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '提交成功!',
                    type: 'success'
                  })
                  this.getCategoryList()
                } else {
                  this.$notify({
                    title: '错误，请联系管理员！',
                    type: 'error'
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          } else {
            upData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '提交成功',
                    type: 'success'
                  })
                  this.getCategoryList()
                } else {
                  this.$notify({
                    title: '错误，请联系管理员！',
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

    closeDialog() {
      this.$refs.fromData.resetFields()
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
  .el-tag-div{
    padding: 10px 0;
    margin-left: 120px;
  }

</style>

