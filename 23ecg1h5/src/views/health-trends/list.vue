<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item title="心律失常" name="1">
      
      </el-collapse-item>
      <el-collapse-item title="心脏负荷" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="血压" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="BMI" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
        let type = 0;
        // /health-trends/:type/:id
        switch (val) {
          case '1':
            type = 0;
            this.$router.push({path: `/health-trends/${type}/8bc1dfab869843d985b6dc34e0ar437d`});
            break;
          case '2':
            type = 1;
            this.$router.push({path: `/health-trends/${type}/8bc1dfab869843d985b6dc34e0ar437d`});
            break;
          case '3':
            type = 2;
            this.$router.push({path: `/health-trends/${type}/8bc1dfab869843d985b6dc34e0ar437d`});
            break;
          case '4':
            type = 3;
            this.$router.push({path: `/health-trends/${type}/9cc2dfab869843d985b6dc34e0ae437d`});
            break;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-collapse-item {
    margin: 10px 0;
    text-indent: 1rem;
    height: 48px;
    overflow: hidden;
  }
</style>
