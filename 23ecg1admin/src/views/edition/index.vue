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
              <el-select v-model="listQuery.audit" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in auditOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="listQuery.os" clearable placeholder="请选择平台">
                <el-option
                  v-for="item in osOption"
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
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.audit==='1'" type="danger" size="small" @click="handleDel(scope,'0')">冻结</el-button>
          <el-button v-else type="warning" size="small" @click="handleDel(scope,'1')">解冻</el-button>
          <el-button type="" size="small" @click="handleUp(scope)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.audit | stateTypeFilter">
            {{ scope.row.audit | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="平台" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.os | osTypeFilter">
            {{ scope.row.os | osNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="允许运行最大版本" width="140">
        <template slot-scope="scope">
          {{ scope.row.maxVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="允许运行最小版本" width="140">
        <template slot-scope="scope">
          {{ scope.row.minVersion }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="IOS更新地址" width="140">
        <template slot-scope="scope">
          {{ scope.row.updateIOSURL }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="安卓更新地址" width="140">
        <template slot-scope="scope">
          {{ scope.row.updateAndroidURL }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="大小" width="80">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="说明">
        <template slot-scope="scope">
          {{ scope.row.explain }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
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
        <el-form-item label="允许最大版本：" prop="maxVersion">
          <el-col :span="12">
            <el-input v-model="fromData.maxVersion" placeholder="请输入允许最大版本" />
          </el-col>
        </el-form-item>
        <el-form-item label="允许最小版本：" prop="minVersion">
          <el-col :span="12">
            <el-input v-model="fromData.minVersion" placeholder="请输入允许最小版本" />
          </el-col>
        </el-form-item>

        <el-form-item label="状态：" prop="audit">
          <el-col :span="12">
            <el-select v-model="fromData.audit" clearable placeholder="请选择状态">
              <el-option
                v-for="item in auditOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="平台：" prop="os">
          <el-col :span="12">
            <el-select v-model="fromData.os" clearable placeholder="请选择平台">
              <el-option
                v-for="item in osOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="说明：">
          <el-col :span="12">
            <el-input v-model="fromData.explain" placeholder="请输入说明" />
          </el-col>
        </el-form-item>

        <el-form-item label="大小：">
          <el-col :span="12">
            <el-input v-model="fromData.size" placeholder="请输入大小" />
          </el-col>
        </el-form-item>

        <el-form-item label="IOS更新地址：">
          <el-col :span="12">
            <el-input v-model="fromData.updateIOSURL" placeholder="请输入IOS更新地址" />
          </el-col>
        </el-form-item>
        <el-form-item label="安卓更新地址：">
          <el-col :span="12">
            <el-input v-model="fromData.updateAndroidURL" placeholder="请输入安卓更新地址" />
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
import { getList, addData, upData } from '@/api/edition'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * os	是	string	0,Android,1,IOS
 maxVersion	是	string	允许运行最大的版本
 minVersion	是	string	允许正常使用的最小版本
 audit	是	string	是否可用，0，不可用，1，正常
 size	否	string	此次更新的包的大小
 explain	否	string	更新说明
 updateIOSURL	否	string	IOS更新的地址
 updateAndroidURL	否	string	Android更新的地址
 */

const defaultRow = {
  os: '',
  maxVersion: '',
  minVersion: '',
  audit: '',
  size: '',
  updateIOSURL: '',
  updateAndroidURL: '',
  explain: ''
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
    },
    osNameFilter(status) {
      const statusMap = {
        '1': 'IOS',
        '0': 'Android'
      }
      return statusMap[status]
    },
    osTypeFilter(status) {
      const statusMap = {
        '1': '',
        '0': 'warning'
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
        audit: '',
        os: ''
      },
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      auditOption: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '不可用',
          value: '0'
        }
      ],
      osOption: [
        {
          label: 'IOS',
          value: '1'
        },
        {
          label: 'Android',
          value: '0'
        }
      ],
      /**
       * 表单验证
       */
      rules: {
        maxVersion: [
          { required: true, message: '请输入允许运行最大版本', trigger: 'blur' }
        ],
        minVersion: [
          { required: true, message: '请输入允许运行最小版本', trigger: 'blur' }
        ],
        os: [
          { required: true, message: '请选择平台', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择状态', trigger: 'blur' }
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
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
      this.dialogVisibleType = 'add'
      this.dialogVisible = true

      this.$nextTick(() => {
        this.fromData = Object.assign({}, defaultRow)
        this.$refs['fromData'].resetFields()
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
          await upData({ id: row.id, audit: type })
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
