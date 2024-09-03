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
          {{ scope.row.jurisdictionId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="160">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="路径">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="重定向" width="160">
        <template slot-scope="scope">
          {{ scope.row.redirect }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="组件" width="160">
        <template slot-scope="scope">
          {{ scope.row.component }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="组件名" width="160">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="图标" width="160">
        <template slot-scope="scope">
          {{ scope.row.icon }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="父组件" width="160">
        <template slot-scope="scope">
          {{ scope.row.father_component }}
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
        <el-form-item label="id：" prop="jurisdictionId">
          <el-col :span="18">
            <el-input v-model="fromData.jurisdictionId" placeholder="请输入ID" />
          </el-col>
        </el-form-item>

        <el-form-item label="描述：" prop="title">
          <el-col :span="18">
            <el-input v-model="fromData.title" placeholder="请输入描述" />
          </el-col>
        </el-form-item>

        <el-form-item label="访问路径：">
          <el-col :span="18">
            <el-input v-model="fromData.path" placeholder="请输入路径" />
          </el-col>
        </el-form-item>

        <el-form-item label="组件路径：">
          <el-col :span="18">
            <el-input v-model="fromData.component" placeholder="请输入组件路径" />
          </el-col>
        </el-form-item>

        <el-form-item label="重定向：">
          <el-col :span="18">
            <el-input v-model="fromData.redirect" placeholder="请输入重定向" />
          </el-col>
        </el-form-item>

        <el-form-item label="组件名：">
          <el-col :span="18">
            <el-input v-model="fromData.name" placeholder="请输入组件名" />
          </el-col>
        </el-form-item>

        <el-form-item label="图标：">
          <el-col :span="18">
            <el-input v-model="fromData.icon" placeholder="请输入图标" />
          </el-col>
        </el-form-item>

        <el-form-item label="父组件：">
          <el-col :span="18">
            <el-input v-model="fromData.father_component" placeholder="父组件" />
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
import { getList, addData, delData } from '@/api/power'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 jurisdictionId	是	string	医生权限唯一标识（10000,10001，10002），五位数
 title	是	string	权限描述
 path	否	string	路径
 component	否	string	组件
 redirect	否	string	重定向
 name	否	string	组件名
 icon	否	string	图标
 father_component
 */
const defaultRow = {
  jurisdictionId: '',
  title: '',
  path: '',
  component: '',
  redirect: '',
  name: '',
  icon: 'documentation',
  father_component: ''
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
        number: 10
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        jurisdictionId: [
          { required: true, message: '请输入组件Id', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入描述', trigger: 'change' }
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
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
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
    handleDel({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await delData({ 'jurisdictionId': row.jurisdictionId, 'doctorId': this.userInfo.doctorId })
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

    // 新增 权限信息
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

