<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div v-if="refresh" class="refresh-list">
      <el-switch
        v-model="refreshList"
        active-text="自动刷新列表（开启后每五分钟自动刷新当前列表）"
      />
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refreshList: false,
      refreshTime: null
    }
  },

  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  mounted() {
    this.refreshTime = setInterval(() => {
      if (this.refreshList) {
        this.$emit('pagination')
      }
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    clearInterval(this.refreshTime)
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    }
  }
}
</script>

<style scoped>
  .refresh-list{
    float: left;
    padding: 2px 10px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-pagination{
    float: left;
  }
.pagination-container {
  background: #fff;
  padding: 5px 16px;
  overflow: hidden;
}
.pagination-container.hidden {
  display: none;
}
</style>
