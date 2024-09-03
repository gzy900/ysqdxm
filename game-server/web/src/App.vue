<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
    meta: [
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'}
    ]
  },
}
</script>
<style scoped>
#app {
  /*background-image: url('assets/image/bg.jpg');*/
  /*background-size: auto 100%;*/
  /*background-position: center;*/
}
</style>

