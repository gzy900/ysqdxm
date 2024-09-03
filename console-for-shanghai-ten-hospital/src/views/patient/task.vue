<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" style="text-align: center;">
      <span>{{ method | toFriendlyMethod }}</span>
    </div>
    <div>
      <el-table :data="taskData" border style="width: 100%">
        <el-table-column fixed align="center" prop="id" label="编号" width="90" />
        <el-table-column fixed align="center" prop="realname" label="姓名" width="90" />
        <el-table-column align="center" prop="sex" label="性别" width="100">
          <template slot-scope="scope">{{ scope.row.sex | gender }}</template>
        </el-table-column>
        <el-table-column align="center" prop="mobile" label="电话" width="160" />
        <el-table-column align="center" prop="cure_plan" label="当前方案" width="90" />
        <el-table-column align="center" prop="fourteen_days_countdown" label="两周随访倒计时(天)" width="150px" />
        <el-table-column align="center" prop="zip" label="健康数据" width="180">
          <template slot-scope="scope">
            <router-link :to="`/user/patient/detail/${scope.row.id}`" tag="div"><el-button type="primary" size="mini">查看康复数据</el-button></router-link>
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
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onHandleComplete($event, scope.row.f_id, scope.row.method)">完成任务</el-button>
          </template>
        </el-table-column>
      </el-table>

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
  </el-card>

</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'

export default {
  name: 'Dashboard',
  filters: {
    toFriendlyMethod(value) {
      switch (value) {
        case 'two_weeks':
          return '两周随访患者'
        case 'three_month':
          return '三个月随访患者'
        case 'six_month':
          return '六个月随访患者'
        case 'change_plan':
          return '需要更换服药方案患者'
        case 'data_warn':
          return '今日血压超限患者'
        case 'not_measure':
          return '测量不足患者'
        default:
          return '未知任务'
      }
    }
  },
  data() {
    return {
      taskData: [],
      isShowSetRemarkDialog: false,
      method: 'change_plan',
      remark: {
        value: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ]),
    isAdmin() {
      return this.$store.getters.roles.includes('ADMIN')
    },
    isAssistant() {
      return this.$store.getters.roles.includes('ASSISTANT')
    },
    isDoctor() {
      return this.$store.getters.roles.includes('DOCTOR')
    }
  },
  watch: {
    hospital(value) {
      if (value) {
        this.getIndexTask()
      }
    }
  },
  created() {
    if (this.$route.query.method) {
      this.method = this.$route.query.method
    }
    this.getIndexTask()
  },
  methods: {
    async getIndexTask() {
      let result
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      try {
        result = await request.get(`/pc/admin/v1/patientFollow/?hospital_id=${this.hospital.id}&method=${this.method}`)
      } catch (error) {
        loading.close()
        return console.log(error)
      }
      console.log(result.data.data)
      this.taskData = result.data.data
      loading.close()
    },
    onShowSetRemarkDialog(value) {
      this.isShowSetRemarkDialog = true
      this.remark = {
        value: value.remark || '',
        id: value.id
      }
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
        await request.put(`/pc/admin/v1/patient/${this.remark.id}/changeRemark/?hospital_id=${this.hospital.id}`, {
          remark: this.remark.value
        })
      } catch (error) {
        console.error(error)
        return this.$message.error(error)
      }

      this.$notify.success('保存成功')
      this.isShowSetRemarkDialog = false
      this.$nextTick(() => {
        this.getIndexTask()
      })
    },
    async onHandleComplete(e, id, method) {
      e.target.parentNode.blur()

      if (confirm('你确定要提交该修改么吗？')) {
        try {
          await request.post(`/pc/admin/v1/patientFollow/`, {
            id: id,
            method: method
          })
        } catch (error) {
          return this.$message.error(error)
        }
        this.$notify.success('操作成功')
        this.getIndexTask()
      } else {
        this.$notify.success('操作取消')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
