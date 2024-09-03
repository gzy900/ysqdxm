<template>
  <div class="visit-list">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="page-header">
        <div class="search">
          <el-row :gutter="20">
            <!--            <el-col :span="8">-->
            <!--              <div class="search-item">-->
            <!--                <p class="search-item-title">随访类别：</p>-->
            <!--                <p class="search-item-input">-->
            <!--                  <el-select v-model="listQuery.type" placeholder="请选择类别">-->
            <!--                    <el-option label="常规随访" value="0"></el-option>-->
            <!--                    <el-option label="日常随访" value="1"></el-option>-->
            <!--                    <el-option label="手术随访" value="2"></el-option>-->
            <!--                  </el-select>-->
            <!--                </p>-->
            <!--              </div>-->
            <!--            </el-col>-->
            <el-col :span="8">
              <div class="search-item">
                <p class="search-item-title">随访状态：</p>
                <p class="search-item-input">
                  <el-select v-model="listQuery.statusList" placeholder="请选择状态" clearable>
                    <el-option label="未开始" value="-1,0"></el-option>
                    <el-option label="未随访" value="0"></el-option>
                    <el-option label="随访中" value="2"></el-option>
                    <el-option label="已随访" value="1"></el-option>
                    <el-option label="已过期" value="-2,0"></el-option>
                  </el-select>
                </p>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="search-item">
                <p class="search-item-title">被随访人：</p>
                <p class="search-item-input">
                  <el-input v-model="listQuery.patientName" placeholder="被随访人姓名"></el-input>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="search-item">
                <p class="search-item-title">随访医生：</p>
                <p class="search-item-input">
                  <el-input v-model="listQuery.doctorName" placeholder="随访医生"></el-input>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="search-item">
                <!--              <p class="search-item-title">操作：</p>-->
                <p class="search-item-input">
                  <el-button type="primary" @click="handleSearch" class="pan-btn blue-btn"><i class="el-icon-search"/>
                    查询
                  </el-button>
                  <!--                  <el-button type="info" class="pan-btn ash-btn"><i class="el-icon-refresh-right"/> 还原</el-button>-->
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-card class="page-content">
        <div class="page-content-btn">
          <p>
            <!--          <svg-icon icon-class="excel" />-->
            <!--          <svg-icon icon-class="pdf" />-->

            <!--            <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="component" v-if="userDataView"/>-->
            <!--            <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="list" v-else/>-->
          </p>
          <p>

            <el-button type="info" class="pan-btn ash-btn" @click="handleDownload">
              <svg-icon icon-class="excel"/>
              导出Excel
            </el-button>
            <el-button
              type="info"
              class="pan-btn ash-btn"
              @click="handleDownloadALL"
              v-loading.fullscreen.lock="downLoadLoading">
              <svg-icon icon-class="excel"/>
              导出Excel(全部)
            </el-button>

            <!--            <el-button type="info" class="pan-btn ash-btn">-->
            <!--              <svg-icon icon-class="pdf"/>-->
            <!--              导出PDF-->
            <!--            </el-button>-->
            <el-button
              v-if="form==='small'"
              @click="handleAdd({patientId,patientName})"
              type="primary"
              class="pan-btn blue-btn"
            >
              <i class="el-icon-plus"/>
              新增主动随访
            </el-button>
          </p>
        </div>

        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >

          <!--          <el-table-column type="expand">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-form label-position="left" inline class="table-expand">-->
          <!--                <el-form-item label="姓名">-->
          <!--                  <span>{{ scope.row.name }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="随访类别">-->
          <!--                  <el-tag :type="scope.row.type| typeFilterType">-->
          <!--                    {{ scope.row.type | typeFilterValue }}-->
          <!--                  </el-tag>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="随访状态">-->
          <!--                  <el-tag :type="scope.row.status| statusFilterType">-->
          <!--                    {{ scope.row.status | statusFilterValue }}-->
          <!--                  </el-tag>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="随访人">-->
          <!--                  <span>{{ scope.row.shop }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="ID">-->
          <!--                  <span>{{ scope.row.id }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="患者ID">-->
          <!--                  <span>{{ scope.row.shopId }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="分类">-->
          <!--                  <span>{{ scope.row.category }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="地址">-->
          <!--                  <span>{{ scope.row.address }}</span>-->
          <!--                </el-form-item>-->
          <!--                <el-form-item label="描述">-->
          <!--                  <span>{{ scope.row.desc }}</span>-->
          <!--                </el-form-item>-->
          <!--              </el-form>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            label="操作"
            width="220"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.frozenStatus ===0">
                <el-button type="primary" @click="handleEdit(scope.row,true)">编辑</el-button>
                <el-button v-if="form==='big'" @click="handleAdd(scope.row)" type="">
                  新增主动随访
                </el-button>
              </template>
              <template v-else>
                <el-button @click="handleEdit(scope.row,false)">查看</el-button>
              </template>
            </template>
          </el-table-column>

          <el-table-column
            label="ID"
            prop="id"
            width="80"
          >
          </el-table-column>

          <el-table-column
            label="随访状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status| statusFilterType(scope.row.startTime,scope.row.frozenStatus)">
                {{ scope.row.status | statusFilterValue(scope.row.startTime,scope.row.frozenStatus) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="随访类别"
            width="250"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.planType| typeFilterType">
                {{ scope.row.planType | typeFilterValue }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="随访时间"
          >
            <template slot-scope="scope">
              {{ scope.row.startTime | parseTime('{y}-{m}-{d}') }}
            </template>
          </el-table-column>

          <el-table-column
            label="被随访人姓名"
            prop="patientName"
          ></el-table-column>

          <el-table-column
            label="随访医生"
            prop="doctorName"
          ></el-table-column>

          <el-table-column
            label="描述"
            prop="desc"
          ></el-table-column>
        </el-table>
      </el-card>
      <pagination
        style="margin-top: 15px"
        ref="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageCount"
        @pagination="getList"
      />
    </el-scrollbar>
    <div class="visit-info" :class=" form==='big'?'big':'small'" v-if="editType">
      <div class="mask" @click="editType = false"></div>
      <div class="visit-info-body">
        <visit-info
          :row="row"
          :editInfoType="editInfoType"
          :visit-type="visitType"
          :is-edit="isEdit"
          :edit-type.sync="editType"
          @handleRefresh="getList"
        ></visit-info>
      </div>
    </div>
  </div>
</template>

<script>
import VisitInfo from '@/component/Visit/info'
import Pagination from '@/components/Pagination'
import {getList} from '@/api/visit'
import {deepClone, parseTime} from '@/utils'

export default {
  name: 'VisitList',
  components: {Pagination, VisitInfo},
  filters: {
    typeFilterType(type) {
      let key = type
      if (type !== 'p' && type !== 'i') {
        key = '2'
      }
      const typeMap = {
        'p': 'primary',
        'i': 'success',
        '2': 'danger'
      }
      return typeMap[key]
    },
    typeFilterValue(type) {
      // p：周期性随访，i:主动性随访，手术类型：0-冷冻消融;1-射频消融;2-左心耳封堵;3-永久起搏器植入术;4-房室结消融
      let key = type

      const typeMap = {
        'p': '周期随访',
        'i': '主动随访',
        '0': '冷冻消融',
        '1': '射频消融',
        '2': '左心耳封堵',
        '3': '永久起搏器植入术',
        '4': '房室结消融'
      }
      if (type.indexOf(',') > -1) {
        key = []
        type.split(',').forEach((item) => {
          key.push(typeMap[item])
        })
        return key.join('+')
      } else {
        return typeMap[key]
      }
    },
    statusFilterType(status, time, frozenStatus) {

      const date = new Date().getTime()
      if (parseInt(status) === 0 && time - date > 1000 * 60 * 60 * 24 * 15) {
        status = 3
      }
      if (parseInt(status) === 0 && date - time > 1000 * 60 * 60 * 24 * 15) {
        status = 4
      }
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'primary',
        3: '',
        4: 'danger',
        5: 'info'
      }
      if (frozenStatus === 1) {
        status = 5
      }
      return statusMap[status]
    },
    statusFilterValue(status, time, frozenStatus) {
      const date = new Date().getTime()
      if (parseInt(status) === 0 && time - date > 1000 * 60 * 60 * 24 * 15) {
        status = 3
      }
      if (parseInt(status) === 0 && date - time > 1000 * 60 * 60 * 24 * 15) {
        status = 4
      }
      const statusMap = {
        0: '未随访',
        1: '已随访',
        2: '随访中',
        3: '未开始',
        4: '已过期',
        5: '账户已冻结'
      }
      if (frozenStatus === 1) {
        status = 5
      }
      return statusMap[status]
    }
  },
  props: {
    form: {
      type: String,
      default: 'big' // big || small
    },
    patientId: {
      type: String,
      default: ''
    },
    patientName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      downLoadLoading: false,
      total: 1,
      isEdit: true,
      listQuery: {
        pageNum: 1,
        pageCount: 10,
        pushOrNot: 0,
        doctorId: '',
        doctorName: '',
        startTime: '',
        patientId: '',
        endTime: '',
        patientName: '',
        statusList: ''
      },
      row: {},
      visitType: null,
      editType: false,
      editInfoType: 'edit',
      userDataView: false,
      tableDataLoad: [],
      tableData: []
    }
  },
  mounted() {

    if (this.$route.query.statusList && this.$route.query.statusList.length > 0) {
      this.listQuery.statusList = this.$route.query.statusList
      this.listQuery.startTime = this.$route.query.startTime
      this.listQuery.endTime = this.$route.query.endTime
    }

    if (this.patientId.length > 0) {
      this.listQuery.patientId = this.patientId
    }
    this.tableData = this.tableDataLoad
    this.getList()
  },
  methods: {
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = data.data.records
      this.total = data.data.total
    },
    handleAdd(row) {
      this.row = deepClone(row)
      this.row.context = ''
      this.row.doctorId = '0'
      this.row.doctorName = ''
      this.row.remark = '无'
      this.visitType = 'i'
      console.log(this.row)
      // context: '',
      // doctorId: '',
      // doctorName: '',
      // patientId: '',
      // patientName: '',
      // planType: '',
      // status: '',
      // remark: '',
      // timeArrayList: []
      this.editInfoType = 'add'
      this.editType = true
    },
    handleEdit(row, edit) {
      this.isEdit = edit
      this.visitType = row.planType
      this.editInfoType = 'edit'
      this.row = deepClone(row)
      this.editType = true
    },
    toggleUserDataView() {

    },
    handleAddUser() {

    },
    handleSearch() {
      this.listQuery.pageNum = 1
      if (this.listQuery.statusList.indexOf('-1') > -1) {
        this.listQuery.startTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 15
        this.listQuery.endTime = new Date('2099-01-01').getTime()
      }
      if (this.listQuery.statusList.indexOf('-2') > -1) {
        this.listQuery.startTime = new Date('1999-01-01').getTime()
        this.listQuery.endTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 15
      }
      if (this.listQuery.statusList === '0') {
        this.listQuery.startTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 15
        this.listQuery.endTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 15
      }
      this.getList()
    },
    async handleDownloadALL() {
      this.downLoadLoading = true
      const data = await getList({
        pageNum: 1,
        pageCount: 1000 * 1000 * 100,
        pushOrNot: 0,
        doctorId: '',
        doctorName: '',
        startTime: '',
        patientId: '',
        endTime: '',
        patientName: '',
        statusList: ''
      })
      const table = data.data.records
      this.handleDownload(table)
      this.downLoadLoading = false
    },

    handleDownload(table) {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '随访状态', '随访类别', '随访时间', '被随访人姓名', '随访医生', '备注']
        const filterVal = ['id', 'status', 'planType', 'startTime', 'patientName', 'doctorName', 'remark']
        let list = []
        if (Object.prototype.toString.call(table) === '[object Array]') {
          list = table
        } else {
          list = this.tableData
        }
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      const statusMap = {
        '0': '未随访',
        '1': '已随访',
        '2': '随访中'
      }
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'startTime') {
          return parseTime(v[j])
        }
        if (j === 'planType') {
          const type = v[j]
          let key = type
          const typeMap = {
            'p': '周期随访',
            'i': '主动随访',
            '0': '冷冻消融',
            '1': '射频消融',
            '2': '左心耳封堵',
            '3': '永久起搏器植入术',
            '4': '房室结消融'
          }
          if (type.indexOf(',') > -1) {
            key = []
            type.split(',').forEach((item) => {
              key.push(typeMap[item])
            })
            return key.join('+')
          } else {
            return typeMap[key]
          }
        }
        if (j === 'status') {
          return statusMap[v[j]]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.visit-list {
  height: 100%;
  overflow: hidden;
}

.visit-list {
  .big {
    position: fixed;
    top: 0;
    left: 0;

    .visit-info-body {
      width: 72%;
      height: 90%;
      left: 14%;
      top: 5vh;
    }
  }

  .small {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .visit-info-body {
      width: 100%;
      height: 100%;
    }
  }
}

.visit-info {
  width: 100%;
  height: 100%;
  z-index: 1800;
}

.visit-info-body {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #ffffff;
}

.table-expand {
  font-size: 0;
  padding: 0 20px 0 60px;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
