<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增视频组</el-button>
      </el-col>
      <el-col :span="18">
        <div class="form-search">
          <!--          <el-input-->
          <!--            clearable-->
          <!--            v-model="listQuery.pd_type"-->
          <!--            placeholder="id">-->
          <!--          </el-input>-->
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" label="动作ID" width="80">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.actionId }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="组名" width="120">
        <template slot-scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="难易程度" width="160">
        <template slot-scope="scope">
          {{ scope.row.difficulty }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行为习惯" width="120">
        <template slot-scope="scope">
          {{ scope.row.actionTag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="疾病史">
        <template slot-scope="scope">
          {{ scope.row.diseaseTag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用人群">
        <template slot-scope="scope">
          {{ scope.row.personTag }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总时长" width="120">
        <template slot-scope="scope">
          {{ scope.row.totalTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="140">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageSize"
      :limit.sync="listQuery.pageNum"
      @pagination="getList"/>

    <el-dialog :before-close="handleDialogClose" :visible.sync="dialogVisible"
               :title="dialogType==='edit'?'查看修改':'新增'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-form-item label="组名：" prop="groupName">
          <el-col :span="10">
            <el-input v-model="fromData.groupName" placeholder="请输入组名"/>
          </el-col>
        </el-form-item>
        <el-form-item label="难易程度：" prop="difficulty">
          <el-col :span="10">
            <el-select
              clearable
              v-model="fromData.difficulty"
              placeholder="请选择难易程度"
            >
              <el-option
                v-for="item in difficultyList"
                :key="item.did"
                :label="item.field"
                :value="item.field"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="行为习惯：" prop="actionTag">
          <el-col :span="24">

            <el-select
              clearable
              v-model="fromData.actionTag"
              multiple
              placeholder="请选择疾病史"
            >
              <el-option
                v-for="item in actionTagList"
                :key="item.did"
                :label="item.field"
                :value="item.field"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="疾病史：" prop="diseaseTag">
          <el-col :span="24">
            <el-select
              clearable
              v-model="fromData.diseaseTag"
              multiple
              placeholder="请选择疾病史"
            >
              <el-option
                v-for="item in diseaseList"
                :key="item.did"
                :label="item.field"
                :value="item.field"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="使用人群：" prop="personTag">
          <el-col :span="24">
            <el-select
              clearable
              v-model="fromData.personTag"
              multiple
              placeholder="请选择使用人群"
            >
              <el-option
                v-for="item in personList"
                :key="item.did"
                :label="item.field"
                :value="item.field"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="动作视频：">
          <el-col :span="24">
            <el-select
              clearable
              v-model="fromData.actionId"
              multiple
              filterable
              placeholder="请选择视频"
            >
              <el-option
                v-for="item in videoList"
                :key="item.id"
                :label="item.actionName"
                :value="item.id"
              >
                <span style="float: left">{{ item.actionName }}</span>
                <el-button
                  type="text"
                  style="float: right;font-size: 13px;margin-right: 26px"
                  @click.stop="handleOpenVideo(item.url)"
                >预览
                </el-button>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <!--        <el-form-item label="总时长：" prop="totalTime">-->
        <!--          <el-col :span="24">-->
        <!--            <el-input v-model="fromData.totalTime" placeholder="总时长"/>-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
        <el-button type="primary" @click="handleConfirm('fromData')">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisibleVideo"
      width="800px"
    >
      <video style="width: 100%;height: auto;box-sizing: border-box" :src="dialogVideoUrl" controls></video>

    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getList, upData, addData, delData } from '@/api/clothes/motion-group'
import { getOption } from '@/api/clothes/dictionaries'
import { getList as getVideo } from '@/api/clothes/motion'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 * @actionId 动作ID，多个逗号分隔
 * @actionTag 行为习惯
 * @difficulty 难易程度
 * @diseaseTag 疾病史
 * @groupName 组名
 * @personTag 使用人群
 * @totalTime 总时长
 */
const defaultRow = {
  actionId: [],
  actionTag: [],
  difficulty: '',
  diseaseTag: [],
  groupName: '',
  personTag: [],
  totalTime: 0
}
export default {
  name: 'ClothesUser',
  filters: {
    stateFilterType(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        3: 'warning'
      }
      return statusMap[status]
    },
    stateFilterName(status) {
      const statusMap = {
        1: '已审核',
        2: '未通过',
        3: '未审核'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisibleVideo: false,
      dialogVideoUrl: '',
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      videoList: [],

      /**
       * 分页参数
       */
      listQuery: {
        pageSize: 1,
        pageNum: 10
      },
      personQuery: {
        did: '5840bfd19d094ff0bf22fd87f11fd3d5'
      },
      diseaseQuery: {
        did: '796f32d7b1ac4d138e1263b607e9b426'
      },
      actionTagQuery: {
        did: '22868e8dc1df42798ccf65bdf897e043'
      },
      personList: [],
      diseaseList: [],
      actionTagList: [],
      difficultyList: [
        {
          did: '1',
          field: '入门'
        },
        {
          did: '2',
          field: '普通'
        },
        {
          did: '3',
          field: '进阶'
        },
        {
          did: '4',
          field: '困难'
        }
      ],

      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        actionTag: [
          { required: true, message: '请选择行为习惯！', trigger: 'blur' }
        ],
        difficulty: [
          { required: true, message: '请选择难易程度！', trigger: 'blur' }
        ],
        diseaseTag: [
          { required: true, message: '请选择疾病史！', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '请输入组名！', trigger: 'blur' }
        ],
        personTag: [
          { required: true, message: '请选择使用人群！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getOption()
    this.getVideo()
    this.getList()
  },
  methods: {

    async getVideo() {
      const res = await getVideo({ pageSize: 1, pageNum: 10000 * 10000 * 10 })
      console.log(res)
      this.videoList = res.data.records
    },

    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.records
      this.pageTotal = res.data.total
    },

    async getOption() {
      const personList = await getOption(this.personQuery)
      const diseaseList = await getOption(this.diseaseQuery)
      const actionTagList = await getOption(this.actionTagQuery)

      this.personList = personList.data
      this.diseaseList = diseaseList.data
      this.actionTagList = actionTagList.data
    },

    handleOpenVideo(url) {
      this.dialogVisibleVideo = true
      this.dialogVideoUrl = url
    },
    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.pageSize = 1
      this.getList()
    },

    /**
     * 打开新增窗口
     */
    handleAdd() {
      this.fromData = Object.assign({}, defaultRow)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.fromData = deepClone(scope.row)
      this.fromData.personTag = this.fromData.personTag.split(',')
      this.fromData.diseaseTag = this.fromData.diseaseTag.split(',')
      this.fromData.actionTag = this.fromData.actionTag.split(',')
      this.fromData.actionId = this.fromData.actionId.split(',').map(item => {
        return parseInt(item)
      })

      console.log(this.fromData.actionId)
      this.dialogVisible = true
    },
    /**
     * 关闭窗口
     */
    handleDialogClose() {
      this.dialogVisible = false
      this.$refs['fromData'].resetFields()
    },

    /**
     * 删除
     */
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async () => {
          await delData({ 'id': row.id })
          this.dataList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    /**
     * 提交
     */
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        this.handleConfirmData()
      })
    },
    handleConfirmData() {
      const fromData = deepClone(this.fromData)
      fromData.personTag = fromData.personTag.join(',')
      fromData.diseaseTag = fromData.diseaseTag.join(',')
      fromData.actionTag = fromData.actionTag.join(',')
      fromData.actionId = fromData.actionId.join(',')
      let totalTime = 0
      this.fromData.actionId.forEach(item => {
        this.videoList.forEach(action => {
          console.log(action.id)
          if (item === action.id) {
            totalTime += action.videoTime
          }
        })
      })
      fromData.totalTime = totalTime
      delete fromData.createTime
      delete fromData.updateTime

      return new Promise((resolve, reject) => {
        if (this.dialogType === 'edit') {
          upData(fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$notify({
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$notify({
                  title: response.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        } else {
          addData(fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$notify({
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$notify({
                  title: response.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}

</style>
