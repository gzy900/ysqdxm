<template>
  <div ref="report" class="report" :class="pageClass[params.type]">


    <p class="shenembaogao">
      <svg-icon icon-class="icon-report-title"/>

      <span>
        AI分析报告
      </span>
    </p>

    <div class="info mt5" @click="hideTip">
      <div v-if="params.type==='2'">
        <p class="info-title">
          <span>运动分析</span>
          <span style="background-color: rgba(229, 52, 73, 1)" class="underline"></span>
        </p>
        <p class="motion-sub-title-time mt12">{{ parseTime(dataInfo.info.startTime * 1000, '{y}年{m}月{d}日') }}</p>
        <!--        <p class="motion-sub-title-time mt12">2023年06月14日</p>-->

        <div class="motion-count mt8">
          <p class="starTime">
            <span>{{ parseTime(dataInfo.info.startTime * 1000, '{h}:{i}') }}</span>
            <span>开始时间</span>
          </p>
          <p class="lastTime">
            <span>
<!--              00:15:27-->
              {{
                addTimeZero(Math.floor((dataInfo.info.endTime - dataInfo.info.startTime) / (60 * 60))) + ':' +
                addTimeZero(Math.floor((dataInfo.info.endTime - dataInfo.info.startTime) / 60) % 60) + ':' +
                addTimeZero((dataInfo.info.endTime - dataInfo.info.startTime) % 60)
              }}
            </span>
            <span>运动时长</span>
          </p>
          <p class="endTime">
            <span>{{ parseTime(dataInfo.info.endTime * 1000, '{h}:{i}') }}</span>
            <span>结束时间</span>
          </p>
        </div>

        <p class="motion-count-bar mt5"></p>
        <div class="info-data-list mt5">
          <p>
            <span>
              <svg-icon icon-class="icon-run"></svg-icon>
              运动量</span>
            <span>{{ Math.ceil(dataInfo.info.sportTime / 60) }}min</span>
          </p>
          <p>
            <span><svg-icon icon-class="icon-time"></svg-icon>
              超目标心率时长</span>
            <span>{{
                addTimeZero(Math.floor(dataInfo.info.overTime / (60 * 60))) + ':' +
                addTimeZero(Math.floor(dataInfo.info.overTime / 60) % 60) + ':' +
                addTimeZero(dataInfo.info.overTime % 60)
              }}</span>
          </p>
          <p>
            <span><svg-icon icon-class="icon-heart"></svg-icon>
              目标心率</span>
            <span>{{ dataInfo.info.targetHeartRate }}bpm</span>
          </p>
          <p>
            <span><svg-icon icon-class="icon-line"></svg-icon>
              峰值心率</span>
            <span>{{ dataInfo.info.maxHeartRate }}bpm</span>
          </p>
          <p>
            <span><svg-icon icon-class="icon-quite"></svg-icon>
              静息心率</span>
            <span>{{ dataInfo.info.restHeartRate }}bpm</span>
          </p>
          <p>
            <span><svg-icon icon-class="icon-fire"></svg-icon>
              运动消耗</span>
            <span>{{ dataInfo.info.sportConsumption }}cal</span>
          </p>
        </div>

        <div class="motion-self-rate">
          <p class="rate-title">自感劳累评分</p>
          <p class="rate-info">
            <span class="rate-num">{{ dataInfo.info.rpe }}</span>
            <span class="rate-explain">{{ dataInfo.info.rpeExplain }}</span>
          </p>
        </div>
      </div>

      <div v-if="params.type==='3'">
        <div class="sleep-title">
          <p>
            <span>睡眠时间</span>
            <!--            <span>2023-06-13 22:43</span>-->
            <span>{{ parseTime(dataInfo.info.startTime * 1000, '{y}-{m}-{d} {h}:{i}') }}</span>
          </p>
          <p><span>{{ dataInfo.sleepTime.shi }}</span>小时<span>{{ dataInfo.sleepTime.fen }}</span>分钟</p>
        </div>

        <SleepChart v-if="dataInfo.sleepChartShow" :chartData="dataInfo.sleepChart" class="mt3"
                    @getCanvasBase64="getCanvasBase64"></SleepChart>

        <p class="mt4" style="width: 100%;height: 1px;border-top: 1px solid rgba(121, 117, 138, 1);"></p>

        <div class="sleep-body-item">
          <span class="week-body-item-bar" style="background: rgba(130, 98, 254, 1)"></span>
          <span class="sleep-body-title">非快速眼动周期</span>
          <span>{{ dataInfo.info.noFast }}</span>
        </div>

        <div class="sleep-body-item">
          <span class="week-body-item-bar" style="background: rgba(185, 167, 254, 1)"></span>
          <span class="sleep-body-title">快速眼动周期</span>
          <span>{{ dataInfo.info.fast }}</span>
        </div>

        <div class="sleep-body-item">
          <span class="week-body-item-bar" style="background: rgba(215, 205, 255, 1)"></span>
          <span class="sleep-body-title">醒来</span>
          <span>{{ dataInfo.info.wake }}</span>
        </div>


        <p class="info-title mt12">
          <span>呼吸暂停综合症分析</span>
          <span style="background-color: rgba(255, 166, 86, 1)" class="underline"></span>
        </p>
        <div id="breath-chart" class="mt12" style="height: 170px">

        </div>

        <div class="info-section mt8" style="position: relative">
          <span style="width: 34%;background: rgba(120, 226, 241, 0.5);"></span>
          <span style="width: 28.5%;background: rgba(14, 156, 255, 0.5);"></span>
          <span style="width: 25%;background: rgba(86, 67, 170, 1);"></span>
          <span style="width: 12.5%;background: rgba(155, 61, 74, 1);"></span>

          <p style="position: absolute;top:30%;left: 15%;font-size: 1rem"
             :style="dataInfo.breathTypeList[breathType].style">
            <svg-icon icon-class="icon-star"></svg-icon>
          </p>
        </div>

        <p class="info-explain-label flex1 mt8">
            <span>
              <svg-icon icon-class="icon-kuai" color="rgba(120, 226, 241, 0.5)"></svg-icon>正常
            </span>
          <span>
              <svg-icon icon-class="icon-kuai" color="rgba(14, 156, 255, 0.5)"></svg-icon>轻度
            </span>
          <span>
              <svg-icon icon-class="icon-kuai" color="rgba(111, 74, 255, 0.5)"></svg-icon>中度
            </span>
          <span>
              <svg-icon icon-class="icon-kuai" color="rgba(250, 62, 62, 0.5)"></svg-icon>重度
            </span>
          <span>
              <svg-icon icon-class="icon-star"></svg-icon>
              你的位置
            </span>
        </p>
      </div>

      <div v-if="params.type==='1'">
        <p class="info-time">分析时间：{{ parseTime(dataInfo.info.updateTime * 1000, '{y}-{m}-{d} {h}:{i}') }}</p>


        <p class="info-title mt12">
          <span>身体状况</span>
          <span style="background-color: rgba(161, 160, 245, 1)" class="underline"></span>
        </p>

        <div class="info-subTitle mt8">
          <p>
            <span style="color: #4169DC;">{{ dataInfo.monitorMin }}min</span>

            <span>监测时长</span>
          </p>
          <!--          <p>-->
          <!--            <span style="color: rgba(161, 160, 245, 1);">{{ dataInfo.reportMin }}min</span>-->
          <!--            <span>反馈时间1</span>-->
          <!--          </p>-->
          <p>
            <span :style="dataInfo.health[dataInfo.healthType].style">{{ dataInfo.health[dataInfo.healthType].txt }}</span>
            <span>健康状态</span>
          </p>
        </div>

        <!--        <p class="info-title mt8">-->
        <!--          <span>报告总结</span>-->
        <!--          <span class="underline"></span>-->
        <!--        </p>-->

        <!--        <div class="info-summary mt8">-->
        <!--          <p class="info-summary-title">-->
        <!--            {{ dataInfo.info.tag || '康复' }}-->
        <!--          </p>-->
        <!--          <p class="info-summary-content">-->
        <!--            本次共检测了{{ dataInfo.monitorTime }}，为您提供心电数据反馈一共耗时{{ dataInfo.reportDelay }}<br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            您目前的身体状况处在-->
        <!--            <span style="font-size: 1rem;" :style="dataInfo.health[dataInfo.healthType].style">{{-->
        <!--                dataInfo.health[dataInfo.healthType].txt-->
        <!--              }}</span>状态<br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            您目前的心脏的压力指数处于-->
        <!--            <span style="font-size: 1rem;" :style="dataInfo.pressureTxt[dataInfo.pressure].style">{{-->
        <!--                dataInfo.pressureTxt[dataInfo.pressure].txt-->
        <!--              }}</span>，{{ dataInfo.pressureTxt[dataInfo.pressure].propose }}<br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            <span style="font-size: .6rem;color: #999;line-height: .8rem">中国每年心梗发病人数增长至少50万，心梗属于急性病，会因为较小的日常时间诱发病症，例如过劳，激动，暴饮暴食，寒冷刺激，便秘，吸烟，大量饮酒等</span><br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            AI监测到您的心梗发病概率为{{ dataInfo.xgNum }}%{{ dataInfo.xgTxt[dataInfo.xgType].formula }}属于-->
        <!--            <span-->
        <!--                style="font-size: 1rem;" :style="dataInfo.xgTxt[dataInfo.xgType].style">{{-->
        <!--                dataInfo.xgTxt[dataInfo.xgType].txt-->
        <!--              }}</span>，{{ dataInfo.xgTxt[dataInfo.xgType].propose }}<br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            <span style="font-size: .6rem;color: #999;line-height: .8rem">脑梗死又称缺血性脑卒中，是指局部脑组织因血液循环障碍，缺血、缺氧而发生的软化坏死，通俗地说心脏输送血液进入大脑的通道狭窄闭塞，硬化，过于脆弱等都会导致脑梗风险提高</span><br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            AI查看到您的脑梗发病概率为{{ dataInfo.ngNum }}%{{ dataInfo.ngTxt[dataInfo.ngType].formula }}，属于-->
        <!--            <span style="font-size: 1rem;" :style="dataInfo.ngTxt[dataInfo.ngType].style">{{-->
        <!--                dataInfo.ngTxt[dataInfo.ngType].txt-->
        <!--              }}</span>，{{ dataInfo.ngTxt[dataInfo.ngType].propose }}<br/>-->
        <!--            <span style="display: block;margin-top: .4rem"></span>-->
        <!--            在AI监测的时间段内总心博数为{{ dataInfo.info.totalHeartRate }}次<br/><span-->
        <!--              style="display: block;margin-top: .4rem"></span>-->
        <!--            平均心率为{{ dataInfo.info.avgHeartRate }}次/分<br/><span style="display: block;margin-top: .4rem"></span>-->
        <!--            最大心率为{{ dataInfo.info.maxHeartRate }}次/分<br/><span style="display: block;margin-top: .4rem"></span>-->
        <!--            没有出现室性早博<br/><span style="display: block;margin-top: .4rem"></span>-->
        <!--            ST段无异常<br/>-->
        <!--          </p>-->
        <!--        </div>-->
      </div>


      <p class="info-title mt12">
        <span>心率分析</span>
        <span style="background-color: rgba(229, 52, 73, 1)" class="underline"></span>
      </p>

      <pie ecgv="1" :names="dataInfo.pieData.names" :nums="dataInfo.pieData.nums" :isSleep="params.type"></pie>

      <div id="heartbeatChart" style="height: 186px"></div>

      <div class="info-data-lattice mt12">
        <p>
          <span style="color: #4278FF">{{ dataInfo.info.totalHeartRate }}</span>
          <span>总心跳数</span>
        </p>
        <p>
          <span style="color: #4278FF">{{ dataInfo.info.avgHeartRate }}</span>
          <span>平均心率</span>
        </p>
        <p>
          <span style="color: #4278FF">{{ dataInfo.info.minHeartRate }}</span>
          <span>最小心率</span>
        </p>
        <p>
          <span style="color: #4278FF">{{ dataInfo.info.maxHeartRate }}</span>
          <span>最大心率</span>
        </p>
      </div>

      <p class="info-title mt12">
        <span>心脏压力分析</span>
        <span style="background-color: rgba(190, 119, 198, 1)" class="underline"></span>
      </p>

      <div class="info-section mt8" style="position: relative">
        <span style="width: 33.3%;background: #B9CDFF;"></span>
        <span style="width: 33.4%;background: #87A9FF;"></span>
        <span style="width: 33.3%;background: #4278FF;"></span>
        <p style="position: absolute;top:30%;font-size: 1rem;" :style="dataInfo.pressureStyle[dataInfo.pressure]">
          <svg-icon icon-class="icon-star" color="#FCFF5E"></svg-icon>
        </p>
      </div>

      <p class="info-explain-label mt8">
        <span>
          <svg-icon icon-class="icon-kuai" color="#B9CDFF"></svg-icon>压力低
        </span>
        <span>
          <svg-icon icon-class="icon-kuai" color="#87A9FF"></svg-icon>压力中
        </span>
        <span>
          <svg-icon icon-class="icon-kuai" color="#4278FF"></svg-icon>压力高
        </span>
        <span>
          <svg-icon icon-class="icon-star" color="#F4C54A"></svg-icon>你的位置
        </span>
      </p>

      <div class="info-data-list">
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            SDNN
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'全部窦性心搏RR间期的标准差。单位ms标准区间141±39ms')"/>

          </span>
          <span :style="numColor('sdnn',dataInfo.info.sdnn)">{{ dataInfo.info.sdnn }}ms</span>
        </p>
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            SDNNIDX
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'准确解释每5分钟窦性RR间期标准差均值。单位ms标准区间81±24ms')"/>
          </span>
          <span :style="numColor('sdnnidx',dataInfo.info.sdnnidx)">{{ dataInfo.info.sdnnidx }}ms</span>
        </p>
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            rMSSD
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'RMSSD中文释义为相邻正常心动周期差值的均方根主要反映机体副交感神经的活动情况。单位ms标准区间27±12ms')"/>
          </span>
          <span :style="numColor('rmssd',dataInfo.info.rmssd)">{{ dataInfo.info.rmssd }}ms</span>
        </p>
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            SDANN
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'RR间期的平均值标准差。单位ms标准区间127±35ms')"/>
          </span>
          <span :style="numColor('sdann',dataInfo.info.sdann)">
            {{ dataInfo.info.sdann }}ms</span>
        </p>
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            PNN50
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'代表R-R间期与平均R-R间期大于50MS的个数占总数的百分比')"/>
          </span>
          <span :style="numColor('pnn',dataInfo.info.pnn)">{{ dataInfo.info.pnn }}%</span>
        </p>
        <p>
          <span>
            <svg-icon icon-class="icon-point" color="#88A7F4"/>
            三角指数
            <svg-icon icon-class="icon-info" @click.stop="showTip($event,'三角指数（RR间期的总个数除以RR间期直方图的高度）')"/>
          </span>
          <span :style="numColor('triangleIndex',dataInfo.info.triangleIndex)">{{ dataInfo.info.triangleIndex }}ms</span>
        </p>
      </div>


      <template v-if="params.type!=='2'||params.simple!=='1'">
        <p class="info-title mt12">
          <span>心血管风险评估</span>
          <span style="background-color: rgba(244, 196, 74, 1)" class="underline"></span>
        </p>

        <div class="info-subTitle mt8">
          <p>
                <span class="circular-progress">
                  <span style="background: #C4D0FF;"></span>
                  <span
                      :style="{background: 'conic-gradient(#4169DC, #4169DC '+(dataInfo.xgzb*360)+'deg, transparent '+(dataInfo.xgzb*360)+'deg, transparent)'}"></span>
                </span>
            <span>异常占比</span>
          </p>
          <p>
            <span style="color: rgba(244, 196, 74, 1);">{{ (dataInfo.xgNum / 100).toFixed(2) }}</span>
            <span>概率</span>
          </p>
          <p>
            <span :style="dataInfo.xgTxt[dataInfo.xgType].style">{{ dataInfo.xgTxt[dataInfo.xgType].txt }}</span>
            <span>心梗风险</span>
          </p>
        </div>

        <xgChart :rate="64" ecgv="1" v-if="dataInfo.xgShow" class="mt10" :chartData="dataInfo.xgData" :id="'xgChart'" :isSwiper="true"
                 :isSleep="params.type"></xgChart>

        <p class="info-title mt12">
          <span>脑血管风险评估</span>
          <span style="background-color: rgba(65, 105, 220, 1)" class="underline"></span>
        </p>

        <div class="info-subTitle mt8">
          <p>
                <span class="circular-progress">
                  <span style="background: rgba(65, 105, 220, .4)"></span>
                  <span
                      :style="{background: 'conic-gradient(rgba(65, 105, 220, 1), rgba(65, 105, 220, 1) '+(dataInfo.ngzb*360)+'deg, transparent '+(dataInfo.ngzb*360)+'deg, transparent)'}">
                  </span>
                </span>
            <span>异常占比</span>
          </p>
          <p>
            <span style="color: #4278FF;">{{ (dataInfo.ngNum / 100).toFixed(2) }}</span>
            <span>概率</span>
          </p>
          <p>
            <span :style="dataInfo.ngTxt[dataInfo.ngType].style">{{ dataInfo.ngTxt[dataInfo.ngType].txt }}</span>
            <span>房颤风险</span>
          </p>
        </div>

        <xgChart :rate="64" ecgv="1" v-if="dataInfo.ngShow" class="mt10" :chartData="dataInfo.ngData" :id="'ngChart'" :isSwiper="true"
                 :isSleep="params.type"></xgChart>

        <!--      <xgChart v-if="data.ngYList.length>0" class="mt8" :xList="data.ngXList" :yList="data.ngYList" id="nc"-->
        <!--               :isSwiper="false"-->
        <!--               :isSleep="params.type"></xgChart>-->

        <!--        <div v-if="params.type==='2'||params.type==='3'">-->
        <div>
          <p class="info-title mt8">
            <span>报告总结</span>
            <span class="underline"></span>
          </p>

          <div class="info-summary mt8">
            <!--            <p class="info-summary-title info-summary-title-green">-->
            <!--              {{ dataInfo.info.tag || '康复' }}-->
            <!--            </p>-->

            <p class="info-summary-content">
              本次共检测了{{ dataInfo.monitorTime }}，为您提供心电数据反馈一共耗时{{ dataInfo.reportDelay }}<br/>
              <span style="display: block;margin-top: .4rem"></span>
              您目前的身体状况处在
              <span style="font-size: 1rem;" :style="dataInfo.health[dataInfo.healthType].style">{{
                  dataInfo.health[dataInfo.healthType].txt
                }}</span>状态<br/>
              <span style="display: block;margin-top: .4rem"></span>
              您目前的心脏的压力指数处于
              <span style="font-size: 1rem;" :style="dataInfo.pressureTxt[dataInfo.pressure].style">{{
                  dataInfo.pressureTxt[dataInfo.pressure].txt
                }}</span>，{{ dataInfo.pressureTxt[dataInfo.pressure].propose }}<br/>
              <span style="display: block;margin-top: .4rem"></span>
              <span style="font-size: .6rem;color: #999;line-height: .8rem">中国每年心梗发病人数增长至少50万，心梗属于急性病，会因为较小的日常时间诱发病症，例如过劳，激动，暴饮暴食，寒冷刺激，便秘，吸烟，大量饮酒等</span><br/>
              <span style="display: block;margin-top: .4rem"></span>
              AI监测到您的心梗发病概率为{{ dataInfo.xgNum }}%{{ dataInfo.xgTxt[dataInfo.xgType].formula }}属于
              <span
                  style="font-size: 1rem;" :style="dataInfo.xgTxt[dataInfo.xgType].style">{{
                  dataInfo.xgTxt[dataInfo.xgType].txt
                }}</span>，{{ dataInfo.xgTxt[dataInfo.xgType].propose }}<br/>
              <span style="display: block;margin-top: .4rem"></span>
              <span style="font-size: .6rem;color: #999;line-height: .8rem">脑梗死又称缺血性脑卒中，是指局部脑组织因血液循环障碍，缺血、缺氧而发生的软化坏死，通俗地说心脏输送血液进入大脑的通道狭窄闭塞，硬化，过于脆弱等都会导致脑梗风险提高</span><br/>
              <span style="display: block;margin-top: .4rem"></span>
              AI查看到您的脑梗发病概率为{{ dataInfo.ngNum }}%{{ dataInfo.ngTxt[dataInfo.ngType].formula }}，属于
              <span style="font-size: 1rem;" :style="dataInfo.ngTxt[dataInfo.ngType].style">{{
                  dataInfo.ngTxt[dataInfo.ngType].txt
                }}</span>，{{ dataInfo.ngTxt[dataInfo.ngType].propose }}<br/>
              <span style="display: block;margin-top: .4rem"></span>
              在AI监测的时间段内总心博数为{{ dataInfo.info.totalHeartRate }}次<br/><span
                style="display: block;margin-top: .4rem"></span>
              平均心率为{{ dataInfo.info.avgHeartRate }}次/分<br/><span style="display: block;margin-top: .4rem"></span>
              最大心率为{{ dataInfo.info.maxHeartRate }}次/分<br/><span style="display: block;margin-top: .4rem"></span>
              没有出现室性早博<br/><span style="display: block;margin-top: .4rem"></span>
              ST段无异常<br/>
            </p>
          </div>
        </div>


      </template>


      <div v-show="data_tip.show" class="dataTip" :style="{top:data_tip.top+'px'}">
        <p class="dataTip-pointer" :style="{left:data_tip.left+'px'}"></p>
        <p class="dataTip-content">
          词语解释：{{ data_tip.text }}
        </p>
      </div>

      <!--      <p class="info-switch-open">收起报告</p>-->
    </div>

    <div class="doctor-report-card">
      <p class="d-r-card-info">
        <span class="d-r-card-info-title">医生专业分析</span>
        <span>报告时间：2022.06.06</span>
        <span>监测时长：2小时5分钟</span>
      </p>
      <p class="d-r-card-btn">
        <span>查看</span>
        <span>分析</span>
      </p>
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
import { reactive, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import pie from '../../components/PieChart/index.vue'
import xgChart from '../../components/XgChart/index.vue'
import SleepChart from '../../components/SleepChart/index.vue'

import { getReport } from '../../api/report-ecg1.js'


// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart, LineChart, ScatterChart } from 'echarts/charts';
import { heartRateChartOption, heartbeatChartOption, breathChartOption } from './option/chartOption.js';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { deepClone } from "../../utils";
import { heartData } from './option/data.js'
import { heartToChartData } from '../../utils/pako.js'
import { addTimeZero, parseTime } from '../../utils/index'
// 注册必须的组件
echarts.use([
  ScatterChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  MarkLineComponent,
  MarkPointComponent,
  TransformComponent,
  GridComponent,


  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  LabelLayout,
]);


const route = useRoute()
let params = reactive(route.params)
const pageClass = reactive({
  '1': '',
  '2': 'motion',
  '3': 'sleep',
})


const query = {
  reportId: route.params.id,
  // type: route.params.type
}

let loading = ref(true)


let dataInfo = reactive({
  info: {},
  sleepTime: {
    shi: 0,
    fen: 0
  },
  monitorMin: 0,
  reportMin: 0,
  monitorTime: '',
  reportDelay: '',
  sleepChart: [],
  sleepChartShow: false,
  pieData: {
    nums: '',
    names: '',
  },
  pressure: 0,
  pressureStyle: [
    {
      left: '15%'
    },
    {
      left: '50%'
    },
    {
      left: '80%'
    },
  ],
  pressureTxt: [
    {
      'txt': '低档',
      'propose': '请继续保持良好的心态！',
      style: {
        color: '#79b14b'
      }
    },
    {
      'txt': '中档',
      'propose': '适当的释放自己的压力，可以选择通过自我发泄调整、运动锻炼、转移注意力等方式进行调节。',
      style: {
        color: '#ffc000'
      }
    },
    {
      'txt': '高档',
      'propose': '可以选择通过自我发泄调整、运动锻炼、转移注意力等方式进行调节。必要时，可以选择心理治疗来调节个人压力！',
      style: {
        color: '#ffc000'
      }
    },
  ],
  xgNum: 0,
  xgType: 0,
  xgShow: false,
  xgzb: 0,
  xgData: {
    data: {}
  },
  xgTxt: [
    {
      formula: '低于30%',
      txt: '低概率',
      propose: '继续保持良好的生活习惯！',
      style: {
        color: '#4278FF'
      }
    },
    {
      formula: '在30%~60%之间',
      txt: '中概率',
      propose: '应该适当的增加运动量，减重，改变不良的生活习惯，减少发病率！',
      style: {
        color: '#ffc000'
      }
    },
    {
      formula: '高于60%',
      txt: '高概率',
      propose: '应该积极的降压、降糖及降脂治疗，减少发病率。必要时应该及时就医，谨遵医嘱！',
      style: {
        color: '#ffc000'
      }
    },
  ],
  ngNum: 0,
  ngzb: 0,
  ngType: 0,
  ngShow: false,
  ngData: {
    data: null
  },
  ngTxt: [
    {
      formula: '低于30%',
      txt: '低概率',
      propose: '继续保持良好的生活习惯！',
      style: {
        color: '#4278FF'
      }
    },
    {
      formula: '在30%~60%之间',
      txt: '中概率',
      propose: '应该适当的增加运动量，减重，改变不良的生活习惯，减少发病率！',
      style: {
        color: '#ffc000'
      }
    },
    {
      formula: '高于60%',
      txt: '高概率',
      propose: '应该积极的降压、降糖及降脂治疗，减少发病率。必要时应该及时就医，谨遵医嘱！',
      style: {
        color: 'rgba(255, 124, 145, 1)'
      }
    },
  ],
  healthType: 0,
  health: [
    {
      txt: '健康',
      style: {
        color: '#4278FF'
      }
    },
    {
      txt: '亚健康',
      style: {
        color: '#ffc000'
      }
    },
    {
      txt: '不健康',
      style: {
        color: 'rgba(255, 124, 145, 1)'
      }
    }
  ],
  breathTypeList: [
    {
      name: '正常',
      style: {
        left: '15%'
      }
    },
    {
      name: '轻度',
      style: {
        left: '45%'
      }
    },
    {
      name: '中度',
      style: {
        left: '72%'
      }
    },
    {
      name: '重度',
      style: {
        left: '90%'
      }
    },
  ],
  rpeList: {
    '1': '丝毫不觉疲惫，而且呼吸平缓',
    '2': '稍感疲惫或毫无疲惫感',
    '3': '你可能轻微地察觉到你的呼吸',
    '4': '感到轻微疲惫，但依然自在',
    '5': '轻微的疲惫，气息比较急促',
    '6': '中强，感到疲惫，但可以维持',
    '7': '很强激烈运动时可能出现的感觉',
    '8': '很困难',
    '9': '超级困难',
    '10': '力竭，极限值',
    '0': '没什么，这是休息时的感觉',
  }
})


const numColorOption = {
  sdnn: {
    min: 102,
    max: 180
  },
  sdnnidx: {
    min: 57,
    max: 105
  },
  rmssd: {
    min: 15,
    max: 39
  },
  sdann: {
    min: 92,
    max: 162
  },
  pnn: {
    min: 14.4,
    max: 19
  },
  triangleIndex: {
    min: 0.6,
    max: 1
  },
}
const numColor = computed(() => {
  return (name, value) => {
    console.log(name)
    console.log(value)

    value = parseFloat(value)

    if (value > numColorOption[name].max) {
      return { color: "rgb(255, 192, 0)" }
    }

    if (value < numColorOption[name].min) {
      return { color: 'rgba(255, 124, 145, 1)' }
    }
  }
})


let breathData = ref(1)
const breathType = computed(() => {
  let flag = 0
  if (breathData.value <= 5) {
    flag = 0
  } else if (breathData.value > 5 && breathData.value <= 15) {
    flag = 1
  } else if (breathData.value > 15 && breathData.value <= 30) {
    flag = 2
  } else if (breathData.value > 30) {
    flag = 3
  }
  return flag
})

function heartRound() {
  dataInfo.info.maxHeartRate = Math.floor(dataInfo.info.maxHeartRate)
  dataInfo.info.minHeartRate = Math.floor(dataInfo.info.minHeartRate)
  dataInfo.info.avgHeartRate = Math.floor(dataInfo.info.avgHeartRate)
  dataInfo.info.targetHeartRate = Math.floor(dataInfo.info.targetHeartRate)
  dataInfo.info.restHeartRate = Math.floor(dataInfo.info.restHeartRate)
  dataInfo.info.totalHeartRate = Math.floor(dataInfo.info.totalHeartRate)
}

async function getData() {

  // if (query.type === '3') {
  //   query.reportId = '6b3ebaad196d448f810c7f5efeb7caf5'
  // }
  //
  // if (query.type === '2') {
  //   query.reportId = 'c373207955c1413da75e12ee42d5c2b8'
  // }
  const res = await getReport(query)
  dataInfo.info = res.data.data

  heartRound()


  console.log(dataInfo.info)


  const startTime = dataInfo?.info?.startTime || 0
  const endTime = dataInfo?.info?.endTime || startTime
  const monitorTime = endTime - startTime
  const monitorDay = Math.floor(monitorTime / (60 * 60 * 24))
  const monitorShi = Math.floor(monitorTime % (60 * 60 * 24) / (60 * 60))
  const monitorFen = Math.floor(monitorTime % (60 * 60) / 60)
  const monitorMin = Math.floor(monitorTime / 60)

  let monitorTimeTxt = ''
  if (monitorDay > 0) {
    monitorTimeTxt += monitorDay + '天'
  }
  if (monitorShi > 0) {
    monitorTimeTxt += monitorShi + '小时'
  }
  if (monitorFen > 0 || monitorTimeTxt.length <= 0) {
    monitorTimeTxt += monitorFen + '分钟'
  }
  dataInfo.monitorTime = monitorTimeTxt

  dataInfo.monitorMin = monitorMin


  const createTime = dataInfo?.info?.createTime || 0
  const updateTime = dataInfo?.info?.updateTime || createTime
  const reportDelay = updateTime - createTime

  const reportDelayDay = Math.floor(reportDelay / (60 * 60 * 24))
  const reportDelayShi = Math.floor(reportDelay % (60 * 60 * 24) / (60 * 60))
  const reportDelayFen = Math.floor(reportDelay % (60 * 60) / 60)

  const reportMin = Math.ceil(reportDelay / 60)

  let reportDelayTxt = ''
  if (reportDelayDay > 0) {
    reportDelayTxt += reportDelayDay + '天'
  }
  if (reportDelayShi > 0) {
    reportDelayTxt += reportDelayShi + '小时'
  }
  if (reportDelayFen > 0 || reportDelayTxt.length <= 0) {
    reportDelayTxt += reportDelayFen + '分钟'
  }
  dataInfo.reportDelay = reportDelayTxt
  dataInfo.reportMin = reportMin


  setPieData(dataInfo)
  setLineData(dataInfo)
  setPressure(res.data.data)


  if (route.params.type !== '2' || route.params.simple !== '1') {
    setXg(dataInfo.info)
    setNg(dataInfo.info)
  }

  setHealthType()

  if (route.params.type === '2') {
    dataInfo.info.rpeExplain = dataInfo.info.rpe.split(';')[1]
    dataInfo.info.rpe = dataInfo.info.rpe.split(';')[0]
  }


  if (params.type === '3') {
    // sleep
    const sleepChartData = res.data.data.eyesData.split(',') || []

    dataInfo.sleepChart = sleepChartData
    dataInfo.sleepChartShow = true

    initBreathChart(res.data.data.breathStopData || '')


    const wake = dataInfo.info.wake.split(':').map(item => Number(item))
    const fast = dataInfo.info.fast.split(':').map(item => Number(item))
    const noFast = dataInfo.info.noFast.split(':').map(item => Number(item))

    let miao = wake[2] + fast[2] + noFast[2]
    let fen = wake[1] + fast[1] + noFast[1] + Math.floor(miao / 60)
    const shi = wake[0] + fast[0] + noFast[0] + Math.floor(fen / 60)
    miao = miao % 60
    fen = fen % 60
    dataInfo.sleepTime.shi = shi
    dataInfo.sleepTime.fen = fen

    breathData = ref(Number(dataInfo.info.breathStopDegree) || 0)
  }

  loading.value = false
}


function setHealthType() {
  dataInfo.healthType = 0
  if (dataInfo.ngType !== 0) {
    dataInfo.healthType++
  }
  if (dataInfo.xgType !== 0) {
    dataInfo.healthType++
  }
  if (dataInfo.pressure !== 0) {
    dataInfo.healthType++
  }
  if (dataInfo.healthType > 2) {
    dataInfo.healthType = 2
  }
}

function setXg(data) {
  dataInfo.xgNum = parseFloat((data.xgzb * 100).toFixed(2))
  if (dataInfo.xgNum < 30) {
    dataInfo.xgType = 0
  } else if (dataInfo.xgNum >= 30 && dataInfo.xgNum <= 60) {
    dataInfo.xgType = 1
  } else if (dataInfo.xgNum > 60) {
    dataInfo.xgType = 2
  }
  dataInfo.xgData.data = JSON.parse(data.xgMsg)

  dataInfo.xgShow = true
  dataInfo.xgzb = Number(data.xggl)
}

function setNg(data) {
  dataInfo.ngNum = parseFloat((data.ngzb * 100).toFixed(2))
  if (dataInfo.ngNum < 30) {
    dataInfo.ngType = 0
  } else if (dataInfo.ngNum >= 30 && dataInfo.ngNum <= 60) {
    dataInfo.ngType = 1
  } else if (dataInfo.ngNum > 60) {
    dataInfo.ngType = 2
  }

  dataInfo.ngData.data = JSON.parse(data.ngMsg)
  dataInfo.ngShow = true
  dataInfo.ngzb = Number(data.nggl)
}

function setPressure(data) {
  const sdnn = data.sdnn
  const pressure = 300 - sdnn
  if (pressure < 150) {   // 低
    dataInfo.pressure = 0
  } else if (pressure >= 150 && pressure <= 200) {  // 中
    dataInfo.pressure = 1
  } else if (pressure > 200) {  // 高
    dataInfo.pressure = 2
  }
}

function setLineData(dataInfo) {
  const heartRateData = JSON.parse(dataInfo.info.heartRateData) || []
  const x = []

  heartRateData.forEach((item, index) => {
    heartRateData[index] = Math.floor(item)
    x.push(index)
  })
  heartbeatChartOption.dataset.source = [
    heartRateData,
    x
  ]
  heartbeatChartOption.xAxis.max = heartRateData.length - 1

  let dataMax = 0
  let dataMin = 100000
  let dataMaxIndex = 0
  let dataMinIndex = 0
  for (let i = 0; i < heartRateData.length; i++) {
    if (heartRateData[i] > dataMax) {
      dataMax = heartRateData[i]
      dataMaxIndex = i
    }
    if (heartRateData[i] < dataMin) {
      dataMin = heartRateData[i]
      dataMinIndex = i
    }
  }
  console.log(dataMinIndex)
  heartbeatChartOption.series[0].symbolSize = (value, params) => {
    if (params.dataIndex === dataMaxIndex || params.dataIndex === dataMinIndex) {
      return 8
    } else {
      return 0
    }
  }

  heartbeatChartOption.series[0].markLine.data = [{
    type: 'average',
    name: '平均心率',
    valueIndex: 0,
    label: {
      position: 'insideEndTop', color: '#999999', formatter: (params) => {
        return params.data.name + Math.floor(dataInfo.info.avgHeartRate)
      }
    }
  }]
  lineChartSetOption()
}

function setPieData(dataInfo) {
  const heartRateEvents = JSON.parse(dataInfo.info.heartRateEvents) || []
  const names = []

  delete heartRateEvents['噪音']
  delete heartRateEvents['其它']
  let nums = Object.values(heartRateEvents)
  nums = nums.filter((item) => {
    return item > 0
  }).sort().reverse()

  for (let i = 0; i < nums.length; i++) {
    for (const item in heartRateEvents) {
      if (heartRateEvents[item] === nums[i]) {
        delete heartRateEvents[item]
        names.push(item)
        break
      }
    }
  }
  dataInfo.pieData.names = names
  dataInfo.pieData.nums = nums
}


function setStyle() {
  if (params.type === '3') {
    heartbeatChartOption.xAxis.axisLabel.color = 'rgba(255, 255, 255, 0.85)'
    heartbeatChartOption.yAxis.axisLabel.color = 'rgba(255, 255, 255, 0.85)'
    heartbeatChartOption.yAxis.splitLine.lineStyle.color = 'rgba(255, 255, 255, 0.2)'
  } else {
  }
}

function initBreathChart(breathData) {
  const breathDataY = []
  const breathDataX = []
  const breathDataZ = []
  const breathDataT = []
  const source = []

  const data = breathData.split(',') || []
  for (let b = 0; b < data.length; b++) {
    breathDataY.push(Math.random() + .2)
    breathDataX.push(b)
    breathDataZ.push(b)
    breathDataT.push(Number(data[b]))
  }
  source.push(breathDataY)
  source.push(breathDataX)
  source.push(breathDataT)
  breathChartOption.dataset.source = source
  const ele = document.getElementById('breath-chart')
  const breathChart = echarts.init(ele)
  breathChart.setOption(breathChartOption)
}


let data_tip = reactive({
  top: 100,
  left: 100,
  show: false,
  text: ''
})
const report = ref()

function showTip(e, text) {
  // console.log(e)
  const data = e.target.getBoundingClientRect()
  const reportData = report.value.getBoundingClientRect()
  data_tip.left = data.left
  data_tip.top = data.top - reportData.top + data.height
  data_tip.show = true
  data_tip.text = text
}

function hideTip() {
  data_tip.show = false
}

function getCanvasBase64(e) {
  console.log(e)
}

let heartbeatChart = null

function initLineChart() {
  const heartbeatChartEle = document.getElementById('heartbeatChart')
  heartbeatChart = echarts.init(heartbeatChartEle)
}

function lineChartSetOption() {
  heartbeatChart.setOption(heartbeatChartOption)
}

onMounted(() => {
  setStyle()
  initLineChart()

  getData()
})

</script>

<style scoped>

.dataTip {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  /*display: none;*/
}

.dataTip .dataTip-pointer {
  width: 0;
  height: 0;
  border-top: .3rem solid rgba(0, 0, 0, 0);
  border-left: .3rem solid rgba(0, 0, 0, 0);
  border-right: .3rem solid rgba(0, 0, 0, 0);
  border-bottom: .3rem solid rgba(0, 0, 0, 0.6);
  position: relative;
  left: 30%;
}

.dataTip .dataTip-content {
  width: 80%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: .7rem;
  position: relative;
  left: 10%;
  font-size: .8rem;
  line-height: 1rem;
  padding: .5rem .8rem;
  color: #FFFFFF;
}

.flex1 {
  display: flex;
  justify-content: space-around;
}

/*运动*/
.motion-sub-title-time {
  color: #666666;
  font-size: .6rem;
  text-align: center;
}

.motion-count {
  display: flex;
}

.motion-count p {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .6rem;
  color: #666666;
  overflow: hidden;
  text-align: center;
}

.motion-count p span:first-child {
  font-size: .8rem;
  color: #20222F;
  font-weight: 600;
  height: 1.5rem;
  vertical-align: bottom;
  line-height: 2rem;
  margin-bottom: .35rem;
}

.motion-count p span:last-child {
  height: .6rem;
  line-height: .6rem;
}

.motion-count .lastTime span:first-child {
  font-size: 1.5rem;
  line-height: 1.5rem;
}

.motion-count .lastTime {
  width: 44%;
  flex: auto;
}

.motion-count .starTime {
}

.motion-count .endTime {
}

.motion-count-bar {
  width: 100%;
  height: .2rem;
  background: linear-gradient(91.21deg, #FF6584 0%, #6F4AFF 99.63%);
}

.motion-self-rate {
  font-size: .8rem;
  margin-top: 1.2rem;
  border-bottom: 1px solid #DCDCDC;
}

.motion-self-rate p {
  color: rgba(102, 102, 102, 1);
  font-weight: 500;
  line-height: 1rem;
  height: 1rem;
}

.motion-self-rate .rate-info {

  margin: .6rem 0;
  display: flex;
  height: auto;
  overflow: hidden;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.motion-self-rate .rate-info span {
  display: inline-block;
  flex: none;

}

.motion-self-rate .rate-num {
  /*width: 100%;*/
  font-size: 1.6rem;
  /*height: 1.9rem;*/
  height: auto;
  line-height: 1.9rem;
  color: rgba(239, 123, 15, 1);
  font-weight: 700;
}

.motion-self-rate .rate-explain {
  font-size: .7rem;
  height: 1.3rem;
  font-weight: bold;
  color: #333;
}

/*运动end*/

.sleep-title {
  display: flex;
  flex-direction: row;
}

.sleep-title p {
  width: 50%;
}

.sleep-title p:first-child {
  font-size: .6rem;
  color: #FFFFFF;
  height: 2rem;
  line-height: 1rem;
  text-align: left;

  display: flex;
  flex-direction: column;
}

.sleep-title p:last-child {
  font-size: .8rem;
  text-align: right;
  color: rgba(3, 203, 165, 1);
  height: 2rem;
  line-height: 1rem;
  padding-top: .4rem;
}

.sleep-title p:last-child span {
  font-size: 1.2rem;
}

.doctor-report-card {
  width: 100%;
  height: auto;
  background: #ffffff;
  box-shadow: 0 0 1rem rgba(187, 187, 187, 0.2);
  border-radius: .8rem;
  display: none;
  overflow: hidden;
}

.doctor-report-card .d-r-card-info {
  flex: auto;
  padding: .8rem 0 .8rem .8rem;
  font-weight: 400;
  font-size: .8rem;
}

.doctor-report-card .d-r-card-info span {
  display: block;
  color: rgba(102, 102, 102, 1);
  margin-top: .5rem;
}

.doctor-report-card .d-r-card-info .d-r-card-info-title {
  margin-top: 0;
  color: rgba(32, 34, 47, 1);
}

.doctor-report-card .d-r-card-btn {
  width: 3rem;
  height: auto;
  flex: none;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(180deg, rgba(251, 113, 99, 0.85) 0%, rgba(254, 199, 94, 0.85) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.report {
  width: 100%;
  height: auto;
  background: #FBFBFB;
  padding: 16px;
  padding-bottom: 0;
  overflow: hidden;
  position: relative;
}


.info {
  width: 100%;
  height: auto;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(187, 187, 187, 0.2);
  border-radius: .8rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: .8rem .8rem .4rem .8rem;
  overflow: hidden;
}

.info-time {
  font-weight: 550;
  font-size: .8rem;
  line-height: 1rem;
}


.info-section {
  overflow: hidden;
  height: 2.5rem;
  border-radius: .5rem;
}

.info-section span {
  display: block;
  float: left;
  height: 100%;
}

.info-section .position {

}

.info-explain-label {
  text-align: center;
  font-size: .5rem;
}

.info-explain-label span {
  margin-right: 8px;
}


.info-explain-label svg {
  margin-right: .5rem;
}


.info-switch-open {
  text-align: center;
  font-size: .6rem;
  font-weight: 600;
}

.sleep-body-item {
  display: flex;
  font-size: .7rem;
}

.sleep-body-item span {
  flex: none;
  height: 1rem;
  line-height: 1rem;
  color: #FFFFFF;
  margin-top: .8rem;
}

.sleep-body-item .sleep-body-title {
  flex: auto;
  text-indent: .5rem;
}


/*睡眠模式样式*/

.sleep {
  background: rgba(52, 50, 67, 1);
}

.sleep .info {
  background: #3C3C56;
  box-shadow: 0px 0px 1rem rgba(28, 28, 39, 0.2);
}

.sleep .info-title {
  color: #FFFFFF;
}

.sleep .info-data-lattice {
  background-color: rgba(52, 50, 67, 1);
}


.sleep .info-data-lattice p {
  width: 50%;
  flex: none;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-top: 1px solid rgba(121, 117, 138, 1);
  padding: .6rem 0;
}

.sleep .info-subTitle > p > span:last-child {
  color: rgba(255, 255, 255, .85);
}


.sleep .info-data-lattice p:nth-last-child(-n+2) {
  padding-bottom: 0;
}


.sleep .info-data-lattice p:nth-child(-n+2) {
  border-top: 0px solid rgba(121, 117, 138, 1);
  padding-top: 0;
}

.sleep .info-data-lattice p:nth-child(odd) {
  border-right: 1px solid rgba(121, 117, 138, 1);
}

.sleep .info-data-list p {
  border-bottom: 1px solid rgba(121, 117, 138, 1);
  color: #FFFFFF;
}


.sleep .info-explain-label {
  color: #FFFFFF;
}


.sleep .info-data-lattice p span:last-child {
  color: rgba(255, 255, 255, 0.85);
}

.motion .info-summary-title {
  background: rgba(255, 221, 221, 1);
  border-bottom: 0.25rem solid rgba(250, 62, 62, 1);
}

.sleep .info-summary-title {
  background: rgba(187, 240, 227, 1);
  border-bottom: 0.25rem solid rgba(22, 192, 150, 1);
}

.sleep .info-summary .info-summary-content {
  background: rgba(52, 50, 66, 1);
  color: rgba(255, 255, 255, .85);
  border: rgba(52, 50, 66, 1);
}


.info-title {
  flex-direction: row;
}

.info-title .underline {
  order: -1;
  height: .8rem;
  width: .15rem;
  margin-top: 0;
  margin-right: .5rem;
  background-color: #4169DC !important;
}

.shenembaogao {
  color: #20222F;
  font-size: 17px;
  font-style: normal;
  font-weight: bold;
  line-height: 20px; /* 117.647% */
  letter-spacing: -0.24px;
}


</style>
