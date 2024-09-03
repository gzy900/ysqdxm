<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="handleAdd">新建</el-button>
      </el-col>
      <el-col :span="20">
        <div class="from-search">
          <p class="from-search-button">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </p>
          <el-row class="from-search-content" type="flex" justify="end" :gutter="10">
            <el-col :span="5">
              <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in stateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input v-model="listQuery.phone" clearable placeholder="请输入手机号码" />
            </el-col>
            <el-col :span="5">
              <el-input v-model="listQuery.username" clearable placeholder="请输入用户名" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='1'" type="danger" size="small" @click="handleDel(scope,'0')">冻结</el-button>
          <el-button v-else type="warning" size="small" @click="handleDel(scope,'1')">解冻</el-button>
          <el-button type="" size="small" @click="handleUp(scope)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账户名" width="140">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称" width="140">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="140">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.registerTime }}
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
    <el-dialog width="60%" :visible.sync="dialogVisible" :title="'新增/修改'" @close="closeDialog">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="dialogVisibleType==='add'?rules:rulesUp" label-position="right">
        <el-form-item label="账户名：" prop="username">
          <el-col :span="12">
            <el-input v-model="fromData.username" placeholder="请输入账户名" />
          </el-col>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-col :span="12">
            <el-input v-model="fromData.password" placeholder="请输入密码" type="password" />
          </el-col>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-col :span="12">
            <el-input v-model="fromData.nickname" placeholder="请输入昵称" />
          </el-col>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-col :span="12">
            <el-input v-model="fromData.phone" placeholder="请输入手机号" />
          </el-col>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-col :span="12">
            <el-select v-model="fromData.state" clearable placeholder="请选择账户状态">
              <el-option
                v-for="item in stateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { getList, addData, upData } from '@/api/user-manage-admin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 */

const defaultRow = {
  username: '',
  password: '',
  nickname: '',
  state: '',
  phone: '',
  registerTime: ''
}

export default {
  components: { Pagination },
  filters: {
    stateNameFilter(status) {
      const statusMap = {
        '1': '正常',
        '0': '冻结'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        '1': '',
        '0': 'danger'
      }
      return statusMap[status]
    }
  },
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
        pageSize: 10,
        phone: '',
        state: '',
        username: ''
      },
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      stateOption: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '冻结',
          value: '0'
        }
      ],
      /**
       * 表单验证
       */
      // add 表单验证
      // username: '',
      // password: '',
      // nickname: '',
      // state: '',
      // phone: '',
      rules: {
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择账户状态', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },
      // 更新表单验证
      rulesUp: {
        username: [
          { required: false, message: '请输入账户名', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: false, message: '请输入昵称', trigger: 'blur' }
        ],
        state: [
          { required: false, message: '请选择账户状态', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info',
      'region_option'
    ]),
    re_department() {
      let reList = []
      const hospitalId = this.fromData.department
      for (let j = 0; j < this.region_option.length; j++) {
        const cityList = this.region_option[j].list || []
        if (cityList.length > 0) {
          for (let k = 0; k < cityList.length; k++) {
            const hospitalList = cityList[k].list || []
            for (let h = 0; h < hospitalList.length; h++) {
              if (hospitalId === hospitalList[h].pid) {
                reList = [this.region_option[j].pid, cityList[k].pid, hospitalId]
              }
            }
          }
        }
      }
      return reList
    }
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
      this.dialogVisibleType = 'add'
      this.dialogVisible = true

      this.$nextTick(() => {
        this.fromData = Object.assign({}, defaultRow)
        this.$refs['fromData'].resetFields()

        this.fromData.creator = this.user_info.wid
        this.fromData.creator_name = this.user_info.username
      })
    },
    handleUp({ $index, row }) {
      this.fromData = deepClone(row)
      this.dialogVisibleType = 'up'
      this.dialogVisible = true
    },
    handleDel({ $index, row }, type) {
      this.$confirm('确定' + (type === '1' ? '解冻' : '冻结') + '该账户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await upData({ wid: row.wid, state: type })
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
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
            addData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '提交成功!',
                    type: 'success'
                  })
                  this.getList()
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
                  this.getList()
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
      this.dialogVisibleType = 'up'
      this.fromData = Object.assign({}, defaultRow)
      this.$refs['fromData'].resetFields()
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
