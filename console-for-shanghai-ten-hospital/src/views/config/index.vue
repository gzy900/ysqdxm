<template>
  <div class="container">
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-add" style="padding-right: 10px" />
        <h2>{{ hospital.name }}</h2>
      </div>
      <div style="padding-top: 10px">
        <el-card shadow="always">
          <el-form :model="config" size="small" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="血压超限范围">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="config.systolic.max" type="number" placeholder="请输入数值" style="width: 180px;">
                      <template slot="prepend">&gt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="config.systolic.min" type="number" placeholder="请输入数值" style="width: 180px;">
                      <template slot="prepend">&lt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="config.diastolic.max" type="number" placeholder="请输入数值" style="width: 180px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="config.diastolic.min" type="number" placeholder="请输入数值" style="width: 180px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitDoctorConfig">保存血压超限范围配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-form :model="one" size="small" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="血压过低分段">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="one.standard.systolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="one.standard.diastolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="提醒内容" label-width="100px">
                <el-input v-model="one.content" type="textarea" placeholder="请输入提醒的内容" /></el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitPatientConfig('one')">保存血压过低分段配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-form :model="two" size="small" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="血压正常分段">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="two.standard.systolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="two.standard.systolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="two.standard.diastolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="two.standard.diastolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="提醒内容" label-width="100px">
                <el-input v-model="two.content" type="textarea" placeholder="请输入提醒的内容" /></el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitPatientConfig('two')">保存血压正常分段配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-form :model="three" size="small" label-width="120px" label-position="left" @submit.native.prevent>
          <el-card shadow="always" style="margin-top: 15px;">
            <el-form-item label="血压偏高分段">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="three.standard.systolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="three.standard.systolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="three.standard.diastolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="three.standard.diastolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="提醒内容" label-width="100px">
                <el-input v-model="three.content" type="textarea" placeholder="请输入提醒的内容" /></el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitPatientConfig('three')">保存血压偏高分段配置</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-form :model="four" size="small" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="血压过高分段">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="four.standard.systolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="four.standard.systolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="four.standard.diastolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="four.standard.diastolic[1]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&lt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="提醒内容" label-width="100px">
                <el-input v-model="four.content" type="textarea" placeholder="请输入提醒的内容" /></el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitPatientConfig('four')">保存血压过高分段配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-form :model="five" size="small" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="血压超高分段">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="收缩压" label-width="60px">
                    <el-input v-model.number="five.standard.systolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-form-item label="舒张压" label-width="60px">
                    <el-input v-model.number="five.standard.diastolic[0]" type="number" placeholder="请输入数值" style="width: 125px;">
                      <template slot="prepend">&gt;=</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="提醒内容" label-width="100px">
                <el-input v-model="five.content" type="textarea" placeholder="请输入提醒的内容" /></el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitPatientConfig('five')">保存血压超高分段配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="always" style="margin-top: 15px;">
          <el-form size="small" :model="notice" label-width="120px" label-position="left" @submit.native.prevent>
            <el-form-item label="未测量" prop="delay">
              <el-input v-model.number="notice.standard" type="number" placeholder="请输入天数" style="width: 120px;">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitNoticeConfig">保存未测量提醒配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      config: {
        systolic: {
          max: null,
          min: null
        },
        diastolic: {
          max: null,
          min: null
        }
      },
      one: {
        content: '',
        standard: {
          systolic: [null, null],
          diastolic: [null, null]
        }
      },
      two: {
        content: '',
        standard: {
          systolic: [null, null],
          diastolic: [null, null]
        }
      },
      three: {
        content: '',
        standard: {
          systolic: [null, null],
          diastolic: [null, null]
        }
      },
      four: {
        content: '',
        standard: {
          systolic: [null, null],
          diastolic: [null, null]
        }
      },
      five: {
        content: '',
        standard: {
          systolic: [null, null],
          diastolic: [null, null]
        }
      },
      notice: {
        standard: 0
      },
      departments: []
    }
  },
  computed: {
    hospital() {
      return this.$store.getters.hospital
    }
  },
  watch: {
    hospital(value) {
      if (value) {
        // clear old data
        this.config = {
          systolic: {
            max: null,
            min: null
          },
          diastolic: {
            max: null,
            min: null
          }
        }
        this.one = this.two = this.three = this.four = this.five = {
          content: '',
          standard: {
            systolic: [null, null],
            diastolic: [null, null]
          }
        }
        this.notice = {
          standard: 0
        }
        this.getDefaultSystemConfig()
      }
    }
  },
  created() {
    this.getDefaultSystemConfig()
  },
  methods: {
    getDefaultSystemConfig() {
      this.getDefaultDoctorConfig()
      this.getDefaultPatientConfig()
      this.getDefaultNoticeConfig()
    },
    async getDefaultDoctorConfig() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/systemConfig/?hospital_id=${this.hospital.id}&name=doctor_notice`)
      } catch (error) {
        return this.$message.error(error)
      }
      const [first] = result.data.data
      const [max, min] = first.standard
      this.config = {
        id: first.id,
        systolic: {
          max: max.systolic[0],
          min: min.systolic[1]
        },
        diastolic: {
          max: max.diastolic[0],
          min: min.diastolic[1]
        }
      }
    },
    async getDefaultPatientConfig() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/systemConfig/?hospital_id=${this.hospital.id}&name=patient_notice`)
      } catch (error) {
        return this.$message.error(error)
      }
      const toFriendlyLevel = (level) => {
        switch (level) {
          case '1': {
            return 'one'
          }
          case '2': {
            return 'two'
          }
          case '3': {
            return 'three'
          }
          case '4': {
            return 'four'
          }
          case '5': {
            return 'five'
          }
        }
      }

      result.data.data.forEach((item) => {
        this[toFriendlyLevel(item.level)] = {
          id: item.id,
          content: item.content,
          standard: item.standard[0],
          level: item.level
        }
      })
    },
    async getDefaultNoticeConfig() {
      let result
      try {
        result = await request.get(`/pc/admin/v1/systemConfig/?hospital_id=${this.hospital.id}&name=not_measured_notice`)
      } catch (error) {
        return this.$message.error(error)
      }
      console.log(result.data.data)
      const [notice] = result.data.data
      this.notice = {
        id: notice.id,
        standard: notice.standard
      }
    },
    async onSubmitDoctorConfig() {
      const { id, systolic, diastolic } = this.config
      try {
        await request.put(`/pc/admin/v1/systemConfig/${id}/?hospital_id=${this.hospital.id}`, {
          name: 'doctor_notice',
          standard: [
            { systolic: [systolic.max, null], diastolic: [diastolic.max, null] },
            { systolic: [null, systolic.min], diastolic: [null, diastolic.max] }
          ]
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('配置保存成功')
    },
    async onSubmitPatientConfig(value) {
      const { id, content, standard, level } = this[value]
      try {
        await request.put(`/pc/admin/v1/systemConfig/${id}/?hospital_id=${this.hospital.id}`, {
          level,
          content,
          name: 'patient_notice',
          standard: [standard]
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('配置保存成功')
    },
    async onSubmitNoticeConfig() {
      const { id, standard } = this.notice
      try {
        await request.put(`/pc/admin/v1/systemConfig/${id}/?hospital_id=${this.hospital.id}`, {
          name: 'not_measured_notice',
          standard: [standard]
        })
      } catch (error) {
        return this.$message.error(error)
      }

      this.$notify.success('配置保存成功')
    }
  }
}
</script>
