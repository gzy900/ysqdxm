<template>
  <el-page-header :content="content" style="padding: 20px 0 20px 30px" @back="goBack" />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '页面'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

