<template>
  <div class="chart-page">
    <el-row style="margin-bottom: 10px">
      <div style="text-align: right">
        <el-date-picker
          v-model="listQuery.beginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择起始日期"
        />
        -
        <el-date-picker
          v-model="listQuery.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束日期"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </el-row>
    <el-scrollbar
      style="height: calc( 100% - 46px )"
      wrap-class="scrollbar-wrapper"
    >
      <div
        ref="chartDiv"
        v-infinite-scroll="getList"
        class="chart-div"
        infinite-scroll-disabled="false"
        infinite-scroll-immediate="false"
        infinite-scroll-delay="300"
      >
        <heart-chart
          v-for="item in dataList"
          :id="'history'"
          :heart-id="item.heart_id"
          :report-url="item.report_url"
          :report="item.row"
          :sub-title="subTitle(item)"
          @appendImg="appendImg"
          @openDialog="openDialog"
        />
      </div>
      <p v-if="loading" class="load-tip">加载中...</p>
      <p v-if="noMore" class="load-tip">没有更多了</p>
    </el-scrollbar>

    <!--    //详情-->
    <el-dialog :append-to-body="true" :visible.sync="infoDialogVisible" :title="'历史反馈详情'" @close="closeDialog">

      <el-form ref="fromData" label-width="120px" label-position="right" :disabled="true">

        <el-form-item v-if="rowInfo.url" label="判读依据：">
          <el-col :span="24">

            <el-image
              v-for="item in rowInfo.url.split(',')"
              style="width: 100px; height: 100px"
              :preview-src-list="rowInfo.url.split(',')"
              class="basis-img"
              :src="item"
              :z-index="4000"
              @click="popDisplay=false"
            />

          </el-col>
        </el-form-item>

        <el-form-item label="反馈建议：">
          <el-col :span="24">
            <el-input
              v-model="rowInfo.explain"
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入反馈建议或者点击标签快速回复！"
            />
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getList } from '@/api/arrhythmia-chart'
import { getInfo } from '@/api/feedback'
import heartChart from '@/components/heart-chart'

export default {
  components: { heartChart },
  props: {
    row: {
      type: Object,
      default: null
    },
    flag: {
      type: String,
      default: null
    },
    uuid: {
      type: String,
      default: ''
    },
    beginTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      listQuery: {
        pageNo: 1,
        number: 3,
        beginTime: '',
        endTime: ''
      },
      flagType: null,
      dataList: [],
      dataListItem: [],
      rowInfo: {},
      infoDialogVisible: false,
      pageSize: -1,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.listQuery.pageNo >= this.pageSize
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.listQuery.beginTime = this.beginTime
    this.listQuery.endTime = this.endTime
    this.flagType = this.flag || this.row.flag || '1'

    this.getList()
  },
  methods: {
    handleSearch() {
      this.listQuery.pageNo = 1
      this.pageSize = -1
      this.dataList = []
      this.dataListItem = []
      this.getList()
    },
    subTitle(row) {
      let subTitle = ''

      if (this.flagType === '1') {
        subTitle = 'QTC：' + row.QTC + '; ' + 'QRS：' + row.QRS + '; ' + 'HR：' + row.heart_rate_avg + '; '
      } else {
        subTitle = 'SDN：' + row.heart_change + '; ' + 'PSI：' + row.PSI + '; ' + 'HR：' + row.heart_rate_avg + '; '
      }
      if (row.row && row.row.isImport && row.row.isImport.length > 0) {
        subTitle += ' 初步诊断：' + row.row.isImport.split('======').join(',')
      }
      return subTitle
    },

    // 查询心电数据
    async getList() {
      if (this.pageSize >= 0 && this.listQuery.pageNo > this.pageSize) {
        return
      }
      this.loading = true
      const les = await getList({ uuid: this.row.uuid, flag: this.flagType || 1, ...this.listQuery })

      this.loading = false
      this.dataListItem = les.data.dataList

      this.pageSize = les.data.pageSize
      this.listQuery.pageNo++
      for (let i = 0; i < this.dataListItem.length; i++) {
        this.getInfo(this.dataListItem[i].report_id, i, this.dataListItem.length)
      }
    },
    appendImg(img) {
      this.$emit('appendImg', img)
    },

    // 查询心电数据
    async getInfo(report_id, num, numAll) {
      return new Promise((resolve, reject) => {
        getInfo({ privateId: report_id, type: this.flagType })
          .then(response => {
            this.dataListItem[num].row = response.data
            if (num >= numAll - 1) {
              this.dataList = this.dataList.concat(this.dataListItem)
            }
          })
          .catch(error => {
            this.dataListItem[num].row = null

            if (num >= numAll - 1) {
              this.dataList = this.dataList.concat(this.dataListItem)
            }
            console.log(error)
          })
      })
    },
    openDialog(row) {
      this.rowInfo = row
      this.infoDialogVisible = true
    },
    closeDialog() {
      this.$refs.fromData.resetFields()
    }
  }
}
</script>

<style lang="scss">
  .chart-div{
    div + div{
      margin-top: 30px !important;
    }
  }
  .chart-page{
    .scrollbar-wrapper{
      overflow-x: hidden !important;
    }
  }
</style>

<style scoped lang="scss">
  .chart-page{
    width: 100%;
    height: 100%;
    .el-row{
      height: 36px;
    }
  }
  .chart-div{
    width: 100%;

  }
  .chart-page{
  }
  .load-tip{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    overflow: hidden;
  }
  .currentChart{
    height: 100%;
  }
</style>
