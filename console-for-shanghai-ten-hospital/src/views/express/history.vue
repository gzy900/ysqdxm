<template>
  <div class="container">
    <el-card class="card-box" shadow="always">
      <div class="card-header">
        <i class="el-icon-search" style="padding-right: 10px" />
        <span>数据查询</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="SEARCH" :model="search" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="时间段">
            <el-date-picker
              v-model="search.range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 300px;"
            />
          </el-form-item>
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
        <el-table v-loading="isShowLoading" :data="histories" style="width: 100%" stripe fit>
          <el-table-column align="center" prop="realname" label="姓名" />
          <el-table-column align="center" prop="cure_plan.name" label="发货时方案" />
          <el-table-column label="发送药物" align="center">
            <el-table-column align="center" prop="send.ksd" width="180px" label="开素达">
              <template slot-scope="scope">
                <el-input-number :value="scope.row.shipment.ksd_boxes" controls-position="right" class="counter" size="mini" disabled />盒
                <!-- <el-tag size="mini">{{ scope.row.shipment.ksd_boxes * 6 }} 片</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="send.ncl" width="180px" label="纳催离">
              <template slot-scope="scope">
                <el-input-number :value="scope.row.shipment.ncl_boxes" controls-position="right" class="counter" size="mini" disabled />盒
                <!-- <el-tag size="mini">{{ scope.row.shipment.ncl_boxes * 12 }} 片</el-tag> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="send.lnz" width="180px" label="螺内酯">
              <template slot-scope="scope">
                <el-input-number :value="scope.row.shipment.lnz_boxes" controls-position="right" class="counter" size="mini" disabled />盒
                <!-- <el-tag size="mini">{{ scope.row.shipment.lnz_boxes * 8 }} 片</el-tag> -->
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="电话" width="120px" />
          <el-table-column align="center" prop="address" label="地址" width="150px" />
          <el-table-column align="center" prop="confirm_dt" label="确认时间" />
        </el-table>
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
      histories: [],
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
      standard: {
        'ksd_tablets': 1, // 开素达每盒7片
        'ncl_tablets': 1, // 纳催离每盒10片
        'lnz_tablets': 1
      }
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
        this.getSendHistory()
      }
    }
  },
  created() {
    this.getDrugBoxStandard()
    this.getSendHistory()
  },
  methods: {
    percentage(num, total) {
      if (parseInt(num) === 0 || parseInt(total) === 0) {
        return 0
      }
      return (Math.round(num / total * 10000) / 100.00)
    },
    async getSendHistory() {
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
        result = await request.get('/pc/admin/v1/shippingHistory/', { params })
      } catch (error) {
        this.isShowLoading = false
        return this.$message.error(error)
      }
      const { count, data } = result.data.data
      this.total = count
      this.histories = data
      this.isShowLoading = false
    },
    async onSearch() {
      this.getSendHistory()
    },
    async getDrugBoxStandard() {
      let result
      try {
        result = await request.get('/pc/admin/v1/perBoxTablets/', {
          params: {
            hospital_id: this.hospital.id
          }
        })
      } catch (error) {
        return console.error(error)
      }
      this.standard = result.data.data
    },
    onResetSearchCondition() {
      this.search = {
        name: '',
        range: [],
      }
      this.$nextTick(() => {
        this.getSendHistory({ limit: this.limit, page: this.page })
      })
    },
    onAddWhiteList() {},
    onBatchAddWhiteList() {},
    async onDeleteDevice(device) {},
    onPageSizeChange(size) {
      this.limit = size
      this.getSendHistory({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      this.page = page
      this.getSendHistory({ page: page, limit: this.limit })
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
  .counter {
    width: 90px;
  }
  .transform-counter {
    margin-top: 10px;
  }
</style>
