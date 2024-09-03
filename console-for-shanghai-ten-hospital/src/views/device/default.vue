<template>
  <div class="container">
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-search" style="padding-right: 10px" />
        <span>设备查询</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="SEARCH" :model="search" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="设备编号">
            <el-input v-model="search.sn" placeholder="输入设备编号查询" style="width: 200px" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
        <router-link to="/device/pressure/add"><el-button type="primary" size="medium">添加白名单</el-button></router-link>
        <router-link to="/device/pressure/batch"><el-button type="primary" size="medium">批量添加白名单</el-button></router-link>
      </div>
    </el-card>

    <div class="device-list">
      <el-card class="card-box" shadow="never">
        <div>
          <i class="el-icon-tickets" style="padding-right: 10px" />
          <span>设备列表</span>
        </div>
        <!--表格展示-->
        <el-table v-loading="isShowLoading" :data="devices" style="width: 100%" stripe fit>
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="image" label="设备图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.image"
                style="width: 50px; height: 50px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="sn" label="设备编号" />
          <el-table-column label="是否绑定">
            <template slot-scope="scope">
              <el-popconfirm
                v-if="scope.row.bind_info.is_bind"
                title="确定要解绑该设备吗"
                @onConfirm="onRelaxDevice(scope.row.id)"
              >
                <el-button slot="reference" size="mini" type="info">已绑定</el-button>
              </el-popconfirm>
              <el-button v-else size="mini" type="success">未绑定</el-button>
            </template>
          </el-table-column>
          <el-table-column label="患者姓名" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                v-if="scope.row.bind_info.is_bind && scope.row.bind_info.patient_info && scope.row.bind_info.patient_info.realname"
                title="确定要解绑该设备吗"
                @onConfirm="onRelaxDevice(scope.row.id)"
              >
                <el-button slot="reference" size="mini" type="info">{{ scope.row.bind_info.patient_info.realname }}</el-button>
              </el-popconfirm>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <router-link :to="`/device/pressure/edit?id=${scope.row.id}`"><el-button size="mini">编辑</el-button></router-link>
              <el-button type="danger" size="mini" @click="onDeleteDevice(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          style="text-align: center; margin-top: 20px"
          :total="total"
          :page-size="limit"
          :page-sizes="[5, 10, 20, 50]"
          @current-change="onCurrentPageChange"
          @size-change="onPageSizeChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      devices: [],
      isShowLoading: false,
      isShowTip: false,
      search: {
        sn: ''
      },
      total: 0,
      page: 1,
      limit: 50
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ])
  },
  watch: {
    hospital(value) {
      if (value) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList({ page = 1, limit = 50 } = { page: 1, limit: 50 }) {
      this.isShowLoading = true
      const params = { page, pagesize: limit }
      if (this.search.sn) {
        params.search = this.search.sn
      }
      let result
      try {
        result = await request.get(`/pc/admin/v1/device/?hospital_id=${this.hospital.id}`, {
          params
        })
      } catch (error) {
        this.isShowLoading = false
        return console.error(error)
      }
      const { count, data } = result.data.data
      this.total = count
      this.devices = data
      this.isShowLoading = false
    },
    async onSearch() {
      const { sn } = this.search
      if (!sn) {
        this.$message({
          message: '请输入查询内容',
          type: 'error'
        })
      }
      this.getList()
    },
    onResetSearchCondition() {
      this.search = {
        sn: ''
      }
      this.getList({ limit: this.limit, page: this.page })
    },
    async onRelaxDevice(value) {
      try {
        await request.post(`/pc/admin/v1/device/${value}/relax/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('设备解绑成功')
      this.getList()
    },
    async onDeleteDevice(device) {
      try {
        await this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
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

      try {
        await request.delete(`/pc/admin/v1/device/${device.id}/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return this.$message.error(error)
      }
      this.$notify.success('删除成功')
      this.getList()
    },
    onPageSizeChange(size) {
      this.limit = size
      this.getList({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      this.page = page
      this.getList({ page: page, limit: this.limit })
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
</style>
