<template>
  <div class="container">
    <el-card class="card-box" shadow="never">
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
          <el-row style="margin-left: 25px;">
            <el-col :span="4" />
            <el-form-item label="收缩压范围">
              <el-input v-model="search.systolic.min" type="number" placeholder="无" style="width: 90px" clearable />
              -
              <el-input v-model="search.systolic.max" type="number" placeholder="无" style="width: 90px" clearable />
            </el-form-item>
            <el-form-item label="舒张压范围">
              <el-input v-model="search.diastolic.min" type="number" placeholder="无" style="width: 90px" clearable />
              -
              <el-input v-model="search.diastolic.max" type="number" placeholder="无" style="width: 90px" clearable />
            </el-form-item>
            <el-form-item label="心率范围">
              <el-input v-model="search.pulse.min" type="number" placeholder="无" style="width: 90px" clearable />
              -
              <el-input v-model="search.pulse.max" type="number" placeholder="无" style="width: 90px" clearable />
            </el-form-item>
          </el-row>
          <el-row style="margin-left: 40px;">
            <el-col />
            <el-form-item>
              <el-checkbox v-model="search.isBloodPressureOverflow" style="width: 200px;">所有超限血压数据</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="search.isDataAlert" style="width: 200px;">所有异常血压数据</el-checkbox>
            </el-form-item>
          </el-row>
          <div style=" margin-top: -25px; margin-bottom: -5px;">
            <el-divider />
          </div>
          <el-row>
            <el-col :span="6" />
            <el-form-item label="姓名">
              <el-input v-model.trim="search.name" placeholder="请输入姓名" style="width: 120px" clearable />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="search.gender" style="width: 100px;" placeholder="请选择">
                <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年龄范围">
              <el-input v-model="search.age.min" type="number" placeholder="无" style="width: 80px" clearable />
              -
              <el-input v-model="search.age.max" type="number" placeholder="无" style="width: 80px" clearable />
            </el-form-item>
          </el-row>
          <el-row style="margin-left: 40px;">
            <el-col :span="2" />
            <el-form-item>
              <el-checkbox v-model="search.isInExperimentalGroup" style="width: 120px;">已入干预组</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="search.isInControlGroup" style="width: 120px;">已入对照组</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="search.isNotInGroup" style="width: 120px;">未入组</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="search.isFellDown" style="width: 120px;">含脱落</el-checkbox>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="button-box">
        <el-button type="primary" size="medium" @click="onSearch">查询</el-button>
        <el-button type="primary" size="medium" @click="onResetSearchCondition">重置</el-button>
      </div>
    </el-card>

    <div class="list">
      <el-card class="card-box" shadow="never">
        <div>
          <i class="el-icon-tickets" style="padding-right: 10px" />
          <span>数据列表</span>
          <!-- <el-button type="primary" size="small" class="clearfix" style="float: right;">导出数据</el-button> -->
        </div>
        <!--表格展示-->
        <div>
          <el-card shadow="always" style="margin-top: 25px;">
            <div class="card-header">
              <i class="el-icon-search" style="padding-right: 10px" />
              <span>统计结果</span>
            </div>
            <div v-loading="isShowLoading" style="text-align: center;">
              <p>数据占比（条）: <span>{{ count.count_pdd1_all_filter || 0 }} / {{ count.count_pdd1_all || 0 }} ≈ {{ percentage(count.count_pdd1_all_filter,count.count_pdd1_all) }}%（干预组） {{ count.count_pdd2_all_filter || 0 }} / {{ count.count_pdd2_all || 0 }} ≈ {{ percentage(count.count_pdd2_all_filter,count.count_pdd2_all) }}%（对照组） {{ count.count_pdd_all_filter || 0 }} / {{ count.count_pdd_all || 0 }} ≈ {{ percentage(count.count_pdd_all_filter,count.count_pdd_all) }}%（总人数）</span></p>
              <p>人数占比（人）: <span>{{ count.count_p1_all_filter || 0 }} / {{ count.count_p1_all || 0 }} ≈ {{ percentage(count.count_p1_all_filter,count.count_p1_all) }}%（干预组） {{ count.count_p2_all_filter || 0 }} / {{ count.count_p2_all || 0 }} ≈ {{ percentage(count.count_p2_all_filter,count.count_p2_all) }}%（对照组） {{ count.count_p_all_filter || 0 }} / {{ count.count_p_all || 0 }} ≈ {{ percentage(count.count_p_all_filter,count.count_p_all) }}%（总人数）</span></p>
            </div>
          </el-card>
        </div>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-table v-loading="isShowLoading" :data="patients" style="width: 100%" stripe fit>
            <el-table-column align="center" prop="patient.realname" label="姓名" />
            <el-table-column align="center" prop="patient.sex" label="性别">
              <template slot-scope="scope">
                {{ scope.row.patient.sex | gender }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="patient.age" label="年龄" />
            <el-table-column align="center" prop="cure_plan" label="当前服药方案" />
            <el-table-column align="center" prop="dt" label="测量时间" width="160px">
              <template slot-scope="scope">{{ scope.row.dt | formatime }}</template>
            </el-table-column>
            <el-table-column align="center" prop="diastolic" label="舒张压" />
            <el-table-column align="center" prop="systolic" label="收缩压" />
            <el-table-column align="center" prop="pulse" label="心率" />
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
      patients: [],
      isShowLoading: false,
      isShowTip: false,
      genders: [
        { label: '未知', value: '0' },
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      search: {
        systolic: {
          min: '',
          max: ''
        },
        diastolic: {
          min: '',
          max: ''
        },
        age: {
          min: '',
          max: ''
        },
        pulse: {
          min: '',
          max: ''
        },
        name: '',
        range: [],
        isBloodPressureOverflow: false,
        isDataAlert: false,
        isInControlGroup: false,
        isNotInGroup: false,
        isFellDown: false,
        gender: '',
        isFilterInGroup: false,
        isFilterDataError: false
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
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    percentage(num, total) {
      if (parseInt(num) === 0 || parseInt(total) === 0) {
        return 0
      }
      return (Math.round(num / total * 10000) / 100.00)
    },
    async getList() {
      this.isShowLoading = true
      const params = { page: this.page, pagesize: this.limit, hospital_id: this.hospital.id }
      if (this.search.systolic && this.search.systolic.min && this.search.systolic.max) {
        const { min, max } = this.search.systolic
        params.systolic_min = min
        params.systolic_max = max
      }
      if (this.search.name) {
        params.s_realname = this.search.name
      }
      if (this.search.range.length) {
        const [start, end] = this.search.range
        params.start_date = start
        params.end_date = end
      }
      if (this.search.isBloodPressureOverflow) {
        params.is_bp_danger = this.search.isBloodPressureOverflow
      }
      if (this.search.isDataAlert) {
        params.is_data_abn = this.search.isDataAlert
      }
      const categorys = []
      if (this.search.isInExperimentalGroup) {
        categorys.push('1')
      }
      if (this.search.isInControlGroup) {
        categorys.push('2')
      }
      if (this.search.isNotInGroup) {
        categorys.push('0')
      }
      if (categorys.length > 0) {
        params.categorys = JSON.stringify(categorys)
      }
      if (this.search.isFellDown) {
        params.contain_fall_off = true
      }
      if (this.search.diastolic && this.search.diastolic.min && this.search.diastolic.max) {
        const { min, max } = this.search.diastolic
        params.diastolic_min = min
        params.diastolic_max = max
      }
      if (this.search.age && this.search.age.min && this.search.age.max) {
        const { min, max } = this.search.age
        params.age_min = min
        params.age_max = max
      }
      if (this.search.pulse && this.search.pulse.min && this.search.pulse.max) {
        const { min, max } = this.search.pulse
        params.pulse_min = min
        params.pulse_max = max
      }
      if (this.search.gender) {
        params.sex = this.search.gender
      }
      if (this.search.isFilterInGroup) {
        params.in_group = this.search.isFilterInGroup
      }
      if (this.search.isFilterDataError) {
        params.is_data_abn = this.search.isFilterDataError
      }
      let result
      try {
        result = await request.get('/pc/admin/v1/patientDeviceData/', { params })
      } catch (error) {
        this.isShowLoading = false
        return this.$message.error(error)
      }
      const { count_p_all_filter, count_p_all, count_pdd_all_filter, count_pdd_all, count_p1_all_filter, count_p1_all, count_pdd1_all_filter, count_pdd1_all, count_p2_all_filter, count_p2_all, count_pdd2_all_filter, count_pdd2_all, data } = result.data
      this.patients = data
      this.total = count_pdd_all_filter
      this.count = {
        count_p_all_filter,
        count_p_all,
        count_pdd_all_filter,
        count_pdd_all,
        count_p1_all_filter,
        count_p1_all,
        count_pdd1_all_filter,
        count_pdd1_all,
        count_p2_all_filter,
        count_p2_all,
        count_pdd2_all_filter,
        count_pdd2_all,
      }
      this.isShowLoading = false
    },
    async onSearch() {
      this.getList()
    },
    onResetSearchCondition() {
      this.search = {
        systolic: {
          min: '',
          max: ''
        },
        diastolic: {
          min: '',
          max: ''
        },
        age: {
          min: '',
          max: ''
        },
        pulse: {
          min: '',
          max: ''
        },
        name: '',
        range: [],
        isBloodPressureOverflow: false,
        gender: '',
        isFilterInGroup: false,
        isFilterDataError: false,
        isDataAlert: false,
        isInExperimentalGroup: false,
        isInControlGroup: false,
        isNotInGroup: false,
        isFellDown: false

      }
      this.$nextTick(() => {
        this.getList({ limit: this.limit, page: this.page })
      })
    },
    onAddWhiteList() {},
    onBatchAddWhiteList() {},
    async onDeleteDevice(device) {},
    onPageSizeChange(size) {
      console.log(size)
      this.limit = size
      this.getList({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      console.log(page)
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

  .list {
    margin-top: 30px;
    width: 100%;
  }
</style>
