<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="from-search">
          <p class="from-search-button">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </p>
          <el-row class="from-search-content" type="flex" justify="end" :gutter="10">
            <el-col :span="5">
              <el-select v-model="url">
                <el-option
                  v-for="item in urlOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in stateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === '1'" type="" size="small" @click="handleSeeReport(scope)">查看PDF报告</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户昵称" width="140">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户手机号" width="140">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户性别" width="140">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="测量时间">
        <template slot-scope="scope">
          {{ scope.row.beginTime + '---' + scope.row.endTime }}
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
import { getList } from '@/api/ECG-data'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  components: { Pagination },
  filters: {
    stateNameFilter(status) {
      const statusMap = {
        '1': '已判读',
        '0': '未判度'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        '1': '',
        '0': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dataList: [],
      urlList: [
        '/app/ecg/getShortDataWeb',
        '/app/ecg/getLongDataWeb'
      ],
      url: 0,
      urlOption: [
        {
          label: '五分钟数据',
          value: 0
        },
        {
          label: '24小时数据',
          value: 1
        }
      ],
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        audit: '',
        os: ''
      },
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      stateOption: [
        {
          label: '已判读',
          value: '1'
        },
        {
          label: '未判度',
          value: '0'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList(this.urlList[this.url], this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    handleSeeReport({ row }) {
      if (row.report_url) {
        window.open(row.report_url)
      } else {
        this.$notify({
          title: '无PDF链接',
          type: 'warning'
        })
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
  .el-tag-div{
    padding: 10px 0;
    margin-left: 120px;
  }

</style>
