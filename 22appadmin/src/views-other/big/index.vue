<template>
  <div class="app-container big">
    <el-row>
      <el-col :span="24">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          action=""
          :file-list="fileList"
          :auto-upload="false"
          :on-change="handleChangeExcl"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            将文件拖动到此处 或者 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              请上传 excl 文件
            </div>
          </template>
        </el-upload>
      </el-col>
      <el-col :span="24">
        <div class="form-search">
          <!--          <el-input-->
          <!--            clearable-->
          <!--            v-model="listQuery.pd_type"-->
          <!--            placeholder="id">-->
          <!--          </el-input>-->
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="display:none;width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="医生姓名" width="120">
        <template slot-scope="scope">
          {{ scope.row.zhuzhi_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式" width="160">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属机构" width="120">
        <template slot-scope="scope">
          {{ scope.row.hospital }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入驻时间" width="140">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="二维码code">
        <template slot-scope="scope">
          {{ scope.row.bd_code }}
        </template>
      </el-table-column>

    </el-table>

    <!--    <pagination-->
    <!--      v-show="pageTotal > 0"-->
    <!--      :total="pageTotal"-->
    <!--      :page.sync="listQuery.pageNo"-->
    <!--      :limit.sync="listQuery.number"-->
    <!--      @pagination="getList" />-->
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { addData } from '@/api/other/big'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import XLSX from 'xlsx'

export default {
  name: 'ClothesUser',
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
  data() {
    return {
      dataList: null,
      fileList: [],

      /**
       * 分页参数
       */
      listQuery: {
        pageNo: 1,
        number: 10
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getList()
  },
  methods: {

    /**
     * 文件改变时的钩子
     */
    handleChangeExcl(file, files) {
      this.fileList = files.slice(-1)
      this.readFile(this.fileList[0])
    },

    readFile(file) {
      console.log(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetNames = workbook.SheetNames
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
        console.log(json)
        this.handleConfirm(json)
      }
      reader.readAsBinaryString(file.raw)
    },

    //
    // async getList() {
    //   const res = await getList(this.listQuery)
    //   this.dataList = res.data
    //   this.pageTotal = res.data.count
    // },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageNo = 1
      this.getList()
    },

    /**
     * 提交
     */
    handleConfirm(json) {
      return new Promise((resolve, reject) => {
        addData({ content: JSON.stringify(json) }).then(res => {
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.big .el-upload {
  width: 100%;
}

.big .el-upload-dragger {
  width: 100%;
}
</style>
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
