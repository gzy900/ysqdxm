<!--
info:实名审核
author:wanq
time:2020-05-08 13:19:10
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="form-search">
          <el-select clearable v-model="listQuery.state" placeholder="请选择状态">
            <el-option
              v-for="item in setStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button
            type="primary"
            @click="handleSearch">搜索
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="dataList" style="width: 100%;margin-top:30px;" border>

      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">查看</el-button>
          <el-button type="success" size="small" @click="handleEditState(scope)">审核</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户真实姓名" width="160">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="140">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | stateFilterType">
            {{ scope.row.state | stateFilterName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号码" width="180">
        <template slot-scope="scope">
          {{ scope.row.cardId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证正面" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.frontPhoto"
            :preview-src-list="scope.row.frontPhoto | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证反面" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.reversePhoto"
            :preview-src-list="scope.row.reversePhoto | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手持身份证照片" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 30px; height: 30px"
            :src="scope.row.handPhoto"
            :preview-src-list="scope.row.handPhoto | photoList">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>

<!--      <el-table-column align="center" label="是否显示" width="140">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag :type="scope.row.audit | stateFilterType">-->
<!--            {{ scope.row.audit | stateFilterName }}-->
<!--          </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.submitTime | parseTime('{y}-{m}-{d}') }}
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

    <el-dialog :visible.sync="dialogVisible" :title="'查看详情'">
      <el-form ref="infoData" :model="infoData" label-width="120px" :rules="rules" label-position="right" disabled>

        <el-form-item label="ID：" prop="taocan_price">
          <el-col :span="16">
            <el-input v-model="infoData.uuid" />
          </el-col>
        </el-form-item>

        <el-form-item label="真实姓名：" prop="taocan_price">
          <el-col :span="8">
            <el-input v-model="infoData.name" />
          </el-col>
        </el-form-item>

        <el-form-item label="审核状态：" prop="taocan_price">
          <el-col :span="8">
            <el-select clearable v-model="infoData.state" placeholder="状态错误">
              <el-option
                v-for="item in setStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="提交时间：" prop="taocan_price">
          <el-col :span="16">
            <el-input v-model="infoData.submitTime" />
          </el-col>
        </el-form-item>

        <el-form-item label="身份证号码：" prop="taocan_price">
          <el-col :span="16">
            <el-input v-model="infoData.cardId" />
          </el-col>
        </el-form-item>

        <el-form-item label="身份证正面：" prop="taocan_price">
          <el-col :span="20">
            <el-image
              style="width: 200px; height: 200px"
              :src="infoData.frontPhoto"
              :preview-src-list="infoData.frontPhoto | photoList">
            </el-image>
          </el-col>
        </el-form-item>

        <el-form-item label="身份证反面：" prop="taocan_price">
          <el-col :span="20">
            <el-image
              style="width: 200px; height: 200px"
              :src="infoData.reversePhoto"
              :preview-src-list="infoData.reversePhoto | photoList">
            </el-image>
          </el-col>
        </el-form-item>

        <el-form-item label="用户手持身份证照片：" prop="taocan_price">
          <el-col :span="20">
            <el-image
              style="width: 200px; height: 200px"
              :src="infoData.handPhoto"
              :preview-src-list="infoData.handPhoto | photoList">
            </el-image>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">返回</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="stateDialogVisible" :title="'审核'">
      <el-form ref="fromData" :model="fromData" label-width="120px" :rules="rules" label-position="right">
        <el-input v-model="fromData.uuid" type="hidden" />
        <el-form-item label="选择：" prop="taocan_price">
          <el-col :span="20">
            <el-radio v-model="fromData.state" label="1">通过</el-radio>
            <el-radio v-model="fromData.state" label="2">不通过</el-radio>
<!--            <el-radio v-model="fromData.state" label="0">待定</el-radio>-->
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="stateDialogVisible=false">返回</el-button>
        <el-button type="primary" @click="editState('fromData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getAuthList, editNameState } from '@/api/app-user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


/**
 * 新增修改提交字段
 */
const defaultRow = {
  uuid: null,
  state: 1
}
const defaultInfo = {
  audit: '1',
  cardId: null,
  frontPhoto: null,
  handPhoto: null,
  name: null,
  reversePhoto: null,
  state: '1',
  submitTime: '2020-04-28 16:08:22',
  uuid: '101010101101'
}
/**
 * 新增修改提交字段
 */

export default {
  components: { Pagination },
  filters: {
    photoList(photo) {
      let photoList = []
      photoList.push(photo)
      return photoList
    },
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
  data() {
    return {
      fromData: Object.assign({}, defaultRow),
      infoData: Object.assign({}, defaultInfo),
      dataList: null,
      dialogVisible: false,
      stateDialogVisible: false,
      imageUrl: [],
      // 1，已经审核通过的，2，审核未通过的，3，未审核的用户
      setStateOptions: [
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核未通过',
          value: '2'
        },
        {
          label: '未审核',
          value: '3'
        }
      ],
      sex: null,
      sexOptions: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        }
      ],

      /**
       * 查询参数
       */
      listQuery: {
        pageNo: 1,
        number: 10,
        state: null
      },
      pageTotal: 0,
      /**
       * 表单验证
       */
      rules: {
        taocan_id: [
          { required: true, message: '请选择套餐', trigger: 'change' }
        ],
        counts: [
          { required: true, message: '请输入数量', trigger: 'blur' }
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
    this.getList()
  },
  methods: {
    async getList() {
      const les = await getAuthList(this.listQuery)
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
     * 打开编辑窗口
     */
    handleEdit(scope) {
      this.dialogVisible = true
      this.infoData = deepClone(scope.row)
    },
    /**
     * 打开审核窗口
     */
    handleEditState(scope) {
      this.stateDialogVisible = true
      this.fromData.uuid = scope.row.uuid
      this.fromData.state = scope.row.state
    },
    editState({ $index, row }) {
      this.$confirm('确定此操作吗?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await editNameState(this.fromData)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.stateDialogVisible = false
          this.getList()
        })
        .catch(err => { console.error(err) })
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
        .then(async() => {
          await deleteData(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
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
