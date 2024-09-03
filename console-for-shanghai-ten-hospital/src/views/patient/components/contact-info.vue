<template>
  <el-card shadow="never">
    <el-tag v-for="(contact) in always" :key="contact.id" style="margin-right: 15px;">常用电话: {{ contact.mobile }}</el-tag>
    <el-popover
      v-for="(contact) in contacts"
      :key="contact.id"
      placement="top"
      width="160"
      trigger="hover"
    >
      <p>设置为常用联系人</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text">取消</el-button>
        <el-button type="primary" size="mini" @click="onSetToComonContact(contact)">确定</el-button>
      </div>
      <el-tag slot="reference" type="info" style="margin-right: 15px;">{{ contact.mobile }}</el-tag>
    </el-popover>
  </el-card>
</template>

<script>
import { getIllnessContactById, onSetToComonContact } from '@/api/illness'

export default {
  props: {
    illness: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contacts: [],
      always: [],
    }
  },
  watch: {
    'illness.id': {
      handler: 'getIllnessContactById',
      immediate: true
    }
  },
  methods: {
    async getIllnessContactById() {
      let result
      try {
        result = await getIllnessContactById(this.illness.id)
      } catch (error) {
        return console.log(error)
      }
      this.contacts = result.data.data.filter((item) => !item.is_contact)
      this.always = result.data.data.filter((item) => item.is_contact)
    },
    async onSetToComonContact(value) {
      try {
        await onSetToComonContact(this.illness.id, {
          member_id: value.id,
          is_contact: true
        })
      } catch (error) {
        console.error(error)
        return this.$message.error('设置常用联系人出错了')
      }
      this.$message.success('设置常用联系人成功')
      this.getIllnessContactById()
    },
  }
}
</script>
