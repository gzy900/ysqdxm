<template>
  <div>
    <visit-list :form="'big'" :userInfoDialogType="userInfoDialogType"></visit-list>
  </div>
</template>

<script>
import VisitList from '@/component/Visit/list'

export default {
  name: 'Visit',
  components: { VisitList },
  data() {
    return {
      userInfoDialogType: null
    }
  }
}
</script>

<style scoped>

</style>
