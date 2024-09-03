<template>
  <div class="app-container">
    <!--    列表搜索栏-->
    <el-row>
      <el-col :span="24">
        <div class="from-search">
          <p class="from-search-button">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </p>
          <p class="from-search-button">
            <el-button type="info" size="small" @click="handleOpenFile({row:{}})">
              读取文件
            </el-button>
          </p>
          <el-row class="from-search-content" type="flex" justify="end" :gutter="10">
            <!--            <el-col :span="5">-->
            <!--              <el-select v-model="url">-->
            <!--                <el-option-->
            <!--                  v-for="item in urlOption"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--            </el-col>-->
            <el-col :span="5">
              <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in stateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!--    读取本地文件容器-->
    <input id="files" ref="file" type="file" style="display: none" @change="handlePreview()">

    <!--    列表-->
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="left" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleOpenHeart(scope)">
            反馈
          </el-button>
          <el-button type="info" size="small" @click="handleOpenFile(scope)">
            读取文件
          </el-button>
          <!--          <el-button type="" size="small" @click="handleLoadFile(scope)">下载文件-->
          <!--          </el-button>-->
          <el-button v-if="scope.row.state === '1'" type="" size="small" @click="handleSeeReport(scope)">移视AI报告
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预警判读" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.dispose_state | dispose_stateTypeFilter">
            {{ scope.row.dispose_state | dispose_stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="健康状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row | stateTypeFilter_all">
            {{ scope.row | stateTypeFilter_all | stateNameFilter_all }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="SDNN" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sdnn | stateTypeFilter_sdnn">
            {{ parseInt(scope.row.sdnn) || '' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="RMSSD" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.rmssd | stateTypeFilter_rmssd">
            {{ parseInt(scope.row.rmssd) || '' }}

          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="平均心律" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hr_mean | stateTypeFilter_hr_mean">
            {{ parseInt(scope.row.hr_mean) || '' }}

          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房颤概率" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.af_probability | stateTypeFilter_af_probability">
            {{ scope.row.af_probability }}

          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="兴奋指数" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.excitement | stateTypeFilter_excitement">
            {{ scope.row.excitement }}

          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="疲劳指数" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.fatigue | stateTypeFilter_fatigue">
            {{ scope.row.fatigue }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="心脏压力" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cardiac_stress | stateTypeFilter_cardiac_stress">
            {{ scope.row.cardiac_stress }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户昵称" width="140">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户手机号" width="140">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户性别" width="140">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据ID" width="280">
        <template slot-scope="scope">
          {{ scope.row.l_id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="专业判读" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="测量时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.beginTime + '---' + scope.row.endTime }}
        </template>
      </el-table-column>
    </el-table>

    <!--    列表分页组件-->
    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />

    <!--反馈窗口集合-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :fullscreen="true"
      custom-class="chart-dialog"
      @close="closeDialog"
    >

      <el-tabs v-model="tabValue" type="border-card">
        <el-tab-pane :stretch="true" name="chart" label="完整心电图" :lazy="false">
          <heartClothes
            v-if="heartDataLoad"
            ref="test"
            :data="heartData.dataList"
            :data-item-len="heartData.dataItemLen"
            :data-move-list="heartData.dataMoveList"
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, getList } from '@/api/heart-clothes'
import Pagination from '@/components/Pagination'
import heartClothes from '@/components/heart-clothes'
import * as _echarts from 'echarts/core'
import { option } from '@/views/heart-clothes/js/option'
import { loop } from '@/components/heart-clothes/js/util'

export default {
  name: 'HeartClothesList',
  components: { Pagination, heartClothes },
  filters: {
    stateNameFilter(status) {
      status = status || ''
      const statusMap = {
        '1': '已判读',
        '0': '未判读',
        '': '状态丢失'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      status = status || ''
      const statusMap = {
        '1': '',
        '0': 'warning',
        '': 'info'
      }
      return statusMap[status]
    },

    dispose_stateNameFilter(status) {
      status = status || ''
      const statusMap = {
        '1': '已处理',
        '2': '未处理',
        '3': '处理中',
        '': '状态丢失'
      }
      return statusMap[status]
    },
    dispose_stateTypeFilter(status) {
      status = status || ''
      const statusMap = {
        '1': 'success',
        '2': 'warning',
        '3': '',
        '': 'info'
      }
      return statusMap[status]
    },

    stateTypeFilter_sdnn(value) {
      value = parseInt(value) || 0
      const status = value > 50 && value < 100 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_rmssd(value) {
      value = parseInt(value) || 0
      const status = value > 50 && value < 200 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_hr_mean(value) {
      value = parseInt(value) || 0
      const status = value > 50 && value < 120 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_af_probability(value) {
      value = parseInt(value) || 0
      const status = value < 2 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_excitement(value) {
      value = parseInt(value) || 0
      const status = value < 100 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_fatigue(value) {
      value = parseInt(value) || 0
      const status = value < 100 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_cardiac_stress(value) {
      value = parseInt(value) || 0
      const status = value < 100 ? '1' : '2'
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateTypeFilter_all(row) {
      const status = '1'
      // if(row.sdnn){
      //
      // }
      const statusMap = {
        '1': 'success',
        '2': 'warning'
      }
      return statusMap[status]
    },
    stateNameFilter_all(status) {
      const statusMap = {
        'success': '健康',
        'warning': '异常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '患者信息：王英雄，男，28岁。病史：房颤，搭桥，曾猝死。',
      tabValue: 'chart',
      dataList: [],
      pageTotal: 0,
      chartLoadingNum: 0, // info load %

      listQuery: {
        pageNo: 1,
        number: 20
      },
      infoQuery: {
        l_id: '142bd3eac4b747c0a9f9ec343a7b673f',
        serial_number: -1
      },
      fromData: {
        l_id: '',
        dispose_state: '',
        propos: [],
        prorhythm: [],
        character_remark: '',
        photo_remark: '',
        disease_statistics: ''
      },
      heartData: null,
      heartDataLoad: false,
      stateOption: [
        {
          label: '已判读',
          value: '1'
        },
        {
          label: '未判读',
          value: '0'
        }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    handleSeeReport({ row }) {
      if (row.report_url) {
        window.open(row.report_url)
      } else {
        this.$notify({
          title: '无PDF链接',
          type: 'warning'
        })
      }
    },
    handleOpenFile({ row }) {
      this.selectRow = row
      this.$refs.file.dispatchEvent(new MouseEvent('click')) // handlePreview
    },
    handleOpenHeart({ row }) {
      this.tabValue = 'chart'
      this.dialogVisible = true
      this.chartLoading = true
      this.infoQuery.l_id = row.l_id
      this.infoQuery.serial_number = -1
      this.fromData.l_id = row.l_id
      this.getInfo()
    },
    handlePreview() {
      const row = this.selectRow
      // this.dialogVisible = true
      const file = this.$refs.file.files[0]
      const reader = new FileReader()

      this.tabValue = 'chart'
      this.dialogVisible = true
      this.chartLoading = true

      reader.onload = () => {
        const content = reader.result

        this.$refs.file.value = ''
        this.infoQuery.l_id = row.l_id
        this.infoQuery.serial_number = -2
        this.washData({ long_data: content })
        // this.getInfo()
      }
      reader.readAsText(file)
    },

    getInfoLoadingChange(res) {
      if (res.total !== 0) {
        this.chartLoadingNum = Math.floor(10000 * (res.loaded / res.total)) / 100
      }
    },
    async getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.infoQuery, this.getInfoLoadingChange)
          .then(response => {
            const res = response.data
            if (res) {
              this.fromRow = res
              this.fromData.l_id = res.l_id
              this.prorhythm = res.prorhythm ? JSON.parse(res.prorhythm) : JSON.parse(res.rhythm)
              this.propos = res.propos ? JSON.parse(res.propos) : JSON.parse(res.pos)
              this.washData(res)
            } else {
              this.$notify({
                title: '数据丢失',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    washData(res) {
      this.dialogVisible = true
      this.washHeartData(res.long_data)
      this.washRhythmData()
    },
    washHeartData(data) {
      console.log(12345)
      this.heartData = loop(data)
      this.heartDataLoad = true
    },
    washRhythmData(data) {

    },
    closeDialog() {
      this.defaultData = [] // 压缩心电图数据 清空
      this.tabValue = 'tagging'
      this.rhythmOptionValue = 1 // 当前选择的 标注类别 还原
      this.rhythmOptionPageNo = 0 // 当前选择的 标注类别页数 还原
      this.rhythmOptionSelectOption = [] // 当前选择 标注 清空
      this.taggingSimpleImgList = [] // 当前生成的 心电图缩略图 清空

      this.rhythm = [] // 标注 list 清空
      this.rhythmOption = [ // 标注 分类 list 清空
        {
          name: '已添加的判读依据',
          list: []
        }
      ]

      this.taggingOption = []
      this.slotTimeOption = []
      this.rhythm = []
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
