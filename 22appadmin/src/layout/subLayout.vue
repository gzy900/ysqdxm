<template>
  <div class="subLayout">
    <el-alert :closable="false">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'SubLayout'
}
</script>

<style scoped>

</style>
