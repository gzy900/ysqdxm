<template>
  <div class="body">
    <section class="heart-content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="血脂控制" name="1">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据中国成人血脂管理指南2016和欧洲血脂管理指南2019：<br>
            高危人群定义为：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>血脂异常升高的（LDL>4.9）</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>或者 40岁以上的糖尿病患者合并血脂异常</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>或者 合并以下5个危险因素任意2项者：</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>2级以上高血压</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>非LDL胆固醇≥5.2</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>HDL<1</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>肥胖（BMI≥28</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>SBP/DBP ≥ 160/100</p>
              </li>
            </ul>
          </div>
          <div class="heart-item-table mt15">
            <table>
              <thead>
              <th>人群</th>
              <th>低密度脂蛋白水平</th>
              </thead>
              <tr>
                <td>健康人</td>
                <td>3.4mmol/L（130mg/dL）</td>
              </tr>
              <tr>
                <td>高危人群</td>
                <td>2.6mmol/L（100mg/dL）</td>
              </tr>
              <tr>
                <td>合并血脑血管疾病的人群（冠心病、脑梗死、颈动脉斑块>50%，下肢血管疾病等）</td>
                <td>1.8mmol/L（70mg/dL）</td>
              </tr>
              <tr>
                <td>多支血管病变的极高危人群</td>
                <td>1.4mmol/L（55mg/dL）</td>
              </tr>
            </table>
            <!--            <ul>-->
            <!--              <li> </li>-->
            <!--              <li>低密度脂蛋白水平</li>-->
            <!--            </ul>-->
            
            <!--            <ul>-->
            <!--              <li>健康人</li>-->
            <!--              <li>2.6mmol/L（100mg/dL）</li>-->
            <!--            </ul>-->
            
            <!--            <ul>-->
            <!--              <li>高危人群</li>-->
            <!--              <li>1.8mmol/L（70mg/dL）</li>-->
            <!--            </ul>-->
            
            <!--            <ul>-->
            <!--              <li>合并血脑血管疾病的人群（冠心病、脑梗死、颈动脉斑块>50%，下肢血管疾病等）</li>-->
            <!--              <li>3.4mmol/L（130mg/dL）</li>-->
            <!--            </ul>-->
            
            <!--            <ul>-->
            <!--              <li>多支血管病变的极高危人群</li>-->
            <!--              <li>1.4mmol/L（55mg/dL）</li>-->
            <!--            </ul>-->
          </div>
        </el-collapse-item>
        
        <el-collapse-item title="健康饮食" name="2">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            主要饮食建议 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>每天摄入水果和富含纤维的蔬菜</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>每天限制钠盐的摄入在1.5g以下</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>每周限制含糖的饮料摄入能量在450kcal以下（少于250ml）</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>每周建议摄入4次以上的坚果或者谷物</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>减少肉类、饱和脂肪酸的摄入等</p>
              </li>
            </ul>
          </div>
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>健康教练通过电话询问，每周评估有无达标，根据家庭成员数量可以帮助发放盐勺，主动控制食盐用量</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </el-collapse-item>
        
        <el-collapse-item title="控制体重" name="3">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            体重控制水平 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>体重指数BMI <25 kg/m2</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>体重指数计算方法：体重的公斤数除以身高米数的平方</p>
              </li>
            </ul>
          </div>
          
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>发放体重秤，自动显示体重，根据输入的身高，计算体重指数，实时上传</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </el-collapse-item>
        
        <el-collapse-item title="积极运动" name="4">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            运动推荐水平 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>每周进行150分钟以上的中等强度运动或者75分钟以上的高强度运动。</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>运动强度的判断需要基于最大心率。最大心率一般用“220-年龄”这一公式来推算。
                  中等强度的运动心率=最大心率×60%-80%。高强度运动=最大心率×80%。
                  例如，一个45岁的男性，用220减去他的实际年龄45岁，得到数字175，这个就是他的最大心率。
                  用最大心率乘以60%-80%就能得到一个中等强度运动的心率范围：105-140次/分钟。那么对这个人而言，
                  中等强度运动的心率应该在105-140次/分钟，而大于140次/分的运动就为高强度运动了。</p>
              </li>
            </ul>
          </div>
          
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            -->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>发放运动手环，记录心率，自动软件分析在该学员的最大心率60-80%的范围内的时间，定义为中等强度运动时间，-->
<!--                  应该大于150分钟/周；同理计算高强度运动时间。-->
<!--                  实时上传，如果软件无法直接计算，只要有时间/心率两个上传值可以进行手动计算</p>-->
<!--              </li>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>健康教练根据运动情况进行推荐运动，并每周进行实时监测</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        
        </el-collapse-item>
        
        <el-collapse-item title="控制血压" name="5">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            居家血压水平 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>正常家庭自测血压水平收缩压/舒张压分别<125 mm Hg和<75 mm Hg</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>理想家庭自测血压水平收缩压/舒张压分别<115 mm Hg和<75 mm Hg</p>
              </li>
              <li>
                <i class="iconfont icon-spot"/>
                <p>家庭自测血压一般推荐每天早餐前连续测量三次血压，测前休息三分钟（不说话，不活动），每次间隔1分钟。坐在有靠背的椅子上，用经过验证的电子血压计测量。如果有条件，晚饭后也可以进行连续三次血压测量。</p>
              </li>
            </ul>
          </div>
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>发放自动血压计，如果没有指纹识别功能，可以叮嘱学员只能自己使用，会实时上传数据。健康教练根据血压测量值建立血压日记，医生根据血压日记和目前用药情况进行建议或药物调整。</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </el-collapse-item>
        
        <el-collapse-item title="控制血糖" name="6">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            血糖控制水平 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>空腹血糖水平应该控制在5.6mmol/L（100mg/dL）以下</p>
              </li>
            </ul>
          </div>
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>如果没有糖尿病或者血糖异常的学员，可以每年建议一次空腹血糖监测，上传化验单，登记入库。</p>-->
<!--              </li>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>如果有糖尿病或者有空腹血糖异常的学员，可以根据情况发放血糖测量仪器，血糖数值实时上传，根据血糖水平，医生进行生活方式的建议或者药物调整。</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </el-collapse-item>
        
        <el-collapse-item title="停止吸烟" name="7">
          <div class="heart-item-header">
            具体控制指标和水平：<br>
            根据美国AHA SIMPLE 7推荐：<br>
            停止吸烟的要求 ：
          </div>
          <div class="heart-item-content">
            <ul>
              <li>
                <i class="iconfont icon-spot"/>
                <p>停止吸烟（包括二手烟），电子烟只作为暂时戒烟期的过渡（禁止长期使用）</p>
              </li>
            </ul>
          </div>
<!--          <div class="heart-item-header mt15">-->
<!--            实际操作：-->
<!--          </div>-->
<!--          <div class="heart-item-content">-->
<!--            <ul>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>健康教练进行定期的询问与登记，可以采用一些问卷，评估二手烟的情况。</p>-->
<!--              </li>-->
<!--              <li>-->
<!--                <i class="iconfont icon-spot"/>-->
<!--                <p>如果有吸烟的学员，进行戒烟宣教或者提供电子烟等戒烟辅助设备，协助戒烟。</p>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </el-collapse-item>
      </el-collapse>
    </section>
    <div class="height100"></div>
  </div>
</template>

<script>
    export default {
        name: "heart-health",
        metaInfo () {
            return {
                title: this.title,
            }
        },
        data() {
            return {
                title:'心脏健康',
                activeName: null
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                // this.getList()
            }
        },
        watch: {
            '$route'(to, from) {
                this.init()
            }
        }
    }
</script>


<style scoped lang="scss">
  .body {
    width: 100%;
    height: 100%;
    color: #868686;
  }
  
  .heart-content {
    overflow: hidden;
    font-size: .7rem;
    color: #666;
    line-height: 2rem;
    letter-spacing: 1px;
  }
  
  .el-collapse {
    border: 0;
  }
  
  .el-collapse-item {
    margin-bottom: .5rem;
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
  
  .heart-item-table {
    font-size: .6rem;
    
    table {
      border-collapse: collapse;
    }
    
    td, th {
      /*border: 1px solid #999;*/
      padding: .3rem;
      color: #444;
      
    }
    
    tr {
      background: #82c0b5;
    }
    
    th {
      background: #5a8596;
    }
    
    tr:nth-child(2n) {
      background: #aac3bf;
    }
  }
</style>

<style lang="scss">
  .heart-content {
    .el-collapse-item__header {
      height: 2.4rem;
      line-height: 2.4rem;
      padding-left: 1rem;
      background-image: url("../../assets/img/file_bg02.png");
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-color: #fff;
      font-size: .8rem;
      font-weight: bold;
      color: #666;
    }
    
    .el-collapse-item__content {
      padding: .6rem 1rem;
    }
    
    .el-collapse-item__header.is-active {
      border-bottom-color: #EBEEF5
    }
  }

</style>










