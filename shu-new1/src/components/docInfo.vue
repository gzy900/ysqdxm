<script>
import { compile } from 'vue/dist/vue.esm-bundler'

export default {
  name: 'docInfo',
  props: ['info'],
  setup(props) {
    return compile(props.info)
  }
}
</script>

<style scoped>

</style>