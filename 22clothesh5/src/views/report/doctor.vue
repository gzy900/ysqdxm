<template>
  <div class="doctor" :class="loading?'load':''">
    <!--    <input type="file" @change="file"/>-->
    <div class="patient">
      <p class="patient-title">患者信息</p>
      <div class="patient-info">
        <div class="patient-info-top">
          <p class="avatar">
            <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.woyaogexing.com%2F2021%2F08%2F21%2F6c51c5a603f748c187c3bee27fdf2052%21400x400.jpeg&refer=http%3A%2F%2Fimg2.woyaogexing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671701691&t=e5e5f7e8e13f60bbd5ad890f4155a0bc"/>
          </p>
          <p class="basics">
            <span class="name">患者姓名：{{ dataInfo.patientName }}</span>
            <span class="age">年龄：{{ dataInfo.age }}</span>
            <span class="sex">性别：{{ dataInfo.sex }}</span>
          </p>
        </div>

        <div style="display: none" class="patient-info-content">
          <span>病例号：1234456</span>
          <span>就诊科室：1234456</span>
          <span>床号：1234456</span>
          <span>用药：</span>
        </div>

        <p class="patient-info-report mt8">
          <span>报告日期：{{ formatTime(dataInfo.reportTime) || '未知' }}</span>
          <span>测试日期：{{ formatTime(dataInfo.testTime) || '未知' }}</span>
        </p>
      </div>
    </div>

    <div class="doctor-report mt8">
      <p class="info-title">
        <span>报告总结</span>
        <span class="underline"></span>
      </p>

      <div class="info-summary mt8">
        <p class="info-summary-title">
          康复二期
        </p>
        <p class="info-summary-content">
          <span style="font-family: 'fuckSAD'">
            {{
              dataInfo.reportConsole || '监测动态心电图总时长XX小时XX分钟，心电数据反馈时间为XX分钟，该时间段内总心博数位XXXXX次，平均心率为XX次/分，最大心率为XX次/分，最慢心室率XX次/分钟，心脏的压力指数低中高三档，心梗发病概率为XX%，脑梗发病概率为XX%，室性节律总数XX次，室性早搏有X次，占总心搏小于1%，室性单发X次，ST段明显抬高，最大抬高发生在XX导联（或ST段无异常）请注意饮食少糖少盐少油，多吃蔬菜，多饮水。'
            }}
          </span>

          <span class="sign">
            诊断医生：{{ dataInfo.doctorName || '王彦祖' }}
          </span>
        </p>
      </div>


      <p class="info-title mt10">
        <span>心律</span>
        <span class="underline"></span>
      </p>

      <div class="info-data-lattice mt8">
        <p>
          <span style="color: rgba(255, 101, 132, 1)">{{ dataInfo.sumHeartRate || '0' }}</span>
          <span>总心跳数</span>
        </p>
        <p>
          <span style="color: rgba(65, 105, 220, 1)">{{ dataInfo.avgHeartRate || '0' }}</span>
          <span>平均心率</span>
        </p>
      </div>

      <div class="info-data-list mt5">
        <p>
          <span><i/>最大RR间期</span>
          <span>{{ dataInfo.maxRr || 0 }}毫秒</span>
        </p>
        <p>
          <span><i/>最小心率</span>
          <span>{{ dataInfo.minHeartRate || 0 }}bpm</span>
        </p>
        <p>
          <span><i/>最大心率</span>
          <span>{{ dataInfo.maxHeartRate || 0 }}bpm</span>
        </p>
        <p>
          <span><i/>停搏>2000毫秒</span>
          <span>{{ dataInfo.stopHeartRate || 0 }} 次</span>
        </p>
        <p>
          <span><i/>心动过速>130bpm</span>
          <span>{{ dataInfo.overHeartRate || 0 }} 跳</span>
        </p>
        <p>
          <span><i/>{{ '心动过缓<45bpm' }}</span>
          <span>{{ (dataInfo.underHeartRate || 0) }} 跳</span>
        </p>
      </div>


      <p class="info-title mt8">
        <span>压力分析</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <div class="info-data-list">
        <p>
          <span><i/>SDNN<i/></span>
          <span>{{ dataInfo.sdnn || 0 }}ms</span>
        </p>
        <p>
          <span><i/>SDNNIDX<i/></span>
          <span>{{ dataInfo.sdnnidx || 0 }}ms</span>
        </p>
        <p>
          <span><i/>rMSSD<i/></span>
          <span>{{ dataInfo.rmssd || 0 }}ms</span>
        </p>
        <p>
          <span><i/>SDANN<i/></span>
          <span>{{ dataInfo.sdann || 0 }}ms</span>
        </p>
        <p>
          <span><i/>PNN50<i/></span>
          <span>{{ dataInfo.pnn || 0 }}%</span>
        </p>
        <p>
          <span><i/>三角指数<i/></span>
          <span>{{ dataInfo.triangleIndex || 0 }}ms</span>
        </p>
      </div>

      <p class="info-title mt8">
        <span>ST段分析</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <div class="info-data-list" style="line-height: 1.1rem">
        <p>
          <span><i/>最大压低 -1.195 mv,发生在avL,发生于03-13 21:59</span>
        </p>
        <p>
          <span><i/>最大抬高 1.076 mv,发生在V3,发生于 03-14 05:07</span>
        </p>
      </div>

      <p class="info-title mt8">
        <span>室性节律</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <div class="info-data-lattice mt8">
        <p>
          <span>{{ dataInfo.sumVentricular || 0 }}</span>
          <span>总数</span>
        </p>
        <p>
          <span>{{ dataInfo.avgVentricular || 0 }}</span>
          <span>平均(小时)</span>
        </p>
        <p>
          <span>{{ dataInfo.singleVentricular || 0 }}</span>
          <span>单发</span>
        </p>
        <p>
          <span>{{ dataInfo.doubleVentricular || 0 }}</span>
          <span>成对</span>
        </p>
        <p>
          <span>{{ dataInfo.twoVentricular || 0 }}</span>
          <span>二联律(阵)</span>
        </p>
        <p>
          <span>{{ dataInfo.threeVentricular || 0 }}</span>
          <span>三联律(阵)</span>
        </p>
        <p>
          <span>{{ dataInfo.sumVt || 0 }}</span>
          <span>室速总数</span>
        </p>
        <p>
          <span>{{ dataInfo.rontVentricular || 0 }}</span>
          <span>RONT(阵)</span>
        </p>
      </div>


      <div class="info-data-list">
        <p>
          <span><i/>最长的室速<i/></span>
          <span>{{ dataInfo.longVt || 0 }}次</span>
        </p>
        <p>
          <span><i/>最快心率的室速<i/></span>
          <span>{{ dataInfo.fastVt || 0 }}bpm</span>
        </p>
        <p>
          <span><i/>最小心率的室速<i/></span>
          <span>{{ dataInfo.minVt || 0 }}bpm</span>
        </p>
      </div>


      <p class="info-title mt8">
        <span>室上性节律</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <div class="info-data-lattice mt8">
        <p>
          <span>{{ dataInfo.sumSupraventricular || 0 }}</span>
          <span>总数</span>
        </p>
        <p>
          <span>{{ dataInfo.avgSupraventricular || 0 }}</span>
          <span>平均(小时)</span>
        </p>
        <p>
          <span>{{ dataInfo.singleSupraventricular || 0 }}</span>
          <span>单发</span>
        </p>
        <p>
          <span>{{ dataInfo.doubleSupraventricular || 0 }}</span>
          <span>成对</span>
        </p>
        <p>
          <span>{{ dataInfo.twoSupraventricular || 0 }}</span>
          <span>二联律(阵)</span>
        </p>
        <p>
          <span>{{ dataInfo.threeSupraventricular || 0 }}</span>
          <span>三联律(阵)</span>
        </p>
        <p>
          <span>{{ dataInfo.numSupraventricular || 0 }}</span>
          <span>室速总数</span>
        </p>
        <p>
          <span>{{ dataInfo.rontSupraventricular || 0 }}</span>
          <span>RONT(阵)</span>
        </p>
      </div>

      <div class="info-data-list">
        <p>
          <span><i/>最长室上速次数<i/></span>
          <span>{{ dataInfo.longSvt || 0 }}次</span>
        </p>
        <p>
          <span><i/>最大心率室上速<i/></span>
          <span>{{ dataInfo.maxSvt || 0 }}bpm</span>
        </p>
      </div>


      <p class="info-title mt8">
        <span>24小时数据图</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <TwoFourChart v-if="picHeartRateIsShow" :data="chartData" class="mt8"></TwoFourChart>


      <template v-for="(item,key) in picHeart">
        <p class="info-title mt12">
          <span>{{ item.label }}</span>
          <span style="background-color: rgba(65, 105, 220, 1)" class="underline"></span>
        </p>
        <div class="info-subTitle mt3">
          <p>
          <span class="circular-progress">
            <span style="background: rgba(244, 196, 74, .4);"></span>
            <span></span>
          </span>
            <span>异常占比</span>
          </p>
          <p>
            <span style="color: rgba(244, 196, 74, 1);">0.86</span>
            <span>概率</span>
          </p>
          <p>
            <span style="color: rgba(13, 183, 122, 1);">低风险</span>
            <span>预测结果</span>
          </p>
        </div>
        <xgChart class="mt3" :chartData="item" :id="key" :isSwiper="true"></xgChart>
      </template>
    </div>

    <div class="loading" :class="loading?'':'hide'">

      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_900_11132)">
          <path
              d="M34.9355 24.6125L35.9677 23.611C38.6774 20.9821 38.6774 16.6006 35.9677 13.9717C33.2581 11.3428 28.7419 11.3428 26.0323 13.9717L25 14.9732L23.9677 13.9717C21.2581 11.3428 16.7419 11.3428 14.0323 13.9717C11.3226 16.6006 11.3226 20.9821 14.0323 23.611L15.0645 24.6125L25 33L34.9355 24.6125Z"
              fill="#D7DCE5"/>
          <path
              d="M19.2113 33.9535C18.9246 33.9535 18.4945 33.8101 18.2077 33.6667L14.05 30.0825C13.4766 29.509 13.3332 28.6488 13.9067 28.0753C14.4801 27.5018 15.3404 27.3585 15.9138 27.9319L19.068 30.656L29.2472 21.9104L30.2508 20.9069C32.9748 18.3262 32.9748 14.1685 30.3941 11.7312C27.9569 9.29395 23.7991 9.29395 21.3619 11.7312L20.2149 12.8782C19.6414 13.4517 18.7812 13.4517 18.2077 12.8782L17.2042 11.7312C14.7669 9.29395 10.6092 9.29395 8.1719 11.7312C5.59126 14.1685 5.59126 18.3262 8.1719 20.7635C8.60201 21.337 8.60201 22.1972 8.1719 22.7707C7.7418 23.3441 6.73821 23.3441 6.16473 22.7707C2.58051 19.1864 2.58051 13.3083 6.16473 9.72406C9.74896 6.13983 15.6271 6.13983 19.2113 9.72406V9.86743L19.3547 9.72406C22.9389 6.13983 28.8171 6.13983 32.4013 9.72406C35.9855 13.3083 35.9855 19.1864 32.4013 22.7707L31.2543 23.9176L20.0715 33.6667C19.9282 33.8101 19.6414 33.9535 19.2113 33.9535Z"
              fill="#C4C7CE"/>
          <path
              d="M16.4875 26.4982C16.4875 26.4982 16.3441 26.4982 16.4875 26.4982C16.0573 26.4982 15.6272 26.2114 15.4839 25.7813L12.6165 17.4659L12.043 19.6165C11.8996 20.0466 11.4695 20.3333 11.0394 20.3333H1.00358C0.430108 20.3333 0 19.9032 0 19.3297C0 18.7563 0.430108 18.3261 1.00358 18.3261H10.1792L11.4695 13.7383C11.6129 13.3082 12.043 13.0215 12.4731 13.0215C12.9032 13.0215 13.3333 13.3082 13.4767 13.7383L16.3441 22.4839L19.2115 15.172C19.3548 14.7419 19.7849 14.4552 20.2151 14.4552C20.6452 14.4552 21.0753 14.7419 21.2186 15.172L22.509 18.3261H28.6738C29.2473 18.3261 29.6774 18.7563 29.6774 19.3297C29.6774 19.9032 29.2473 20.3333 28.6738 20.3333H21.7921C21.362 20.3333 20.9319 20.0466 20.7885 19.6165L20.2151 18.1828L17.3477 25.7813C17.2043 26.2114 16.9176 26.4982 16.4875 26.4982Z"
              fill="#E7EBF0"/>
          <path
              d="M38.5665 20.7635C39.3583 20.7635 40.0002 20.1216 40.0002 19.3298C40.0002 18.538 39.3583 17.8961 38.5665 17.8961C37.7747 17.8961 37.1328 18.538 37.1328 19.3298C37.1328 20.1216 37.7747 20.7635 38.5665 20.7635Z"
              fill="#E7EBF0"/>
        </g>
        <defs>
          <clipPath id="clip0_900_11132">
            <rect width="40" height="26.9534" fill="white" transform="translate(0 7)"/>
          </clipPath>
        </defs>
      </svg>

      <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">


        <g clip-path="url(#clip)">
          <path
              d="M34.9355 24.6125L35.9677 23.611C38.6774 20.9821 38.6774 16.6006 35.9677 13.9717C33.2581 11.3428 28.7419 11.3428 26.0323 13.9717L25 14.9732L23.9677 13.9717C21.2581 11.3428 16.7419 11.3428 14.0323 13.9717C11.3226 16.6006 11.3226 20.9821 14.0323 23.611L15.0645 24.6125L25 33L34.9355 24.6125Z"
              fill="#E53449" fill-opacity="0.2"/>
          <path
              d="M19.2113 33.9535C18.9246 33.9535 18.4945 33.8101 18.2077 33.6667L14.05 30.0825C13.4766 29.509 13.3332 28.6488 13.9067 28.0753C14.4801 27.5018 15.3404 27.3585 15.9138 27.9319L19.068 30.656L29.2472 21.9104L30.2508 20.9069C32.9748 18.3262 32.9748 14.1685 30.3941 11.7312C27.9569 9.29395 23.7991 9.29395 21.3619 11.7312L20.2149 12.8782C19.6414 13.4517 18.7812 13.4517 18.2077 12.8782L17.2042 11.7312C14.7669 9.29395 10.6092 9.29395 8.1719 11.7312C5.59126 14.1685 5.59126 18.3262 8.1719 20.7635C8.60201 21.337 8.60201 22.1972 8.1719 22.7707C7.74179 23.3441 6.73821 23.3441 6.16473 22.7707C2.58051 19.1864 2.58051 13.3083 6.16473 9.72406C9.74896 6.13983 15.6271 6.13983 19.2113 9.72406V9.86743L19.3547 9.72406C22.9389 6.13983 28.8171 6.13983 32.4013 9.72406C35.9855 13.3083 35.9855 19.1864 32.4013 22.7707L31.2543 23.9176L20.0715 33.6667C19.9282 33.8101 19.6414 33.9535 19.2113 33.9535Z"
              fill="#E53449"/>
          <path
              d="M16.4875 26.4982C16.4875 26.4982 16.3441 26.4982 16.4875 26.4982C16.0573 26.4982 15.6272 26.2114 15.4839 25.7813L12.6165 17.4659L12.043 19.6165C11.8996 20.0466 11.4695 20.3333 11.0394 20.3333H1.00358C0.430108 20.3333 0 19.9032 0 19.3297C0 18.7563 0.430108 18.3261 1.00358 18.3261H10.1792L11.4695 13.7383C11.6129 13.3082 12.043 13.0215 12.4731 13.0215C12.9032 13.0215 13.3333 13.3082 13.4767 13.7383L16.3441 22.4839L19.2115 15.172C19.3548 14.7419 19.7849 14.4552 20.2151 14.4552C20.6452 14.4552 21.0753 14.7419 21.2186 15.172L22.509 18.3261H28.6738C29.2473 18.3261 29.6774 18.7563 29.6774 19.3297C29.6774 19.9032 29.2473 20.3333 28.6738 20.3333H21.7921C21.362 20.3333 20.9319 20.0466 20.7885 19.6165L20.2151 18.1828L17.3477 25.7813C17.2043 26.2114 16.9176 26.4982 16.4875 26.4982Z"
              fill="#F4C44A"/>
          <path
              d="M38.5665 20.7635C39.3583 20.7635 40.0002 20.1216 40.0002 19.3298C40.0002 18.538 39.3583 17.8961 38.5665 17.8961C37.7747 17.8961 37.1328 18.538 37.1328 19.3298C37.1328 20.1216 37.7747 20.7635 38.5665 20.7635Z"
              fill="#F4C54A"/>
        </g>


        <defs>
          <clipPath id="clip" y="10">
            <path id="wavePath" d="M-40 9 Q-30 6 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V40 H-40z"
                  mask="url(#mask)" fill="url(#gradient)">
              <animateTransform attributeName="transform" begin="0s" dur="1.3s" type="translate" from="0,0" to="40,0"
                                repeatCount="indefinite"/>
            </path>
          </clipPath>
        </defs>
      </svg>

      <!--      <svg viewbox="0 0 100 20">-->
      <!--        <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)">-->
      <!--          <animateTransform attributeName="transform" begin="0s" dur="1.5s" type="translate" from="0,0" to="40,0" repeatCount="indefinite" />-->
      <!--        </path>-->
      <!--      </svg>-->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import TwoFourChart from '../../components/TwoFourChart/index.vue'
import XgChart from '../../components/XgChart/index.vue'
import { getDoctorReport } from '../../api/report.js'
import { deepClone, parseTime } from '../../utils/index'


const formatTime = computed(() => {
  return function (time) {
    if (!isNaN(time)) {
      return parseTime((parseInt(time) * 1000).toString(), '{y}-{m}-{d}')
    }
    return '未记录'
  }
})

let loading = ref(true)

const xgData = reactive(new Array())
for (let i = 0; i < 6; i++) {
  xgData.push([])
}

const data = reactive({
  fontUrl: ''
})

let dataInfo = reactive({
  /**
   * 平均心率
   */
  avgHeartRate: null,
  /**
   * 室上性节律平均值
   */
  avgSupraventricular: null,
  /**
   * 室性节律平均数
   */
  avgVentricular: null,
  /**
   * 创建时间
   */
  createTime: null,
  /**
   * 医生名称
   */
  doctorName: null,
  /**
   * 室上性节律成对
   */
  doubleSupraventricular: null,
  /**
   * 室性节律成对
   */
  doubleVentricular: null,
  /**
   * 最快心率室速
   */
  fastVt: null,
  /**
   * 自增ID
   */
  id: null,
  /**
   * 最长室上速次数
   */
  longSvt: null,
  /**
   * 最长室速
   */
  longVt: null,
  /**
   * 最大心率
   */
  maxHeartRate: null,
  /**
   * 最大RR间期
   */
  maxRr: null,
  /**
   * 最大心率室上速
   */
  maxSvt: null,
  /**
   * 最小心率
   */
  minHeartRate: null,
  /**
   * 最小心率室速
   */
  minVt: null,
  /**
   * 室上数
   */
  numSupraventricular: null,
  /**
   * 心动过速
   */
  overHeartRate: null,
  /**
   * 24小时心率图
   */
  picHeartRate: null,
  /**
   * 24小时心率变异性
   */
  picHeartRateVariability: null,
  /**
   * 24小时最大心率
   */
  picMaxHeartRate: null,
  /**
   * 24小时最小心率
   */
  picMinHeartRate: null,
  /**
   * 心率片段图
   */
  picPartHeartRate: null,
  /**
   * 24小时RR间期
   */
  picRr: null,
  /**
   * 24小时室上性
   */
  picSupraventricular: null,
  /**
   * 24小时室性
   */
  picVentricular: null,
  /**
   * pnn
   */
  pnn: null,
  /**
   * 报告总结
   */
  reportConsole: null,
  /**
   * 报告唯一ID
   */
  reportId: null,
  /**
   * 报告日期
   */
  reportTime: null,
  /**
   * rmssd
   */
  rmssd: null,
  /**
   * 室上性节律RONT阵
   */
  rontSupraventricular: null,
  /**
   * 室性节律ROUNT(阵)
   */
  rontVentricular: null,
  /**
   * sdann
   */
  sdann: null,
  /**
   * sdnn
   */
  sdnn: null,
  /**
   * sdnnidx
   */
  sdnnidx: null,
  /**
   * 室上性节律单发
   */
  singleSupraventricular: null,
  /**
   * 室性节律单发数
   */
  singleVentricular: null,
  /**
   * ST段分析最小压低
   */
  stHigh: null,
  /**
   * ST段分析最大压低
   */
  stLow: null,
  /**
   * 停搏数
   */
  stopHeartRate: null,
  /**
   * 分析的心搏数
   */
  sumHeartRate: null,
  /**
   * 室上性节律总数
   */
  sumSupraventricular: null,
  /**
   * 室性节律总数
   */
  sumVentricular: null,
  /**
   * 室速总数
   */
  sumVt: null,
  /**
   * 测试日期
   */
  testTime: null,
  /**
   * 室上性节律三联律
   */
  threeSupraventricular: null,
  /**
   * 室性节律三联律
   */
  threeVentricular: null,
  /**
   * 三角指数
   */
  triangleIndex: null,
  /**
   * 室上性节律二联律
   */
  twoSupraventricular: null,
  /**
   * 室性节律二联律
   */
  twoVentricular: null,
  /**
   * 心动过缓
   */
  underHeartRate: null,
  /**
   * 更新时间
   */
  updateTime: null,
})

const data111 = reactive({
  a: 1
})

function file(e) {
  data111.a++
  const fontFile = e.target.files[0]
  data.fontUrl = URL.createObjectURL(fontFile)
  addCSS('@font-face{font-family:"fuckSAD";src:url(' + data.fontUrl + ')}')
}

const route = useRoute()
let params = reactive(route.params)

onMounted(() => {
  getData()
})


let chartData = {}
let picHeart

let picHeartRateIsShow = ref(false)


async function getData() {
  // 298d8673b5e24792884aefd19a80fd39
  const data = await getDoctorReport({ reportId: params.id })
  dataInfo = reactive(data.data.data)

  let picHeartRate = JSON.parse(dataInfo.picHeartRate)

  if (!picHeartRate || picHeartRate === 'null') {
    picHeartRate = {}
  } else {
    picHeartRateIsShow = true
  }

  console.log(1111)
  console.log(picHeartRate)

  console.log(dataInfo.picSupraventricular.split(',').map(item => +item))
  picHeartRate['picSupraventricular'] = dataInfo.picSupraventricular.split(',').map(item => +item)
  picHeartRate['picVentricular'] = dataInfo.picVentricular.split(',').map(item => +item)
  picHeartRate['v_x'] = []
  for (let i = 0; i < 24; i++) {
    picHeartRate['v_x'].push(i)
  }

  chartData = reactive(picHeartRate)

  const picPartHeartRate = JSON.parse(data.data.data.picPartHeartRate)
  picHeart = reactive(picPartHeartRate)

  const loadTime = setTimeout(() => {
    loading.value = false
    clearTimeout(loadTime)
  }, 0)
}

let style = null

function addCSS(cssText) {
  style = document.getElementById('fontStyle') || document.createElement('style');
  style.type = 'text/css'
  const head = document.getElementsByTagName('head')[0];
  const textNode = document.createTextNode(cssText);
  style.appendChild(textNode);
  head.appendChild(style)
}

</script>

<style scoped>
.doctor {
  background: rgba(251, 251, 251, 1);
  width: 100vw;
  overflow: hidden;
  padding: 0.8rem;
}

.patient {
  border-radius: .75rem;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(187, 187, 187, 0.2);
}

.patient-title {
  background: linear-gradient(91.27deg, #FFB26A 13.41%, #FFCC53 88.31%);
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  color: #FFFFFF;
}

.patient-info {
  padding: .8rem;
  background: #FFFFFF;
  font-size: .7rem;
  color: #333333;
  font-weight: 400;
}

.patient-info-top {
  display: flex;

}

.patient-info .avatar {
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  flex: none;
  border-radius: 50%;
}

.avatar img {
  float: left;
  width: 100%;
  height: 100%;
}

.patient-info .basics {
  flex: auto;
  margin-left: 0.8rem;
}

.basics span {
  display: inline-block;
  height: 1rem;
  line-height: 1rem;
}

.basics .name {
  width: 100%;
  margin-bottom: .7rem;
}

.basics .age {
  width: calc(50% - 1.5rem);
}

.patient-info-content {
  overflow: hidden;
  margin-top: .6rem;
}

.patient-info-content span {
  display: inline-block;
  width: 50%;
  margin-bottom: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.patient-info-report {
  color: #666666;
  border-top: 1px solid #DCDCDC;
  padding: .5rem 0 0 0;
}

.patient-info-report span {
  display: inline-block;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.patient-info-report span:last-child {
  margin-top: .7rem;
}

.doctor-report {
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 1rem rgba(187, 187, 187, 0.2);
  border-radius: .75rem;
  padding: .9rem .8rem;
}

.info-summary-content {
  position: relative;
  background-color: rgba(255, 249, 239, 1);
  line-height: 1.1rem;
}

.info-summary-content .sign {
  display: inline-block;
  width: 100%;
  padding-top: .9rem;
  border-top: 1px solid #B9B9B9;
  font-size: .7rem;
  font-weight: 600;
  color: #000000;
  margin-top: .8rem;
}

.info-summary-content::after {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;

  background-image: linear-gradient(
      0deg,
      black 0px,
      black 1px,
      transparent 1px,
      transparent 100px
  ),
  linear-gradient(
      90deg,
      black 0px,
      black 1px,
      transparent 1px,
      transparent 100px
  );
  background-size: 1rem 1rem;
  opacity: 0.1;
  z-index: 0;
}


</style>
