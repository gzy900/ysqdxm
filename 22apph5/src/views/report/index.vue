<template>
  <div id="body" ref="body" class="body">
    
    <div class="userInfo">
      <div class="header">
        <template v-if="type==='1'">
          医生心律失常远程判读
        </template>
        <template v-if="type==='5'">
          医生心脏负荷远程判读
        </template>
        <template v-if="type==='7'">
          医生心肌缺血远程判读
        </template>
        <template v-if="type==='2'">
          医生血压远程判读
        </template>
        <template v-if="type==='3'">
          医生BMI远程判读
        </template>
        <template v-if="type==='88'">
          健康周报
        </template>
      </div>
      
      <div class="context">
        <span>
          姓名：{{userInfo.username}}
        </span>
        <span>
          性别：{{ userInfo.sex || '暂无' }}
        </span>
        <span>
          年龄：{{ reTime }}
        </span>
        <span v-if="type === '88'">
          报告生成日期：{{ weekly.releasetime | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </span>
        <span v-else>
          监测日期：{{ measure.releasetime | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </span>
<!--        <span @click="goPDF" class="pdf-btn">查看智能报告</span>-->
      </div>
    </div>
    
    <div class="measure" v-if="type !== '88'">
      <ul class="start">
        <li>名称</li>
        <li>参考范围</li>
        <li>数据</li>
        <li>状态</li>
      </ul>
      
<!--      // 心率失常的数据-->
      <template v-if="type === '1' || type==='7'">
        <ul>
          <li>平均心率</li>
          <li>60-100 BPM</li>
          <li>{{ measure.heart_rate_avg }} BPM</li>
          <li>
            <img v-if="reHR === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reHR === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reHR === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>QTC</li>
          <li>320-440 MS</li>
          <li>{{ measure.QTC }} MS</li>
          <li>
            <img v-if="reQTC === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reQTC === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reQTC === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>QRS</li>
          <li>60-100 MS</li>
          <li>{{ measure.QRS }} MS</li>
          <li>
            <img v-if="reQRS === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reQRS === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reQRS === 2"  src="../../assets/img/up.png" style="height: 70%;"  /></li>
        </ul>
      </template>
      
<!--      // 心脏负荷的数据-->
      <template v-if="type === '5'">
        <ul>
          <li>平均心率</li>
          <li>60-100 BPM</li>
          <li>{{ measure.heart_rate_avg }} BPM</li>
          <li>
            <img v-if="reHR === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reHR === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reHR === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>SDN</li>
          <li>102-180 MS</li>
          <li>{{ parseInt(measure.heart_change) }} MS</li>
          <li>
            <img v-if="reHC === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reHC === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reHC === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>PSI</li>
          <li>320-440 MS</li>
          <li>{{ measure.PSI }} MS</li>
          <li>
            <img v-if="rePSI === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="rePSI === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="rePSI === 2"  src="../../assets/img/up.png" style="height: 70%;"  /></li>
        </ul>
      </template>
      
      <template v-if="type === '2'">
        <ul>
          <li>平均心率</li>
          <li>60-100 BPM</li>
          <li>{{ measure.heart_rate_avg }} BPM</li>
          <li>
            <img v-if="reHR === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reHR === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reHR === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>高压</li>
          <li><115 mm/hg</li>
          <li>{{ measure.high_pressure }} mm/hg</li>
          <li>
            <img v-if="reHigh === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reHigh === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reHigh === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
        <ul>
          <li>低压</li>
          <li><75 mm/hg</li>
          <li>{{ measure.low_pressure }} mm/hg</li>
          <li>
            <img v-if="reLow === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reLow === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reLow === 2"  src="../../assets/img/up.png" style="height: 70%;"  /></li>
        </ul>
      </template>
      
      <template v-if="type === '3'">
        <ul>
          <li>BMI</li>
          <li>18.4 - 23.9</li>
          <li>{{ measure.BMI }}</li>
          <li>
            <img v-if="reBMI === 0" src="../../assets/img/center.png" style="width: 40%;" />
            <img v-if="reBMI === 1"  src="../../assets/img/down.png"  style="height: 70%"  />
            <img v-if="reBMI === 2"  src="../../assets/img/up.png" style="height: 70%;"  />
          </li>
        </ul>
      </template>
    </div>
    
    <div v-if="type === '88'" style="margin-top: 15px;width: 100%;height: 1px"></div>
  
    <div class="proposal">
      <div class="header">
        医生建议
      </div>
      
      <div class="context" style="white-space: pre-line;" v-html="content">
<!--        {{ weekly.content || feedback.explain }}-->
      </div>
      <p class="author">
        报告医生：{{ doctor.username }}
      </p>
      <p class="autograph">
        <img :src="doctor.doctor_sign" />
      </p>
    </div>
    
    <div class="pdf" v-if="urlList.length > 0">
      <p class="header">判读依据</p>
      <div class="context">
        <p
          v-for="(item, index) in urlList"
          :key="index"
        >
          <img :src="item" />
        </p>
      </div>
    </div>
    
    <div class="height100"></div>
  </div>
</template>

<script>
  import {getUserInfo, getFeedback, getMeasure157, getMeasure2, getMeasure3, getDoctor, getWeekly} from "../../api/report";
  import {parseTime, goPDF} from "../../utils";
  export default {
    metaInfo() {
      return {
        title: this.title,
      }
    },
    name: "report",
    data() {
      return {
        title: '医生反馈报告',
        uuid:'',
        doctorId:'',
        type:'',
        
        urlList:[],
        
        userInfo: {},
        feedback: {},
        measure: {},
        doctor: {},
        weekly: {},
        
      }
    },
    created() {
      this.init()
      this.type = this.$route.params.type
    },
    updated() {
    },

    computed: {
      content() {
        const firstFlag= '！！=>'
        const lastFlag= '<=！！'
        let html =''
        let content = this.weekly.content || this.feedback.explain
        if(!content || content.length <= 0) {
          return
        }
        const fChart = content.indexOf(firstFlag)
        const lChart = content.indexOf(lastFlag)
        if (fChart >= 0 && lChart >= 0) {
          let list = content.split(firstFlag)
          for (let i = 0; i < list.length; i++) {
            if (i === 0) {
              html += list[i]
            } else {
              const lastList = list[i].split(lastFlag)
              for (let j = 0; j < lastList.length; j++) {
                if (j === 0) {
                  html += '<span style="color: #ff8846;font-weight: bold">'
                  html += lastList[j]
                  html += '</span>'
                } else {
                  html += lastList[j]
                }
              }
            }
          }
        } else {
          html += content
        }
        return html
      },
      reQTC() {
        let re = 0
        if (this.measure.QTC < 320) {
          re = 1
        }
        if (this.measure.QTC > 440) {
          re = 2
        }
        return re
      },
      reQRS() {
        let re = 0
        if (this.measure.QRS < 60) {
          re = 1
        }
        if (this.measure.QRS > 100) {
          re = 2
        }
        return re
      },
      
      reHR() {
        let re = 0
        if (this.measure.hr < 320) {
          re = 1
        }
        if (this.measure.hr > 440) {
          re = 2
        }
        return re
      },

      reHigh() {
        let re = 0
        if (this.measure.high_pressure > 115) {
          re = 2
        }
        return re
      },

      reLow() {
        let re = 0
        if (this.measure.low_pressure > 75) {
          re = 2
        }
        return re
      },

      reBMI() {
        let re = 0

        if (this.measure.BMI < 18.4) {
          re = 1
        }
        if (this.measure.BMI > 23.9) {
          re = 2
        }
        return re
      },

      reHC() {
        let re = 0

        if (this.measure.heart_change < 102) {
          re = 1
        }
        if (this.measure.heart_change > 180) {
          re = 2
        }
        return re
      },

      rePSI() {
        let re = 0

        if (this.measure.PSI < 320) {
          re = 1
        }
        if (this.measure.PSI > 440) {
          re = 2
        }
        return re
      },
      
      reTime(){
        return parseInt(new Date().getFullYear()) - parseInt(new Date(this.userInfo.birthday).getFullYear())
      }
    },

    methods: {
      init() {
        // 1，心律失常，2，血压，3，BMI,4,吸烟，5，心脏负荷，6，运动，88，周报, 7，心肌缺血
        const type = this.$route.params.type
        if (type === '88'){
          this.getWeekly()
        }else{
          this.getFeedback()
        }

        if (type === '1' || type === '5' || type === '7') {
          this.getMeasure157()
        }

        if (type === '2') {
          this.getMeasure2()
        }

        if (type === '3') {
          this.getMeasure3()
        }
      },

      goPDF(){
        goPDF(this.measure.report_url)
      },
      
      async getUserInfo() {
        let res = await getUserInfo({'uuid': this.uuid})
        this.userInfo = res.data

      },
      // 459650  5   459654 1
      async getFeedback() {
        let res = await getFeedback({'privateId': this.$route.params.id, 'type': this.$route.params.type})
        this.feedback = res.data
        
        this.doctorId = res.data.doctorId
        this.uuid = res.data.patientId
        
        this.getUserInfo();
        this.getDoctor();
        
        if (this.feedback.url && this.feedback.url.length > 0) {
          this.urlList = this.feedback.url.split(',');
        }
      },
      
      async getMeasure157() {
        let res = await getMeasure157({'report_id': this.$route.params.id})
        this.measure = res.data
      },

      async getMeasure2() {
        let res = await getMeasure2({'bid': this.$route.params.id})
        this.measure = res.data
      },

      async getMeasure3() {
        let res = await getMeasure3({'id': this.$route.params.id})
        this.measure = res.data
      },
      
      async getDoctor() {
        let res = await getDoctor({'doctorId': this.doctorId})
        this.doctor = res.data
      },
      
      async getWeekly() {
        let res = await getWeekly({wid:this.$route.params.id})
        this.weekly = res.data
        
        if (this.weekly.url && this.weekly.url.length > 0) {
          this.urlList = this.weekly.url.split(',');
        }
        
        this.uuid = res.data.patientId
        this.doctorId = res.data.doctorId
        this.getDoctor();
        this.getUserInfo()
      }
    }
  }
</script>


<style scoped lang="scss">
  .body {
    font-size: .7rem;
    color: #333333;
    background-color: #ffffff;
    padding: .9rem;
    /*min-height: 100%;*/
    /*overflow: auto;*/
  }
  .userInfo{
    width: 100%;
    border: 1px solid #979797;
    border-radius: 5px;
    padding: 0 .5rem;
    color: #333333;
  
  
    .header{
      width: 100%;
      text-align: center;
      font-size: .8rem;
      line-height: 50px;
  
      font-weight: bold;
    }
    
    .context{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: start;
      align-items: flex-start;
      
      padding: .4rem .4rem .8rem;
      border-top: 1px solid #979797;
      
      .pdf-btn{
        width: auto;
        min-width: auto;
        flex: none;
        background-image: url("../../assets/img/pdf-btn.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;
        font-size: .6rem;
        color: #efefef;
      }
      
      span{
        flex: auto;
        
        min-width: 28%;
        
        height: 22px;
        line-height: 22px;
        font-size: .7rem;
        display: inline-block;
        padding: 0 .5rem;
        margin-top: 10px;
  
        background-image: url("../../assets/img/userinfo-split.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: auto 100%;
      
      }
    }
  }
  
  .proposal{
    width: 100%;
    border: 1px solid #979797;
    border-radius: 5px;
    padding: 0 .5rem;
    color: #333333;
    background-image: url("../../assets/img/info-bg.png");
    background-position: bottom left;
    background-repeat: no-repeat;
    background-size: 35% auto;
  
  
    .header{
      width: 100%;
      text-align: center;
      font-size: .8rem;
      line-height: 50px;
  
      font-weight: bold;
    }
    
    .context{
      padding: .4rem .4rem 1rem;
      border-top: 1px solid #979797;
    }
    
    .author{
      text-align: right;
      font-weight: bold;
      line-height: 26px;
      margin-bottom: .2rem;
    }
    .autograph{
      overflow: hidden;
      margin-bottom: .6rem;
      img{
        display: block;
        height: 2rem;
        width: auto;
        float: right;
      }
    }
  }
  
  .measure{
    margin-top: .9rem;
    ul{
      margin: 0 0 .7rem 0;
      padding: .3rem 0;
      overflow: hidden;
      border-radius: 1.5rem;
      background-color: #efefef;
  
    }
    li{
      display: inline-block;
      list-style: none;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      
      img{
        vertical-align: middle;
      }
    }
    li:nth-child(1){
      background-image: none !important;
      width: 21%;
    }
    li:nth-child(2){
      width: 35%;
    }
    li:nth-child(3){
      width: 30%;
    }
    li:nth-child(4){
      width: 14%;
    }
    .start{
      background-color: #ffdfac;
      
      li{
        background-image: url("../../assets/img/data-split.png");
        background-size: auto 100%;
        background-position: top left;
        background-repeat: no-repeat;
      }
    }
  }
  
  .pdf{
    margin-top: .4rem;
    .header{
      padding: .7rem 0;
      font-size: .8rem;
      font-weight: bold;
      text-align: center;
    }
    .context{
      width: 100%;
      p{
        width: 100%;
        overflow: hidden;
        border-radius: .5rem;
        margin-bottom: .5rem;
      }
      img{
        display: block;
        width: 100%;
      }
    }
  }
  
</style>
