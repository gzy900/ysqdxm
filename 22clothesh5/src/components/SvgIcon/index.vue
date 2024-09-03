// 注册自定义图标
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  iconClass: { // 图标名称与assets/icon/svg下使用的文件名一致
    type: String,
    required: true
  },
  className: { // 给图标添加class
    type: String,
    default: ''
  },
  color: { // 设置图标颜色
    type: String,
    default: '#fff'
  }
});

const iconName = computed(() => {
  return `#${props.iconClass}`;
});
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>

<style scope>
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;

}
</style>