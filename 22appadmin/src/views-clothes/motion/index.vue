<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click="handleAdd">新增视频</el-button>
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
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="动作名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.actionName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="主视频" width="160">
        <template slot-scope="scope">
          <el-button v-if="scope.row.url" type="text" @click="handleOpenVideo(scope.row.url)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="引导视频" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.guideUrl" type="text" @click="handleOpenVideo(scope.row.guideUrl)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频封面" width="120">
        <template slot-scope="scope">
          <el-image style="width: 30px; height: 30px" :src="scope.row.videoCover" fit="contain'" :preview-src-list="[scope.row.videoCover]" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频时长">
        <template slot-scope="scope">
          {{ scope.row.videoTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="休息时长">
        <template slot-scope="scope">
          {{ scope.row.restTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" width="140">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageSize"
      :limit.sync="listQuery.pageNum"
      @pagination="getList"
    />

    <el-dialog
      :before-close="handleDialogClose"
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'查看修改':'新增'"
    >
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.taocan_id" type="hidden"/>
        <el-form-item label="动作名称：" prop="actionName">
          <el-col :span="10">
            <el-input v-model="fromData.actionName" placeholder="请输入动作名称"/>
          </el-col>
        </el-form-item>
        <el-form-item label="主视频：" prop="url">
          <el-col :span="10">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="actionUrl+'/upload/upload'"
              name="files"
              :data="fileData"
              :show-file-list="false"
              :headers="headers"
              auto-upload
              :on-success="handleUrlSuccess"
              :on-change="handleUrlChange">
              <div
                v-if="fromData.url"
                class="upload-body"
                @click.stop
              >
                <div style="width: 100%;height: 100%;background: #c0ccda;display: flex;align-content: center">
                  <video ref="video" width="100%" :src="fromData.url"></video>
                  <!--                @canplay="getDuration"-->
                </div>
                <div class="upload-mask">
                  <el-button type="text">
                    预览
                  </el-button>
                  <el-button type="text">
                    重选
                  </el-button>
                  <el-button @click="handleRemoveUrl" type="text">
                    删除
                  </el-button>
                </div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <!--              <img v-if="fromData.url" :src="fromData.url" class="avatar">-->
            </el-upload>
          </el-col>
        </el-form-item>

        <el-form-item label="引导视频：" prop="guideUrl">
          <el-col :span="10">

            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="actionUrl+'/upload/upload'"
              name="files"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleGuideUrlSuccess"
              auto-upload
              :on-change="handleGuideUrlChange">

              <div
                v-if="fromData.guideUrl"
                class="upload-body"
                @click.stop
              >
                <div style="width: 100%;height: 100%;background: #c0ccda;display: flex;align-content: center">
                  <video ref="video" width="100%" :src="fromData.guideUrl"></video>
                  <!--                @canplay="getDuration"-->
                </div>
                <div class="upload-mask">
                  <el-button type="text">
                    预览
                  </el-button>
                  <el-button type="text">
                    重选
                  </el-button>
                  <el-button @click="handleRemoveUrl" type="text">
                    删除
                  </el-button>
                </div>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--            <el-input v-model="fromData.guideUrl" placeholder="请输入所属机构" disabled/>-->
          </el-col>
        </el-form-item>

        <el-form-item label="视频封面：" prop="videoCover">
          <el-col :span="24">

            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="actionUrl+'/upload/upload'"
              name="files"
              :data="fileData"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleVideoCoverSuccess"
              :auto-upload="true"
              :on-change="handleVideoCoverChange">
              <div v-if="fromData.videoCover" class="upload-body-img">
                <img :src="fromData.videoCover"/>
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!--            <el-input v-model="fromData.videoCover" placeholder=""/>-->
          </el-col>
        </el-form-item>

        <el-form-item label="视频时长：" prop="videoTime">
          <el-col :span="24">
            <el-input v-model="fromData.videoTime" placeholder="请输入视频时长"/>
          </el-col>
        </el-form-item>

        <el-form-item label="休息时长：" prop="restTime">
          <el-col :span="24">
            <el-input v-model="fromData.restTime" placeholder="请输入休息时长"/>
          </el-col>
        </el-form-item>
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
import { getList, addData, upData } from '@/api/clothes/motion'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 * @type {{routes: [], name: string, description: string, key: string}}
 */
const defaultRow = {
  /**
   * 动作名称
   */
  actionName: '',
  /**
   * 引导视频地址
   */
  guideUrl: '',
  /**
   * 休息时长，单位秒
   */
  restTime: '',
  /**
   * 主视频地址
   */
  url: '',
  /**
   * 视频封面
   */
  videoCover: '',
  /**
   * 视频时长，单位秒
   */
  videoTime: ''
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
      dialogVisibleVideo: false,
      dialogVideoUrl: '',
      actionUrl: process.env.VUE_APP_BASE_API_Clothes,
      imageUrl: '',
      fileData: {
        uuid: 'admin'
      },
      headers: {
        Authorization: 'test',
        web: 'web'
      },
      fromData: Object.assign({}, defaultRow),
      dataList: null,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },

      /**
       * 分页参数
       */
      listQuery: {
        pageSize: 1,
        pageNum: 10
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        actionName: [
          { required: true, message: '请输入动作名称', trigger: 'blur' },
          { min: 2, max: 16, message: '请输入 2 至 16 个字 ', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请上传主视频', trigger: 'blur' }
        ],
        guideUrl: [
          { required: true, message: '请上传引导视频', trigger: 'blur' }
        ],
        videoCover: [
          { required: true, message: '请上传视频封面', trigger: 'blur' }
        ],
        videoTime: [
          { required: true, message: '请输入视频时长', trigger: 'blur' }
        ],
        restTime: [
          { required: true, message: '请输入休息时长', trigger: 'blur' }
        ],
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
    this.getList()
  },
  methods: {
    handleOpenVideo(url) {
      this.dialogVisibleVideo = true
      this.dialogVideoUrl = url
    },
    handleRemoveUrl() {
      this.fromData.url = ''
    },
    handleUrlSuccess(res) {
      if (res.code === '200') {
        this.fromData.url = res.data
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'danger'
        })
      }
    },
    handleUrlChange(file) {
      console.log(123)
      console.log(file)
      // this.fromData.url = URL.createObjectURL(file.raw)
    },
    handleGuideUrlSuccess(res) {
      if (res.code === '200') {
        this.fromData.guideUrl = res.data
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'danger'
        })
      }
    },
    handleGuideUrlChange(file) {
      console.log(123)
      console.log(file)
      // this.fromData.url = URL.createObjectURL(file.raw)
    },
    handleVideoCoverSuccess(res) {
      if (res.code === '200') {
        this.fromData.videoCover = res.data
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'danger'
        })
      }
    },
    handleVideoCoverChange(file) {
      console.log(123)
      console.log(file)
      // this.fromData.url = URL.createObjectURL(file.raw)
    },
    async getList() {
      const res = await getList(this.listQuery)
      this.dataList = res.data.records
      this.pageTotal = res.data.total
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
      this.dialogVisible = true
      this.checkStrictly = true
      this.fromData = deepClone(scope.row)
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
          await deleteData({ 'id': row.id })
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
    handleConfirmData(formName) {
      return new Promise((resolve, reject) => {
        if (this.fromData.id !== '' && this.fromData.id !== null && this.fromData.id !== undefined) {
          upData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$message({
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$message({
                  title: response.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              reject(error)
            })
        } else {
          delete this.fromData.id
          addData(this.fromData)
            .then(response => {
              if (response.data) {
                this.dialogVisible = false
                this.$message({
                  title: response.message,
                  type: 'success'
                })
                this.getList()
              } else {
                this.$message({
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

.upload-body-img {
  width: 178px;
  height: 178px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-body-img img {
  width: 100%;
}

.upload-body {
  width: 178px;
  height: 178px;
  overflow: hidden;
  position: relative;
}

.upload-body:hover .upload-mask {
  opacity: 1;
}

.upload-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, .7);
  opacity: 0;
}

</style>
