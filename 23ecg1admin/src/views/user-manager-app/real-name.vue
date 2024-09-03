<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
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
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state=== '3'" type="success" size="small" @click="handleDel(scope,'1')">通过</el-button>
          <el-button v-if="scope.row.state=== '3'" type="warning" size="small" @click="handleDel(scope,'2')">拒绝</el-button>
          <el-button type="" size="small" @click="handleUp(scope)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="真实姓名" width="140">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="身份证号码" width="200">
        <template slot-scope="scope">
          {{ scope.row.cardId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="身份证正面" width="100">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.frontPhoto"
            style="width: 30px; height: 30px;vertical-align:middle"
            :src="scope.row.frontPhoto"
            :preview-src-list="[scope.row.frontPhoto]"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="身份证反面" width="100">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.reversePhoto"
            style="width: 30px; height: 30px;vertical-align:middle"
            :src="scope.row.reversePhoto"
            :preview-src-list="[scope.row.reversePhoto]"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="手持身份证" width="100">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.handPhoto"
            style="width: 30px; height: 30px;vertical-align:middle"
            :src="scope.row.handPhoto"
            :preview-src-list="[scope.row.handPhoto]"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.submitTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否显示" width="80">
        <template slot-scope="scope">
          {{ scope.row.audit | audioNameFilter }}
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
        <el-form-item label="真实姓名：">
          <el-col :span="12">
            <el-input v-model="fromData.name" />
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-col :span="12">
            <el-input v-model="fromData.cardId" />
          </el-col>
        </el-form-item>
        <el-form-item label="身份证正面：">
          <el-col :span="12">
            <el-image
              v-if="fromData.frontPhoto"
              style="width: 160px; height: 160px;vertical-align:middle"
              :src="fromData.frontPhoto"
              :preview-src-list="[fromData.frontPhoto]"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="身份证反面：">
          <el-col :span="12">
            <el-image
              v-if="fromData.reversePhoto"
              style="width: 160px; height: 160px;vertical-align:middle"
              :src="fromData.reversePhoto"
              :preview-src-list="[fromData.reversePhoto]"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="手持身份证：">
          <el-col :span="12">
            <el-image
              v-if="fromData.handPhoto"
              style="width: 160px; height: 160px;vertical-align:middle"
              :src="fromData.handPhoto"
              :preview-src-list="[fromData.handPhoto]"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="提交时间：">
          <el-col :span="12">
            <el-input v-model="fromData.submitTime" />
          </el-col>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-col :span="12">
            <el-input v-model="fromData.audit" />
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align: left;margin-left: 120px">
        <el-button v-if="fromData.state=== '3'" type="success" @click="handleDel({row:fromData},'1')">通过</el-button>
        <el-button v-if="fromData.state=== '3'" type="danger" @click="handleDel({row:fromData},'2')">拒绝</el-button>
        <el-button type="warning" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, upData } from '@/api/real-name'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 */

const defaultRow = {
  state: ''
}

export default {
  components: { Pagination },
  filters: {
    stateNameFilter(status) {
      const statusMap = {
        '1': '审核通过',
        '2': '审核失败',
        '3': '未审核'
      }
      return statusMap[status]
    },
    audioNameFilter(status) {
      const statusMap = {
        '0': '已被删除',
        '1': '正常显示'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        '1': 'success',
        '2': 'danger',
        '3': 'warning'
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
        number: 10,
        phone: '',
        state: '',
        username: ''
      },
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      stateOption: [
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核失败',
          value: '2'
        },
        {
          label: '未审核',
          value: '3'
        }
      ],
      audioOption: [
        {
          label: '已被删除',
          value: '0'
        },
        {
          label: '正常显示',
          value: '1'
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
    handleDel({ row }, type) {
      this.$confirm('确定' + (type === '1' ? '通过' : '拒绝') + '该条申请吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await upData({ uuid: row.uuid, state: type })
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogVisible = false
          this.getList()
        })
        .catch(err => {
          console.error(err)
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
