<!-- home.vue Created by xh on 2017-10-20  -->
<template>
  <div v-if="latestData !== null" class="home-page">
    <div :class="mainClass">
      <div class="graph">
        <div class="ring-graph">
          <b>{{ latestData && latestData.analysis_info !== null ? latestData.analysis_info.level : '暂无' }}</b>
        </div>
        <div v-if="latestData && latestData.analysis_info !== null" class="content-graph">{{ latestData.analysis_info.content }}</div>
      </div>
      <div class="param-box">
        <span class="param-item">
          <b>{{ latestData != null ? latestData.last_info.systolic : '0' }}<em>mmHg</em></b>
          <em>收缩压</em>
        </span>
        <span class="param-item">
          <b>{{ latestData != null ? latestData.last_info.diastolic : '0' }}<em>mmHg</em></b>
          <em>舒张压</em>
        </span>
        <span class="param-item">
          <b>{{ latestData != null ? latestData.last_info.pulse : '0' }}<em>跳/分</em></b>
          <em>心率</em>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      homeData: {},
      currentDate: '',
      latestData: null
    }
  },
  computed: {
    mainClass: function() {
      let level = this.latestData !== null && this.latestData.analysis_info ? this.latestData.analysis_info.level : null
      let result = {
        'score-box': true
      }
      if (!level || level !== '血压过高预警') {
        result.good = true
      } else {
        result.serious = true
      }
      return result
    },
    token() {
      return this.$store.state.token
    },
    hospital() {
      return this.$store.state.patientInfo.hospital_id
    },
    patient() {
      return this.$store.state.patientInfo.patient_id
    }
  },
  created() {
    this.getLatestData()
  },
  mounted() {
    scrollTo(0, 0)
  },
  methods: {
    getLatestData() {
      this.$http.get(`/app/web/v1/index/`,
        {
          params: { hospital_id: this.hospital, patient_id: this.patient },
          headers: { Authorization: `Token ${this.$store.state.token}` }
        }
      )
        .then((res) => {
          this.$set(this, 'latestData', res.data.data)
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
    .home-page{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        // bottom: 0;
        // margin-bottom: 100px;
        overflow-x: hidden;
        overflow-y: hidden;
        box-sizing: border-box;

        .score-box{
            overflow: hidden;
            color: #fff;
            &.good{
                background: linear-gradient(#3090ff, #3be3ff);
            }
            &.warn{
                background: linear-gradient(#e0be49, #ff9c3b);
            }
            &.serious{
                background: linear-gradient(#ff9630, #e54228);
            }
            .score-header{
                display: flex;
                justify-content: space-between;
                margin: 20px 30px;
                em{
                    font-size: 36px;
                    line-height: 60px;
                    font-style: normal;
                }
                span{
                    display: inline-block;
                    font-family: 'microsoft yahei';
                    font-size: 30px;
                    border-radius: 10px;
                    padding: 0 18px;
                    line-height: 54px;
                    border: 2px solid #fff; /*no*/
                }
            }
            .param-box{
                position: relative;
                display: flex;
                flex-wrap: wrap;
                padding: 0 60px 58px;
                background: url('../assets/images/bg.png') no-repeat 0 100%;
                background-size: 100% 59px;
                .param-item{
                    display: block;
                    width: 33.33%;
                    text-align: center;
                    margin: 10px 0 30px;
                    font-family: 'microsoft yahei';
                    b{
                        display: block;
                        font-size: 80px;
                        font-weight: normal;
                        em {
                            font-size: 22px;
                        }
                    }
                    em{
                        font-size: 34px;
                        font-style: normal;
                    }
                }
                &:after{
                    position: absolute;
                    left: 50%;
                    top: 42%;
                    content: '';
                    width: 84%;
                    border-top: 1px dashed #fff;
                    transform: translate(-50%, -50%);
                }
            }
        }
        .ring-graph{
            width: 300px;
            height: 300px;
            margin: 50px auto;
            border: 14px solid #fff;
            border-radius: 100%;
            position: relative;
            text-align: center;
            font-size: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            b{
                font-size: 55px;
                font-weight: normal;
            }
            // em{
            //     font-style: normal;
            //     font-size: 36px;
            // }
        }
        .content-graph{
          text-align: center;
          font-size: 25px;
          font-weight: normal;
          margin: -25px 0px 0px 0px;
        }
    }
 
</style>
