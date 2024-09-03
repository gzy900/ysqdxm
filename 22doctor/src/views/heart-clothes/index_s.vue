<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="from-search">
          <p class="from-search-button">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
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
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === '1'" type="" size="small" @click="handleSeeReport(scope)">PDF报告
          </el-button>
          <el-button type="success" size="small" @click="handleOpenHeart(scope)">
            处理
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="判读状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="处理状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.dispose_state | dispose_stateTypeFilter">
            {{ scope.row.dispose_state | dispose_stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据ID" width="280">
        <template slot-scope="scope">
          {{ scope.row.l_id }}
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

      <el-table-column align="center" label="测量时间">
        <template slot-scope="scope">
          {{ scope.row.beginTime + '---' + scope.row.endTime }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :fullscreen="true"
      custom-class="chart-dialog"
      @close="closeDialog"
    >
      <div class="clothes-container">
        <div class="clothes-aside">

          <div class="clothes-handle">
            <el-button @click="handleConfirm(1)">提交</el-button>
            <el-button @click="handleConfirm(3)">保存</el-button>
            <el-button>返回</el-button>
          </div>

          <div class="clothes-search">
            <div class="c-aside-item">
              <p>时间段定位：</p>
              <el-cascader
                v-model="slotTime"
                clearable
                :show-all-levels="false"
                :options="slotTimeOption"
                :props="{ expandTrigger: 'hover' }"
                @change="handleTimeChange"
              />
            </div>

            <div class="c-aside-item">
              <p>标注定位：</p>

              <el-cascader
                v-model="tagging"
                clearable
                :show-all-levels="false"
                :options="taggingOption"
                :props="{ expandTrigger: 'hover' }"
                @change="handleTaggingChange"
              />
            </div>
          </div>
        </div>

        <div class="clothes-main">
          <heartClothes
            ref="heart_clothes"
            :long-data="[]"
            :rhythm="rhythm"
            @updateRhythm="updateRhythm"
            @dataZoomChange="dataZoomChange"
          />

          <div v-show="chartLoading" class="mask-chart">
            <ul>
              <li v-for="item in chartLoadingTxt">{{ item }}</li>
              <!--          <li>正在加载数据...</li>-->
              <!--          <li>正在解压数据包...</li>-->
              <!--          <li>正在构建核心组件...</li>-->
              <!--          <li>正在解析数据包...</li>-->
              <!--          <li>正在渲染图形...</li>-->
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getInfo, upload } from '@/api/heart-clothes'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import heartClothes from '@/components/heart-clothes'
import { decode_clothes as decode } from '@/utils/pako'

export default {
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
    }
  },
  data() {
    return {
      /**
       *列表相关参数
       */
      dialogVisible: false,
      dialogTitle: '心电图',
      dataList: [],
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      stateOption: [
        {
          label: '已判读',
          value: '1'
        },
        {
          label: '未判度',
          value: '0'
        }
      ],

      /**
       *心电图相关参数
       */
      rhythm: [], // 标注 list
      longSize: 0, // 心电图分片压缩长度，用于生成 时间筛选列表
      rate: 256, // 采样率， 一秒钟 256 个数据点
      seriesMove: 200,
      infoList: [], // 心电图数据 分片存储 根据查看心电图 区域不同 赋值给 this.heartData
      heartData: [], // 心电图数据 传递给心电图使用
      currentInfoNo: [],
      queryLock: false,

      chartLoading: false,
      chartLoadingTxt: ['正在处理数据！'],

      /**
       * 心电图筛选相关参数
       */
      slotTime: '',
      slotTimeOption: [],
      tagging: '',
      taggingOption: [],

      /**
       * 提交更新相关参数
       */
      infoQuery: {
        l_id: '142bd3eac4b747c0a9f9ec343a7b673f',
        serial_number: -1
      },
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        audit: '',
        os: ''
      },
      fromData: {
        l_id: '',
        dispose_state: '',
        rhythm: []
      }
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getList()
  },
  methods: {

    /**
     * 生成infoList 的数据结构
     */
    initInfoDataStructure(i_length) {
      for (let i = 0; i < i_length; i++) {
        // 循环生成 总数据结构里的 十分钟 列表
        this.infoList.push([])
        for (let j = 0; j < 10; j++) {
          // 循环生成 十分钟 结构里的 一分钟列表
          this.infoList[i].push([])
          for (let k = 0; k < 12; k++) {
            // 循环生成 一分钟里结构里的 十二导联列表
            this.infoList[i][j].push([])
          }
        }
      }
    },
    decodeData(longData) {
      let data = decode(longData, '1') // 解压数据包
      const dataList = []
      const param = []
      data = data || []
      let pointI = 0
      for (let i = 0; i < 12; i++) {
        param.push({
          min: 0,
          max: 0,
          in: 0,
          all: 0
        })
        dataList.push(
          []
        )
      }

      data.forEach((item, index) => {
        // const num = Math.floor(index / 8) //  取整除，整除代表位置
        const remainder = index % 8 //  取余数，余数代表第几导联
        const diff = remainder <= 1 ? remainder : remainder + 4
        const y = Math.floor(item * 100)

        if (diff === 0) {
          // 记录第一导联的数据
          pointI = y
        }
        if (diff === 1) {
          // 在第二导联计算 III VR VL VF 导联的数据
          // const pointIII = y - pointI
          // const pointVR = -(y + pointI) / 2
          // const pointVL = (pointI - (y - pointI)) / 2
          // const pointVF = (y + (y - pointI)) / 2
          const calcPoint = []
          calcPoint.push(y - pointI)
          calcPoint.push(-(y + pointI) / 2)
          calcPoint.push((pointI - (y - pointI)) / 2)
          calcPoint.push((y + (y - pointI)) / 2)

          calcPoint.forEach((item, index) => {
            const calcDiff = diff + index + 1
            dataList[calcDiff].push(item)

            if (item > param[calcDiff].max) {
              param[calcDiff].max = item
            }
            if (item < param[calcDiff].min) {
              param[calcDiff].min = item
            }
            param[calcDiff].all += item
          })
        }

        dataList[diff].push(y)

        if (y > param[diff].max) {
          param[diff].max = y
        }
        if (y < param[diff].min) {
          param[diff].min = y
        }
        param[diff].all += y
      })

      console.log(this.infoList)
      console.log(dataList)
      dataList.forEach((item, index) => {
        const positionCenter = (index * this.seriesMove) + (this.seriesMove / 2) // 计算 十二导联 心电图应处于的位置
        const dataMove = positionCenter - (param[index].all / item.length) // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差

        item.forEach((item_data, i_index) => {
          const phase = this.rate * 60 // 分段存储数据，每一分钟一个List
          // if (i_index % phase === 0) {
          //   this.infoList[this.infoQuery.serial_number] = [[], [], [], [], [], [], [], [], [], [], [], []]
          //   // this.heartList.push()
          // }
          const num = Math.floor(i_index / phase)

          this.infoList[this.infoQuery.serial_number][num][index].push([(i_index * 1000 / this.rate) + this.infoQuery.serial_number * 1000 * 60 * 10, (item_data + dataMove)])

          // newItem.push([i_index * 1000 / this.rate, parseFloat((item_data + dataMove).toFixed(2))])
        })
      })
    },

    handleOption(longSize) {
      for (let i = 0; i < longSize; i++) {
        const than = i % 12 // 余数
        const times = Math.floor(i / 12) // 倍数
        if (than === 0) {
          this.slotTimeOption.push(
            {
              label: (times * 10 * 12) + '-' + ((times + 1) * 10 * 12) + ' 分钟',
              value: times,
              children: []
            }
          )
        }
        this.slotTimeOption[times].children.push(
          {
            label: (i * 10) + '-' + ((i + 1) * 10) + ' 分钟',
            value: i
          }
        )
      }
      // const tagObj = {}
      this.rhythm.forEach((item, index) => {
        let tagIndex = -1
        this.taggingOption.forEach((t_item, t_index) => {
          if (t_item.name === item) {
            tagIndex = t_index
          }
        })
        if (tagIndex < 0) {
          tagIndex = this.taggingOption.push({

            label: item,
            value: item,
            name: item,
            children: []
          }) - 1
        }
        const zc = Math.floor(index / (6 * 60))
        if (!this.taggingOption[tagIndex].children[zc]) {
          this.taggingOption[tagIndex].children.push({
            label: zc + '-' + (zc + 1) + '小时',
            value: zc,
            children: []
          })
        }
        this.taggingOption[tagIndex].children[zc].children.push({
          label: item + '(' + (index * 10) + '-' + ((index + 1) * 10) + ' 秒)',
          value: index * 10 * 1000
        })
      })
    },

    /**
     * 打开心电图界面并加载数据
     */
    handleOpenHeart({ row }) {
      this.dialogVisible = true
      this.infoQuery.l_id = row.l_id
      this.fromData.l_id = row.l_id
      this.fromData.dispose_state = row.dispose_state
      this.fromData.rhythm = JSON.parse(row.rhythm)
      this.rhythm = JSON.parse(row.rhythm)
      this.getInfo()
    },
    async getInfo() {
      return new Promise((resolve, reject) => {
        this.queryLock = true
        this.chartLoading = true
        getInfo(this.infoQuery)
          .then(response => {
            const res = response.data
            this.queryLock = false
            if (res && parseInt(res.long_size) > 0) {
              // this.longData = res.long_data
              // this.handleOption(res.long_data)
              if (this.longSize <= 0) {
                this.initInfoDataStructure(res.long_size)
                this.handleOption(res.long_size)
              }
              this.longSize = parseInt(res.long_size)
              this.decodeData(res.long_data)
              this.appendChartData(this.infoQuery.serial_number * 10, parseInt(res.long_size))
              this.chartLoading = false
            } else {
              // this.$notify({
              //   title: '抱歉，没有找到该条数据的反馈信息',
              //   type: 'error'
              // })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 调用心电图相关方法 start
    updateRhythm({ index, name }) {
      this.fromData.rhythm[index] = name
    },
    appendChartData(index) {
      console.log('添加数据')
      console.log(this.currentInfoNo)
      const tenMinIndex = Math.floor(index / 10)
      const oneMinIndex = index % 10
      if (this.infoList[tenMinIndex][oneMinIndex][0].length <= 0) {
        if (!this.queryLock) {
          this.infoQuery.serial_number++
          this.getInfo()
        }
        return
      }

      if (this.currentInfoNo[0] > index) {
        if (this.currentInfoNo.length >= 3) {
          this.currentInfoNo.pop()
        }
        this.currentInfoNo.unshift(index)
      } else {
        if (this.currentInfoNo.length >= 3) {
          this.currentInfoNo.shift()
        }
        this.currentInfoNo.push(index)
      }

      if (this.currentInfoNo.length <= 0) {
        this.currentInfoNo.push(index)
      }
      let list = []
      const reList = []
      this.currentInfoNo.forEach((item) => {
        const i_tenMinIndex = Math.floor(item / 10)
        const i_oneMinIndex = item % 10
        if (list.length <= 0) {
          list = this.infoList[i_tenMinIndex][i_oneMinIndex]
          return
        }
        this.infoList[i_tenMinIndex][i_oneMinIndex].forEach((o_item, o_index) => {
          list[o_index] = list[o_index].concat(o_item)
        })
      })
      this.$refs.heart_clothes.appendChartData(list)
    },
    dataZoomChange(coord) {
      coord = coord || []
      const start = coord[0]
      const end = coord[1]
      console.log(coord)
      const currentEnd = this.currentInfoNo[this.currentInfoNo.length - 1]
      const currentStart = this.currentInfoNo[0]
      if (end + 10000 > (currentEnd + 1) * (1000 * 60)) {
        console.log('dataZoomChange')
        this.appendChartData(currentEnd + 1)
      }
      if (start - 10000 < (currentStart) * (1000 * 60)) {
        console.log('dataZoomChange')
        if (currentEnd === 0) {
          return
        }
        this.appendChartData(currentEnd - 1)
      }
    },

    /**
     * 标注值改变
     */

    handleTaggingChange(event) {
      console.log(event)
      this.$refs.heart_clothes.moveDataZoom(event[event.length - 1])
      this.currentInfoNo = []
      this.appendChartData(Math.floor(event[event.length - 1] / (1000 * 60)))
      // console.log(event)
    },
    /**
     * 时间值改变
     */
    handleTimeChange(event) {
      console.log(event)
      this.$refs.heart_clothes.moveDataZoom(event[event.length - 1] * 1000 * 60 * 10)
      this.currentInfoNo = []
      this.infoQuery.serial_number = event[event.length - 1]
      this.getInfo()
      // console.log(event)
    },
    // 调用心电图相关方法 end

    handleConfirm(state) {
      // 提交
      this.fromData.dispose_state = state
      this.fromData.rhythm = JSON.stringify(this.fromData.rhythm)
      return new Promise((resolve, reject) => {
        upload(this.fromData)
          .then(response => {
            console.log(1123)
            console.log(response)
            if (parseInt(response.code) === 200) {
              this.$notify({
                title: state === 1 ? '提交成功！' : '保存成功！',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '服务器错误，请联系管理员！',
                type: 'error'
              })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    /**
     *关闭处理弹窗 回调，清理 心电图相关数据
     */
    closeDialog() {
      this.chartType = '当前数据'
      this.taggingOption = []
      this.slotTimeOption = []
      this.longData = ''
      this.rhythm = []
      this.getList()
    },

    // 列表相关方法 start
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },
    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    /**
     * 查看 pdf 报告
     * @param row
     */
    handleSeeReport({ row }) {
      if (row.report_url) {
        window.open(row.report_url)
      } else {
        this.$notify({
          title: '无PDF链接',
          type: 'warning'
        })
      }
    }
    // 列表相关方法 end
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }

  .el-tag-div {
    padding: 10px 0;
    margin-left: 120px;
  }

  .clothes-container {
    width: 100%;
    height: 100%;
    display: flex;

  }

  .clothes-main {
    width: 100%;
    height: 100%;
    flex: auto;
  }

  .clothes-aside {
    margin-right: 20px;
    width: 250px;
    height: 100%;
    flex: none;
    display: flex;
    flex-direction: column;
  }

  .clothes-search {
    width: 100%;
    flex: auto;
  }

  .clothes-handle {
    width: 100%;
    height: auto;
    flex: none;
  }

  .mask-chart {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);
    text-align: center;

    ul {
      width: 100%;
      height: auto;
      overflow: hidden;
      position: absolute;
      bottom: 50%;
      left: 0;
    }

    li {
      width: 100%;
      line-height: 30px;
      color: #f1f2f3;
      list-style: none;
    }
  }

</style>
