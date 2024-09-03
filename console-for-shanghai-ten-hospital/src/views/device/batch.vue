<template>
  <div class="container">
    <page-header content="批量添加" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-plus" style="padding-right: 10px" />
        <span>设备添加</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="FORM" :model="form" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="设备编号">
            <el-input
              v-model="form.sns"
              type="textarea"
              :autosize="{ minRows: 5}"
              placeholder="请输入内容设备编号每行为一个设备编号"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box" style="text-align: right; margin-right: 20px">
        <el-button type="primary" size="medium" @click="onBatchAdd">批量添加</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      form: {
        sns: '',
      }
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ])
  },
  methods: {
    async onBatchAdd() {
      const { sns } = this.form
      if (!sns) {
        return this.$message({
          message: '设备编号不能为空',
          type: 'error'
        })
      }
      const body = sns.trim().split('\n').map((sn) => ({ sn }))
      try {
        await request.post(`/pc/admin/v1/device/?hospital_id=${this.hospital.id}`, body)
      } catch (error) {
        return this.$message({
          message: error,
          type: 'error'
        })
      }
      this.$message({
        message: '添加设备成功',
        type: 'success'
      })
      this.$router.back()
    }
  }
}
</script>
