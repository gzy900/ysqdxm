<!-- tabSelectBox.vue Created by xh on 2018-3-12  -->
<template>
  <div>
    <div v-if="options.active" class="tab-select-box">
      <div class="mask" />
      <div class="tab-select">
        <div v-for="v of options.opts" :key="Object.entries(v)[0][0]" class="tab-option" @click="selectHandle(v)">{{ Object.entries(v)[0][1] }}</div>
        <div class="tab-option cancel-btn" @click="selectHandle">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['options'],
  methods: {
    selectHandle(opt) {
      let k, v
      if (!(opt instanceof Event)) {
        [[k, v]] = Object.entries(opt)
      }
      this.$emit('select', k, v)
    }
  }
}
</script>

<style lang="less" scoped>
    .tab-select-box{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 4;
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background-color: #000;
            opacity: .5;
            z-index: 2;
        }
        .tab-select{
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            margin: 0 20px 60px;
            background-color: #fff;
            border-radius: 25px;
            z-index: 3;
            .tab-option{
                font-size: 32px;
                text-align: center;
                line-height: 114px;
                border-bottom: 1px solid #ededed; /*no*/
                &.cancel-btn{
                    border-bottom: 0 none;
                    border-top: 10px solid #ededed;
                }
            }
        }
    }
</style>
