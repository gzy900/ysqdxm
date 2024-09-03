<template>
  <div id="body" ref="body" class="body">
    
    <div class="userInfo">
      <div class="header">
        <template>
          健康周报
        </template>
      </div>
      
      <div class="context">
        <span>
          姓名：李青
        </span>
        <span>
          性别：男
        </span>
        <span>
          年龄：32
        </span>
        <span>
          报告生成日期：2020-09-24
        </span>
      </div>
    </div>
    
    
    <div style="margin-top: 15px;width: 100%;height: 1px"></div>
    
    <div class="proposal">
      <div class="header">
        医生建议
      </div>
      
      <div class="context" style="white-space: pre-line;">
        多喝开水，
        不要呼吸，
        坚持一年，
        飞升成仙。
      </div>
      <p class="author">
        报告医生：王建仁
      </p>
      <p class="autograph">
        <img src="../../assets/img/head.png" />
      </p>
    </div>
    
    <div class="pdf">
      <p class="header">判读依据</p>
      <div class="context">
        <p>
          <img src="../../assets/img/img-1.png" />
        </p>
        <p>
          <img src="../../assets/img/img-2.png" />
        </p>
        <p>
          <img src="../../assets/img/img-3.png" />
        </p>
        <p>
          <img src="../../assets/img/img-4.png" />
        </p>
      </div>
    </div>
    
    <div class="height100"></div>
  </div>
</template>

<script>
  import {getUserInfo, getFeedback, getMeasure15, getMeasure2, getMeasure3, getDoctor, getWeekly} from "../../api/report";

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
      // this.init()
      this.type = this.$route.params.type
    },
    updated() {
    },
    computed: {
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
        // 1，心律失常，2，血压，3，BMI,4,吸烟，5，心脏负荷，6，运动，88，周报
        const type = this.$route.params.type
        if (type === '88'){
          this.getWeekly()
        }else{
          this.getFeedback()
        }

        if (type === '1' || type === '5') {
          this.getMeasure15()
        }

        if (type === '2') {
          this.getMeasure2()
        }

        if (type === '3') {
          this.getMeasure3()
        }
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

      async getMeasure15() {
        let res = await getMeasure15({'report_id': this.$route.params.id})
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
