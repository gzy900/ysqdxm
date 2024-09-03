<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <!--    列表搜索栏-->
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

      <el-table-column align="center" label="测量时间">
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

    <!--    <el-dialog-->
    <!--      :visible.sync="testShow"-->
    <!--      :fullscreen="true"-->
    <!--      custom-class="chart-dialog"-->
    <!--    >-->
    <!--          <test />-->
    <!--    </el-dialog>-->

    <!--反馈窗口集合-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :fullscreen="true"
      custom-class="chart-dialog"
      @close="closeDialog"
    >

      <el-tabs v-if="dialogVisible" v-model="tabValue" type="border-card">
        <el-tab-pane name="tagging" label="标注缩略图">
          <!--          <span slot="label"><i class="el-icon-date"></i> 标注列表</span>-->

          <div class="clothes-container">
            <div class="clothes-aside">
              <div class="clothes-search">
                <p
                  v-for="(item,index) in rhythmOption"
                  class="clothes-search-item"
                  :class="index===rhythmOptionValue?'clothes-search-item-check':''"
                  @click="clothesSearch(index)"
                >
                  <span class="clothes-search-name">{{ item.name }}</span>
                  <span class="clothes-search-num">{{ item.list.length }}</span>
                </p>
              </div>
            </div>

            <div
              v-if="dialogVisible&&!chartLoading"
              ref="clothes-img"
              v-infinite-scroll="taggingSimpleListLoad"
              class="clothes-main"
              :infinite-scroll-immediate="false"
              @contextmenu.prevent="onContextmenu"
              @mousedown.left="mousedown"
              @mousemove.left="mousemove"
              @mouseup.left="mouseup"
            >
              <!--              <el-scrollbar-->
              <!--                style="height: 100%;overflow-x: hidden;"-->
              <!--                wrap-class="scrollbar-wrapper"-->
              <!--              >-->
              <!--              </el-scrollbar>-->
              <div
                v-for="item in rhythmOptionPageNum"
                class="clothes-item"
                @dragstart.prevent
              >
                <div
                  class="clothes-item-main"
                  :class="rhythmOptionSelectOption.indexOf(item-1)>=0?'check':''"
                  :data-item="item-1"
                  @dblclick="handleDblclick(item)"
                  @click.left="handleClick(item-1)"
                  @click.right.prevent="handleClickRight"
                >
                  <img
                    :src="taggingSimpleImgList[rhythmOption[rhythmOptionValue].list[item-1].index]"
                    class="clothes-item-img"
                  >
                  <!--              <div class="clothes-item-img" style=""></div>-->
                  <!--                ondragstart="return false;"-->

                  <p class="clothes-title">
                    {{
                      rhythmOption[rhythmOptionValue].list[item - 1].name + '(概率：' + parseInt(rhythmOption[rhythmOptionValue].list[item - 1].pos * 100) + '%)'
                    }}</p>
                </div>
              </div>

            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="report" label="反馈">
          <div class="submit">
            <div class="submit-img" style="overflow: hidden">
              <p class="submit-title">判读依据</p>
              <el-scrollbar
                style="height: calc(100% - 28px);overflow-x: hidden;border: 1px solid #DCDFE6;"
                wrap-class="scrollbar-wrapper"
              >
                <div class="submit-img-context">
                  <div
                    v-for="item in rhythmOption[0].list.length"
                    class="clothes-item"
                    @dragstart.prevent
                  >
                    <div
                      class="clothes-item-main"
                      :class="rhythmOptionSelectOption.indexOf(item-1)>=0?'check':''"
                      :data-item="item-1"
                      @dblclick="handleDblclick(item)"
                      @click.left="handleClick(item-1)"
                      @click.right.prevent="handleClickRight"
                    >
                      <img
                        :src="taggingSimpleImgList[rhythmOption[0].list[item-1].index]"
                        class="clothes-item-img"
                      >
                      <!--              <div class="clothes-item-img" style=""></div>-->
                      <!--                ondragstart="return false;"-->

                      <p class="clothes-title">
                        {{ rhythmOption[0].list[item - 1].name + '(' + rhythmOption[0].list[item - 1].pos + ')' }}</p>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div class="submit-txt">
              <p class="submit-title">反馈文字</p>

              <el-input
                v-model="fromData.character_remark"
                style="height: calc(100% - 28px)"
                type="textarea"
                placeholder="请输入内容"
              />
            </div>
            <div class="submit-select">
              <p class="submit-title">快捷操作</p>
              <div class="submit-select-tag">
                <tag v-if="dialogVisible" :type="1" @appendTag="appendTag" />
              </div>
              <div class="submit-select-btn">
                <el-button type="primary" size="small" @click="handleConfirmData(3)">
                  保存
                </el-button>
                <el-button type="success" size="small" @click="handleConfirmData(1)">
                  提交反馈
                </el-button>
              </div>
            </div>

            <div class="submit-pre">
              <p class="submit-title">报告预览</p>
              <div class="submit-pre-context">
                <preview-report :from-data="fromData" />
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :stretch="true" name="chart" label="完整心电图" :lazy="false">
          <heartClothes ref="test" :d_data="defaultData" @dataChange="dataChange" />
        </el-tab-pane>
        <!--        <el-tab-pane name="userInfo" label="患者信息">患者信息</el-tab-pane>-->
      </el-tabs>

    </el-dialog>

    <!--    缩略图截图图表-->
    <div v-if="dialogVisible" id="img-chart" />

    <!--    框选窗口-->
    <div
      class="clothes-select"
      :style="[{'width':clothesSelect.w+'px'},{'height':clothesSelect.h+'px'},{'top':clothesSelect.top+'px'},{'left':clothesSelect.left+'px'}]"
    />

    <!--    下载数据Loading-->
    <div v-show="chartLoading" class="clothes-loading">
      <div class="clothes-loading-context">
        <el-progress type="circle" :percentage="chartLoadingNum" />
      </div>
    </div>

    <!--    更改标注选项窗口-->
    <div v-show="changeRhythmOption" class="change-rhythm-option">
      <div class="change-rhythm-option-mask" @click.self="changeRhythmOption = false" />
      <div class="change-rhythm-option-context">
        <el-select v-model="diseaseValue" popper-class="change-rhythm-option-select" placeholder="请选择">
          <el-option
            v-for="item in diseaseList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button type="success" @click="clickChangeSelectRhythm">确定</el-button>
        <el-button @click="changeRhythmOption = false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, getList, upload } from '@/api/heart-clothes'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import heartClothes from '@/components/heart-clothes'
import pako from 'pako'
import { createDisposableWorker, makeResponse } from './worker'
import { option } from './js/option'

import Tag from '@/components/tag/clothes_tag'
import Test from '@/components/heart-clothes/test'
import PreviewReport from '@/components/preview-report/index'

import * as _echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { deepClone, base64ToFile } from '../../utils'
import { myUploadImage } from '@/api/uploadImg'

// 注册必须的组件
_echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
)

const decodeFun = function(chartDataList, longDataNum) {
  console.log('方法开始')
  console.log(new Date().getTime())

  const seriesMove = 200
  const rate = 256

  const encodedList = Array.from(chartDataList)

  const data = []
  for (let i = 0; i < encodedList.length; i += 2) {
    const listOne = encodedList[i]
    const item = 0 - ((listOne + (encodedList[i + 1] * 256)) / 102)
    data.push(item)
  }

  // let  data = longData
  const dataList = []
  const param = []
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
    const y = item * 100

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
  const infoList = []
  for (let sl = 0; sl < 30; sl++) {
    infoList.push([])
    for (let il = 0; il < 12; il++) {
      infoList[sl].push([])
    }
  }
  dataList.forEach((item, index) => {
    const positionCenter = (index * seriesMove) + (seriesMove / 2) // 计算 十二导联 心电图应处于的位置
    const dataMove = positionCenter - (param[index].all / item.length) // 计算 十二导联 心电图 目前的数据位置与 其应处于的位置的偏差
    item.forEach((item_data, i_index) => {
      const num = Math.floor(i_index / (rate * 20))
      infoList[num][index].push([Math.floor(i_index * 1000 / rate) + longDataNum * 1000 * 60 * 10, Math.floor(item_data + dataMove)])
    })
  })
  console.log('方法结束')
  console.log(new Date().getTime())
  return infoList
}

export default {
  components: { Pagination, heartClothes, Tag, PreviewReport, Test },
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
      /**
       *列表相关参数
       */
      dialogVisible: false,
      dialogTitle: '患者信息：王英雄，男，28岁。病史：房颤，搭桥，曾猝死。',
      tabValue: 'chart',
      changeRhythmOption: false,
      dataList: [],
      pageTotal: 0,
      testShow: true,

      dataFilterOption: {
        sdnn: ''
      },

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
      worker: '', // 子线程

      /**
       *心电图相关参数
       */
      rhythm: [], // 标注 list
      rhythmOption: [
        {
          name: '已添加的判读依据',
          list: []
        }
      ],
      // closeDialog
      rhythmOptionValue: 1,
      rhythmOptionPageNo: 0,
      rhythmOptionPageLen: 20,
      rhythmOptionSelectOption: [],
      taggingSimpleImgList: [],
      longSize: 0, // 心电图分片压缩长度，用于生成 时间筛选列表
      rate: 256, // 采样率， 一秒钟 256 个数据点
      seriesMove: 200,
      infoList: [], // 心电图数据 分片存储 根据查看心电图 区域不同
      currentInfoNo: [],
      queryLock: false,
      selectRow: {},

      fromRow: null,

      defaultData: [],
      imgChart: null,

      chartLoading: false,
      chartLoadingNum: 0,
      chartLoadingTxt: ['正在处理数据！'],

      /**
       * 心电图筛选相关参数
       */
      slotTime: '',
      slotTimeOption: [],
      tagging: '',
      taggingOption: [],

      clothesSelect: {
        top: 0,
        left: 0,
        w: 0,
        h: 0,
        isMove: false,
        up: false
      },

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
      diseaseValue: '',
      diseaseList: ['房颤', '一度房室阻滞', '二度传导阻滞', '噪音', 'None', '右束支传导阻滞', '心动过缓', '正常窦性心律', '室上性心动过速', '室颤', '室性心动过速'],
      fromData: {
        l_id: '',
        dispose_state: '',
        propos: [],
        prorhythm: [],
        character_remark: '',
        photo_remark: '',
        disease_statistics: ''
      },
      prorhythm: [],
      propos: []
    }
  },
  computed: {
    ...mapGetters([]),
    rhythmOptionPageNum() {
      const len = this.rhythmOptionPageNo * this.rhythmOptionPageLen
      const maxLen = this.rhythmOption[this.rhythmOptionValue].list.length
      return len < maxLen ? len : maxLen
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    handleConfirmData(state) {
      this.fromData.dispose_state = state
      const fileList = []
      this.rhythmOption[0].list.forEach((item) => {
        fileList.push(base64ToFile(this.taggingSimpleImgList[item.index]))
      })
      if (fileList.length > 0) {
        myUploadImage(fileList, this.handleConfirm, this.handleConfirmDataError)
      } else {
        this.handleConfirm()
      }
    },
    handleConfirmDataError() {
      console.log('图片提交失败')
    },

    handleConfirm(state) {
      state = state || ''
      const imglist = []
      state.data.split(',').forEach((item, index) => {
        const name = this.rhythmOption[0].list[index].name
        const time = (this.rhythmOption[0].list[index].index * 10) + '-' + ((this.rhythmOption[0].list[index].index + 1) * 10)
        imglist.push(item + '---' + time + '---' + name)
      })
      this.fromData.photo_remark = imglist.join(';')
      this.fromData.prorhythm = JSON.stringify(this.prorhythm)
      this.fromData.propos = JSON.stringify(this.propos)
      // 提交
      return new Promise((resolve, reject) => {
        upload(this.fromData)
          .then(response => {
            if (parseInt(response.code) === 200) {
              this.$notify({
                title: this.fromData.dispose_state === 1 ? '提交成功！' : '保存成功！',
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
     * 标注缩略图列表加载方法
     */
    taggingSimpleListLoad() {
      if (Math.ceil(this.rhythmOption[this.rhythmOptionValue].list.length / this.rhythmOptionPageLen) > this.rhythmOptionPageNo) {
        this.rhythmOptionPageNo++
        this.taggingSimpleListLoadImg()
      }
    },
    taggingSimpleListLoadImg() {
      const num = this.rhythmOptionPageNo * this.rhythmOptionPageLen
      const pageNum = this.rhythmOption[this.rhythmOptionValue].list.length
      const end = num <= pageNum ? num : pageNum
      const start = num - this.rhythmOptionPageLen
      const list = []
      let listNo = -1
      for (let i = start; i < end; i++) {
        const index = this.rhythmOption[this.rhythmOptionValue].list[i].index
        const tenNo = Math.floor(index / 60)
        if (tenNo !== listNo) {
          listNo = tenNo
          list.push(
            {
              tenNo,
              list: []
            }
          )
        }
        list[list.length - 1].list.push(index)
      }
      this.forWorkerImg(list, 0)
    },
    forWorkerImg(list, index = 0) {
      const item = list[index]

      if (this.infoList[item.tenNo][0][0].length <= 0) { // 如果 数据没有解析则先调用 子线程解析
        console.log('解压数据')
        console.log(new Date().getTime())
        const data = this.decode(this.defaultData[item.tenNo])
        console.log(new Date().getTime())
        console.log('解析数据')
        console.log(new Date().getTime())
        this.handleWork(decodeFun, [data, item.tenNo]).then(res => {
          console.log(new Date().getTime())
          this.infoList[item.tenNo] = res
          this.getSimpleListImg(list, index)
        })
      } else { // 已解析直接去拿数据 生成图片
        this.getSimpleListImg(list, index)
      }
    },
    getSimpleListImg(list, index) {
      const item = list[index]
      const chartDataList = []
      item.list.forEach((im, index) => {
        const twoIndex = Math.floor((im % 30) / 2)
        const start = (im % 2) * (this.rate * 10)
        const end = start + (this.rate * 4)
        // 显示哪俩条导联
        const dl = [8, 9]
        const chartImgData = []
        dl.forEach((d_i) => {
          chartImgData.push(this.infoList[item.tenNo][twoIndex][d_i].slice(start, end))
        })
        chartDataList.push(chartImgData)
      })
      // 此处调用绘图截图组件，将得到的数据传过去。
      this.setOptionImg(item.list, chartDataList, 0)
      index++
      if (index < list.length) {
        this.forWorkerImg(list, index)
      }
    },

    setOptionImg(list, chartList, index = 0) {
      this.imgChart.setOption(
        {
          xAxis: {
            min: list[index] * 10000,
            max: list[index] * 10000 + 4000
          },
          series: [
            {
              name: '1',
              data: chartList[index][0]
            },
            {
              name: '2',
              data: chartList[index][1]
            }
          ]
        }
      )

      setTimeout(() => {
        // const img = new Image()
        const src = this.imgChart.getConnectedDataURL({
          pixelRatio: 1,
          backgroundColor: '#fff'
        })

        this.$set(this.taggingSimpleImgList, list[index], src)
        index++
        if (index < list.length) {
          this.setOptionImg(list, chartList, index)
        }
      }, 60)
    },

    handleWork(work = null, args) {
      if (this.worker) {
        this.worker.terminate()
        this.worker = null
      }
      this.worker = createDisposableWorker(makeResponse(work))
      return this.worker.post({ args })
    },
    decode(encodedData) {
      const decodedData = window.atob(encodedData)

      // 字符串转数组 在循环返回一个 Unicode表所在位置的新数组
      const charData = decodedData.split('').map(x => x.charCodeAt(0))

      // Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
      const binData = new Uint8Array(charData)

      // 调用pako 解析
      return pako.inflate(binData)
    },
    // 调用心电图相关方法 start
    updateRhythm({ index, name }) {
      this.fromData.rhythm[index] = name
    },

    dataZoomChange(coord) {
      coord = coord || []
      const start = coord[0]
      const end = coord[1]
      const startPageNo = Math.floor(start / (1000 * 20))
      const endPageNo = Math.floor(end / (1000 * 20))

      const isStartPage = this.currentInfoNo.filter((value) => value === startPageNo).length > 0
      const isEndPage = this.currentInfoNo.filter((value) => value === endPageNo).length > 0

      if (isStartPage && isEndPage) { // 如果 当前窗口位置最左，右在 已渲染的数据范围内
        return // 暂时return，后续在此处 根据位移方向和位置判断是否需要预加载数据
      } else if (isStartPage && !isEndPage) { // 如果 当前窗口位置最左在 右不在
        this.currentInfoNo = [startPageNo, endPageNo] // 先将当前窗口位置保存
      } else if (!isStartPage && isEndPage) { // 如果 当前窗口位置最右在 左不在
        this.currentInfoNo = [startPageNo, endPageNo]
      } else if (!isStartPage && !isEndPage) { // 如果 当前窗口位置最左，右都不在
        if (startPageNo === endPageNo) {
          this.currentInfoNo = [startPageNo]
        } else {
          this.currentInfoNo = [startPageNo, endPageNo]
        }
      }
      this.appendChartData() // 然后调用 添加图表数据方法
    },

    appendChartData() {
      const list = []
      for (let i = 0; i < 12; i++) {
        list.push([])
      }
      const reListNo = []

      this.currentInfoNo.forEach((item) => {
        reListNo.push(item * 2, (item * 2) + 1)
        const i_tenMinIndex = Math.floor(item / (10 * 3))
        const i_oneMinIndex = item % (10 * 3)
        if (this.infoList[i_tenMinIndex][i_oneMinIndex][0].length <= 0) {
          this.decodeData(i_tenMinIndex, i_oneMinIndex)
        } else {
          this.infoList[i_tenMinIndex][i_oneMinIndex].forEach((o_item, o_index) => {
            list[o_index] = list[o_index].concat(o_item)
          })
        }
      })
      const reList = []
      reListNo.forEach((item) => {
        reList.push({
          name: this.prorhythm[item],
          index: item
        })
      })
      this.$refs.heart_clothes.appendChartData(list, reList)
    },

    decodeData(longDataNum, i_oneMinIndex) {
      const data = this.decode(this.defaultData[longDataNum])

      this.handleWork(decodeFun, [data, longDataNum]).then(res => {
        this.infoList[longDataNum] = res
        const list = []
        for (let i = 0; i < 12; i++) {
          list.push([])
        }
        this.infoList[longDataNum][i_oneMinIndex].forEach((o_item, o_index) => {
          list[o_index] = list[o_index].concat(o_item)
        })
        this.$refs.heart_clothes.appendChartData(list)
      })
    },
    clothesSearch(index) {
      this.rhythmOptionPageNo = 0
      this.rhythmOptionValue = index
      this.rhythmOptionSelectOption = []
      this.taggingSimpleListLoad()
    },
    /**
     * 事件
     */

    onContextmenu(event) {
      this.$contextmenu({
        items: [
          // { label: '取消已选择', divided: true, icon: 'el-icon-refresh' },
          {
            label: '取消已选择', divided: true, onClick: this.clearSelectOption
          },
          {
            label: '将选中添加到判读依据',
            divided: true,
            disabled: this.rhythmOptionValue === 0,
            onClick: this.addSelectToTagging
          },
          {
            label: '将选中移除判读依据',
            divided: true,
            disabled: this.rhythmOptionValue !== 0,
            onClick: this.delSelectToTagging
          },
          {
            label: '更改标注', divided: true, onClick: () => {
              this.changeRhythmOption = true
            }
          },
          {
            label: '改为...房颤', divided: true, onClick: () => {
              this.changeSelectRhythm('房颤')
            }
          },
          {
            label: '改为...一度房室阻滞', divided: true, onClick: () => {
              this.changeSelectRhythm('一度房室阻滞')
            }
          },
          {
            label: '改为...二度房室阻滞', onClick: () => {
              this.changeSelectRhythm('二度房室阻滞')
            }
          },
          {
            label: '改为...噪音', onClick: () => {
              this.changeSelectRhythm('噪音')
            }
          }
        ],
        event,
        // x: event.clientX,
        // y: event.clientY,
        customClass: 'class-a',
        zIndex: 97999,
        minWidth: 230
      })
      return false
    },

    clickChangeSelectRhythm() {
      this.changeSelectRhythm(this.diseaseValue)
      this.changeRhythmOption = false
    },

    changeSelectRhythm(name) {
      name = name || ''
      this.rhythmOptionSelectOption.forEach((item) => {
        this.rhythmOption[this.rhythmOptionValue].list[item].name = name
        this.rhythmOption[this.rhythmOptionValue].list[item].pos = 2
        const index = this.rhythmOption[this.rhythmOptionValue].list[item].index
        this.prorhythm[index] = name
        this.propos[index] = 2
      })
    },

    clearSelectOption() {
      this.rhythmOptionSelectOption = []
    },
    addSelectToTagging() {
      this.rhythmOptionSelectOption.forEach((item) => {
        this.rhythmOption[0].list.push(this.rhythmOption[this.rhythmOptionValue].list[item])
      })
      this.rhythmOptionSelectOption = []
    },
    delSelectToTagging() {
      this.rhythmOptionSelectOption.forEach((item) => {
        this.rhythmOption[0].list.splice(item, 1)
      })
      this.rhythmOptionSelectOption = []
    },

    handleDblclick(item) {
      const index = this.rhythmOption[this.rhythmOptionValue].list[item - 1].index
      // console.log('双击')
      // this.dialogVisibleChart = true
      this.tabValue = 'chart'
      this.currentInfoNo = [Math.floor(index / 2)]
      this.$nextTick(() => {
        this.appendChartData()
        this.$refs.heart_clothes.moveDataZoom(index * 1000 * 10)
      })
    },
    handleClick(item) {
      const index = this.rhythmOptionSelectOption.indexOf(item)
      if (index >= 0) {
        this.rhythmOptionSelectOption.splice(index, 1)
      } else {
        this.rhythmOptionSelectOption.push(item)
      }
      // console.log('单击')
    },
    handleClickRight(event) {
      // this.clothesSelect.h = 0
      // this.clothesSelect.w = 0
      // this.clothesSelect.top = event.pageY
      // this.clothesSelect.left = event.pageX
      // console.log('右键单击')
    },
    mousedown(event) {
      this.clothesSelect.h = 0
      this.clothesSelect.w = 0
      this.clothesSelect.top = event.pageY
      this.clothesSelect.left = event.pageX
      this.clothesSelect.isMove = true
      // pageX
      // console.log('鼠标按下')
    },
    mousemove(event) {
      if (this.clothesSelect.isMove) {
        this.clothesSelect.up = true
        this.clothesSelect.h = Math.abs(event.pageY - this.clothesSelect.top)
        this.clothesSelect.w = Math.abs(event.pageX - this.clothesSelect.left)
        // pageX
      }
    },
    mouseup(event) {
      if (this.clothesSelect.up) {
        const obj = deepClone(this.clothesSelect)
        this.clothesSelect.h = 0
        this.clothesSelect.w = 0
        this.washSelect(obj)
      }
      this.clothesSelect.isMove = false
      this.clothesSelect.up = false
    },
    washSelect(obj1) {
      const domList = Array.from(this.$refs['clothes-img'].getElementsByClassName('clothes-item-main'))
      domList.forEach((item) => {
        const obj2 = item.getBoundingClientRect()
        const maxX = Math.max(obj1.w + obj1.left, obj2.width + obj2.left)
        const maxY = Math.max(obj1.h + obj1.top, obj2.height + obj2.top)
        const minX = Math.min(obj1.left, obj2.left)
        const minY = Math.min(obj1.top, obj2.top)

        if (maxX - minX <= obj1.w + obj2.width && maxY - minY <= obj1.h + obj2.height) {
          const index = parseInt(item.getAttribute('data-item'))
          if (this.rhythmOptionSelectOption.indexOf(index) < 0) {
            this.rhythmOptionSelectOption.push(index)
          }
        }
      })
    },
    handleOpenFile({ row }) {
      this.selectRow = row
      this.$refs.file.dispatchEvent(new MouseEvent('click')) // handlePreview
    },
    handleLoadFile({ row }) {
      window.open(row.ecg_data)
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
        this.defaultData = content.split('MAILFILEGAP')

        this.initInfoDataStructure(this.defaultData.length - 1)
        this.$refs.file.value = ''
        this.infoQuery.l_id = row.l_id
        this.infoQuery.serial_number = -2

        this.imgChart = _echarts.init(document.getElementById('img-chart'))
        this.imgChart.setOption(option)
        this.getInfo()
      }
      reader.readAsText(file)
    },

    /**
     * 生成infoList 的数据结构
     */
    initInfoDataStructure(i_length) {
      this.infoList = []
      for (let i = 0; i < i_length; i++) {
        // 循环生成 总数据结构里的 十分钟 列表
        this.infoList.push([])
        for (let j = 0; j < 30; j++) {
          // 循环生成 十分钟 结构里的 20秒 列表
          this.infoList[i].push([])
          for (let k = 0; k < 12; k++) {
            // 循环生成 一分钟里结构里的 十二导联列表
            this.infoList[i][j].push([])
          }
        }
      }
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
      this.tabValue = 'chart'
      this.dialogVisible = true
      this.chartLoading = true
      this.infoQuery.l_id = row.l_id
      this.infoQuery.serial_number = -1
      this.fromData.l_id = row.l_id
      this.getInfo()
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
              if (this.infoQuery.serial_number === -2) { // 读取文件方式 获取心电数据 此时直接去分解 option
                console.log(res)
                this.washRhythmOption(res)
              } else { // 调用接口方式 获取心电数据 此时先去分解心电数据
                console.log(res)
                this.defaultData = res.long_data.split('MAILFILEGAP')
                this.initInfoDataStructure(this.defaultData.length - 1)
                this.imgChart = _echarts.init(document.getElementById('img-chart'))
                this.imgChart.setOption(option)
                this.washRhythmOption(res)
              }
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

    setProrhythm() {
      const list = []
      this.propos = []
      for (let i = 0; i < 8640; i++) {
        list.push('无')
        this.propos.push(1)
      }
      return list
    },
    washRhythmOption() {
      // res = res || {}
      console.log(this.prorhythm)
      // if (!this.prorhythm) {
      //   this.chartLoading = false
      //   return
      // }
      this.prorhythm = this.prorhythm || this.setProrhythm()

      console.log(1111)
      console.log(this.rhythmOption)
      // res.rhythm = JSON.parse(res.rhythm)
      // res.pos = JSON.parse(res.pos)
      this.prorhythm.forEach((item, index) => {
        let isItem = false
        let newItemIndex = -1
        for (let i = 0; i < this.rhythmOption.length; i++) {
          if (this.rhythmOption[i].name === item) {
            newItemIndex = i
            isItem = true
          }
        }
        if (!isItem) {
          newItemIndex = this.rhythmOption.push({
            name: item,
            list: []
          }
          ) - 1
        }
        this.rhythmOption[newItemIndex].list.push(
          {
            name: item,
            pos: this.propos[index],
            index: index,
            isSelect: false
          }
        )
      })

      // this.$refs.test.dataChange(this.defaultData)

      this.washDiseaseList()

      this.chartLoading = false
    },
    dataChange() {
      this.tabValue = 'tagging'
      console.log('加载完毕')
    },
    washDiseaseList() {
      console.log(2)
      const list = []
      this.diseaseList.forEach((d_item) => {
        const ar = this.rhythmOption.filter(item => item.name === d_item)
        const isAr = ar.length > 0

        const name = d_item
        const count = isAr ? ar[0].list.length : '0'
        const pos = isAr ? ar[0].list[0].pos : '0'
        const disease = d_item + '，发生了' + count + '次，总共' + (count * 10) + 's，占总体时间的' + ((count / (24 * 60 * 6)) * 100) + '%'
        list.push(name + '---' + count + '---' + pos + '---' + disease)
      })
      this.fromData.disease_statistics = list.join(';')
    },
    /**
     * 标注值改变
     */

    handleTaggingChange(event) {
      this.$refs.heart_clothes.moveDataZoom(event[event.length - 1])
      this.currentInfoNo = []
      this.appendChartData(Math.floor(event[event.length - 1] / (1000 * 60)))
    },
    /**
     * 时间值改变
     */
    handleTimeChange(event) {
      this.$refs.heart_clothes.moveDataZoom(event[event.length - 1] * 1000 * 60 * 10)
      this.currentInfoNo = []
      this.infoQuery.serial_number = event[event.length - 1]
      this.getInfo()
    },

    appendTag(data) {
      // 自动换行
      if (this.fromData.character_remark.length > 0) {
        // this.fromData.explain += ('\n\n' + this.replyNum + '、' + data.text)
        this.fromData.character_remark += ('\n\n' + data.text)
      } else {
        // this.fromData.explain += this.replyNum + '、' + (data.text)
        this.fromData.character_remark += (data.text)
      }
    },
    /**
     *关闭处理弹窗 回调，清理 心电图相关数据
     */
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
    },
    // 列表相关方法 end
    handleDisableImg() {
      return false
    }
  }
}
</script>

<style lang="css">
.submit-img .scrollbar-wrapper {
  overflow-x: hidden !important;
}

.submit-txt .el-textarea__inner {
  height: 100%;
}

.el-select-dropdown {
  z-index: 93999 !important;
}

.clothes-item-main:hover .clothes-item-img {
  animation: myfirst 5s;
}

@keyframes myfirst {
  from {
    left: 0;
  }
  to {
    left: -50%;
  }
}

.chart-dialog .el-dialog__body {
  padding-top: 5px;
  padding-bottom: 20px;
}

</style>
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
  user-select: none;

}

.clothes-select {
  width: 0;
  height: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(64, 158, 255, .4);
  border: 1px solid rgba(64, 158, 255, .8);
  z-index: 19999;
  pointer-events: none;
  opacity: .5;
}

.submit-img-context {
  width: 100%;
  height: auto;
  /*border: 1px solid #DCDFE6;*/

  .clothes-item {
    width: 100%;
    /*border: 1px solid #DCDFE6;*/
    height: 200px;
    padding: 10px;
    margin: 0;
    float: left;
  }

  .clothes-item-main {
    width: 100%;
    height: 100%;
    /*border: 1px solid #DCDFE6;*/
    position: relative;
    overflow: hidden;

    .clothes-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      line-height: 30px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .clothes-item-img {
      width: auto;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.clothes-main {
  width: 100%;
  height: 100%;
  flex: auto;
  overflow: auto;
  /*overflow: hidden;*/

  .clothes-item {
    width: 25%;
    height: 25%;
    /*border: 1px solid #DCDFE6;*/
    padding: 10px;
    margin: 0;
    float: left;
  }

  .clothes-item-main {
    width: 100%;
    height: 100%;
    border: 1px solid #DCDFE6;
    position: relative;
    overflow: hidden;

    .clothes-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      margin: 0;
      line-height: 30px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .clothes-item-img {
      width: auto;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .clothes-item-main.check {
    box-shadow: 0 0 5px rgba(64, 158, 255, .8);
    border: 1px solid rgba(64, 158, 255, .8);
  }
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

  .clothes-search-item {
    width: 100%;
    display: flex;
    margin: 0;
    height: 48px;
    line-height: 48px;
    color: #666666;
    cursor: pointer;
    padding: 0 8px;
  }

  .clothes-search-item:hover {
    background-color: #DCDFE6;
    /*color: #ffffff;*/
  }

  .clothes-search-item-check {
    color: rgb(64, 158, 255);
  }

  .clothes-search-name {
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .clothes-search-num {
    flex: none;
    text-align: right;
  }
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

#img-chart {
  width: 600px;
  height: 240px;
  position: absolute;
  top: 20%;
  left: 20%;
  background-color: #ffffff;
  z-index: 99999;
  border: 1px solid #333333;
  display: none;
}

.submit {
  width: 100%;
  height: 100%;
  display: flex;
}

.submit > div {
  margin-left: 20px;
}

.submit-pre {
  width: 375px;
  margin-left: 0;
  flex: none;
  position: relative;
}

.submit-pre-context {
  width: 100%;
  height: calc(100% - 28px);
  position: relative;
  border: 1px solid #ccc;
}

.submit-title {
  line-height: 28px;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.submit-img {
  width: 350px;
  overflow-x: hidden !important;
  border-radius: 4px;
  flex: none;
  margin-left: 0 !important;

  /*p {*/
  /*  width: 100%;*/
  /*  height: 200px;*/
  /*  margin-top: 0;*/
  /*  margin-bottom: 16px;*/
  /*  border: 1px solid #ccc;*/
  /*}*/
}

.submit-txt {
  width: 350px;
  flex: auto;
}

.submit-select {
  width: 350px;
  flex: none;
  display: flex;
  flex-direction: column;

  .submit-title {
    flex: none;
  }
}

.submit-select-tag {
  flex: auto;
}

.submit-select-btn {
  width: 100%;
  height: 32px;
  flex: none;
  display: flex;
  justify-content: flex-end;
}

.change-rhythm-option-select {
  z-index: 93999;
}

.change-rhythm-option {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 92999;

  .change-rhythm-option-mask {
    width: 100%;
    height: 100%;
  }

  .change-rhythm-option-context {
    padding: 30px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 100px);
    border: 2px solid #42b983;
  }

}

.clothes-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 91999;

  .clothes-loading-context {
    flex: none;
    height: auto;
    width: auto;
  }
}
</style>
