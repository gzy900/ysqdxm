<template>
  <div class="ischemia" :class="showTypeHeight[showType]">
    <el-scrollbar
      style="height: 100%"
      wrap-class="scrollbar-wrapper"
    >
      <div class="ischemia-top">
        <p class="ischemia-top">
          <span class="ischemia-top-left">{{ time + ' —— ' + subTitle }}</span>

          <span class="ischemia-top-right">
            <el-button type="primary" size="mini" @click="handleClickShowType">
              {{ showTypeName[showType] }}
            </el-button>
          </span>
        </p>
      </div>
      <div class="ischemia-chart">
        <heart-chart
          v-for="(item,index) in dataList"
          :key="index"
          :heart-id="heartId + index"
          :report-url="reportUrl"
          :sub-title="leadName[index]"
          :data="item"
          :flag="7"
          @appendImg="appendImg"
        />
      </div>
    </el-scrollbar>
    <!--    <p class="split-shadow"></p>-->
  </div>
</template>

<script>
import { getHeart } from '@/api/arrhythmia-chart'
import heartChart from '@/components/heart-chart'
import { deepClone } from '../../utils'

export default {
  components: { heartChart },
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    heartId: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    report: {
      type: Object,
      default: null
    },

    reportUrl: {
      type: String,
      default: null
    },
    data: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dataList: [],
      time: '',
      showType: 0, // 0 展开状态，对应按钮 为关闭，1
      showTypeName: [
        '收起',
        '半展',
        '展开'
      ],
      showTypeHeight: [
        'showAll',
        'showHide',
        'showHalf'
      ],
      leadName: [
        'V1',
        'I',
        'V2',
        'V4',
        'V6',
        'II'
      ]
    }
  },
  computed: {
  },
  mounted() {
    this.getList()
  },
  methods: {
    // subTitle(row) {
    //   let subTitle = ''
    //
    //   if (this.flagType === '1') {
    //     subTitle = 'QTC：' + row.QTC + '; ' + 'QRS：' + row.QRS + '; ' + 'HR：' + row.heart_rate_avg + '; '
    //   } else {
    //     subTitle = 'SDB：' + row.heart_change + '; ' + 'PSI：' + row.PSI + '; ' + 'HR：' + row.heart_rate_avg + '; '
    //   }
    //   if (row.row && row.row.isImport && row.row.isImport.length > 0) {
    //     subTitle += ' 初步诊断：' + row.row.isImport.split('======').join(',')
    //   }
    //   return subTitle
    // },

    // 查询心电数据
    async getList() {
      const les = await getHeart({ heart_id: this.heartId })
      const res = les.data
      if (!res || !res.os || !res.heartRecord || res.heartRecord.length <= 0) {
        this.$notify({
          title: '心电图丢失！',
          type: 'warning'
        })
        this.isError = true
        return
      }
      this.time = res.endTime
      const data = res.heartRecord.split('__MVTECH__')

      data.forEach((item, index) => {
        const itemObj = deepClone(res)
        itemObj.heartRecord = item
        this.dataList.push(itemObj)
      })
    },
    appendImg(img) {
      this.$emit('appendImg', img)
    },
    handleClickShowType() {
      this.showType++
      if (this.showType > 2) {
        this.showType = 0
      }
    }
  }
}
</script>

<style>
  .showHide .scrollbar-wrapper{
    overflow: hidden !important;
    margin-right: 0 !important;
  }
</style>

<style scoped lang="scss">
  .ischemia{
    width: 100%;
    height: 300px;
    overflow: hidden;
    padding: 10px 0;
    background-color: #f3f4f5;
    border-top: 3px solid #1890ff;
    border-bottom: 3px solid #1890ff;
    margin-bottom: 30px;
  }
  .ischemia-chart{
    font-size: 12px;
  }
  .ischemia-top{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 10px;
    p{
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .ischemia-top-left{
      width: 80%;
      float: left;
    }
    .ischemia-top-right{
      width: 20%;
      float: right;
      text-align: right;
    }
  }
  .showHide{
    height: 62px !important;
    overflow: hidden !important;

  }
  .showHalf{
    height: 360px !important;
    overflow: auto !important;
  }
  .showAll{
    height: auto !important;
    overflow: hidden !important;
  }
  .split-shadow{
    margin: 20px 0 10px;
    padding: 0;
    box-shadow: 0 0 5px #1890ff;
    width: 100%;
    height: 1px;
  }
</style>
