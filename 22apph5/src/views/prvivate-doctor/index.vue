<template>
  <div id="body" ref="body" class="body">
    <div class="doctor-head">
      <div class="doctor-head-photo">
        <p>
          <img :src="dataList.pd_photo" />
        </p>
      </div>
      <div class="doctor-head-info">
        <p><span>姓名：</span>{{ dataList.pd_name || '王建仁'}}</p>
        <p><span>科室：</span>{{ dataList.pd_type || '心内科' }}</p>
        <p><span>医院：</span>{{ dataList.pd_hospital || '上海市第十人民医院' }}</p>
        <p class="text-wrap"><span>寄语：</span>{{ dataList.pd_dictum ||'锐意创新、精益求精，做一名合格、优秀的医生；用己之长、尽己所能，帮助那些需要帮助的人' }}</p>
      </div>
    </div>
    
    <div class="doctor-bom">
      <div class="cudgel"></div>
      
      <div class="doctor-bom-title">
        擅长领域
      </div>
      <div class="doctor-bom-info">
        {{ dataList.pd_adept || ' 擅长心律失常，复杂心电图，动态心电图等各类疑难心电图的分析诊断及冠脉影像的判图，心脏康复方案规划与指导。 '}}
        
      </div>
      <div class="line22">
        <div class="line21"></div>
      </div>
      <div class="doctor-bom-title">
        医疗教育背景
      </div>
      <div class="doctor-bom-info">
        {{ dataList.pd_education || ' 20多年内科临床，心电图与影像工作经验。现任上海市第十人民医院心脏中心智能远程医疗中心负责人。 '}}
      </div>
      
      <div class="line22">
        <div class="line21"></div>
      </div>
      
      <div class="doctor-bom-title">
        学术研究成果及获奖
      </div>
      <div class="doctor-bom-info">
        
        <div class="heart-item-content">
          <ul>
            <li v-for="item in pd_achievement" :key="item">
              <i class="iconfont icon-spot"/>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      
      </div>
    </div>
    <div class="height100">
    
    </div>
  </div>
</template>

<script>
    import {getDoctor} from "../../api/article-details";

    export default {
        metaInfo() {
            return {
                title: this.title,
            }
        },
        name: "article-details",
        data() {
            return {
                title: '私人医生',
                dataList: {
                },
                pd_achievement:[]
            }
        },
        created() {
            this.init()
        },
        updated() {
        },
        methods: {
            init() {
                this.getList()
            },
            async getList() {
                // let res = await getList({'uuid': '27dde5cb8809477ea3fdb6e2994ec7af','pd_id':'1'})
                let res = await getDoctor({'uuid': this.$route.params.id, 'pd_id': '1'})
                console.log(res.data)
                this.dataList = res.data
                this.pd_achievement = this.dataList.pd_achievement.split('，');
            }
        }
    }
</script>


<style scoped lang="scss">
  .body {
    font-size: .7rem;
    color: #777;
    background-color: #FAFAFA;
    /*height: 100%;*/
    /*overflow: auto;*/
  }
  
  .doctor-title {
    color: #333;
  }
  
  .cudgel {
    width: 100%;
    height: 10px;
    background-color: #F1F1F1;
  }
  
 
  .doctor-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: .8rem 0;
  }
  
  .doctor-head-photo {
    flex: none;
    padding: .4rem .7rem;
    
    p {
      width: 6rem;
      height: 6rem;
      overflow: hidden;
      background-color: #AAA;
      border-radius: 50%;
      
      img {
        width: 100%;
        float: left;
      }
    }
  }
  
  .doctor-head-info {
    flex: auto;
    padding-right: .7rem;
    overflow: hidden;
    p {
      line-height: 1.5rem;
      
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      
      span {
        color: #333;
      }
    }
  
    .text-wrap{
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
    }
    
  }
  
  .doctor-bom {
    
    .doctor-bom-title {
      padding: 0 .7rem;
      font-size: .8rem;
      font-weight: bold;
      color: #444;
      line-height: 2.4rem;
    }
    
    .doctor-bom-info {
      padding: 0 .7rem;
      line-height: 1.2rem;
    }
  }
  
  .heart-item-content {
    font-size: .7rem;
    color: #666;
    
    ul {
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    li {
      float: left;
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      
      .icon-spot {
        font-size: 1.6rem;
      }
    }
  }
</style>
