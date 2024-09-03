<template>
  <section>
    <el-card shadow="hover" style="margin: 15px;">
      <el-form ref="FORM" label-position="right" label-width="120px" :rules="rules" :model="form">
        <el-form-item label="原密码" prop="older">
          <el-input v-model="form.older" type="password" placeholder="请输入原密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newer">
          <el-input v-model="form.newer" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="verify">
          <el-input v-model="form.verify" type="password" placeholder="请再次确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onResetPassword">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'AccountConfig',
  data() {
    const validator = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入新密码'))
      if (value.length < 6) return callback(new Error('密码长度最少为6位'))
      if (!(/\d+/g.test(value) && /[A-Za-z]+/g.test(value))) return callback(new Error('密码最少包含字母和数字'))
      callback()
    }
    const verifier = (rule, value, callback) => {
      if (!value) return callback(new Error('请再次输入密码'))
      if (value !== this.form.newer) return callback(new Error('两次输入密码不一致'))
      callback()
    }

    return {
      rules: {
        older: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newer: [
          { validator, trigger: 'blur' }
        ],
        verify: [
          { validator: verifier, trigger: 'blur' }
        ]
      },
      form: {
        older: '',
        newer: '',
        verify: ''
      }
    }
  },
  methods: {
    async onResetPassword() {
      try {
        await this.$refs.FORM.validate()
      } catch (error) {
        return this.$message.error('输入内容不能为空')
      }

      const { older, newer } = this.form
      try {
        await request.post('/pc/admin/v1/changePwd/', {
          old_pwd: btoa(older),
          new_pwd: btoa(newer)
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('修改密码成功')
      await this.$nextTick()
      try {
        await this.$store.dispatch('user/logout')
      } catch (error) {
        console.error(error)
      }
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$notify.success('请您重新登录')
    }
  }
}
</script>

<style>

</style>
