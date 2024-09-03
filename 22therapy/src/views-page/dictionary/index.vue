<template>
  <div>
    <div class="page-header">
    </div>

    <el-card class="page-content">
      <el-tree
        :data="data"
        show-checkbox
        node-key="did"
        :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="tree-title">{{ data.field }}</span>
          <span class="tree-remark">{{ data.remark }}</span>
          <span class="tree-remark-info" v-if="data.remark&&data.remark.length>25">[详情]</span>
          <span>
            <template v-if="data.field!=='根节点'">
              <el-tag
                type="warning"
                size="mini"
                @click.stop="() => handleUp(data)">
                修改
              </el-tag>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(data)"
              >
                <el-tag
                  slot="reference"
                  type="danger"
                  size="mini"
                  @click.stop
                >
                  删除
                </el-tag>
              </el-popconfirm>
            </template>
            <el-tag
              type="primary"
              size="mini"
              @click.stop="() => handleAdd(data)">
              新增子节点
            </el-tag>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-dialog
      :title="dialogType==='add'?'新增字典':'修改字典'"
      :visible.sync="dialogVisible"
      width="60%"
      top="5vh"
      custom-class="workbench"
    >
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="字典名称">
          <el-col :span="16">
            <el-input v-model="form.field"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="字典说明">
          <el-col :span="16">
            <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {parseTime, deepClone} from '@/utils'
import {getList, addData, upData, delData} from '@/api/dictionary'

const default_form = {
  did: '',
  parentId: '',
  field: '',
  remark: '',
}
export default {
  name: 'Dictionary',
  components: {Pagination},
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
      data: [
        {
          did: '0',
          field: '根节点',
          children: []
        }
      ],
      props: {
        label: 'field',
      },
      dialogVisible: false,
      dialogType: 'add', // add || edit
      form: Object.assign({}, default_form),
      listQuery: {
        parentId: '0',
      },
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await getList(this.listQuery)
      this.data[0].children = deepClone(data.data)
    },
    handleAdd(data) {
      this.form = Object.assign({}, default_form)
      this.form.parentId = data.did
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    handleUp(data) {
      data = data || {}
      Object.keys(this.form).forEach(key => {
        this.form[key] = data[key] === undefined ? this.form[key] : data[key]
      })
      this.dialogVisible = true
      this.dialogType = 'edit'
    },
    handleDelete(data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        delData({did: data.did}).then(response => {
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.getList()
          this.dialogVisible = false
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            delete this.form.did
            return new Promise((resolve, reject) => {
              addData(this.form).then(response => {
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.getList()
                this.dialogVisible = false
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          } else {
            return new Promise((resolve, reject) => {
              upData(this.form).then(response => {
                this.getList()
                this.dialogVisible = false
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
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
    },
  }
}
</script>
<style>
.el-tree-node__content {
  height: 34px;
}
</style>

<style scoped lang="scss">
.el-tag.el-tag {
  margin-right: 10px;
}

.tree-title {
  font-size: 14px;
  padding-right: 20px;
}

.tree-remark-info {
  font-size: 12px;
  color: #1890ff;
  margin-left: -30px;
  margin-right: 30px;
  vertical-align: text-bottom;

}

.tree-remark {
  font-size: 12px;
  margin-right: 30px;
  max-width: 300px;
  overflow: hidden;
  display: inline-block;
  vertical-align: text-bottom;
  text-overflow: ellipsis;
}
</style>

