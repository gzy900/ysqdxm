<template>
  <div class="container">
    <el-card class="card-box" shadow="always">
      <div class="card-header">
        <i class="el-icon-search" style="padding-right: 10px" />
        <span>数据查询</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="SEARCH" :model="search" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="姓名">
            <el-input v-model.trim="search.name" placeholder="请输入姓名" style="width: 300px" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
      </div>
    </el-card>

    <div class="list">
      <el-card shadow="always" style="margin-top: 15px;">
        <el-table ref="MULTIPLE_SELECT_TABLE" v-loading="isShowLoading" :data="patients" style="width: 100%" @selection-change="onSelectionChange"> stripe fit>
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column align="center" prop="realname" label="姓名" />
          <el-table-column align="center" prop="cure_plan.name" label="当前方案" />
          <el-table-column label="今日剩余" align="center">
            <el-table-column align="center" prop="receiver_holdings.ksd_tablets" label="开素达" />
            <el-table-column align="center" prop="receiver_holdings.ncl_tablets" label="纳催离" />
            <el-table-column align="center" prop="receiver_holdings.lnz_tablets" label="螺内酯" />
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="电话" width="120px" />
          <el-table-column align="center" prop="address" label="地址" />
          <el-table-column align="center" prop="" label="健康数据" width="120px">
            <template slot-scope="scope">
              <router-link :to="`/user/patient/detail/${scope.row.id}`" tag="div"><el-button type="primary" size="mini">查看康复数据</el-button></router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="card__footer">
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="isSelectAll" @change="onToggleSelectAll">全选</el-checkbox>
            </el-col>
            <el-col :span="12" class="card-footer__right">
              <el-button type="primary" size="medium" @click="onAdd">添加</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-pagination
        background
        layout="sizes, total, prev, pager, next"
        style="text-align: center; margin-top: 20px"
        :total="total"
        :page-size="limit"
        :page-sizes="[5, 10, 20, 50]"
        @current-change="onCurrentPageChange"
        @size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      patients: [],
      isShowLoading: false,
      isShowTip: false,
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      search: {
        name: '',
        range: [],
      },
      total: 0,
      page: 1,
      limit: 50,
      count: {},
      isSelectAll: false,
      multiple: []
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
        this.getAllPatient()
      }
    }
  },
  created() {
    this.getAllPatient()
  },
  methods: {
    percentage(num, total) {
      if (parseInt(num) === 0 || parseInt(total) === 0) {
        return 0
      }
      return (Math.round(num / total * 10000) / 100.00)
    },
    async getAllPatient() {
      this.isShowLoading = true
      const params = { page: this.page, pagesize: this.limit, hospital_id: this.hospital.id }
      if (this.search.name) {
        params.s_realname = this.search.name
      }
      if (this.search.range.length) {
        const [start, end] = this.search.range
        params.start_date = start
        params.end_date = end
      }
      let result
      try {
        result = await request.get('/pc/admin/v1/shipping/noShippingPatient/', { params })
      } catch (error) {
        this.isShowLoading = false
        return this.$message.error(error)
      }
      const { count, data } = result.data
      this.total = count
      this.patients = data
      this.isShowLoading = false
    },
    async onSearch() {
      this.getAllPatient()
    },
    onResetSearchCondition() {
      this.search = {
        name: '',
        range: []
      }
      this.$nextTick(() => {
        this.getAllPatient({ limit: this.limit, page: this.page })
      })
    },
    onAddWhiteList() {},
    onBatchAddWhiteList() {},
    async onDeleteDevice(device) {},
    onPageSizeChange(size) {
      console.log(size)
      this.limit = size
      this.getAllPatient({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      console.log(page)
      this.page = page
      this.getAllPatient({ page: page, limit: this.limit })
    },
    onSelectionChange(value) {
      this.multiple = value
    },
    onToggleSelectAll(value) {
      if (value) {
        this.$refs.MULTIPLE_SELECT_TABLE.toggleAllSelection()
      } else {
        this.$refs.MULTIPLE_SELECT_TABLE.clearSelection()
      }
    },
    async onAdd() {
      if (!this.multiple.length) {
        return this.$message.error('请选择要添加的患者')
      }
      try {
        await this.$confirm('此操作将添加患者到发药队列中, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message.info('取消添加')
      }

      try {
        await request.post('/pc/admin/v1/shipping/addPatient/', {
          patient_ids: this.multiple.map((item) => item.id)
        }, {
          params: {
            hospital_id: this.hospital.id
          }
        })
      } catch (error) {
        return this.$message.error('添加失败')
      }

      this.$message.success('添加成功')
      this.getAllPatient()
      this.$router.go(-1)
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

  .list {
    margin-top: 30px;
    width: 100%;
  }
  .card__footer {
    margin-top: 15px;
  }
  .card-footer__right {
    text-align: right;
  }
</style>
