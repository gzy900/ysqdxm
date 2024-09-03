<template>
  <div>
    <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">

      <el-form-item label="标题：" prop="context">
        <el-col :span="18">
          <el-input v-model="fromData.context" placeholder="请输入标题" />
        </el-col>
      </el-form-item>

      <el-form-item label="内容：">
        <el-col :span="18">
          <el-input
            v-model="fromData.descs"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
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
          <el-select
            v-model="fromData.categoryId"
            clearable
            placeholder="请选择类别属性"
            @change="categoryIdChange"
          >
            <el-option
              v-for="item in categoryIdList"
              :key="item.id"
              :label="item.context"
              :value="item.id"
            />
          </el-select>
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

      <el-form-item v-if="source === 1" label="医生：">
        <el-col :span="18">
          <el-select v-model="fromData.doctorId" clearable placeholder="请选择医生，不选或选全部所有医生都能看到">
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

    <el-dialog width="60%" append-to-body :visible.sync="dialogVisible" :title="'新增类别'">

      <el-form ref="fromData" :model="fromDataCategory" label-width="120px" :rules="rulesCategory" label-position="right">

        <el-form-item label="标题：" prop="context">
          <el-col :span="18">
            <el-input v-model="fromDataCategory.context" placeholder="请输入标题" />
          </el-col>
        </el-form-item>

      </el-form>
      <div style="text-align: left;margin-left: 120px">
        <el-button type="primary" @click="handleConfirmDataCategory('fromData')">提交</el-button>
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addData, upData } from '@/api/tag'
import { getCategoryList, addData as addCategory } from '@/api/category'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination
const defaultRow = {
  id: '',
  context: '',
  descs: '',
  component: '',
  doctorId: '',
  isImport: '',
  critical: '0',
  type: '',
  categoryId: ''
}
const defaultRowCategory = {
  id: '',
  context: ''
}
export default {
  name: 'ReplyAdd',
  props: {
    source: {
      type: Number,
      default: 0 // 来源，0，反馈界面，1，快速回复管理
    },
    tagFrom: {
      type: Object, // 初始数据
      default: null
    },
    dialogVisibleType: {
      type: String, // 新增add 或 修改up
      default: 'add'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      fromDataCategory: Object.assign({}, defaultRowCategory),
      categoryIdList: [],
      pageTotal: 0,
      dialogVisible: false,
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
        },
        {
          label: '心肌缺血',
          value: '3'
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
          { required: true, message: '请输入标题', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ],
        critical: [
          { required: true, message: '请选择危急状态', trigger: 'change' }
          // { min: 2, max: 8, message: '请输入 2 至 8 个字 ', trigger: 'blur' }
        ]
      },
      rulesCategory: {
        context: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    // tagFrom() {
    //   console.log(this.tagFrom)
    //   this.fromData = deepClone(this.tagFrom)
    // }
  },
  created() {
    this.getCategoryList()
    if (this.tagFrom) {
      this.fromData = deepClone(this.tagFrom)
      this.fromData.doctorId = this.userInfo.doctorId
    }
  },
  methods: {
    async getCategoryList() {
      const les = await getCategoryList({ pageNo: 1, pageSize: 100 })
      this.categoryIdList = [{ id: '新建', context: '新建类别' }].concat(les.data.result)
    },
    // 新增 修改信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          if (!this.fromData.categoryId) {
            this.fromData.categoryId = 0
            this.fromData.category_id = 0
          }
          this.fromData.describe = this.fromData.descs
          if (this.dialogVisibleType === 'add') {
            addData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.$notify({
                    title: '提交成功!',
                    type: 'success'
                  })
                } else {
                  this.$notify({
                    title: '错误，请联系管理员！',
                    type: 'error'
                  })
                }
                this.fromData.id = response.data
                this.fromData.category_id = this.fromData.categoryId
                // this.fromData.descs = this.fromData.describe
                this.$emit('closeDialog', this.fromData)
              })
              .catch(error => {
                reject(error)
              })
          } else {
            upData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.$notify({
                    title: '提交成功',
                    type: 'success'
                  })
                } else {
                  this.$notify({
                    title: '错误，请联系管理员！',
                    type: 'error'
                  })
                }
                this.$emit('closeDialog')
              })
              .catch(error => {
                reject(error)
              })
          }
        })
      })
    },
    categoryIdChange(value) {
      if (value === '新建') {
        this.dialogVisible = true
      }
    },
    // 新增 修改信息
    handleConfirmDataCategory(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          delete this.fromDataCategory.id
          addCategory(this.fromDataCategory)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$notify({
                  title: '提交成功!',
                  type: 'success'
                })
                this.categoryIdList.push({ id: response.data, context: this.fromDataCategory.context })
                this.fromData.categoryId = response.data
                this.dialogVisible = false
              } else {
                this.$notify({
                  title: '错误，请联系管理员！',
                  type: 'error'
                })
                this.dialogVisible = false
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
