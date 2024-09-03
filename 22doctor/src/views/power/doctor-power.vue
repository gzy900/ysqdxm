<!--
info: 血压测量反馈
author:wanq
time:2020-08-03 11:03:11
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="handleAdd">新建医生账户</el-button>
        <el-button type="" @click="handleBindUser">用户绑定医生</el-button>
      </el-col>
      <!--      <el-col :span="18">-->
      <!--        <div class="form-search">-->
      <!--          <el-input-->
      <!--            clearable-->
      <!--            placeholder="请输入ID/名称">-->
      <!--          </el-input>-->
      <!--          <el-button-->
      <!--            type="primary"-->
      <!--            @click="handleSearch">搜索-->
      <!--          </el-button>-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <!--          <el-button type="danger" size="small" @click="handleDelete(scope)">停用</el-button>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="140">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="级别" width="100">
        <template slot-scope="scope">
          {{ scope.row.rank }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属领导" width="120">
        <template slot-scope="scope">
          {{ scope.row.superiorId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.registerTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="权限">
        <template slot-scope="scope">
          {{ scope.row.jurisdictionId }}
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

    <el-dialog width="50%" :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'" @close="closeDialog">
      <el-form ref="fromData" :model="fromData" label-width="140px" :rules="rules" label-position="right">
        <el-form-item label="医生名称：" prop="username">
          <el-col :span="18">
            <el-input v-model="fromData.username" placeholder="请输入名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone">
          <el-col :span="18">
            <el-input v-model="fromData.phone" placeholder="请输入名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="密码：" :prop="dialogType==='edit'?'':'password'">
          <el-col :span="18">
            <el-input v-model="fromData.password" placeholder="请输入名称" />
          </el-col>
        </el-form-item>

        <el-form-item label="所属领导：">
          <el-col :span="18">
            <!--            <el-input v-model="fromData.superiorId" placeholder="请输入名称" />-->

            <el-select
              v-model="fromData.superiorId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入名字或手机号码搜索，不填写领导是自己"
              :remote-method="remoteMethod"
              :loading="leaderLoading"
            >
              <el-option
                v-for="item in restaurants"
                :key="item.doctorId"
                :label="item.username"
                :value="item.doctorId"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="账户级别：">
          <el-col :span="18">
            <el-select v-model="fromData.rank" placeholder="请选择">
              <el-option
                v-for="item in rankType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <!--        password: null,-->
        <!--        phone: null,-->
        <!--        rank: null,-->
        <!--        superiorId: null,-->
        <!--        username: null-->

        <el-form-item label="权限：">
          <el-col :span="18">
            <el-tree
              ref="tree"
              v-model="jurisdictionList"
              :data="powerList"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :check-strictly="checkStrictly"
              :props="defaultProps"
              @check-change="handleCheckChange"
            />
            <!--              :default-checked-keys="defaultList"-->

          </el-col>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog width="60%" :visible.sync="userDialogVisible" title="绑定用户">

      <el-row>
        <el-col :span="24">
          <div class="form-search">
            <el-select v-model="userListQuery.audit" disabled clearable placeholder="请选择状态">
              <el-option
                v-for="item in setStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-model="userListQuery.phone"
              clearable
              placeholder="请输入用户手机号码"
            />
            <el-button
              type="primary"
              @click="getUserList"
            >
              搜索
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="" size="small" @click="addUserDoctor(scope)">自动分配医生</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名称" width="160">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="uuid">
          <template slot-scope="scope">
            {{ scope.row.uuid }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="220">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="userPageTotal > 0"
        :total="userPageTotal"
        :page.sync="userListQuery.pageNo"
        :limit.sync="userListQuery.number"
        @pagination="getUserList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, addData, getPowerList, editData, getUserList, addUserDoctor } from '@/api/doctor-power'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 *
 doctorId	是	string	管理员的唯一标识
 username	是	string	注册用户昵称
 phone	是	string	用户手机号
 password	是	string	用户密码
 rank	是	string	级别,0,管理员，1，部门主管，2，普通用户
 jurisdictionId	否	string	注册用户的权限
 superiorId	否	string	上级负责人的doctorId,当rank为2时，必传
 */
const defaultRow = {
  doctorId: '',
  jurisdictionId: null,
  password: null,
  phone: null,
  rank: null,
  superiorId: null,
  username: null
}
export default {
  filters: {
    photoList(photo) {
      const photoList = []
      photoList.push(photo)
      return photoList
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      userList: [],
      dialogVisible: false,
      userDialogVisible: false,
      dialogType: 'new',

      jurisdictionList: [],
      defaultList: [],
      checkStrictly: true,
      restaurants: [],
      leaderLoading: false,
      powerList: [
        {
          label: '全部',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      rankType: [
        {
          label: '管理员',
          value: '0'
        },
        {
          label: '审核医生',
          value: '1'
        },
        {
          label: '普通判读医生',
          value: '2'
        }
      ],
      setStateOptions: [
        {
          label: '未绑定医生用户',
          value: 0
        },
        {
          label: '已绑定医生用户',
          value: 1
        }
      ],
      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        content: ''
      },
      userListQuery: {
        pageNo: 1,
        number: 10,
        phone: null,
        audit: 0
      },

      leaderListQuery: {
        pageNo: 1,
        number: 10,
        content: ''
      },

      pageTotal: 0,
      userPageTotal: 0,

      /**
       * 表单验证
       */
      rules: {
        username: [
          { required: true, message: '请输入医生名字', trigger: 'blur' }
        ],

        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // superiorId: [
        //   { required: true, message: '请选择所属领导', trigger: 'blur' },
        // ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getList()
    this.getPowerList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.dataList
      this.pageTotal = res.data.count
    },
    async getUserList() {
      const res = await getUserList(this.userListQuery)
      this.userList = res.data.dataList
      this.userPageTotal = res.data.count
    },
    async getPowerList() {
      const res = await getPowerList({ pageNo: 1, number: 100 })
      const powerList = res.data.dataList
      for (let i = 0; i < powerList.length; i++) {
        if (powerList[i].father_component && powerList[i].father_component.length > 0) {
          for (let j = 0; j < this.powerList[0].children.length; j++) {
            if (powerList[i].father_component === this.powerList[0].children[j].id) {
              this.powerList[0].children[j].children.push(
                {
                  id: powerList[i].jurisdictionId,
                  label: powerList[i].title,
                  children: ''
                }
              )
            }
          }
        } else {
          this.powerList[0].children.push(
            {
              id: powerList[i].jurisdictionId,
              label: powerList[i].title,
              children: []
            }
          )
        }
      }
    },

    async getLeaderList() {
      const res = await getList(this.leaderListQuery)
      this.restaurants = res.data.dataList
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageNo = 1
      this.getList()
    },

    /**
     * 搜索查询
     */
    handleUserSearch() {
      this.userListQuery.pageNo = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.isImgUpload = true
      this.imgList = []
      this.fromData = Object.assign({}, defaultRow)
      this.checkStrictly = false
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    /**
     * 打开绑定用户窗口
     */
    handleBindUser(scope) {
      this.userDialogVisible = true
      this.getUserList()
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.fromData = deepClone(scope.row)
      this.defaultList = this.fromData.jurisdictionId.split(',')

      this.checkStrictly = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.defaultList, true)
        this.checkStrictly = false
      })
    },
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes(false, true)
      this.jurisdictionList = []
      this.fromData.jurisdictionId = ''
      res.forEach((item) => {
        if (item.id) {
          this.jurisdictionList.push(item.id)
          this.fromData.jurisdictionId += item.id + ','
        }
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
        if (this.dialogType === 'new') {
          this.fromData.doctorId = this.userInfo.doctorId
          if (this.fromData.superiorId === null) {
          }
          addData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.image = null
                this.$notify({
                  title: '添加成功',
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
        } else {
          editData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.image = null
                this.$notify({
                  title: '添加成功',
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
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.leaderLoading = true
        this.leaderListQuery.content = query
        return new Promise((resolve, reject) => {
          getList(this.leaderListQuery)
            .then(response => {
              if (response.data) {
                this.restaurants = response.data.dataList
              } else {

              }
              this.leaderLoading = false
            })
            .catch(error => {
              this.leaderLoading = false
              reject(error)
            })
        })
      } else {
        this.restaurants = []
      }
    },
    addUserDoctor({ $index, row }) {
      return new Promise((resolve, reject) => {
        addUserDoctor({ patientId: row.uuid })
          .then(response => {
            if (response.data) {
            } else {
            }

            this.$notify({
              title: response.data.msg,
              type: 'success'
            })
          })
          .catch(error => {
            this.$notify({
              title: '请求错误',
              type: 'error'
            })
            reject(error)
          })
      })
    },
    closeDialog() {
      this.$refs.fromData.resetFields()
      this.$refs.tree.setCheckedKeys([])
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
