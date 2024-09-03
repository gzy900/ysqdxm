<template>
  <div>
    <div class="page-header">
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">动作名称：</p>
              <p class="search-item-input">
                <el-input size="small" :label="'动作名称'" v-model="listQuery.actionName" placeholder="请输入动作名称"></el-input>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">运动类型：</p>
              <p class="search-item-input">
                <el-select clearable v-model="listQuery.actionType" placeholder="请选择类型">
                  <el-option v-for="item in typeOption" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">部位：</p>
              <p class="search-item-input">
                <el-select clearable v-model="listQuery.partType" placeholder="请选择部位">
                  <el-option v-for="item in partTypeOption" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search-item">
              <p class="search-item-title">需要设备：</p>
              <p class="search-item-input">
                <el-select clearable v-model="listQuery.instrumentType" placeholder="请选择设备">
                  <el-option v-for="item in instrumentTypeOption" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search-item">
              <!--              <p class="search-item-title">操作：</p>-->
              <p class="search-item-input">
                <el-button type="primary" @click="getList"><i class="el-icon-search"/> 查询</el-button>
                <el-button type="success" @click="handleAddUser"><i class="el-icon-refresh-right"/> 新增动作</el-button>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-card class="page-content">
      <el-table
        v-if="userDataView"
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
      >
        <el-table-column
          fixed="left"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="handleInfo(scope.row)">详情</el-button>
            <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="actionName"
          label="动作名称"
          width="220"
        >
        </el-table-column>

        <el-table-column
          prop="actionType"
          label="动作类型"
          width="120"
        >
        </el-table-column>

        <el-table-column
          prop="partType"
          label="部位"
          width="120"
        >
        </el-table-column>


        <el-table-column
          prop="instrumentType"
          label="需要设备"
        >
        </el-table-column>

        <el-table-column
          prop="url"
          label="动作视频"
          width="80"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleSeeVideo(scope.row.url)">预览</el-button>
          </template>
        </el-table-column>


        <el-table-column
          prop="guideUrl"
          label="引导视频"
          width="80"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleSeeVideo(scope.row.guideUrl)">预览</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="videoCover"
          label="视频封面"
          width="80"
        >
          <template slot-scope="scope">
            <!--          {{ scope.row.url }}-->
            <el-image
              v-if="scope.row.videoCover && scope.row.videoCover.length > 0"
              style="width: 24px; height: 24px"
              :src="scope.row.videoCover"
              :preview-src-list="[scope.row.videoCover]"
            />
          </template>
        </el-table-column>


        <el-table-column
          prop="videoTime"
          label="视频时长"
          width="80"
        >

        </el-table-column>


        <el-table-column
          prop="actionId"
          label="动作id"
          width="220"
        >
        </el-table-column>

      </el-table>
    </el-card>

    <pagination
      ref="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageCount"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :visible.sync="videoDialogVisible"
      width="60%"
    >
      <video controls width="100%" :src="videoDialogUrl" alt=""/>
    </el-dialog>
    <el-dialog
      :title="userInfoDialogType==='add'?'新增动作':'动作详情'"
      :visible.sync="userInfoDialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="160px" v-if="userInfoDialogVisible">
        <el-form-item label="动作名称">
          <el-col :span="8">
            <el-input v-model="form.actionName"></el-input>
          </el-col>


        </el-form-item>
        <el-form-item label="动作类型">
          <el-col :span="8">
            <el-select v-model="form.actionType" placeholder="请选择类型">
              <el-option v-for="item in typeOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="部位">
          <el-col :span="8">
            <el-select multiple v-model="form.partType" placeholder="请选择部位">
              <el-option v-for="item in partTypeOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="需要设备">
          <el-col :span="8">
            <el-select v-model="form.instrumentType" placeholder="请选择设备">
              <el-option v-for="item in instrumentTypeOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="主视频">
          <el-col :span="24">
            <upload
              :file="[{url:form.url}]"
              @getDuration="getDuration"
              file-type="video"
              :params="{dictionary:'videos'}"
              @handleUploadSuccess="handleUploadSuccessUrl"></upload>
          </el-col>
        </el-form-item>
        <el-form-item label="视频封面">
          <el-col :span="16">
            <upload
              :file="[{url:form.videoCover}]"
              :params="{dictionary:'covers'}"
              @handleUploadSuccess="handleUploadSuccessCover"
            ></upload>
          </el-col>
        </el-form-item>
        <el-form-item label="引导视频">
          <el-col :span="16">
            <upload
              :file="[{url:form.guideUrl}]"
              file-type="video"
              :params="{dictionary:'guides'}"
              @handleUploadSuccess="handleUploadSuccessGuide"
            ></upload>
          </el-col>
        </el-form-item>

        <el-form-item label="主视频时长">
          <el-col :span="6">
            <el-input v-model="form.videoTime"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="引导视频时长">
          <el-col :span="6">
            <el-input v-model="form.guideTime"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="userInfoDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="seat-100">

    </div>
  </div>
</template>

<script>
import Upload from '@/component/upload'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, deepClone } from '@/utils'
import { getListPage as getList, addData, upData, delData } from '@/api/video-Material'

const default_form = {
  actionName: '',
  actionType: '',
  partType: '',
  instrumentType: '',
  videoTime: '',
  restTime: '',
  url: '',
  videoCover: '',
  guideUrl: '',
  guideTime: ''
}

export default {
  name: 'Material',
  components: { Pagination, Upload },
  filters: {
    statusFilterType(status) {
      status = status || '0'
      const statusMap = {
        '0': 'danger',
        '1': 'success'
      }
      return statusMap[status]
    },
    statusFilterTitle(status) {
      status = status || '0'
      const statusMap = {
        '0': '冻结',
        '1': '正常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 10,
      userDataView: true,
      userInfoDialogVisible: false,
      userInfoDialogType: 'add', // add || edit
      form: Object.assign({}, default_form),
      listQuery: {
        actionName: '',
        actionType: '',
        partType: '',
        instrumentType: '',
        pageCount: 1,
        pageSize: 10,
      },
      tableData: [],
      typeOption: [
        {
          label: '热身',
          value: '热身'
        },
        {
          label: '有氧',
          value: '有氧'
        },
        {
          label: '柔韧',
          value: '柔韧'
        },
        {
          label: '抗阻',
          value: '抗阻'
        },
        {
          label: '平衡',
          value: '平衡'
        },
        {
          label: '放松',
          value: '放松'
        },
      ],
      partTypeOption: [

        {
          label: '无',
          value: '无'
        },
        {
          label: '上肢',
          value: '上肢'
        },
        {
          label: '下肢',
          value: '下肢'
        },
        {
          label: '核心',
          value: '核心'
        },
        {
          label: '肩颈',
          value: '肩颈'
        },
        {
          label: '全身',
          value: '全身'
        },
      ],
      instrumentTypeOption: [
        {
          label: '无',
          value: '无'
        },
        {
          label: '弹力带',
          value: '弹力带'
        },
        {
          label: '心电衣',
          value: '心电衣'
        },
      ],
      videoDialogVisible: false,
      videoDialogUrl: '',
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSeeVideo(url) {
      this.videoDialogVisible = true
      this.videoDialogUrl = url
    },
    getDuration(time) {
      this.form.videoTime = Math.ceil(time)
    },
    handleUploadSuccessUrl(res) {
      if (res[0].response.code === '200') {
        this.form.url = res[0].response.data
      }
    },
    handleUploadSuccessCover(res) {
      if (res[0].response.code === '200') {
        this.form.videoCover = res[0].response.data
      }
    },
    handleUploadSuccessGuide(res) {
      if (res[0].response.code === '200') {
        this.form.guideUrl = res[0].response.data
      }
    },
    handleInfo(row) {
      this.form = deepClone(row)
      console.log(this.form)
      this.form.partType = this.form.partType.split('、')
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'edit'
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        return new Promise((resolve, reject) => {
          delData({ actionId: row.actionId }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            this.userInfoDialogVisible = false
            this.getList()
            resolve(true)
          }).catch(() => {
            reject(false)
          })
        })
      })
    },
    handleAddUser() {
      this.form = Object.assign({}, default_form)
      this.userInfoDialogVisible = true
      this.userInfoDialogType = 'add'
    },
    async getList() {
      const data = await getList(this.listQuery)
      this.tableData = deepClone(data.data.records)
      this.total = data.data.total
    },
    toggleUserDataView() {
      this.userDataView = !this.userDataView
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.userInfoDialogType === 'add') {
            const list = []
            const data = deepClone(this.form)
            data.partType = data.partType.join('、')
            list.push(data)
            return new Promise((resolve, reject) => {
              addData(list).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.getList()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              const data = deepClone(this.form)
              data.partType = data.partType.join('、')
              upData(data).then(response => {
                console.log(response)
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.userInfoDialogVisible = false
                this.getList()
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          }

        } else {
          this.$message({
            message: '数据格式不对，请检查表单内标红提示！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
