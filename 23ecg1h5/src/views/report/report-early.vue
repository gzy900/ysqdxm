<template>
  <div class="body">
    <!--    页面标题-->
    <div class="title">
      动态心电图报告单
    </div>
    <!--    用户信息-->
    <div class="user-info">
      <div class="user-info-item">
        <p>
          姓名：李
        </p>
        <p>
          年龄：52
        </p>
        <p>
          性别：男
        </p>
      </div>
      
      <div class="user-info-item">
        <p>
          登记号：250
        </p>
        <p>
          病历号：251
        </p>
        <p>
          就诊科室：前列腺专科
        </p>
        <p>
          床位：10
        </p>
      </div>
    
    </div>
    <!--    总结概况-->
    <div class="summary">
      <p v-for="(item,index) in summaryList1">{{(index+1)+'. '+item[3]}}</p>
      <p v-for="(item,index) in summaryList">{{(index+1+summaryList1.length)+'. '+item[3]}}</p>
    </div>
    
    <!--    医生反馈-->
    <div class="doctor-feedback">
      <p class="doctor-feedback-title">
        医生反馈
      </p>
      <pre class="doctor-feedback-context">{{row.character_remark}}</pre>
    </div>
    <!--    第二页title-->
    <div class="title-2">
      移视心电医生分析报告
    </div>
    <!--    第二页患者信息-->
    <div class="user-info-2 border-frame">
      <div class="user-info-title border-frame-title">
        患者信息
      </div>
      <div class="user-info-item">
        <p>
          姓名：250
        </p>
        <p>
          年龄：251
        </p>
        <p>
          性别：男
        </p>
        <p>
          联系电话：13212341234
        </p>
        <p>
          测试日期：2021-12-12
        </p>
      </div>
    </div>
    
    <!--    房颤筛查-->
    <div class="tremble border-frame mt-20">
      <div class="border-frame-title">
        房颤筛查
      </div>
      <div class="border-frame-context">
        <p>房颤概率：{{ row.af_probability }}</p>
        <p class="explain">注：分数代表发生房颤的可能性：越接近于1，越可能是房颤。最大值1</p>
        <p>典型心电图见：第 60-70s 之间第 60-70s 之间第 60-70s 之间</p>
      </div>
    </div>
    
    <!--    心律分析-->
    <div class="heartbeats border-frame mt-20">
      <div class="border-frame-title">
        心律分析
      </div>
      <div class="border-frame-context">
        <!--        ['房颤', '一度房室阻滞', '二度传导阻滞', '噪音', None, '右束支传导阻滞', '心动过缓', '正常窦性心律', '室上性心动过速', '室颤', '室性心动过速']-->
        <p v-for="(item,index) in summaryList">{{item[0]+'：'+item[1]}}</p>
        <!--        <p>一度房室阻滞：10</p>-->
        <!--        <p>二度传导阻滞：10</p>-->
        <!--        <p>噪音：10</p>-->
        <!--        <p>右束支传导阻滞：10</p>-->
        <!--        <p>心动过缓：10</p>-->
        <!--        <p>正常窦性心律：10</p>-->
        <!--        <p>室上性心动过速：10</p>-->
        <!--        <p>室颤：10</p>-->
        <!--        <p>室性心动过速：10</p>-->
      </div>
    </div>
    <!--    hrv 分析-->
    <div class="hrv border-frame mt-20">
      <div class="border-frame-title">
        Hrv分析
      </div>
      <div class="border-frame-context">
        <p>平均心率为：{{row.hr_mean}}</p>
        <p>SDNN为：{{row.sdnn}}</p>
        <p>RMSSD为：{{row.rmssd}}</p>
      </div>
    </div>
    
    
    <!--    片段图-->
    <div class="title-2">
      片段图
    </div>
    <!--    片段图循环-->
    
    <div class="img-item mb-20" v-for="item in photo_remark">
      <p class="img-item-title">
        {{item[2]}}
      </p>
      <p class="img-item-info">
        <span class="img-time">{{item[1]+' s'}}</span>
        <span>10.0 mm/mv</span>
        <span>25.0 mm/s</span>
      </p>
      <p class="img-item-img">
        <img :src="item[0]"/>
      </p>
    </div>
    <!--    -->
    <!--    <div class="img-item mb-20">-->
    <!--      <p class="img-item-title">-->
    <!--        房颤-->
    <!--      </p>-->
    <!--      <p class="img-item-info">-->
    <!--        <span class="img-time">11:12:11 - 11:12:11</span>-->
    <!--        <span>10.0 mm/mv</span>-->
    <!--        <span>25.0 mm/s</span>-->
    <!--      </p>-->
    <!--      <p class="img-item-img">-->
    <!--        <img src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF"/>-->
    <!--      </p>-->
    <!--    </div>-->
    
    <!--    签名-->
    <div class="autograph mt-20">
      <p class="autograph-txt">
        <span>反馈：王少侠</span>
        <span>审核：王英雄</span>
      </p>
    </div>
  </div>
</template>

<script>
  import {getInfo} from '../../api/health-clothes'

  export default {
    name: "report-early",
    data() {
      return {
        //          l_id: '19de1224e7cd4e6bb6d8ff1cb9b09550',

        infoQuery: {
          l_id: this.$route.params.l_id,
          serial_number: -3
        },
        summaryList1: [],
        summaryList: [
          // '心律：窦性心律',
          // '总心搏数 265次，最快心室率 187次/分，发生在 11-08 14:41，最慢心室率 77次/分，发生在 11-08 14:46，平均心室率 108次/分。',
          // '室上性早搏总数 1次，其中成对 0阵，二联律 0阵，三联律 0阵，室上速 0阵，最长0次，发生在11-08 14:41。',
          // '室性早搏总数 47次，其中成对 5阵，二联律 0阵，三联律 1阵，室速 3阵，最长 4次，发生在11-08 14:45。',
          // 'ST段：未见明显异常。T波：未见明显异常。',
          // '心率变异性分析：时域（SDNN=156）：正常范围/稍低/偏低。',
          // '.R-R长间歇≥ 2000毫秒有 次（多数位于夜间），最长 1585 ms，发生在 11-08  14:48，为早搏后代偿或房早落于房室结不应期未下传所致。',
        ],
        photo_remark: [],
        row: {}
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      async getInfo() {
        return new Promise((resolve, reject) => {
          getInfo(this.infoQuery)
            .then(response => {
              const res = response.data
              if (res) {
                console.log(res)
                this.row = res

                this.summaryList1.push(
                  ['', '', '', '心脏压力指数：' + res.cardiac_stress]
                )
                this.summaryList1.push(
                  ['', '', '', '疲劳指数：' + res.fatigue]
                )
                this.summaryList1.push(
                  ['', '', '', '兴奋指数：' + res.excitement]
                )
                this.summaryList1.push(
                  ['', '', '', '平均心率：' + res.hr_mean]
                )
                this.summaryList1.push(
                  ['', '', '', 'SDNN：' + res.sdnn]
                )
                this.summaryList1.push(
                  ['', '', '', 'RMSSD：' + res.rmssd]
                )
                const disList = res.disease_statistics.split(';')
                disList.forEach((item) => {
                  const dis = item.split('---')
                  this.summaryList.push(dis)
                })


                const photoList = res.photo_remark.split(';')
                photoList.forEach(item => {
                  const photo = item.split('---')
                  this.photo_remark.push(photo)
                })

                // this.fromRow = res
                // this.fromData.l_id = res.l_id
                // this.fromData.prorhythm = res.prorhythm ? JSON.parse(res.prorhythm) : JSON.parse(res.rhythm)
                // this.fromData.propos = res.propos ? JSON.parse(res.propos) : JSON.parse(res.pos)

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
      }
    }
  }
</script>

<style scoped>
  
  .autograph-txt {
    display: flex;
    justify-content: flex-end;
    font-size: .7rem;
    font-weight: bold;
  }
  
  .autograph-txt span {
    flex: none;
    padding-left: 1rem;
  }
  
  .img-item {
    border: 1px solid #cccccc;
    font-size: .7rem;
  }
  
  .img-item-title {
    font-weight: bold;
    text-align: center;
    line-height: 1.4rem;
    border-bottom: 1px solid #cccccc;
    
  }
  
  .img-item-info {
    font-size: .6rem;
    display: flex;
    line-height: 1rem;
    padding: 0 .5rem;
  }
  
  .img-item-info span {
    width: auto;
    flex: none;
    padding-left: .5rem;
  }
  
  .img-item-info .img-time {
    padding-left: 0;
    flex: auto;
  }
  
  .img-item-img {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .img-item-img img {
    width: 100%;
    height: auto;
    float: left;
  }
  
  .tremble {
    font-size: .7rem;
  }
  
  .border-frame-title {
    width: 100%;
    text-align: center;
    color: #333333;
    font-weight: bold;
    line-height: 1.6rem;
  }
  
  .border-frame-context {
    padding: 0 .8rem;
  }
  
  .border-frame-context > p {
    line-height: 1rem;
    padding: .4rem 0;
  }
  
  .border-frame .explain {
    font-size: .6rem;
    color: #999;
    line-height: .7rem;
  }
  
  .mt-20 {
    margin-top: 1rem;
  }
  
  .mb-20 {
    margin-bottom: 1rem;
  }
  
  .user-info-2 {
    font-size: .7rem;
    line-height: 1.4rem;
  }
  
  .user-info-title {
    width: 100%;
    text-align: center;
    color: #333333;
    font-weight: bold;
    line-height: 1.6rem;
  }
  
  
  .user-info-2 p {
    min-width: 50%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: none;
    padding: 0 .5rem;
    line-height: 1.6rem;
  }
  
  .user-info-2 .user-info-item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .border-frame {
    font-size: .7rem;
    border: 2px solid #666666;
  }
  
  .border-frame-title {
    border-bottom: 2px solid #666666;
  }
  
  
  .title-2 {
    width: 100%;
    line-height: 2rem;
    text-align: center;
    font-weight: bold;
    font-size: .9rem;
    color: #333333;
    margin-top: 2rem;
  }
  
  .doctor-feedback {
    font-size: .7rem;
  }
  
  .doctor-feedback-title {
    font-weight: bold;
    line-height: 1.6rem;
    color: #333333;
  }
  
  .doctor-feedback-context {
    width: 100%;
    line-height: 1.4rem;
    margin: 0;
    font-size: .7rem;
    color: #666666;
    font-family: inherit;
    white-space: pre-wrap;
  }
  
  .summary {
    padding: .5rem 0;
  }
  
  .summary > p {
    line-height: 1.2rem;
    font-size: .7rem;
    margin-top: .5rem;
  }
  
  .body {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: .5rem 1rem;
    color: #666666;
    overflow: auto;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  .title {
    width: 100%;
    line-height: 2rem;
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid #333;
    font-size: 1rem;
    color: #333333;
  }
  
  .user-info {
    width: 100%;
    display: flex;
    font-size: .6rem;
    flex-direction: column;
  }
  
  .user-info > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .user-info p {
    min-width: 50%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: none;
    padding-right: .5rem;
    line-height: 1.6rem;
  }
</style>
