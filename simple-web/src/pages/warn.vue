<template>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.showWarn()
  },
  methods: {
    showWarn() {
      alert('您还未绑定设备，请联系医院医生进行设备绑定')
    }
  }

}

</script>
