<template functional>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path: '/user/task', query: { method: 'data_warn' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              <span style="color: #FF0000">{{ '今日血压超限的患者' }}</span>
            </div>
            <span style="font-size: 30px; color: #FF0000">{{ props.count.data_warn || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path: '/user/task', query: { method:'change_plan' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              需要更换服药方案的患者
            </div>
            <span style="font-size: 30px">{{ props.count.change_plan || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path:'/user/task', query: { method:'not_measure' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="dashboard" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              测量不足的患者
            </div>
            <span style="font-size: 30px">{{ props.count.not_measure || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path:'/user/task', query: { method:'two_weeks' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="tree" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              两周随访的患者
            </div>
            <span style="font-size: 30px">{{ props.count.two_weeks || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path:'/user/task', query: { method:'three_month' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="tree" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              三个月随访的患者
            </div>
            <span style="font-size: 30px">{{ props.count.three_month || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path:'/user/task', query: { method:'six_month' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="tree" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              六个月随访的患者
            </div>
            <span style="font-size: 30px">{{ props.count.six_month || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link tag="div" class="card-panel" to="/user/patient/add">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              添加患者
            </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link tag="div" class="card-panel" to="/data/report">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="link" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              数据查询
            </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link tag="div" class="card-panel" to="/user/recruit">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              患者招募
            </div>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
        <router-link :to="{ path: '/express/patient', query: { method:'change_plan' }}" class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              需要加/换药物患者
            </div>
            <span style="font-size: 30px">{{ props.count.needer || 0 }}</span>
          </div>
        </router-link>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col average">
        <el-table v-if="props.average.length" :data="props.average" class="compared-table">
          <el-table-column prop="group" label="组别" />
          <el-table-column prop="systolic" label="收缩压" />
          <el-table-column prop="diastolic" label="舒张压" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: flex-start;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 10px;
      padding: 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      text-align: center;
      margin: 26px 0 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: block;
  }

  .card-panel-icon {
    font-size: 24px;
  }

  .card-panel-icon-wrapper {
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
