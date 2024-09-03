<template>
  <div class="container">
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-search" style="padding-right: 10px" />
        <span>用户查询</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="SEARCH" :model="search" :inline="true" :rules="rules" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <!-- <el-form-item label="用户名">
            <el-input v-model="search.nickname" placeholder="输入用户名查询" style="width: 200px" clearable />
          </el-form-item> -->
          <el-form-item label="姓名">
            <el-input v-model="search.realname" placeholder="输入姓名查询" style="width: 200px" clearable />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="search.mobile" placeholder="输入手机号查询" style="width: 200px" clearable />
          </el-form-item>
          <el-form-item label="角色类型" prop="type">
            <el-select v-model="search.type" style="width: 300px;" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="是否锁定">
            <el-switch
              v-model="search.id_enable"
            />
          </el-form-item> -->
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
        <router-link to="/authority/doctor/add"><el-button type="primary" size="medium">添加</el-button></router-link>
      </div>
    </el-card>

    <el-tabs v-model="active" type="border-card" class="border-card-tabs">
      <el-tab-pane name="1" lazy>
        <span slot="label"><i class="el-icon-user" style="margin-right: 10px;" />一线医生</span>
        <div class="device-list">
          <el-card class="card-box" shadow="never">
            <div>
              <i class="el-icon-tickets" style="padding-right: 10px" />
              <span>角色列表</span>
            </div>
            <!--表格展示-->
            <el-table v-loading="isShowLoading1" :data="doctors1" style="width: 100%" stripe fit>
              <el-table-column prop="id" label="ID" />
              <el-table-column prop="users.realname" label="姓名" />
              <el-table-column prop="users.mobile" label="手机号" />
              <el-table-column label="科室">
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.department" :key="index">{{ item }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hospital" label="医院" />
              <el-table-column
                fixed="right"
                label="操作"
              >
                <template slot-scope="scope">
                  <router-link :to="`/authority/doctor/edit?id=${scope.row.id}&type=1`"><el-button size="mini">编辑</el-button></router-link>
                  <el-button type="danger" size="mini" @click="onDelete(scope.row.id, '1')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="sizes, prev, pager, next"
              style="text-align: center; margin-top: 20px"
              :total="total1"
              :page-size="limit1"
              :page-sizes="[5, 10, 20, 50]"
              @current-change="onCurrentPageChangeOf1"
              @size-change="onPageSizeChangeOf1"
            />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2" lazy>
        <span slot="label"><i class="el-icon-s-open" style="margin-right: 10px;" />二线医生</span>
        <div class="device-list">
          <el-card class="card-box" shadow="never">
            <div>
              <i class="el-icon-tickets" style="padding-right: 10px" />
              <span>角色列表</span>
            </div>
            <!--表格展示-->
            <el-table v-loading="isShowLoading2" :data="doctors2" style="width: 100%" stripe fit>
              <el-table-column prop="id" label="ID" />
              <el-table-column prop="users.realname" label="姓名" />
              <el-table-column prop="users.mobile" label="手机号" />
              <el-table-column label="科室">
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.department" :key="index">{{ item }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hospital" label="医院" />
              <el-table-column
                fixed="right"
                label="操作"
              >
                <template slot-scope="scope">
                  <router-link :to="`/authority/doctor/edit?id=${scope.row.id}&type=1`"><el-button size="mini">编辑</el-button></router-link>
                  <el-button type="danger" size="mini" @click="onDelete(scope.row.id, '2')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="sizes, prev, pager, next"
              style="text-align: center; margin-top: 20px"
              :total="total2"
              :page-size="limit2"
              :page-sizes="[5, 10, 20, 50]"
              @current-change="onCurrentPageChangeOf2"
              @size-change="onPageSizeChangeOf2"
            />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as doctor from '../../api/doctor'

export default {
  data() {
    return {
      active: '1',
      doctors1: [],
      doctors2: [],
      isShowLoading: false,
      isShowTip: false,
      search: {
        nickname: '',
        realname: '',
        mobile: '',
        type: '',
        is_enable: false
      },
      types: [
        { label: '一线医生', value: '1' },
        { label: '二线医生', value: '2' }
      ],
      // search rules
      rules: {
        type: [
          { required: true, message: '请选择角色类型', trigger: 'blur' }
        ]
      },
      // 一线医生
      isShowLoading1: false,
      total1: 0,
      page1: 1,
      limit1: 5,
      // 二线医生
      isShowLoading2: false,
      total2: 0,
      page2: 1,
      limit2: 5
    }
  },
  computed: {
    department() {
      return this.$store.getters.department
    }
  },
  created() {
    this.get1()
    this.get2()
  },
  methods: {
    async get1({ page = 1, limit = 50 } = { page: 1, limit: 50 }) {
      this.isShowLoading1 = true
      const params = { page, pagesize: limit, department_id: this.department }
      let result
      try {
        result = await doctor.get1(params)
      } catch (error) {
        this.isShowLoading1 = false
        return this.$message({
          type: 'error',
          message: error
        })
      }
      const { count, data } = result.data
      this.total1 = count
      this.doctors1 = data
      this.isShowLoading1 = false
    },
    async get2({ page = 1, limit = 50 } = { page: 1, limit: 50 }) {
      this.isShowLoading2 = true
      const params = { page, pagesize: limit, department_id: this.department }
      let result
      try {
        result = await doctor.get2(params)
      } catch (error) {
        this.isShowLoading2 = false
        return this.$message({
          type: 'error',
          message: error
        })
      }
      const { count, data } = result.data
      this.total2 = count
      this.doctors2 = data
      this.isShowLoading2 = false
    },
    async onSearch() {
      try {
        await this.$refs['SEARCH'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const { realname, mobile, type } = this.search
      if (!(realname || mobile)) {
        this.$message({
          message: '请输入查询内容',
          type: 'error'
        })
      }

      let total = 0
      let results = []
      if (realname) {
        let result
        try {
          result = await doctor[`get${type}`]({ search: realname })
        } catch (error) {
          return console.error(error)
        }
        const { count, data } = result.data
        results = results.concat(data)
        total += count
      }

      if (mobile) {
        let result
        try {
          result = await doctor[`get${type}`]({ mobile })
        } catch (error) {
          return console.error(error)
        }
        const { count, data } = result.data
        results = results.concat(data)
        total += count
      }

      this.active = type
      this.total = total
      this[`doctors${type}`] = results
    },
    onResetSearchCondition() {
      this.search = {
        nickname: '',
        realname: '',
        mobile: '',
        type: '',
        is_enable: false
      }
      this.get1({ page: this.page1, limit: this.limit1 })
      this.get2({ page: this.page2, limit: this.limit2 })
    },
    async onDelete(id, type) {
      try {
        await this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      const data = {
        items: [id]
      }
      switch (type) {
        case '1' : {
          try {
            await doctor.remove1(data)
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
            return console.error(error)
          }
          break
        }
        case '2' : {
          try {
            await doctor.remove2(data)
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
            return console.error(error)
          }
          break
        }
      }

      this.$message('删除成功')
      this[`get${type}`]()
    },
    onPageSizeChangeOf1(size) {
      console.log(size)
      this.limit1 = size
      this.$nextTick(() => {
        this.get1({ limit: size, page: this.page1 })
      })
    },
    onCurrentPageChangeOf1(page) {
      console.log(page)
      this.page1 = page
      this.$nextTick(() => {
        this.get1({ page: page, limit: this.limit1 })
      })
    },
    onPageSizeChangeOf2(size) {
      console.log(size)
      this.limit2 = size
      this.$nextTick(() => {
        this.get2({ limit: size, page: this.page2 })
      })
    },
    onCurrentPageChangeOf2(page) {
      console.log(page)
      this.page2 = page
      this.$nextTick(() => {
        this.get2({ page: page, limit: this.limit2 })
      })
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .container {
    margin: 10px 30px 10px 30px;

  }

  .card-header {
    padding: 5px 5px;
  }

  .button-box {
    margin: 5px 50px 20px 0;
    float: right;

  }

  .device-list {
    margin-top: 30px;
    width: 100%;
  }

  .border-card-tabs {
    margin-top: 20px;
  }
</style>
