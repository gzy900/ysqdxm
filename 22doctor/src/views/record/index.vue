<!--
info:用户管理
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="160">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人" width="160">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.type | reType(that) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          {{ new Date(scope.row.datetime) | parseTime }}
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { getRecordList } from '@/api/record-index'
import { getList } from '@/api/record-type'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    reType(type, that) {
      let content = ''
      for (let i = 0; i < that.typeList.length; i++) {
        if (that.typeList[i].type === type) {
          content = that.typeList[i].content
        }
      }
      return content
    }
  },
  data() {
    return {
      that: this,
      dataList: [],
      typeList: [],
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10
      },
      pageTotal: 0
    }
  },

  computed: {
  },
  created() {
    this.getTypeList()
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getRecordList(this.listQuery)
      this.dataList = les.data.result
      this.pageTotal = les.data.totalRecord
    },

    // 查询
    async getTypeList() {
      const les = await getList({ pageNo: 1, pageSize: 100 })
      this.typeList = les.data.result
      this.pageTotal = les.data.totalRecord
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
  .el-tag-div{
    padding: 10px 0;
    margin-left: 120px;
  }

</style>

