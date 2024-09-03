<!--
info:私人医生
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="form-search">
          <el-autocomplete
            class="inline-input"
            v-model="listQuery.content"
            clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="110">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="60">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="结论">
        <template slot-scope="scope">
          {{ dataListContent }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="机构" width="210">
        <template slot-scope="scope">
          {{ scope.row.organization_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="160">
        <template slot-scope="scope">
          {{ scope.row.mailBox }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出生日期" width="100">
        <template slot-scope="scope">
          {{ scope.row.birthday }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="280">
        <template slot-scope="scope">
          {{ scope.row.uuid }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"/>

  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getContentUsers as getList } from '@/api/app-user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  filters: {
    stateFilterType(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        3: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '已审核',
        2: '未通过',
        3: '未审核'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      dataList: null,

      dataListContent: '',
      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        content: ''
      },
      pageTotal: 0,
      restaurants: [
        { 'value': 'ST抬高' },
        { 'value': '传导阻滞' },
        { 'value': '室早' },
        { 'value': '房早' },
        { 'value': '房颤' },
        { 'value': '房室阻滞' },
        { 'value': '二度传导阻滞' },
        { 'value': '右束支传导阻滞' },
        { 'value': '心动过缓' },
        { 'value': '室颤' },
        { 'value': '室性心动过速' },
        { 'value': '室速' },
        { 'value': '心动过速' },
        { 'value': 'ST改变' },
        { 'value': '噪音' }
      ]
    }
  },
  computed: {},
  created() {
    // this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      const dataList = res.data.dataList
      this.dataList = []
      dataList.forEach((item) => {
        let jsonItem = JSON.parse(item.usersBase)
        jsonItem.uuid = item.uuid
        this.dataList.push(jsonItem)
      })
      // console.log(this.dataList)
      this.pageTotal = res.data.count
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageNo = 1
      this.dataListContent = this.listQuery.content
      this.getList()
    },

    handleSelect(item) {
      console.log(item)
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
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

</style>
