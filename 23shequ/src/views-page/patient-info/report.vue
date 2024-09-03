<template>
  <div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      ref="table"
    >

      <el-table-column
        label="操作"
        width="100"
      >
        <template slot-scope="scope">

          <el-button @click="handleOpenDelete(scope)" type="warning">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="id"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column
        label="报告"
      >
        <template slot-scope="scope">

          <el-button v-for="(url,index) in scope.row.url.split(';')" type="text" @click="handleOpenUrl(url)">
            {{ '文件' + (index + 1) }}
          </el-button>
          <!--          {{ scope.row.url }}-->
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="280"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime * 1000 | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, delData } from '@/api/report'
import { delSurgery } from "@/api/surgery";

export default {
  name: 'Report',
  props: {
    patientId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataList: [],
      listQuery: {
        pageNum: 1,
        pageCount: 10,
        patientId: '',
        orgId: null
      },
    }
  },
  mounted() {
    this.listQuery.patientId = this.patientId
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.records
    },
    handleOpenUrl(url) {
      window.open(url)
    },
    handleOpenDelete({ row }) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delData({ id: row.id })
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败，请联系管理员！'
          })
          this.getList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
