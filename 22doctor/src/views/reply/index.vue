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
        <el-button type="" @click="typeDialogVisible = true">类别属性</el-button>
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

      <el-table-column align="center" label="内容" width="160">
        <template slot-scope="scope">
          {{ scope.row.context }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="小类别" width="160">
        <template slot-scope="scope">
          {{ scope.row.category_id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.descs }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="危急状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.critical | criticalType">
            {{ scope.row.critical | criticalName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目">
        <template slot-scope="scope">
          {{ scope.row.type | typeName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.isImport | isImportName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="使用次数" width="160">
        <template slot-scope="scope">
          {{ scope.row.count }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="医生Id" width="160">
        <template slot-scope="scope">
          {{ scope.row.doctorId }}
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

    <!--    //新增修改-->
    <el-dialog width="60%" :visible.sync="dialogVisible" :title="'新增/修改'" @close="closeDialog">

      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">

        <el-form-item label="内容：" prop="context">
          <el-col :span="18">
            <el-input
              v-model="fromData.context"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="描述：">
          <el-col :span="18">
            <el-input
              v-model="fromData.descs"
              type="textarea"
              :rows="4"
              placeholder="请输入描述"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="危急状态：" prop="critical">
          <el-col :span="18">
            <el-select v-model="fromData.critical" clearable placeholder="请选择危急状态">
              <el-option
                v-for="item in criticalOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="项目：" prop="type">
          <el-col :span="18">
            <el-select v-model="fromData.type" clearable placeholder="请选择项目">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="类型：" prop="isImport">
          <el-col :span="18">
            <el-select v-model="fromData.isImport" clearable placeholder="请选择类型">
              <el-option
                v-for="item in isImportList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="类别属性：">
          <el-col :span="18">
            <el-select v-model="fromData.category_id" clearable placeholder="请选择类别属性">
              <el-option
                v-for="item in categoryIdList"
                :key="item.id"
                :label="item.context"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="医生：">
          <el-col :span="18">
            <el-select v-model="fromData.doctorId" clearable placeholder="请选择医生，不选或选全部所有医生都能看到2">
              <el-option
                v-for="item in doctorList"
                :key="item.doctorId"
                :label="item.username"
                :value="item.doctorId"
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

    <el-dialog width="60%" :visible.sync="typeDialogVisible" :title="'类型'" @close="closeDialog">
      <reply-type />
    </el-dialog>

  </div>
</template>

<script>
import { getList, addData, deleteData, upData } from '@/api/tag'
import { getCategoryList } from '@/api/category'
import { getList as getDoctor } from '@/api/doctor-power'
import Pagination from '@/components/Pagination'
import replyType from './reply-type'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * context: "快速回复1"
 count: 0
 descs: "1"
 doctorId: "49529aae7223429b9ce45c133ce733bd"
 isImport: "1"
 type: "0"
 */

// 1：心率失常，2：心脏负荷

// 0：初步诊断，1：快速回复，2：医生建议
const defaultRow = {
  id: '',
  context: '',
  descs: '',
  component: '',
  doctorId: '',
  isImport: '',
  critical: '0',
  type: '',
  category_id: ''
}

export default {
  components: { Pagination, replyType },
  filters: {
    isImportName(status) {
      const statusMap = {
        0: '初步诊断',
        1: '快速回复',
        2: '医生建议'
      }
      return statusMap[status]
    },
    typeName(status) {
      const statusMap = {
        0: '全部',
        1: '心率失常',
        2: '心脏负荷'
      }
      return statusMap[status]
    },
    criticalName(status) {
      status = status || '0'
      const statusMap = {
        '0': '普通',
        '1': '危急'
      }
      return statusMap[status]
    },
    criticalType(status) {
      status = status || '0'
      const statusMap = {
        '0': '',
        '1': 'warning'
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
      typeDialogVisible: false,
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      categoryIdList: [],
      pageTotal: 0,
      isImportList: [
        {
          label: '初步诊断',
          value: '0'
        },
        {
          label: '快速回复',
          value: '1'
        },
        {
          label: '医生建议',
          value: '2'
        }
      ],
      typeList: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '心率失常',
          value: '1'
        },
        {
          label: '心脏负荷',
          value: '2'
        }
      ],
      criticalOption: [
        {
          label: '普通',
          value: '0'
        },
        {
          label: '危急',
          value: '1'
        }
      ],
      doctorList: [
        {
          username: '全部',
          doctorId: ''
        }
      ],
      /**
       * 表单验证
       */
      rules: {
        isImport: [
          { required: true, message: '请选择类型', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ],
        context: [
          { required: true, message: '请输入内容', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ],
        // type: [
        //   { required: true, message: '请选择项目', trigger: 'change' }
        //   // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        // ],
        critical: [
          { required: true, message: '请选择危急状态', trigger: 'change' }
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
    this.getList()
    this.getDoctor()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.result
      this.pageTotal = les.data.totalRecord
    },
    async getDoctor() {
      const les = await getDoctor({ pageNo: 1, pageSize: 50 })
      this.doctorList = this.doctorList.concat(les.data.dataList)
    },

    async getCategoryList() {
      const les = await getCategoryList({ pageNo: 1, pageSize: 100 })
      this.categoryIdList = les.data.result
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
          if (!this.fromData.category_id) {
            this.fromData.categoryId = 0
            this.fromData.category_id = 0
          }
          this.fromData.categoryId = this.fromData.category_id
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
            this.fromData.describe = this.fromData.descs
            this.fromData.categoryId = this.fromData.category_id
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

