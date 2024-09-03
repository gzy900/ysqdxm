<template>
  <div class="tag">
    <el-form ref="fromData" label-width="120px" label-position="right">
      <el-form-item label="词条搜索：">
        <el-row>
          <el-col :span="24">
            <select-tag
              :is-all="true"
              :list="list"
              :list-name="'ID/标题全局搜索'"
              @handleClick="handleClick"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="快速回复：">
        <div class="tag-simple">
          <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper"
          >
            <template v-for="item in dynamicTags">
              <select-tag
                :key="item.id"
                :list="item.list"
                :list-name="item.name"
                :type="'1'"
                @handleClick="handleClick"
                @handleAddEntry="handleAddEntry"
              />
            </template>

          </el-scrollbar>
        </div>
      </el-form-item>

      <el-form-item label="医生建议：">
        <div class="tag-simple">
          <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper"
          >
            <template v-for="item in dynamicTagsPop">
              <select-tag
                :key="item.id"
                :list="item.list"
                :type="'2'"
                :list-name="item.name"
                @handleClick="handleClick"
                @handleAddEntry="handleAddEntry"
              />
            </template>
          </el-scrollbar>
        </div>
      </el-form-item>

      <el-form-item label="初步诊断：">
        <div class="tag-import">
          <select-tag
            :is-import="true"
            :type="'0'"
            :list="dynamicTagsImport"
            :list-name="'初步诊断'"
            :import-list="importList"
            @handleClick="handleClick"
            @handleAddEntry="handleAddEntry"
          />
        </div>
      </el-form-item>
    </el-form>

    <el-dialog width="60%" append-to-body :visible.sync="dialogVisible" :title="'新建词条'">
      <reply-add v-if="dialogVisible" :tag-from="tagFrom" @closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { getList, addData, deleteData, getCategoryList } from '@/api/tag'
import { mapGetters } from 'vuex'
import SelectTag from './selectTag'
import ReplyAdd from '@/views/reply/reply-add'
export default {
  name: 'Tag',
  filters: {
    tagType(status) {
      const statusMap = {
        'select': 'warning'
      }
      return statusMap[status] || 'info'
    }
  },
  components: { SelectTag, ReplyAdd },
  props: {
    type: {
      type: Number,
      default: 0
    },
    isImport: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      dynamicTags: {},
      dynamicTagsImport: [],
      dynamicTagsPop: {},

      query: '',

      inputVisible: false,
      inputVisibleImport: false,
      inputVisiblePop: false,

      inputValue: '',
      inputImportValue: '',
      inputPopValue: '',

      listQuery: {
        pageNo: 1,
        pageSize: 1000
      },
      dialogVisible: false,
      importList: [],
      categorylist: [],
      tagFrom: {
        id: '',
        context: '',
        descs: '',
        component: '',
        doctorId: '',
        isImport: '',
        critical: '0',
        type: '',
        categoryId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'tagList'
    ])
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    // 获取 类别 信息
    getCategoryList() {
      getCategoryList({ pageNo: 1, pageSize: 100 })
        .then((response) => {
          this.categorylist = response.data.result
          this.getInfo()
        })
        .catch(err => {
          console.error(err)
        })
    },
    getInfo() {
      if (this.tagList && this.tagList.length > 0) {
        this.list = this.tagList
        this.washOption()
      } else {
        this.getList()
      }
    },
    // 请求接口
    getList() {
      getList({ ...this.listQuery, doctorId: this.userInfo.doctorId })
        .then((response) => {
          this.list = response.data.result
          this.washOption()
        })
        .catch(err => {
          console.error(err)
        })
    },

    washOption(list) {
      this.$store.dispatch('user/set_tag', this.list)
      list = list || this.list
      this.dynamicTags = {}
      this.dynamicTagsPop = {}
      this.dynamicTagsImport = []
      this.importList = []
      const imList = this.isImport.split('======')
      for (let i = 0; i < list.length; i++) {
        if (parseInt(this.type) === parseInt(list[i].type) || parseInt(list[i].type) === 0 || this.type === 0) {
          let category_id
          if (list[i].category_id) {
            category_id = list[i].category_id.toString()
          } else {
            category_id = '0'
          }
          let category_name
          if (category_id === '0') {
            category_name = '其他'
          }
          this.categorylist.forEach((item) => {
            if (item.id.toString() === category_id) {
              category_name = item.context
            }
          })

          if (list[i].isImport === '0') {
            list[i].isSelect = 'no'
            for (let j = 0; j < imList.length; j++) {
              if (list[i].context === imList[j]) {
                list[i].isSelect = 'select'
                this.importList.push(list[i].id)
              }
            }

            // if (!this.dynamicTagsImport[category_id]) {
            //   this.dynamicTagsImport[category_id] = {
            //     list: [],
            //     name: category_id,
            //     id: category_id,
            //     value: ''
            //   }
            // }
            // this.dynamicTagsImport[category_id].list.push(list[i])
            this.dynamicTagsImport.push(list[i])
          } else if (list[i].isImport === '2') {
            if (!this.dynamicTagsPop[category_id]) {
              this.dynamicTagsPop[category_id] = {
                list: [],
                name: category_name,
                id: category_id,
                value: ''
              }
            }
            this.dynamicTagsPop[category_id].list.push(list[i])

            // this.dynamicTagsPop.push(list[i])
          } else {
            if (!this.dynamicTags[category_id]) {
              this.dynamicTags[category_id] = {
                list: [],
                name: category_name,
                id: category_id,
                value: ''
              }
            }
            this.dynamicTags[category_id].list.push(list[i])
            // this.dynamicTags.push(list[i])
          }
        }
      }
    },

    handleClick(tag, isSelect, isImport) {
      let context = tag.descs || tag.context
      // if (tag.descs && tag.descs.length >= 0) {
      //   context += ' ( ' + tag.descs + ' ) '
      // }
      if (tag.critical === '1') {
        context += ' ！！=> 医生在您的本次报告中发现了一些患病风险，建议您近期前往医院做进一步的详细检查！ <=！！'
      }
      this.$emit('appendTag', { text: context, isSelect: isSelect, import: tag.context, isImport: isImport })
    },

    // 提交新增接口
    handleInputConfirm(isImport) {
      let inputValue
      if (isImport === '1') {
        inputValue = this.inputValue
        this.inputVisible = false
        this.inputValue = ''
      } else if (isImport === '2') {
        inputValue = this.inputPopValue
        this.inputVisiblePop = false
        this.inputPopValue = ''
      } else {
        inputValue = this.inputImportValue
        this.inputVisibleImport = false
        this.inputImportValue = ''
      }
      const tag_item = {
        context: inputValue,
        type: this.type,
        isImport: isImport,
        doctorId: this.userInfo.doctorId,
        describe: '',
        critical: '0'
      }
      if (inputValue) {
        addData(tag_item)
          .then((response) => {
            tag_item.id = response.data
            this.list.push(tag_item)
            this.washOption()
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    handleAddEntry(type, id) {
      this.tagFrom.categoryId = id
      this.tagFrom.isImport = type
      this.tagFrom.type = this.type.toString()
      this.dialogVisible = true
    },
    closeDialog(tag_item = null) {
      this.dialogVisible = false
      if (tag_item) {
        this.list.push(tag_item)
        this.washOption()
      }
    }
  }
}
</script>

<style lang="scss">
  .tag {
    .input-new-tag {
      .el-input__inner {
        height: 28px;
        line-height: 28px;
      }
    }
    .scrollbar-wrapper{
      overflow-x: hidden !important;
    }
  }
</style>

<style scoped lang="scss">
  .tag {

    .el-select{
      margin-bottom: 10px;
    }
  }

  .tag-import,.tag-simple{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .tag-simple{
    height: 160px;
  }
  .tag-import{
    height: auto;
  }
  .el-tag  {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .button-new-tag {
    height: 28px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: bottom;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .el-form-item{
    margin-bottom: 10px;
  }

  .input-new-tag {
    width: 90px;
    vertical-align: center;
    margin-right: 10px;
    margin-bottom: 10px;

  }

  .el-select-empty{
    width: 100%;
    height: auto;
    font-size: 12px;
    color: #a8a9a9;
    text-align: center;
    line-height: 40px;
    text-decoration: underline #a8a9a9;
    cursor: pointer;
  }
  .el-tag{
    cursor: pointer;
  }
</style>
