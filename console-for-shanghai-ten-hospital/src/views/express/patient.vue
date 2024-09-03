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
        <router-link to="/express/history">
          <el-button type="primary" size="medium">历史发货</el-button>
        </router-link>
        <el-button type="primary" size="medium" @click="onExport">发货</el-button>
      </div>
    </el-card>

    <div class="list">
      <el-card shadow="always" style="margin-top: 15px;">
        <el-table v-loading="isShowLoading" :data="patients" style="width: 100%" :row-class-name="toTableRowClassName" fit @selection-change="onSelectionChange">
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column align="center" prop="realname" label="姓名" />
          <el-table-column align="center" prop="cure_plan.name" label="当前方案" />
          <el-table-column label="今日剩余" align="center">
            <el-table-column align="center" prop="receiver_holdings.ksd_tablets" label="开素达" />
            <el-table-column align="center" prop="receiver_holdings.ncl_tablets" label="纳催离" />
            <el-table-column align="center" prop="receiver_holdings.lnz_tablets" label="螺内酯" />
            <el-table-column align="center" prop="remain_days" label="天数" />
          </el-table-column>
          <el-table-column label="发送药物" align="center">
            <el-table-column align="center" prop="send.ksd" width="180px" label="开素达">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.shipment.ksd_boxes" controls-position="right" class="counter" size="mini" />盒
                <el-tag size="mini">{{ scope.row.shipment.ksd_boxes * standard.ksd_tablets }} 片</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="send.ncl" width="180px" label="纳催离">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.shipment.ncl_boxes" controls-position="right" class="counter" size="mini" />盒
                <el-tag size="mini">{{ scope.row.shipment.ncl_boxes * standard.ncl_tablets }} 片</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="send.lnz" width="180px" label="螺内酯">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.shipment.lnz_boxes" controls-position="right" class="counter" size="mini" />盒
                <el-tag size="mini">{{ scope.row.shipment.lnz_boxes * standard.lnz_tablets }} 片</el-tag>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="电话" width="120px" />
          <el-table-column align="center" prop="address" label="地址" width="150px" />
          <el-table-column align="center" prop="" label="健康数据" width="120px">
            <template slot-scope="scope">
              <router-link :to="`/user/patient/detail/${scope.row.id}`" tag="div"><el-button type="primary" size="mini">查看康复数据</el-button></router-link>
            </template>
          </el-table-column>
          <el-table-column fixed="right" class-name="custom-cell--fixed" label="操作" align="center" width="140px">
            <template slot-scope="scope">
              <router-link :to="`/user/patient/edit?id=${scope.row.patient_id}`"><el-button size="mini">编辑</el-button></router-link>
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
import moment from 'moment'
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
      standard: {
        'ksd_tablets': 1, // 开素达每盒7片
        'ncl_tablets': 1, // 纳催离每盒10片
        'lnz_tablets': 1
      },
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
    this.getDrugBoxStandard()
    this.getAllPatient()
  },
  methods: {
    toTableRowClassName({ row, index }) {
      if (row.is_close2end) {
        return 'custom-row--alert'
      }
      return ''
    },
    percentage(num, total) {
      if (parseInt(num) === 0 || parseInt(total) === 0) {
        return 0
      }
      return (Math.round(num / total * 10000) / 100.00)
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
      console.log(result)
      this.standard = result.data.data
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
        result = await request.get('/pc/admin/v1/shipping/', { params })
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
    onSelectionChange(value) {
      this.multiple = value
    },
    onResetSearchCondition() {
      this.search = {
        range: [],
        name: '',
      }
      this.$nextTick(() => {
        this.getAllPatient({ limit: this.limit, page: this.page })
      })
    },
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
    async onDelete(value) {
      try {
        await request.delete('/pc/admin/v1/shipping/deleteItems/', {
          params: {
            hospital_id: this.hospital.id
          },
          data: {
            items: [Number.parseInt(value.id)]
          }
        })
      } catch (error) {
        return this.$message.error('删除失败')
      }

      this.$message.success('删除成功')
      this.getAllPatient()
    },
    async onExport() {
      if (!this.multiple.length) {
        return this.$message.error('请选择要导出的患者')
      }
      try {
        await this.$confirm('确认要导出选中的发药患者信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message.info('取消导出')
      }
      const list = this.multiple.map((item) => {
        return {
          patient_id: item.patient_id,
          shipment: item.shipment
        }
      })

      const options = {
        url: '/pc/admin/v1/shipping/export/',
        method: 'POST',
        params: {
          hospital_id: this.hospital.id
        },
        data: list,
        responseType: 'blob'
      }

      let result
      try {
        result = await request(options)
      } catch (error) {
        console.log('\n🚀 ~ file: patient.vue ~ line 256 ~ onExport ~ error', error)
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
      a.download = `${moment().format('YYYYMMDDHHmmss')}.xls`
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      window.URL.revokeObjectURL(blob)

      this.$notify.success('导出成功')
      this.getAllPatient()
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
::v-deep .el-table .custom-row--alert {
  background: rgb(250, 236, 216);
}
</style>
