<template>
  <div class="container">
    <page-header content="添加" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-add" style="padding-right: 10px" />
        <span>设备添加</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="FORM" :model="form" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="设备编号">
            <el-input v-model="form.sn" placeholder="输入设备编号" style="width: 200px" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box" style="text-align: right; margin-right: 20px">
        <el-button type="primary" size="medium" @click="onAdd">添加</el-button>
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
        sn: '',
      }
    }
  },
  computed: {
    ...mapGetters([
      'hospital'
    ])
  },
  methods: {
    async onAdd() {
      const { sn } = this.form
      if (!sn) {
        return this.$message({
          message: '设备编号不能为空',
          type: 'error'
        })
      }

      try {
        await request.post(`/pc/admin/v1/device/?hospital_id=${this.hospital.id}`, {
          sn,
        })
      } catch (error) {
        return this.$message({
          message: error,
          type: 'error'
        })
      }
      this.$notify.success('创建成功')
      this.$router.back()
    }
  }
}
</script>
