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
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
      </div>
    </el-card>

    <div class="list">
      <el-card shadow="always" style="margin-top: 15px;">
        <el-table v-loading="isShowLoading" :data="exports" style="width: 100%" stripe fit>
          <el-table-column align="center" prop="type" label="导出类型" />
          <el-table-column align="center" prop="name" label="文件名" />
          <el-table-column align="center" prop="export_dt" label="时间" />
          <el-table-column align="center" prop="status" label="导出状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status" type="success" effect="dark">导出成功</el-tag>
              <el-tag v-else type="error" effect="dark">导出失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                title="确定再次下载该条数据吗？"
                @confirm="onDownload(scope.row)"
              >
                <el-button slot="reference" type="danger" size="small">下载</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
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
      exports: [],
      isShowLoading: false,
      isShowTip: false,
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      search: {
        range: [],
      },
      total: 0,
      page: 1,
      limit: 50,
      count: {}
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
        this.getExportHistory()
      }
    }
  },
  created() {
    this.getExportHistory()
  },
  methods: {
    percentage(num, total) {
      if (parseInt(num) === 0 || parseInt(total) === 0) {
        return 0
      }
      return (Math.round(num / total * 10000) / 100.00)
    },
    async getExportHistory() {
      this.isShowLoading = true
      const params = { page: this.page, pagesize: this.limit, hospital_id: this.hospital.id }
      if (this.search.range.length) {
        const [start, end] = this.search.range
        params.start_date = start
        params.end_date = end
      }
      let result
      try {
        result = await request.get('/pc/admin/v1/fileHistory/', { params })
      } catch (error) {
        this.isShowLoading = false
        return this.$message.error(error)
      }
      const { count, data } = result.data.data
      this.total = count
      this.exports = data
      this.isShowLoading = false
    },
    async onSearch() {
      this.getExportHistory()
    },
    onResetSearchCondition() {
      this.search = {
        range: [],
      }
      this.$nextTick(() => {
        this.getExportHistory({ limit: this.limit, page: this.page })
      })
    },
    onAddWhiteList() {},
    onBatchAddWhiteList() {},
    async onDeleteDevice(device) {},
    onPageSizeChange(size) {
      this.limit = size
      this.getExportHistory({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      console.log(page)
      this.page = page
      this.getExportHistory({ page: page, limit: this.limit })
    },
    async onDownload(value) {
      console.log('On download')
      const options = {
        url: '/pc/admin/v1/fileHistory/download/',
        method: 'GET',
        params: {
          filename: value.name,
          hospital_id: this.hospital.id
        },
        responseType: 'blob'
      }

      let result
      try {
        result = await request(options)
      } catch (error) {
        const text = await (new Response(error)).text()
        return this.$message({
          type: 'error',
          message: JSON.parse(text).error
        })
      }

      const blob = new Blob([result.data], {
        type: 'application/vnd.ms-excel'
      })
      const objectURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectURL
      a.download = `${value.name}`
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      window.URL.revokeObjectURL(blob)
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
</style>
