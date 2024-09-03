<template>
  <div class="container">
    <page-header content="编辑" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-add" style="padding-right: 10px" />
        <span>设备编辑</span>
      </div>
      <div style="padding-top: 10px">
        <el-form ref="FORM" :model="form" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
          <el-form-item label="设备编号">
            <el-input v-model="form.sn" placeholder="输入设备编号" style="width: 200px" clearable />
          </el-form-item>
        </el-form>
      </div>
      <div class="button-box" style="text-align: right; margin-right: 20px">
        <el-button type="primary" size="medium" @click="onAdd">编辑</el-button>
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
  created() {
    const { id } = this.$route.query
    this.getById(id)
    this.getAllFactory()
  },
  methods: {
    async getById(id) {
      let result
      try {
        result = await request.get(`/pc/admin/v1/device/${id}/?hospital_id=${this.hospital.id}`)
      } catch (error) {
        return console.error(error)
      }
      const { sn } = result.data.data
      this.form = {
        sn,
      }
    },
    async onAdd() {
      const { sn } = this.form
      if (!sn) {
        return this.$message({
          message: '设备编号不能为空',
          type: 'error'
        })
      }

      try {
        await request.put(`/pc/admin/v1/device/${this.$route.query.id}/?hospital_id=${this.hospital.id}`, {
          sn
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('更改成功')
      this.$router.back()
    }
  }
}
</script>
