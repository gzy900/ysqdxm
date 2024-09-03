<template>
  <div id="body" ref="body" class="body">
    
    <!--    <div class="health-title">-->
    <!--      健康计划介绍-->
    <!--    </div>-->
    <!--    <section class="health-content" ref="content">-->
    <!--      <div class="heart-item-header">-->
    <!--        目录-->
    <!--      </div>-->
    <!--      <div class="heart-item-content">-->
    <!--        <ul>-->
    <!--          <li>-->
    <!--            <i class="iconfont icon-spot"/>-->
    <!--            <p>7天智能监测</p>-->
    <!--          </li>-->
    <!--          <li>-->
    <!--            <i class="iconfont icon-spot"/>-->
    <!--            <p>30天智能监测</p>-->
    <!--          </li>-->
    <!--          <li>-->
    <!--            <i class="iconfont icon-spot"/>-->
    <!--            <p>季度健康计划</p>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </section>-->
    <!--    -->
    <!--    <p class="line20"></p>-->
    <template v-if="routerId === 0">
      <!--    //七天健康计划-->
      <div class="health-title">
        心血管风险因素监测计划 / 7日
      </div>
      <div class="health-subtitle">
        一周智能监测+心电远程判读管理
      </div>
      <div class="plan-img">
        <img :src="img0" />
      </div>
      <section class="health-content mt15" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长期作息不良人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心血管疾病术后康复II期,III期人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>高血压患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>糖尿病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>短时间内生活环境变化人群（例如突然由低海拔地区前往高海拔地区生活人群）</p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                心律失常监测，心脏压力监测，房颤筛查，血压日常管理，日常运动监督，身高体重比记录，戒烟监督
              </p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          科学依据：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                AHA 2020 IMPACT GOAL; AHA SIMPLE 7; Northern Shanghai Study北上海社区心血管病研究；欧洲高血压指南2019
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
    <!--    <p class="line20"></p>-->
    
    
    <!--    //30天健康计划-->
    <template v-if="routerId === 1">
      <div class="health-title">
        心血管风险因素监测计划/月
      </div>
      <div class="health-subtitle">
        月度智能监测+心电远程判读管理
      </div>
      <div class="plan-img">
        <img :src="img1" />
      </div>
      <section class="health-content mt15" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长期作息不良人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心血管疾病术后康复II期,III期人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>高血压患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>糖尿病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>短时间内生活环境变化人群（例如突然由低海拔地区前往高海拔地区生活人群）</p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                心律失常监测，心脏压力监测，房颤筛查，血压日常管理，日常运动监督，身高体重比记录，戒烟监督
              </p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          科学依据：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                AHA 2020 IMPACT GOAL; AHA SIMPLE 7; Northern Shanghai Study北上海社区心血管病研究；欧洲高血压指南2019
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
    
    
    <!--    <p class="line20"></p>-->
    
    
    <template v-if="routerId === 2">
      <!--    //季度健康计划-->
      <div class="health-title">
        心血管风险因素监测计划/季度
      </div>
      <div class="health-subtitle">
        私人医生定制康复计划
      </div>
      
      <div class="plan-img">
        <img :src="img2" />
      </div>
      
      <section class="health-content" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长期作息不良人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心血管疾病术后康复II期,III期人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管患病高风险人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病用药人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>短时间内生活环境变化人群（例如突然由低海拔地区前往高海拔地区生活人群）</p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                心律失常监测，心脏压力监测，房颤筛查，血压日常管理，日常运动监督，身高体重比记录，戒烟监督
              </p>
            </li>
          </ul>
        </div>
        
        <div class="heart-item-header">
          优质资源：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                由心血管内科医师，心脏康复医师，心血管内科护士团队管理。
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
    <!--    <p class="line20" style="margin-bottom: 0"></p>-->
  
  
  
    <template v-if="routerId === 3">
      <!--    //年度度健康计划-->
      <div class="health-title">
        心血管风险因素监测计划/年
      </div>
      <div class="health-subtitle">
        私人医生定制康复计划
      </div>
    
      <div class="plan-img">
        <img :src="img3" />
      </div>
    
      <section class="health-content" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长期作息不良人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心血管疾病术后康复II期,III期人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管患病高风险人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病用药人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>短时间内生活环境变化人群（例如突然由低海拔地区前往高海拔地区生活人群）</p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                心律失常监测，心脏压力监测，房颤筛查，血压日常管理，日常运动监督，身高体重比记录，戒烟监督
              </p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          优质资源：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                由心血管内科医师，心脏康复医师，心血管内科护士团队管理。
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
    <!--    <p class="line20" style="margin-bottom: 0"></p>-->
  
  
    <template v-if="routerId === 4">
      <!--    //年度度健康计划-->
      <div class="health-title">
        心电监测管理
      </div>
      <div class="health-subtitle">
        私人医生定制康复计划
      </div>
    
      <div class="plan-img">
        <img :src="img4" />
      </div>
    
      <section class="health-content" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>工作压力较大人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长时间加班、熬夜人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>藏区等高海拔地区工作人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>吸烟及酗酒人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>缺乏运动，运动不规律人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管患病高风险人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长时间服用降血压、降血脂、降血糖药物的三高人群</p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                房颤筛查，心肌缺血初筛，心律失常监测，心脏压力监测，心率变异性监测
              </p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          医师资源：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                由三甲医院心血管内科医师，心脏康复医师，心血管内科护士团队管理
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
  
    <template v-if="routerId === 5">
      <!--    //年度度健康计划-->
      <div class="health-title">
        健康管理教练
      </div>
      <div class="health-subtitle">
        私人医生定制康复计划
      </div>
    
      <div class="plan-img">
        <img :src="img5" />
      </div>
    
      <section class="health-content" ref="content">
        <div class="heart-item-header">
          适应人群：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>亚健康人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>长期作息不良人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心血管疾病术后康复II期,III期人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病患者</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管患病高风险人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>心脑血管疾病用药人群</p>
            </li>
            <li>
              <i class="iconfont icon-spot"/>
              <p>短时间内生活环境变化人群（例如突然由低海拔地区前往高海拔地区生活人群）</p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          主要用途：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                心律失常监测，心脏压力监测，房颤筛查，血压日常管理，日常运动监督，身高体重比记录，戒烟监督
              </p>
            </li>
          </ul>
        </div>
      
        <div class="heart-item-header">
          优质资源：
        </div>
        <div class="heart-item-content">
          <ul>
            <li>
              <i class="iconfont icon-spot"/>
              <p>
                由心血管内科医师，心脏康复医师，心血管内科护士团队管理。
              </p>
            </li>
          </ul>
        </div>
      </section>
    </template>
    
    
    <div class="article-other">
      <span>移视科技</span>
      <span>2020-06-19</span>
    </div>
    
    <div class="height100"></div>
  </div>

</template>

<script>
    export default {
        name: "health-plan",
        metaInfo() {
            return {
                title: this.title,
            }
        },
        data() {
            return {
                title: '健康计划介绍',
                routerId: parseInt(this.$route.params.id),
                img0: require('../../assets/img/plan-0.png'),
                img1: require('../../assets/img/plan-1.png'),
                img2: require('../../assets/img/plan-2.png'),
                img3: require('../../assets/img/plan-3.png'),
                img4: require('../../assets/img/plan-4.png'),
                img5: require('../../assets/img/plan-5.png'),
            }
        },
    }
</script>


<style scoped lang="scss">
  .plan-img{
    width: 100%;
    overflow: hidden;
    margin: .8rem 0;
    img{
      width: 100%;
      float: left;
    }
  }
  .body {
    width: 100%;
    padding: 1rem;
    color: #868686;
  }
  
  .heart-item-header {
    font-size: .7rem;
    font-weight: bold;
    color: #666;
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
    }
  }
  
  .health-title {
    width: 100%;
    font-size: .8rem;
    color: #262626;
    font-weight: bold;
    line-height: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  
  .health-subtitle {
    width: 100%;
    font-size: .7rem;
    color: #444;
    line-height: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  
  .health-content {
    overflow: hidden;
    font-size: .7rem;
    color: #666;
    line-height: 1.4rem;
    letter-spacing: 1px;
  }
  
  .article-content > > > img {
    width: 100% !important;
  }
  
  .article-other {
    font-size: .6rem;
    overflow: hidden;
    line-height: .6rem;
    padding: .5rem 0;
    
    span {
      float: right;
      margin-left: .5rem;
    }
  }
</style>
