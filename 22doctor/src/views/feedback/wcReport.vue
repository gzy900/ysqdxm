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

      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleUpStatus(scope)">删除</el-button>
          <el-button type="success" size="small" @click="handleConfirm(scope)">修改</el-button>
          <el-button type="success" size="small" @click="handleCheck(scope,2)">通过</el-button>
          <el-button type="success" size="small" @click="handleCheck(scope,3)">打回</el-button>
          <el-button v-if="scope.row.lock_state==='1'" type="warning" size="small" @click="handleUpLock(scope,0)">锁定
          </el-button>
          <el-button v-else type="danger" size="small" @click="handleUpLock(scope,1)">解锁</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="260">
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
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList, upData, upStatus, upLock } from '@/api/wc-report'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 jurisdictionId  是  string  医生权限唯一标识（10000,10001，10002），五位数
 title  是  string  权限描述
 path  否  string  路径
 component  否  string  组件
 redirect  否  string  重定向
 name  否  string  组件名
 icon  否  string  图标
 father_component
 */
const defaultRow = {
  checkId: '',
  checkIdName: '',
  doctorId: '',
  doctorIdName: '',
  feedbackExplain: '',
  feedbackDelayed: '',
  feedbackState: '',
  feedbackTime: '',
  id: '',
  isImport: '',
  lockDoctor: '',
  lockDoctorName: '',
  lockState: '',
  normalState: '',
  orgName: '',
  updateTime: '',
  url: ''
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
        pageSize: 10,
        uuid: undefined,
        feedbackState: undefined, // 反馈状态
        orgName: undefined, // 机构代码
        startTime: undefined,
        endTime: undefined
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
      const res = await getList(this.listQuery)
      console.log(res)
      this.dataList = res.data.result
      this.pageTotal = res.data.totalRecord
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
    handleUpStatus({ $index, row }) {
      this.$confirm('确定审核吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await upStatus({ 'jurisdictionId': row.jurisdictionId, 'doctorId': this.userInfo.doctorId })
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

    // 更新
    handleUpLock({ row }, status) {
      const data = Object.assign({}, {
        id: row.id,
        lockDoctor: '1234',
        lockDoctorName: '1234',
        lockState: status

      })

      return new Promise((resolve, reject) => {
        upLock(data)
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
      // })
    },

    handleCheck({ row }, status) {
      const data = Object.assign({}, {
        id: row.id,
        checkId: '1234',
        checkIdName: '1234',
        feedbackState: status
      })

      return new Promise((resolve, reject) => {
        upStatus(data)
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
    },
    // 更新
    handleConfirm({ row }, fromName) {
      this.fromData = Object.assign({}, {
        id: row.id,

        doctorId: '1234',
        doctorIdName: '1234',
        isImport: '0',
        feedbackState: '1',
        normalState: '0',
        feedbackExplain: '心肌梗死',
        url: '1234',

        feedbackTime: '5', // 反馈时间
        feedbackDelayed: '10', // 反馈延时
        //
        // checkId: '',
        // checkIdName: '',
        //
        // lockDoctor: '',
        // lockDoctorName: '',
        // lockState: '',
        //
        orgName: 'jgmc'
        // updateTime: '',
      })

      // this.$refs[fromName].validate(valid => {
      //   if (!valid) {
      //     return
      //   }
      return new Promise((resolve, reject) => {
        upData(this.fromData)
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
      // })
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

.el-tag-div {
  padding: 10px 0;
  margin-left: 120px;
}

</style>

