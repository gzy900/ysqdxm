<template>
  <el-popover
    v-if="scope && scope.row"
    placement="right"
    trigger="hover"
    popper-class="custom-visit-popover"
  >
    <div style="text-align: left; margin: 0">
      <el-timeline style="padding: 0 15px;">
        <el-timeline-item
          v-for="(activity, index) in scope.row.ill_template.ill_template_detail"
          :key="activity.id"
          :timestamp="activity.start_time"
        >
          <div>
            <h3 style="margin: 0">第{{ index + 1 }}次随访</h3>
            <p v-if="activity.ill_template_question.length != 0">{{ activity.ill_template_question[0].name }}</p>
            <p v-else-if="activity.ill_template_visit.length != 0">{{ activity.ill_template_visit[0].name }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <router-link slot="reference" :to="`/user/patient/visit/${scope.row.id}`">
      <el-button>查看随访内容</el-button>
    </router-link>
  </el-popover>
</template>

<script>
export default {
  props: {
    scope: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
.custom-visit-popover {
  top: 30 !important;
  max-height: 100vh !important;
  overflow: scroll !important;
}
</style>
