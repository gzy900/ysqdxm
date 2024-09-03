<!--
info:用户管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button
          type="primary"
          @click="handleEditOrganization('pl')">批量修改机构
        </el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <el-autocomplete
            clearable
            v-model="listQuery.organization_name"
            :fetch-suggestions="organizationQuerySearchAsync"
            :debounce="0"
            placeholder="请输入选择机构"
            value-key='organization_name'
            @select="organizationHandleSearchSelectIdListQuery"
            @input="organizationHandleChangeListQuery"
          >
          </el-autocomplete>
          <el-select clearable v-model="listQuery.state" placeholder="请选择状态">
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            v-model="listQuery.content"
            clearable
            placeholder="请输入ID/名称">
          </el-input>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border @selection-change="handleTableSelect">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>

      <el-table-column align="center" label="操作" width="540">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleAddPhone(scope)">电话访问</el-button>
          <el-button size="small" @click="handlePhoneList(scope)">电访记录</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button v-show="scope.row.state === '1'" type="warning" size="small" @click="editState(scope,2)">冻结</el-button>
          <el-button v-show="scope.row.state === '2'" type="danger" size="small" @click="editState(scope,1)">解冻</el-button>
          <el-button v-show="scope.row.member_state ==='0'" type="danger" size="small" @click="handleDelMember(scope)">解除会员</el-button>
          <el-button size="small" @click="handleEditOrganization(scope)">修改机构</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.state | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会员状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.member_state | memberStateFilterType">
            {{ scope.row.member_state | memberStateFilterName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电访次数" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.visit_count | visitFilter">
            {{ scope.row.visit_count }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="110">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="机构" width="210">
        <template slot-scope="scope">
          {{ scope.row.organization_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="60">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.mailBox }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出生日期" width="100">
        <template slot-scope="scope">
          {{ scope.row.birthdate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.photo"
            :preview-src-list="scope.row.photo | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="280">
        <template slot-scope="scope">
          {{ scope.row.uuid }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="110">
        <template slot-scope="scope">
          {{ scope.row.registerTime | parseTime('{y}-{m}-{d}') }}
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

<!--    用户信息查看-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-form-item label="用户昵称：" prop="username">
          <el-col :span="12">
            <el-input v-model="fromData.username" />
          </el-col>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-col :span="12">
            <el-input v-model="fromData.phone" />
          </el-col>
        </el-form-item>
        <el-form-item label="账户状态：" prop="state">
          <el-col :span="12">
            <el-select v-model="fromData.state" placeholder="请选择">
              <el-option
                v-for="item in setStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-col :span="12">
            <el-input type="number" v-model="fromData.age" />
          </el-col>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-col :span="12">
            <el-select v-model="fromData.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱：" prop="mailBox">
          <el-col :span="12">
            <el-input v-model="fromData.mailBox" />
          </el-col>
        </el-form-item>
        <el-form-item label="头像：" prop="imgList">
          <el-col :span="24">
            <el-checkbox-group v-model="imgList" />
            <el-upload
              ref="upload"
              action="*"
              accept="image/png, image/jpg, image/jpeg"
              list-type="picture-card"
              :show-file-list="true"
              :file-list="imgList"
              :auto-upload="false"
              :multiple="false"
              :on-remove="handleRemove"
              :on-change="handleChange"
            >
              <i class="el-icon-plus" />
              <div slot="tip" class="el-upload__tip" style="color: black">只能上传1M以内的文件</div>
            </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>
<!--    编辑电访记录-->
    <el-dialog :visible.sync="phoneDialogVisible" :title="dialogType==='edit'?'查看':'新增'">
      <el-form ref="phoneFromData" :model="phoneFromData" label-width="120px" label-position="right">
        <el-form-item label="姓名：">
          <el-col :span="12">
            <el-input v-model="phoneFromData.name" />
          </el-col>
        </el-form-item>

        <el-form-item label="性别：">
          <el-col :span="12">
            <el-select v-model="phoneFromData.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="出生日期：">
          <el-col :span="12">
            <el-date-picker
              v-model="phoneFromData.birthdate"
              type="date"
              value-format="yyyy-MM-dd">
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="购买套餐：">
          <el-col :span="12">
            <el-select v-model="phoneFromData.taocanRecord">
              <el-option
                v-for="item in packageList"
                :key="item.taocan_id"
                :label="item.taocan_name"
                :value="item.taocan_id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="续费时间：" hidden>
          <el-col :span="12">
            <el-input v-model="phoneFromData.taocanRecord" disabled/>
          </el-col>
        </el-form-item>


        <el-form-item label="饮食习惯：">
          <el-col :span="12">
            <el-input type="textarea" v-model="phoneFromData.dietaryHabit" />
          </el-col>
        </el-form-item>

        <el-form-item label="手术史：">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" content="多条记录以逗号隔开" placement="top">
              <el-input type="textarea" v-model="phoneFromData.surgeryHistory" placeholder="多条记录以逗号隔开" />
            </el-tooltip>
          </el-col>
        </el-form-item>

        <el-form-item label="用药史：">
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" content="多条记录以逗号隔开" placement="top">
              <el-input type="textarea" v-model="phoneFromData.medicineHistory" placeholder="多条记录以逗号隔开" />
            </el-tooltip>
          </el-col>
        </el-form-item>


        <el-form-item label="备注：">
          <el-col :span="24">
            <el-input type="textarea" v-model="phoneFromData.remark"  />
          </el-col>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="phoneDialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirmAddPhone('phoneFromData')">提交</el-button>
      </div>
    </el-dialog>
<!--    电访记录列表-->
    <el-dialog width="80%" :visible.sync="phoneListDialogVisible" :title="'电访记录列表'">

      <el-table :data="phoneDataList" style="width: 100%;margin-top:30px;" border>
<!--        <el-table-column align="center" label="操作" width="100">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="primary" size="small" @click="handleEdit(scope)" disabled>查看</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->

        <el-table-column align="center" label="姓名" width="100">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别" width="100">
          <template slot-scope="scope">
            {{ scope.row.sex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="出生日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.birthdate | parseTime('{y}-{m}-{d}')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="续费日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.bind_date }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="购买套餐" width="140">
          <template slot-scope="scope">
            {{ scope.row.taocanRecord }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用药史">
          <template slot-scope="scope">
            {{ scope.row.medicineHistory }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手术史">
          <template slot-scope="scope">
            {{ scope.row.surgeryHistory }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="饮食习惯">
          <template slot-scope="scope">
            {{ scope.row.dietaryHabit }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="回访备注">
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="phoneListLimit.pageTotal > 0"
        :total="phoneListLimit.pageTotal || 0"
        :page.sync="phoneListLimit.pageNo"
        :limit.sync="phoneListLimit.number"
        @pagination="getPhoneListUser"
      />

    </el-dialog>
<!--    修改用户机构-->
    <el-dialog :visible.sync="organizationDialogVisible" :title="'修改用户机构'">
      <el-form ref="fromData" :model="organizationFromData" label-width="120px" :rules="organizationRules" label-position="right">
        <el-form-item label="选择机构：" prop="organizationId" disabled>
          <el-col :span="10">
            <el-autocomplete
              clearable
              v-model="organizationValue"
              :fetch-suggestions="organizationQuerySearchAsync"
              :debounce="0"
              placeholder="请输入选择机构"
              value-key='organization_name'
              @select="organizationHandleSearchSelectId"
              @input="organizationHandleChange"
            >
            </el-autocomplete>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="organizationDialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleUpOrganization()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { myUploadImage } from '@/api/uploadImg'
import { deepClone } from '@/utils'
import { getList, editState, editData, getPackageList, addphone, getPhoneListUser, delMember } from '@/api/app-user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getList as getOrganizationList, editDataList } from '@/api/organization'

/**
 * 新增修改提交字段
 * uuid	是	string	用户唯一标识
 password	否	string	密码
 username	否	string	昵称
 phone	否	string	手机号
 state	否	string	用户状态,不传默认是全部状态,0，注册（没有设置密码），1，正常用户，2冻结用户
 age	否	string	年龄
 sex	否	string	性别
 mailBox	否	string	用户邮箱
 photo	否	string	用户头像
 */
const defaultRow = {
  uuid: '',
  username: '',
  phone: '',
  state: '',
  birthdate: '',
  sex: '',
  mailBox: '',
  photo: ''
}
const defaultOrganization = {
  uuid: '',
  organizationId: ''
}

// uuid	是	string	用户唯一标识
// name	是	string	用户姓名
// sex	是	string	用户性别
// birthdate	是	string	用户出生日期
// taocanRecord	是	string	用户购买套餐
// medicineHistory	是	string	用户的用药史
// surgeryHistory	是	string	用户的手术史
// dietaryHabit	是	string	用户的饮食习惯
// remark	否	string	回访备注
const defaultPhone = {
  uuid: '',
  name: '',
  sex: '',
  birthdate: '',
  taocanRecord: '',
  medicineHistory: '',
  surgeryHistory: '',
  dietaryHabit: '',
  remark: ''
}
export default {
  filters: {
    photoList(photo) {
      let photoList = []
      photoList.push(photo)
      return photoList
    },
    stateFilterType(status) {
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    visitFilter(status) {
      const statusMap = {
        0: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        0: '临时',
        1: '正常',
        2: '冻结'
      }
      return statusMap[status]
    },
    memberStateFilterType(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'warning'
      }
      return statusMap[status]
    },
    memberStateFilterName(status) {
      const statusMap = {
        0: '会员',
        1: '已过期',
        2: '非会员'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      phoneFromData: Object.assign({}, defaultPhone),
      organizationFromData: Object.assign({}, defaultOrganization),

      organizationValue: null,
      organizationOptions: null,

      selection: [],
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },

      // 电访相关
      phoneDialogVisible: false,
      phoneListDialogVisible: false,
      organizationDialogVisible: false,
      phoneDataList: [],
      phoneListLimit: {
        pageNo: 1,
        number: 10,
        pageTotal: 0,
        uuid: ''
      },

      packageList: [],
      image: null,
      imgList: [],
      imgUpload: true,
      setMeal: null,
      setStateOptions: [
        {
          label: '注册',
          value: '0'
        },
        {
          label: '正常',
          value: '1'
        },
        {
          label: '冻结',
          value: '2'
        }
      ],
      sex: null,
      sexOptions: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],

      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        content: null,
        state: null,
        organizationId: '',
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      organizationRules: {
        organization: [
          { required: true, message: '请选择机构', trigger: 'blur' }
        ]
      },
      rules: {
        username: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9\s]+$/, message: '只能输入汉字，英文，空格，数字及_', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        birthdate: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        mailBox: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        photo: [
          { type: 'array', message: '请上传一张图片头像', trigger: 'change', defaultField: { type: 'object' }}
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
    this.getList()
    this.getPackageList()
    this.loadOrganization()
  },
  methods: {
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },
    async loadOrganization() {
      const les = await getOrganizationList({
        pageNo: 1,
        number: 100,
        audit: 1
      })
      this.organizationOptions = les.data.dataList
    },

    getPackageList() {
      getPackageList().then(response => {
        this.packageList = response.data
      })
    },
    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
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
      this.imgUpload = false
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.fromData = deepClone(scope.row)
      this.imgList = []
      this.imgList.push({
        name: this.fromData.photo,
        url: this.fromData.photo
      })
    },
    /**
     * 打开编辑机构窗口
     */
    handleEditOrganization(scope) {
      this.organizationFromData = deepClone(defaultOrganization)
      if (scope === 'pl') {
        if (this.selection.length <= 0) {
          this.$notify({
            title: '未选择任何数据，请与下方表格行头部选择用户！',
            type: 'warning'
          })
          return
        }
        this.selection.forEach((item) => {
          this.organizationFromData.uuid += (item.uuid + ',')
        })
      } else {
        this.organizationFromData.uuid = scope.row.uuid
      }
      this.organizationDialogVisible = true
    },
    handleUpOrganization() {
      return new Promise((resolve, reject) => {
        editDataList(this.organizationFromData)
          .then(response => {
            this.organizationDialogVisible = false
            if (response.data) {
              this.$notify({
                title: '修改成功',
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify({
                title: '修改失败，请联系管理员',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleTableSelect(selection) {
      this.selection = selection
    },
    /**
     * 打开电访记录编辑窗口
     */
    handleAddPhone(scope) {
      this.dialogType = 'add'
      this.phoneFromData.birthdate = scope.row.birthdate
      this.phoneFromData.uuid = scope.row.uuid
      this.phoneFromData.sex = scope.row.sex || '男'
      this.phoneDialogVisible = true
      this.fromData = deepClone(scope.row)
    },
    /**
     * 打开电访记录列表窗口
     */
    handlePhoneList(scope) {
      this.phoneListDialogVisible = true
      this.phoneListLimit = {
        pageNo: 1,
        number: 10,
        uuid: scope.row.uuid
      }

      this.getPhoneListUser()
    },

    editState({ $index, row }, state) {
      let msg
      state === 1 ? msg = '解冻' : msg = '冻结'
      this.$confirm('确定' + msg + '吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await editState({ 'uuid': row.uuid, 'state': state })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
        .catch(err => { console.error(err) })
    },

    handleDelMember({ $index, row }) {
      this.$confirm('确定解除其会员身份吗?此功能仅对退款用户使用', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await delMember({ 'uuid': row.uuid })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
        .catch(err => { console.error(err) })
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await deleteData(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    // 提交新增电访记录
    handleConfirmAddPhone() {
      return new Promise((resolve, reject) => {
        addphone(this.phoneFromData)
          .then(response => {
            if (response.data) {
              this.phoneDialogVisible = false
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
    // 获取某个用户所有电访记录
    getPhoneListUser() {
      return new Promise((resolve, reject) => {
        getPhoneListUser(this.phoneListLimit)
          .then(response => {
            if (response.data) {
              this.phoneDataList = response.data.dataList
              this.phoneListLimit.pageTotal = response.data.count
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

    /**
     * 提交
     */
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.imgUpload ? this.handleBeforeUpload() : this.handleConfirmData()
      })
    },
    handleConfirmData() {
      return new Promise((resolve, reject) => {
        editData(this.fromData)
          .then(response => {
            if (response.data) {
              this.dialogVisible = false
              this.image = null
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


    // 文件状态发生时，添加选择文件时
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      this.imgUpload = true
      if (fileList[0].raw === null) {
        this.$notify.error({
          title: '警告',
          message: '请选择一张图片作为头像！'
        })
        return
      }
      if (
        !(
          fileList[0].raw.type === 'image/png' ||
          fileList[0].raw.type === 'image/jpg' ||
          fileList[0].raw.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/jpg, image/jpeg的图片'
        })
        fileList.splice(0, 1)
        this.image = null
        return
      }
      const isLt2M = fileList[0].raw.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        fileList.splice(0, 1)
        this.image = null
        return
      }
      this.image = fileList[0].raw
    },

    // 上传文件之前
    handleBeforeUpload() {
      if (this.image === null) {
        this.$notify.error({
          title: '警告',
          message: '请选择一张图片！'
        })
        return
      }
      if (
        !(
          this.image.type === 'image/png' ||
          this.image.type === 'image/jpg' ||
          this.image.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/jpg, image/jpeg的图片'
        })
        return
      }
      const isLt2M = this.image.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return
      }
      myUploadImage(this.image, this.handleSuccess, this.handleError)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.imgUpload = true
      this.image = null
      this.imgList = []
      console.log(fileList)
    },
    handleError() {
      this.$notify.warning({
        title: '警告',
        message:
          '图片上传失败'
      })
    },
    handleSuccess(res) {
      this.fromData.photo = res.data
      this.handleConfirmData()
    },

    organizationQuerySearchAsync(queryString, cb) {
      let restaurants = this.organizationOptions
      let results = queryString ? restaurants.filter(this.organizationCreateStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 200)
    },
    organizationCreateStateFilter(queryString) {
      return (state) => {
        return (state.organization_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    organizationHandleSearchSelectId(item) {
      this.organizationFromData.organizationId = item.organizationId
    },
    organizationHandleChange() {
      this.organizationFromData.organizationId = null
    },

    organizationHandleSearchSelectIdListQuery(item) {
      this.listQuery.organizationId = item.organizationId
    },
    organizationHandleChangeListQuery() {
      this.listQuery.organizationId = null
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
