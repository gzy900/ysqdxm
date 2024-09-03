<template>
  <div class="container">
    <page-header content="编辑" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-plus" style="padding-right: 10px" />
        <span>角色编辑</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="FORM" :model="form" :inline="true" :rules="rules" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="输入手机号" style="width: 300px" clearable />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="form.realname" placeholder="输入姓名" style="width: 300px" clearable />
          </el-form-item>
          <el-form-item label="科室" prop="department">
            <el-select v-model="form.department" style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in departments"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="角色类型" prop="type">
            <el-select v-model="form.type" style="width: 300px;" placeholder="请选择" @change="onChangeRole">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="isShowSelectMaster" label="二线医生">
            <el-select v-model="form.master" style="width: 300px;" placeholder="请选择" @change="onChangeRole">
              <el-option
                v-for="item in masters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box" style="text-align: right; margin-right: 20px">
        <el-button type="primary" size="medium" @click="onAdd">编辑</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as role from '../../api/doctor'
import { getList } from '../../api/department'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择科室', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ]
      },
      form: {
        mobile: '',
        realname: '',
        department: '',
        type: '',
        master: ''
      },
      // is show select master
      isShowSelectMaster: false,
      // mock data
      types: [
        { label: '一线医生', value: '1' },
        { label: '二线医生', value: '2' }
      ],
      // real data from server
      departments: [],
      masters: []
    }
  },
  computed: {
    hospital() {
      return this.$store.getters.hospital
    },
    department() {
      return this.$store.getters.department
    }
  },
  watch: {
    'form.department'(value) {
      this.getAll2(value)
    }
  },
  created() {
    this.query = this.$route.query
    const { id, type } = this.$route.query
    this.getById(id, type)
    this.getAll2()
    this.getAllDepartment()
  },
  methods: {
    async getById(id, type) {
      let result
      try {
        result = await role[`get${type}ById`](id)
      } catch (error) {
        return console.log(error)
      }
      console.log(result.data.data)
      const { department: departments, users, master } = result.data.data
      const [department] = departments
      const { realname, mobile } = users
      this.form = {
        master,
        department,
        realname,
        mobile,
        type
      }
      this.isShowSelectMaster = type === '1'
    },
    async getAll2(value) {
      let result
      try {
        const params = { department_id: value === undefined ? this.department : value }
        result = await role.getAll2(params)
      } catch (error) {
        return console.error(error)
      }
      this.masters = result.data.data.map((item) => ({ label: item.users.realname, value: item.id }))
    },
    async getAllDepartment() {
      let result
      try {
        const params = { hospital_id: this.hospital }
        result = await getList(params)
      } catch (error) {
        return console.error(error)
      }
      console.log(result)
      this.departments = result.data.data.map((item) => ({ label: item.name, value: item.id }))
    },
    onChangeRole(type) {
      console.log(type)
      if (type === '1') {
        this.isShowSelectMaster = true
        this.getAll2()
      } else if (type === '2') {
        this.isShowSelectMaster = false
      }
    },
    async onAdd() {
      const { id } = this.$route.query
      try {
        await this.$refs['FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const { mobile, realname, department, type, master } = this.form
      if (type === '1') {
        if (!master) {
          return this.$message({
            message: '请选择二线医生',
            type: 'error'
          })
        }
        const data = {
          users: {
            mobile,
            realname
          },
          department: [department],
          master
        }
        try {
          await role.edit1({ id }, data)
        } catch (error) {
          this.$message({
            type: 'error',
            message: error
          })
          return console.error(error)
        }
      } else if (type === '2') {
        const data = {
          users: {
            mobile,
            realname
          },
          department: [department]
        }

        try {
          await role.edit2({ id }, data)
        } catch (error) {
          this.$message({
            type: 'error',
            message: error
          })
          return console.error(error)
        }
      }

      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.$router.back()
    }
  }
}
</script>
