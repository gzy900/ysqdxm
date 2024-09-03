<template>
  <div class="container">
    <page-header content="详情" />
    <el-card class="card-box" shadow="never">
      <div class="card-header">
        <i class="el-icon-plus" style="padding-right: 10px" />
        <span>计划详情</span>
      </div>
      <div style="padding-top: 10px">
        <!-- show plan base information -->
        <el-card shadow="always" prop="name">
          <el-form ref="FORM" :model="form" :inline="true" size="small" label-width="100px" label-position="right" @submit.native.prevent>
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="form.name" placeholder="输入计划名称" style="width: 300px" clearable disabled />
            </el-form-item>
            <el-form-item label="总天数" prop="total_day">
              <el-input v-model="form.total_day" type="number" placeholder="输入总天数" style="width: 300px" disabled clearable />
            </el-form-item>
            <el-form-item label="开始日期" prop="">
              <el-input v-model="form.start_time" placeholder="输入总天数" style="width: 300px" disabled clearable />
            </el-form-item>
            <el-form-item label="结束日期" prop="">
              <el-input v-model="form.end_time" placeholder="输入总天数" style="width: 300px" disabled clearable />
            </el-form-item>
            <el-divider />
            <div class="card-footer">
              <el-button size="small" type="primary" @click="isShowEditPlanDialog = true">编辑</el-button>
            </div>
          </el-form>
        </el-card>
        <!-- edit plan dialog -->
        <el-dialog title="修改计划内容" :visible.sync="isShowEditPlanDialog">
          <el-form :model="form" :rules="rules">
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="form.name" placeholder="输入计划名称" style="width: 300px" clearable />
            </el-form-item>
            <el-form-item label="总天数" prop="total_day">
              <el-input v-model="form.total_day" type="number" placeholder="输入总天数" style="width: 300px" clearable />
            </el-form-item>
            <el-form-item label="开始日期" prop="start_time">
              <el-date-picker
                v-model="form.start_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="结束日期" prop="end_time">
              <el-date-picker
                v-model="form.end_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowEditPlanDialog = false">取 消</el-button>
            <el-button type="primary" @click="onEditPlan">确 定</el-button>
          </div>
        </el-dialog>

        <!-- show plan content -->
        <el-form>
          <el-card v-for="detail in original" :key="detail.id" shadow="always" class="custom-el-card">
            <div slot="header" class="clearfix">
              <el-form-item>
                <label slot="label">任务详情</label>
                <el-select v-model="detail.which_day" style="width: 200px;" placeholder="任务执行日期" disabled>
                  <el-option v-for="date in parseInt(form.total_day)" :key="date" :label="`第${date}天`" :value="date" />
                </el-select>
              </el-form-item>
            </div>
            <div v-for="(item, key) in detail.ill_template_task" :key="key">
              <el-button size="mini" type="text" @click="onShowEditTask(item)"><i class="el-icon-edit" /></el-button>
              <el-tag size="mini" effect="dark">{{ item.task_type.alias }}</el-tag> {{ item.name }}
              <p v-if="item.desc" style="font-size: 14px; color: #777777; line-height: 1.5">{{ item.desc }}</p>
            </div>
            <div v-for="(question, i) in detail.ill_template_question" :key="i">
              <el-collapse>
                <el-collapse-item>
                  <div slot="title" style="width: 100%">
                    <el-button size="mini" type="text" @click="onShowEditQuestionnire(question)"><i class="el-icon-edit" /></el-button>
                    <el-tag size="mini" type="success" effect="dark">问卷</el-tag> 查看问卷
                  </div>
                  <div v-for="(item, index) in question.ill_question_detail" :key="item.id">
                    <span>{{ index + 1 }}、{{ item.title }}<el-tag :type="item.type === '1' ? '' : 'success'" size="mini" effect="dark">{{ item.type === '1' ? '单选' : '多选' }}</el-tag></span>
                    <p v-if="item.type === '1'">
                      <el-radio-group v-model="radio" size="mini" disabled>
                        <el-radio v-for="(option, key) in item.options" :key="key" :label="key">{{ option }}</el-radio>
                      </el-radio-group>
                    </p>
                    <p v-else-if="item.type === '2'">
                      <el-checkbox-group v-model="checkbox" disabled>
                        <el-checkbox v-for="(option, key) in item.options" :key="key" :label="option" />
                      </el-checkbox-group>
                    </p>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div v-for="(visit, i) in detail.ill_template_visit" :key="i">
              <div slot="title" style="width: 100%">
                <el-button size="mini" type="text" @click="onShowEditVisit(visit)"><i class="el-icon-edit" /></el-button>
                <el-tag size="mini" type="success" effect="dark">复诊</el-tag> {{ visit.name }}
                <p v-if="visit.date && visit.time" style="font-size: 14px; color: #777777; line-height: 1.5">{{ visit.date }} {{ visit.time.alias }}</p>
              </div>
            </div>
            <el-divider />
            <div class="card-footer">
              <el-button size="small" type="primary" @click="onShowEditWhichDay(detail)">编辑</el-button>
            </div>
          </el-card>
        </el-form>
        <!-- edit which day content dialog -->
        <el-dialog title="修改任务日期" :visible.sync="isShowEditWhichDay">
          <el-form ref="WHICH_DAY_FORM" :model="which_day" :rules="whichDayRules">
            <el-form-item label="第几天" prop="which_day">
              <el-select v-model="which_day.which_day" style="width: 200px;" placeholder="任务执行日期">
                <el-option v-for="date in parseInt(form.total_day)" :key="date" :label="`第${date}天`" :value="date" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="start_time">
              <el-date-picker
                v-model="which_day.start_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="which_day.status" style="width: 200px;" placeholder="请选择任务状态">
                <el-option v-for="item in statuses" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowEditWhichDay = false">取 消</el-button>
            <el-button type="primary" @click="onEditWhichDay">确 定</el-button>
          </div>
        </el-dialog>
        <!-- edit detail task dialog -->
        <el-dialog title="修改计划任务" :visible.sync="isShowEditTask">
          <el-form ref="TASK_FORM" :model="task" :inline="true" :rules="taskRules" size="small" label-width="100px" label-position="right" @submit.native.prevent>
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="task.name" placeholder="输入计划名称" style="width: 300px" clearable />
            </el-form-item>
            <el-form-item label="任务类型" prop="task_type">
              <el-select v-model="task.task_type.id" placeholder="请选择">
                <el-option
                  v-for="item in task_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div>
              <el-form-item
                v-if="task.task_type.name === 'yz'"
                label="医嘱内容"
                prop="desc"
                :rules="{
                  required: true, message: '医嘱内容不能为空', trigger: 'blur'
                }"
              >
                <el-input v-model="task.desc" type="textarea" autosize placeholder="请输入医嘱内容" style="width: 300px" clearable />
              </el-form-item>
            </div>
            <el-form-item
              v-if="task.task_type.name === 'jc'"
              label="检查内容"
              prop="check_type"
              :rules="{
                required: true, message: '请选择检查内容', trigger: 'change'
              }"
            >
              <el-select v-model="task.check_type" style="width: 300px;" placeholder="请选择">
                <el-option
                  v-for="item in check_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="task.status" style="width: 200px;" placeholder="请选择任务状态">
                <el-option v-for="item in statuses" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowEditTask = false">取 消</el-button>
            <el-button type="primary" @click="onEditTask">确 定</el-button>
          </div>
        </el-dialog>
        <!-- edit detail questionnaire dialog -->
        <el-dialog title="修改问卷内容" :visible.sync="isShowEditQuestionnaire">
          <el-form ref="QUESTIONNAIRE_FORM" :model="questionnaire" :rules="questionnaireRules" size="small" label-width="100px" label-position="top" @submit.native.prevent>
            <el-card shadow="always" prop="name">
              <div>
                <el-form-item label="是否推送" prop="is_push" style="width: 300px;">
                  <el-switch
                    v-model="questionnaire.is_push"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </div>
              <el-form-item label="状态" prop="status">
                <el-select v-model="questionnaire.status" style="width: 200px;" placeholder="请选择任务状态">
                  <el-option v-for="item in statuses" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-card>
            <el-card v-for="(question, index) in questionnaire.ill_question_detail" :key="index" shadow="always" class="custom-el-card">
              <div slot="header" class="clearfix">
                <el-form-item
                  :rules="{
                    required: true, message: '问卷题目不能为空', trigger: 'blur'
                  }"
                  :prop="`ill_question_detail.${index}.title`"
                >
                  <label slot="label">{{ `问卷题目: ${index + 1}` }}</label>
                  <el-input v-model="question.title" placeholder="请输入题目" style="width: 300px">
                    <el-select slot="prepend" v-model="question.type" style="width: 100px;" placeholder="题目类型">
                      <el-option v-for="(type, key) in questionTypes" :key="key" :label="type.label" :value="type.value" />
                    </el-select>
                  </el-input>
                </el-form-item>
              </div>
              <el-form-item
                v-for="(option, key) in question.options"
                :key="key"
                :label="`选项: ${key + 1}`"
                :rules="{
                  required: true, message: '选项不能为空', trigger: 'blur'
                }"
                :prop="`ill_question_detail.${index}.options.${key}.value`"
              >
                <el-input v-model="option.value" placeholder="输入选项内容" style="width: 300px" clearable />
              </el-form-item>
            </el-card>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowEditQuestionnaire = false">取 消</el-button>
            <el-button type="primary" @click="onEditQuestionnaire">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as plan from '../../api/plan'
import { getPlanById, editPlanById, editWhichDayById, editTaskById, editQuestionnaireById } from '../../api/illness'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        total_day: [
          { required: true, message: '请输入总天数', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      form: {
        name: '',
        total_day: 0,
        start_time: '',
        end_time: ''
      },
      // real data from server
      ops_types: [],
      types: [
        { label: '查房', value: '1' },
        { label: '检查', value: '2' }
      ],
      questionnaires: [],
      tasks: [],
      // original template detail
      original: [],
      // mock data
      radio: 0,
      checkbox: [],
      isShowEditPlanDialog: false,
      // which day detail
      isShowEditWhichDay: false,
      which_day: {},
      whichDayRules: {
        which_day: [
          { required: true, message: '请选择计划日期', trigger: 'change' }
        ],
        start_time: [
          { required: true, message: '请选择计划开始日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择计划状态', trigger: 'change' }
        ]
      },
      statuses: [
        { label: '未开始', value: '1' },
        { label: '未完成', value: '2' },
        { label: '已结束', value: '3' }
      ],
      // show edit task
      isShowEditTask: false,
      task: {
        task_type: {
          id: '',
          name: ''
        }
      },
      task_types: [],
      check_types: [
        { label: '血糖', value: 1 },
        { label: '血脂', value: 2 },
        { label: '凝血', value: 3 }
      ],
      taskRules: {
        name: [
          { required: true, message: '请选择计划日期', trigger: 'change' }
        ],
        task_type: [
          { required: true, message: '请选择计划开始日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择计划状态', trigger: 'change' }
        ]
      },
      // edit questionnaire
      isShowEditQuestionnaire: false,
      questionnaire: {
        status: '1',
        is_push: false,
        ill_question_detail: [
          { type: '1', options: [], title: '' }
        ]
      },
      questionTypes: [
        { label: '单选', value: '1' },
        { label: '多选', value: '2' }
      ],
      questionnaireRules: {
        is_push: [
          { required: true, message: '请选择计划日期', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择计划状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const { id } = this.$route.query
    this.getPlanById(id)
    this.getAllTaskType()
  },
  methods: {
    // get plan to edit by id
    async getPlanById(id) {
      let result
      try {
        result = await getPlanById(id)
      } catch (error) {
        return console.error(error)
      }
      this.plan = result.data.data
      const { name, total_day, start_time, end_time, ill_template_detail } = result.data.data
      this.original = ill_template_detail
      this.form = {
        name,
        total_day,
        start_time,
        end_time
      }
    },
    // get all task type to select task type
    async getAllTaskType() {
      let result
      try {
        result = await plan.getTaskTypeList()
      } catch (error) {
        return console.error(error)
      }
      this.TASK_TYPE_MAP = result.data.data.reduce((map, item) => {
        map[item.name] = item.id
        return map
      }, {})
      this.task_types = result.data.data.map((item) => ({ label: item.alias, value: item.id }))
    },
    // handle edit plan
    async onEditPlan() {
      try {
        await this.$refs['FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const {
        name,
        total_day,
        start_time,
        end_time
      } = this.form
      const data = {
        name,
        total_day: parseInt(total_day),
        start_time,
        end_time
      }
      const { id } = this.$route.query
      try {
        await editPlanById(id, data)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        return console.error(error)
      }
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.isShowEditPlanDialog = false
    },
    // toggle whether show edit which day dialog
    onShowEditWhichDay(detail) {
      this.which_day = detail
      this.isShowEditWhichDay = true
    },
    // handle edit which day
    async onEditWhichDay() {
      try {
        await this.$refs['WHICH_DAY_FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const {
        id,
        which_day,
        start_time,
        status
      } = this.which_day
      const data = {
        which_day: parseInt(which_day),
        start_time,
        status
      }
      try {
        await editWhichDayById(id, data)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        return console.error(error)
      }
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.isShowEditWhichDay = false
    },
    // toggle whether show edit task dialog
    onShowEditTask(task) {
      this.task = task
      this.isShowEditTask = true
    },
    // handle edit task
    async onEditTask() {
      try {
        await this.$refs['TASK_FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const {
        id,
        name,
        desc,
        task_type,
        check_type,
        status
      } = this.task
      const data = {
        name,
        status,
        desc,
        task_type: parseInt(task_type.id),
        check_type: check_type ? parseInt(check_type) : null
      }
      try {
        await editTaskById(id, data)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        return console.error(error)
      }
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.isShowEditTask = false
    },
    // toggle whether show edit questionnaire dialog
    onShowEditQuestionnire(questionnaire) {
      const { ill_question_detail } = questionnaire
      questionnaire.ill_question_detail = ill_question_detail.map((item) => {
        const { options } = item
        item.options = options.map((option) => ({ value: option }))
        return item
      })
      this.questionnaire = questionnaire
      this.isShowEditQuestionnaire = true
    },
    // handle edit questionnaire
    async onEditQuestionnaire() {
      try {
        await this.$refs['QUESTIONNAIRE_FORM'].validate()
      } catch (error) {
        return this.$message({
          type: 'error',
          message: '内容不能为空'
        })
      }
      const {
        id,
        is_push,
        status,
        ill_question_detail
      } = this.questionnaire
      const data = {
        is_push,
        status,
        ill_question_detail: ill_question_detail.map((item) => {
          const { options } = item
          item.options = options.filter((item) => item.value).map((item) => item.value)
          return item
        })
      }
      try {
        await editQuestionnaireById(id, data)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        return console.error(error)
      }
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.isShowEditQuestionnaire = false
    }
  }
}
</script>

<style scoped>
.custom-el-card {
  margin-top: 15px;
}
</style>
