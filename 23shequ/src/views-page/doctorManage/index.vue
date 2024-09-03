<template>
  <div>
    <div class="page-header">
      <div class="search">
        <!--        <el-row :gutter="20">-->
        <!--          <el-col :span="8">-->
        <!--            <div class="search-item">-->
        <!--              <p class="search-item-title">综合查询：</p>-->
        <!--              <p class="search-item-input">-->
        <!--                <el-input size="small" :label="'综合查询'" v-model="listQuery.info" placeholder="机构名称/地区"></el-input>-->
        <!--              </p>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--          <el-col :span="8">-->
        <!--            <div class="search-item">-->
        <!--              <p class="search-item-title">机构状态：</p>-->
        <!--              <p class="search-item-input">-->
        <!--                <el-input :label="'基础信息'" v-model="listQuery.info" placeholder="药物名称"></el-input>-->
        <!--              </p>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--          <el-col :span="8">-->
        <!--            <div class="search-item">-->
        <!--              &lt;!&ndash;              <p class="search-item-title">操作：</p>&ndash;&gt;-->
        <!--              <p class="search-item-input">-->
        <!--                <el-button type="primary" class="pan-btn blue-btn"><i class="el-icon-search"/> 查询</el-button>-->
        <!--                <el-button type="info" class="pan-btn ash-btn"><i class="el-icon-refresh-right"/> 还原</el-button>-->
        <!--              </p>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
      </div>
    </div>

    <el-card class="page-content" :class="userDataView||'dark'">
      <div class="page-content-btn">
        <p>
          <!--          <svg-icon icon-class="excel" />-->
          <!--          <svg-icon icon-class="pdf" />-->

          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="component" v-if="userDataView"/>
          <svg-icon class="toggleView" @click="toggleUserDataView" icon-class="list" v-else/>
        </p>
        <p>

          <template v-if="userDataView">
            <!--            <el-button type="info" class="pan-btn ash-btn" @click="handleDownload">-->
            <!--              <svg-icon icon-class="excel"/>-->
            <!--              导出Excel-->
            <!--            </el-button>-->
            <!--          <el-button type="info" class="pan-btn ash-btn" @click="handleDownloadPDF('table')">-->
            <!--            <svg-icon icon-class="pdf"/>-->
            <!--            导出PDF-->
            <!--          </el-button>-->
            <el-button @click="handleAddUser" type="primary" class="pan-btn blue-btn">
              <i class="el-icon-plus"/>
              新增医生
            </el-button>
          </template>
          <!--          <el-button v-else type="info" class="pan-btn ash-btn" @click="handleDownloadChart">-->
          <!--            <svg-icon icon-class="excel"/>-->
          <!--            导出图表-->
          <!--          </el-button>-->
        </p>
      </div>
      <el-table
        v-if="userDataView"
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="handleInfo(scope.row)" type="">详情</el-button>
<!--            <el-button v-if="scope.row.status===1" @click="handleUpStatus(scope.row,0)" type="danger">冻结</el-button>-->
<!--            <el-button v-if="scope.row.status===0" @click="handleUpStatus(scope.row,1)" type="warning">解冻</el-button>-->
          </template>
        </el-table-column>

        <!--        cellphone: "13211111111"-->
        <!--        createTime: 0-->
        <!--        doctorId: "0"-->
        <!--        doctorName: "admin"-->
        <!--        id: 1-->
        <!--        orgId: 0-->
        <el-table-column
          prop="province"
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status| statusFilterType">
              {{ scope.row.status | statusFilterTitle }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="doctorName"
          label="医生名称"
        >
        </el-table-column>

        <el-table-column
          prop="doctorId"
          label="医生ID"
        >
        </el-table-column>

        <el-table-column
          prop="province"
          label="所属机构"
        >
          <template slot-scope="scope">
            {{ scope.row.orgId | orgFilterName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="cellphone"
          label="联系方式"
          width="160"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120"
        >
        </el-table-column>
      </el-table>

      <el-row v-else :gutter="20" class="table-list" style="height: 600px">
        <chart ref="child" height="100%" width="100%"/>
      </el-row>
    </el-card>

    <sticky :z-index="10" className="pagination-sticky" style="margin-top: 15px;">
      <pagination
        ref="pagination"
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNum"
        :limit.sync="listQuery.pageCount"
        @pagination="getList"
      />
    </sticky>

    <el-dialog
      :title="userInfoDialogType==='add'?'新增机构':'机构详情'"
      :visible.sync="userInfoDialogVisible"
      width="72%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="180px">
        <!--        cellphone: "13211111111"-->
        <!--        createTime: 0-->
        <!--        doctorId: "0"-->
        <!--        doctorName: "admin"-->
        <!--        id: 1-->
        <!--        orgId: 0-->
        <!--        passwd: null-->
        <!--        permission: ""-->
        <!--        status: 1-->
        <!--        updateTime: 0-->
        <el-form-item label="医生ID">
          <el-col :span="8">
            <el-input v-model="form.doctorId" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="医生名称">
          <el-col :span="8">
            <el-input v-model="form.doctorName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="医生电话">
          <el-col :span="8">
            <el-input v-model="form.cellphone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-col :span="8">
            <el-input v-model="form.passwd"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-col :span="8">
            <el-select v-model="form.orgId" placeholder="请选择上级机构">
              <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="状态">
          <el-col :span="8">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="冻结" :value="0"></el-option>
              <!--              <el-option v-for="item in tableData" :key="item.id" :label="item.orgName" :value="item.id"></el-option>-->
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="权限">
          <el-col :span="24">
            <el-tree
              ref="tree"
              :props="defaultProps"
              :data="data"
              node-key="id"
              :check-strictly="checkStrictly"
              :default-expand-all="true"
              show-checkbox
              @check-change="handleCheckChange"
            >
            </el-tree>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import Chart from '@/components/Charts/MixChart'
import { getList, addData, upData } from '@/api/doctorManage'
import { getList as getOrg } from '@/api/org'

let orgList = []

// <!--        cellphone: "13211111111"-->
// <!--        createTime: 0-->
// <!--        doctorId: "0"-->
// <!--        doctorName: "admin"-->
// <!--        id: 1-->
// <!--        orgId: 0-->
// <!--        passwd: null-->
// <!--        permission: ""-->
// <!--        status: 1-->
// <!--        updateTime: 0-->
export default {
  name: 'PatientInfo',
  components: { Pagination, Sticky, Chart },
  filters: {
    orgFilterName(id) {
      id = parseInt(id)
      const row = orgList.find((item) => {
        return item.id === id
      }) || {
        orgName: '无'
      }
      return row.orgName
    },
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '冻结',
        '1': '正常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 10,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkStrictly: false,
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }
      ],
      form: {
        id: '',
        doctorId: '',
        orgId: '',
        doctorName: '',
        cellphone: '',
        status: 1,
        passwd: '',
        permission: '',

        updateTime: 0,
        createTime: ''
      },
      listQuery: {
        pageCount: 50,
        pageNum: 1,
        parentOrgId: '',
        status: '2',
        filter: ''
      },
      tableData: [],
      orgList: []
    }
  },
  created() {
  },
  mounted() {
    const role = JSON.parse(sessionStorage.getItem('routes'))
    this.data = []
    role.forEach((item) => {
      if (item.component === 'Layout') {
        let isMe = -1
        this.data.forEach((m_item, index) => {
          if (m_item.id === item.id) {
            isMe = index
          }
        })
        if (isMe >= 0) {
          this.data[isMe].id = item.id
          this.data[isMe].permissionId = item.permissionId
          this.data[isMe].label = item.remark
        } else {
          this.data.push({
            id: item.id,
            permissionId: item.permissionId,
            label: item.remark,
            children: []
          })
        }

      } else {
        let isFather = -1
        this.data.forEach((d_item, index) => {
          if (d_item.permissionId === item.parentPermissionId) {
            isFather = index
          }
        })

        if (isFather < 0) {
          isFather = this.data.push({
            id: '',
            permissionId: item.parentPermissionId,
            label: '',
            children: []
          }) - 1
        }

        this.data[isFather].children.push(
          {
            id: item.id,
            permissionId: item.permissionId,
            label: item.remark,
            children: []
          }
        )
      }
    })
    console.log(role)
    this.getOrg()
  },
  methods: {
    handleCheckChange(data, self_check, children_check) {
      // console.log(data)
      // console.log(self_check)
      // console.log(children_check)
      // if (self_check || children_check) {
      //   this.permission.push(data.id)
      // } else {
      //   this.permission.forEach((item, index) => {
      //     if (item === data.id) {
      //       this.permission.splice(index, 1)
      //     }
      //   })
      // }
      const check = this.$refs['tree'].getCheckedNodes(false, true)
      const list = []
      check.forEach((item) => {
        list.push(item.id)
      })
      this.form.permission = list.join(',')
    },
    handleInfo(row) {
      this.checkStrictly = true
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'edit'
      this.form = deepClone(row)
      console.log(this.form.permission.split(','))
      this.$nextTick(() => {
        this.$refs['tree'].setCheckedKeys(this.form.permission.split(','))
        this.checkStrictly = false
      })
      delete this.form.updateTime
      delete this.form.createTime
    },
    handleAddUser() {
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },

    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    async getOrg() {
      const data = await getOrg(
        {
          pageCount: 50,
          pageNum: 1,
          parentOrgId: '',
          status: '2',
          filter: ''
        }
      )
      this.orgList = deepClone(data.data.records)
      if (orgList.length <= 0) {
        orgList = deepClone(data.data.records)
        orgList.unshift({
          id: 0,
          orgName: '无'
        })
      }
      this.getList()
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
    },
    async handleUpStatus(row, status) {
      row.status = status
      delete row.updateTime
      delete row.createTime
      await upData(row)
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.userInfoDialogType === 'add') {
            delete this.form.updateTime
            delete this.form.createTime
            delete this.form.id
            delete this.form.doctorId
            return new Promise((resolve, reject) => {
              addData(this.form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              console.log('修改医生')
              console.log(this.form.passwd)
              if (!this.form.passwd || this.form.passwd.length <= 0) {
                delete this.form.passwd
              }
              upData(this.form).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }
        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
        }
      })
    },
    handleDownloadPDF(ref) {
      localStorage.setItem('PDF_info', JSON.stringify({ title: '患者列表', content: this.$refs[ref].$el.innerHTML }))
      const routeData = this.$router.resolve({ path: '/pdf/download' })
      window.open(routeData.href, '_blank')
    },
    handleDownloadChart() {
      this.$refs.child.exportChart()
    },
    handleDownload() {
      this.downloadLoading = true
      // date: '2016-05-02',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['name', 'province', 'city', 'address', 'zip', 'date']
        const filterVal = ['name', 'province', 'city', 'address', 'zip', 'date']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped lang="scss">
.dark {
  background-color: #344b58;

  .toggleView {
    color: #ffffff;
  }
}

.table-list-item-info-btn {
  color: #1890ff;
  cursor: pointer;
}

.table-list-item-info-btn:hover {
  text-decoration: underline;

}

.table-list {
  margin-top: -10px;
  margin-bottom: -10px;
}

.table-list-item {
  height: 168px;
  margin: 10px 0;
}

</style>
