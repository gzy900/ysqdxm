<!--
info:用户管理
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

      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="160">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="类别" width="160">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />

    <!--    //审核-->
    <el-dialog width="60%" :visible.sync="dialogVisible" :title="'审核'" @close="closeDialog">

      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-form-item label="类型：" prop="type">
          <el-col :span="18">
            <el-input v-model="fromData.type" placeholder="请输入类型" />
          </el-col>
        </el-form-item>

        <el-form-item label="描述：" prop="content">
          <el-col :span="18">
            <el-input v-model="fromData.content" placeholder="请输入描述" />
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
import { getList, addData, delData } from '@/api/record-type'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 doctorId	是	string	提交反馈的医生的唯一标识
 patientId	是	string	患者端的用户的唯一标识
 */
const defaultRow = {
  type: '',
  content: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: [],
      dialogVisible: false,
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
        type: [
          { required: true, message: '请输入类型', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入描述', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.result
      this.pageTotal = les.data.totalRecord
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    /**
     * 提交
     */
    handleAdd() {
      this.dialogVisible = true
    },
    handleDel({ index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await delData({ 'id': row.id })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.dataList.splice(index, 1)
          // this.getList()
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 上传 反馈信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
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

