<!--
info:
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <!--      <el-col :span="4">-->
      <!--        <el-button type="primary" @click="handleAdd">新建</el-button>-->
      <!--      </el-col>-->
      <el-col :span="24">
        <div class="from-search">
          <p class="from-search-button">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </p>
          <el-row class="from-search-content" type="flex" justify="end" :gutter="10">
            <el-col :span="5" />
            <el-col :span="5">
              <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
                <el-option
                  v-for="item in stateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input v-model="listQuery.content" clearable placeholder="请输入手机号或昵称" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='1'" type="danger" size="small" @click="handleDel(scope,'0')">冻结</el-button>
          <el-button v-else type="warning" size="small" @click="handleDel(scope,'1')">解冻</el-button>
          <el-button type="" size="small" @click="handleUp(scope)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateTypeFilter">
            {{ scope.row.state | stateNameFilter }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称" width="140">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号" width="140">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="生日" width="140">
        <template slot-scope="scope">
          {{ scope.row.birthdate }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别" width="140">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="80">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.photo"
            style="width: 30px; height: 30px;vertical-align:middle"
            :src="scope.row.photo"
            :preview-src-list="[scope.row.photo]"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.registerTime }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="pageTotal > 0"
      :total="pageTotal"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.number"
      @pagination="getList"
    />
    <!--    //审核-->
    <el-dialog width="60%" :visible.sync="dialogVisible" :title="'新增/修改'" @close="closeDialog">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="dialogVisibleType==='add'?rules:rulesUp" label-position="right">
        <el-form-item label="昵称：" prop="title">
          <el-col :span="10">
            <el-input v-model="fromData.username" placeholder="请输入视频标题" />
          </el-col>
        </el-form-item>
        <el-form-item label="性别：" prop="creator">
          <el-col :span="10">
            <el-select v-model="fromData.sex" clearable placeholder="请选择状态">
              <el-option
                v-for="item in sexOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="生日：" prop="title">
          <el-col :span="10">
            <el-date-picker
              v-model="fromData.birthdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
            <!--            <el-input v-model="fromData.birthdate" placeholder="请输入视频地址" />-->
          </el-col>
        </el-form-item>
        <el-form-item label="状态：" prop="title">
          <el-col :span="10">
            <el-select v-model="fromData.state" clearable placeholder="请选择状态">
              <el-option
                v-for="item in stateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="头像：" prop="photo">
          <el-col :span="10">
            <el-upload
              class="avatar-uploader"
              name="files"
              :action="base_api+'/app/users/upload'"
              :show-file-list="false"
              :headers="upload_header"
              :data="upload_data"
              :on-success="handleSuccess_background_photo"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="fromData.photo" :src="fromData.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
        </el-form-item>

        <!--        <el-form-item label="描述：">-->
        <!--          <el-col :span="18">-->
        <!--            <el-input-->
        <!--              type="textarea"-->
        <!--              :rows="4"-->
        <!--              v-model="fromData.descs"-->
        <!--              placeholder="请输入描述" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
      </el-form>
      <div style="text-align: left;margin-left: 120px">
        <el-button type="primary" @click="handleConfirmData('fromData')">提交</el-button>
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, upData } from '@/api/user-manager-app'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { deepClone } from '../../utils' // Secondary package based on el-pagination

/**
 * 新增修改提交字段
 */

const defaultRow = {
  photo: '',
  username: '',
  sex: '',
  state: '',
  birthdate: ''
}

export default {
  components: { Pagination },
  filters: {
    stateNameFilter(status) {
      const statusMap = {
        '1': '正常',
        '0': '冻结'
      }
      return statusMap[status]
    },
    stateTypeFilter(status) {
      const statusMap = {
        '1': '',
        '0': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      dataList: [],
      dialogVisible: false,
      dialogVisibleType: 'add',
      // base_api: process.env.VUE_APP_BASE_API,
      base_api: process.env.VUE_APP_BASE_API,
      upload_header: {
        distinction: '3',
        token: this.$store.getters.token
      },
      upload_data: {
        state: '1'
      },
      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        content: '',
        state: ''
      },
      pageTotal: 0,
      // 0，管理员，1，普通角色，2，操作员，3，审计员
      stateOption: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '冻结',
          value: '0'
        }
      ],
      sexOption: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],
      /**
       * 表单验证
       */
      // add 表单验证
      rules: {
        path: [
          { required: true, message: '请上传视频', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        creator: [
          { required: true, message: '请填入创建人', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入视频标题', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择视频所属医院', trigger: 'blur' }
        ]
      },
      // 更新表单验证
      rulesUp: {
        path: [
          { required: false, message: '请上传视频', trigger: 'blur' }
        ],
        state: [
          { required: false, message: '请选择状态', trigger: 'blur' }
        ],
        creator: [
          { required: false, message: '请填入创建人', trigger: 'blur' }
        ],
        title: [
          { required: false, message: '请输入视频标题', trigger: 'blur' }
        ],
        department: [
          { required: false, message: '请选择视频所属医院', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
    ]),
    re_department() {
      let reList = []
      const hospitalId = this.fromData.department
      for (let j = 0; j < this.region_option.length; j++) {
        const cityList = this.region_option[j].list || []
        if (cityList.length > 0) {
          for (let k = 0; k < cityList.length; k++) {
            const hospitalList = cityList[k].list || []
            for (let h = 0; h < hospitalList.length; h++) {
              if (hospitalId === hospitalList[h].pid) {
                reList = [this.region_option[j].pid, cityList[k].pid, hospitalId]
              }
            }
          }
        }
      }
      return reList
    }
  },
  created() {
    this.getList()
  },
  methods: {

    // 查询
    async getList() {
      const les = await getList(this.listQuery)
      this.dataList = les.data.dataList
      this.pageTotal = les.data.count
    },

    /**
     * 搜索查询
     */
    handleSearch() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    /**
     * 提交
     */
    handleAdd() {
      this.dialogVisibleType = 'add'
      this.dialogVisible = true

      this.$nextTick(() => {
        this.fromData = Object.assign({}, defaultRow)
        this.$refs['fromData'].resetFields()
      })
    },
    handleUp({ $index, row }) {
      this.fromData = deepClone(row)
      this.dialogVisibleType = 'up'
      this.dialogVisible = true
    },
    handleDel({ $index, row }, type) {
      this.$confirm('确定' + (type === '1' ? '解冻' : '冻结') + '该账户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await upData({ id: row.id, state: type })
          this.$notify({
            type: 'success',
            message: '修改成功!'
          })
          this.getList()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 新增 修改信息
    handleConfirmData(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          return
        }
        return new Promise((resolve, reject) => {
          if (this.dialogVisibleType === 'add') {
            console.log('add')
            // addData(this.fromData)
            //   .then(response => {
            //     if (response.data) {
            //       this.dialogVisible = false
            //       this.$notify({
            //         title: '提交成功!',
            //         type: 'success'
            //       })
            //       this.getList()
            //     } else {
            //       this.$notify({
            //         title: '错误，请联系管理员！',
            //         type: 'error'
            //       })
            //     }
            //   })
            //   .catch(error => {
            //     reject(error)
            //   })
          } else {
            upData(this.fromData)
              .then(response => {
                if (response.data) {
                  this.dialogVisible = false
                  this.$notify({
                    title: '提交成功',
                    type: 'success'
                  })
                  this.getList()
                } else {
                  this.$notify({
                    title: '错误，请联系管理员！',
                    type: 'error'
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          }
        })
      })
    },
    handleSuccess_background_photo(res, file) {
      this.fromData.photo = res.data.photos
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    regionChange(val) {
      this.fromData.department = val[val.length - 1]
    },
    regionListQueryChange(val) {
      this.listQuery.department = val[val.length - 1]
    },

    closeDialog() {
      this.dialogVisibleType = 'up'
      this.fromData = Object.assign({}, defaultRow)
      this.$refs['fromData'].resetFields()
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
  .el-tag-div{
    padding: 10px 0;
    margin-left: 120px;
  }

</style>
