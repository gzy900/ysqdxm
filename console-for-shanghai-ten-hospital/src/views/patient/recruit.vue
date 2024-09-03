<template>
  <div class="container">
    <div class="table-list">
      <el-card class="card-box" shadow="never">
        <div style="float: left; margin-left: 7px; display: inline; padding-top: 7px">
          <i class="el-icon-search" style="padding-right: 10px" />
          <span>招募列表</span>
        </div>
        <div style="padding-top: 5px; float: right; padding-right: 4px">
          <el-button type="success" @click="onExportRecord">导出全部</el-button>
        </div>
        <el-table :data="patients" stripe style="width: 100%;">
          <el-table-column prop="id" align="center" label="ID" width="80" />
          <el-table-column prop="name" align="center" label="姓名" width="100" />
          <el-table-column prop="sex" align="center" label="性别" width="80">
            <template slot-scope="scope">{{ scope.row.sex | gender }}</template>
          </el-table-column>
          <el-table-column prop="age" align="center" label="年龄" width="80" />
          <el-table-column prop="mobile" align="center" label="手机号" width="110" />
          <el-table-column prop="created" align="center" label="创建时间" width="200">
            <template slot-scope="scope">{{ scope.row.created | formatime }}</template>
          </el-table-column>
          <el-table-column prop="hospital" align="center" label="医院" />
          <el-table-column align="center" prop="status" label="招募状态" width="220">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="200"
                trigger="click"
              >
                <el-form label-position="top" label-width="80px" :model="scope.row">
                  <el-form-item label="招募状态">
                    <el-select v-model="scope.row.status" placeholder="请选择">
                      <el-option
                        v-for="item in [{label: '未联系', value: '0'}, {label: '已通过', value: '1'}, {label: '未通过', value: '2'}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="onSaveChangeRecruitStatus(scope.row)">保存</el-button>
                </div>
                <p slot="reference">{{ scope.row.status | toFriendlyRecruitStatus }} <i class="el-icon-edit" /></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="220">
            <template slot-scope="scope">
              <el-popover
                v-if="scope.row.remark"
                placement="top"
                width="160"
                trigger="hover"
              >
                <p>{{ scope.row.remark }}</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="onShowSetRemarkDialog(scope.row)">编辑</el-button>
                </div>
                <p slot="reference">{{ scope.row.remark && scope.row.remark.slice(0, 12) }}...</p>
              </el-popover>
              <el-button v-else size="mini" type="warning" :disabled="isDoctor" @click="onShowSetRemarkDialog(scope.row)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="sizes, total, prev, pager, next"
          style="text-align: center; margin-top: 20px"
          :total="total"
          :page-size="limit"
          :page-sizes="[5, 10, 20, 50]"
          @current-change="onCurrentPageChange"
          @size-change="onPageSizeChange"
        />
      </el-card>
    </div>

    <!-- Set remark -->
    <el-dialog title="设置备注" :visible.sync="isShowSetRemarkDialog">
      <el-form ref="REMARK" :model="remark" :rules="{ value: [{ required: true, message: '请输入备注信息', trigger: 'blur' }] }">
        <el-form-item label="备注信息" label-width="120" prop="value">
          <el-input v-model="remark.value" type="textarea" :autosize="{ minRows: 4, maxRows: 20}" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowSetRemarkDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSetRemark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  filters: {
    toFriendlyRecruitStatus(value) {
      console.log('🚀 ~ file: recruit.vue ~ line 93 ~ toFriendlyRecruitStatus ~ value', value)
      return ['未联系', '已通过', '未通过'][Number.parseInt(value)]
    }
  },
  data() {
    return {
      patients: [],
      name: '',
      sex: '',
      age: 0,
      mobile: '',
      is_enable: false,
      created: '',
      hospital: '',
      total: 0,
      page: 1,
      limit: 50,
      remark: {
        value: '',
        id: ''
      },
      genders: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
      isShowSetRemarkDialog: false,
    }
  },
  computed: {
    // 变量名称冲突，需要重新命名
    ...mapGetters({ 'cacheHospital': 'hospital' }),
    isDoctor() {
      return this.$store.getters.roles.includes('DOCTOR')
    }
  },
  watch: {
    cacheHospital(value) {
      if (value) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onShowSetRemarkDialog(value) {
      this.isShowSetRemarkDialog = true
      this.is_enable = value.is_enable
      this.name = value.name
      this.sex = value.sex
      this.age = value.age
      this.mobile = value.mobile
      this.is_enable = value.is_enable
      this.created = value.created
      this.hospital = value.hospital
      this.remark = {
        value: value.remark || '',
        id: value.id
      }
    },
    onPageSizeChange(size) {
      console.log(size)
      this.limit = size
      this.getList({ limit: size, page: this.page })
    },
    onCurrentPageChange(page) {
      console.log(page)
      this.page = page
      this.getList({ page: page, limit: this.limit })
    },
    async getList() {
      const params = { page: this.page, pagesize: this.limit, hospital_id: this.cacheHospital.id }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      let result
      try {
        result = await request.get('/pc/admin/v1/patientCollect/', { params })
      } catch (error) {
        loading.close()
        return this.$message.error(error)
      }
      const { data, count } = result.data
      this.patients = data
      this.total = count
      loading.close()
    },
    async onSaveChangeRecruitStatus(value) {
      try {
        await this.$confirm('此操作将保存招募状态到服务器, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }

      try {
        await request.put(`/pc/admin/v1/patientCollect/${value.id}/`, value)
      } catch (error) {
        console.error(error)
        return this.$message.error(error)
      }

      this.$notify.success('保存成功')
    },
    async onSetRemark() {
      if (!(this.remark && this.remark.value && this.remark.id)) {
        return this.$message.error('请输入备注信息')
      }

      try {
        await this.$confirm('此操作将保存备注信息到服务器, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }

      try {
        await request.put(`/pc/admin/v1/patientCollect/${this.remark.id}/`, {
          is_enable: this.is_enable,
          name: this.name,
          sex: this.sex,
          age: this.age,
          mobile: this.mobile,
          remark: this.remark.value,
          created: this.created,
          hospital: this.hospital
        })
      } catch (error) {
        console.error(error)
        return this.$message.error(error)
      }

      this.$notify.success('保存成功')
      this.isShowSetRemarkDialog = false
      this.$nextTick(() => {
        this.getList()
      })
    },
    async onExportRecord() {
      try {
        await this.$confirm('此操作将导出所选内容的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        return this.$message({
          type: 'info',
          message: '已取消'
        })
      }
      const options = {
        url: '/pc/admin/v1/patientCollect/export_excel/',
        method: 'GET',
        responseType: 'blob',
        params: {
          hospital_id: this.cacheHospital.id,
        }
      }

      let result
      try {
        result = await request(options)
      } catch (error) {
        const text = await (new Response(error)).text()
        return this.$message({
          type: 'error',
          message: JSON.parse(text).error
        })
      }

      const blob = new Blob([result.data], {
        type: 'application/vnd.ms-excel'
      })
      const objectURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectURL
      a.download = `SIMPLE招募患者名单.xls`
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
      window.URL.revokeObjectURL(blob)

      this.$notify.success('数据导出成功')
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>
  .container {
    margin: 10px 30px 10px 30px;
  }
  .card-header {
    padding: 5px 5px;
  }
  .button-box {
    margin: 5px 50px 20px 0;
    float: right;

  }
  .table-list {
    margin-top: 30px;
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
