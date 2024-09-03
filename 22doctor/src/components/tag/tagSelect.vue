<template>
  <div class="tagSelect">
    <el-form ref="fromData" label-width="120px" label-position="right">
      <el-form-item label="词条搜索：">
        <el-row>
          <el-col :span="24">
            <el-select v-model="optionValue1" filterable placeholder="词条搜索 ID / 词条">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="疾病术语：">
        <div class="tag-simple">
          <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper"
          >

            <el-select v-model="optionValue2" filterable placeholder="房颤相关术语" @change="handleOptionChange">
              <div slot="empty" class="el-select-empty" @click="handleAddEntry">没有相关词条，去创建</div>
              <el-option
                value="新建词条"
              >
                <span style="float: left;color: #8492a6;text-decoration:underline;font-weight: bold">新建词条</span>
              </el-option>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="窦性心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="心肌缺血相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select v-model="optionValue1" filterable placeholder="正常心律相关术语">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-scrollbar>
        </div>
      </el-form-item>

      <el-form-item label="关怀问候：">
        <div class="tag-simple">
          <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper"
          >
            <el-select v-model="optionValue1" filterable placeholder="开头结束相关问候">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="optionValue1" filterable placeholder="康复建议相关问候">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-scrollbar>
        </div>
      </el-form-item>

      <el-form-item label="初步诊断：">
        <div class="tag-simple">
          <el-scrollbar
            style="height: 100%;"
            wrap-class="scrollbar-wrapper"
          >

            <el-select v-model="optionValue1" filterable placeholder="诊断结果">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-scrollbar>
        </div>
      </el-form-item>

    </el-form>

    <el-dialog :visible.sync="dialogVisible" title="新增" append-to-body @close="closeDialog">
      <div>
        此处输入新增词条
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addData, deleteData } from '@/api/tag'
import { mapGetters } from 'vuex'
export default {
  name: 'TagSelect',
  filters: {
  },
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
      query: '',
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optionValue1: '',
      optionValue2: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'tagList'
    ])
  },
  mounted() {
    // this.getInfo()
  },
  methods: {
    handleQueryChange() {

    },
    handleOptionChange(value) {
      if (value === '新建词条') {
        this.dialogVisible = true
      }
      this.optionValue2 = ''
    },
    closeDialog() {
      this.chartType = '当前数据'
    },
    handleAddEntry() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
  .tag-simple{
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
  }
</style>

<style scoped lang="scss">
  .tagSelect{

    .el-select{
      margin-bottom: 10px;
    }
    .tag-simple{
      height: 160px;
      overflow: hidden;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
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

</style>

<!--<template>-->
<!--  <div class="tag">-->
<!--    <el-form ref="fromData" label-width="120px" label-position="right">-->
<!--      <el-form-item label="词条搜索：">-->
<!--        <el-row>-->
<!--          <el-col :span="24">-->
<!--            <el-input-->
<!--              placeholder="请输入词条 ID / 标题 / 描述"-->
<!--              v-model="query"-->
<!--              @input="handleQueryChange"-->
<!--              clearable/>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="快速回复：">-->
<!--        <div class="tag-simple">-->
<!--          <el-scrollbar-->
<!--            style="height: 100%;"-->
<!--            wrap-class="scrollbar-wrapper"-->
<!--          >-->
<!--            <el-input-->
<!--              class="input-new-tag"-->
<!--              v-if="inputVisible"-->
<!--              v-model="inputValue"-->
<!--              ref="saveTagInput"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm('1')"-->
<!--              @blur="handleInputConfirm('1')"-->
<!--            >-->
<!--            </el-input>-->
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>-->

<!--            <el-tag-->
<!--              v-for="tag in dynamicTags"-->
<!--              :key="tag.id"-->
<!--              closable-->
<!--              :disable-transitions="false"-->
<!--              @close="handleClose(tag,1)"-->
<!--              @click="handleClick(tag,1)"-->
<!--            >-->
<!--              {{ tag.context }}-->
<!--            </el-tag>-->
<!--          </el-scrollbar>-->
<!--        </div>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="医生建议：">-->
<!--        <div class="tag-import">-->
<!--          <el-scrollbar-->
<!--            style="height: 100%;"-->
<!--            wrap-class="scrollbar-wrapper"-->
<!--          >-->
<!--            <el-input-->
<!--              class="input-new-tag"-->
<!--              v-if="inputVisiblePop"-->
<!--              v-model="inputPopValue"-->
<!--              ref="showInputImport"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm('2')"-->
<!--              @blur="handleInputConfirm('2')"-->
<!--            >-->
<!--            </el-input>-->
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInputPop">+ 添加标签</el-button>-->

<!--            <el-tag-->
<!--              v-for="(tag, index) in dynamicTagsPop"-->
<!--              :key="tag.id"-->
<!--              closable-->
<!--              :disable-transitions="false"-->
<!--              @close="handleClose(tag,2)"-->
<!--              @click="handleClick(tag,2, index)"-->
<!--            >-->
<!--              {{ tag.context }}-->
<!--            </el-tag>-->
<!--          </el-scrollbar>-->
<!--        </div>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="初步诊断：">-->
<!--        <div class="tag-import">-->
<!--          <el-scrollbar-->
<!--            style="height: 100%;"-->
<!--            wrap-class="scrollbar-wrapper"-->
<!--          >-->
<!--            <el-input-->
<!--              class="input-new-tag"-->
<!--              v-if="inputVisibleImport"-->
<!--              v-model="inputImportValue"-->
<!--              ref="showInputImport"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm(0)"-->
<!--              @blur="handleInputConfirm(0)"-->
<!--            >-->
<!--            </el-input>-->
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInputImport">+ 添加标签</el-button>-->

<!--            <el-tag-->
<!--              v-for="(tag, index) in dynamicTagsImport"-->
<!--              :key="tag.id"-->
<!--              closable-->
<!--              :type="tag.isSelect | tagType"-->
<!--              :disable-transitions="false"-->
<!--              @close="handleClose(tag,0)"-->
<!--              @click="handleClick(tag,0, index)"-->
<!--            >-->
<!--              {{ tag.context }}-->
<!--            </el-tag>-->
<!--          </el-scrollbar>-->
<!--        </div>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import { getList, addData, deleteData } from '@/api/tag'-->
<!--  import { mapGetters } from 'vuex'-->
<!--  export default {-->
<!--    filters: {-->
<!--      tagType(status) {-->
<!--        const statusMap = {-->
<!--          'select': 'warning'-->
<!--        }-->
<!--        return statusMap[status] || 'info'-->
<!--      }-->
<!--    },-->
<!--    name: 'Tag',-->
<!--    props: {-->
<!--      type: {-->
<!--        type: Number,-->
<!--        default: 0-->
<!--      },-->
<!--      isImport: {-->
<!--        type: String,-->
<!--        default: ''-->
<!--      }-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        list: [],-->
<!--        dynamicTags: [],-->
<!--        dynamicTagsImport: [],-->
<!--        dynamicTagsPop: [],-->

<!--        query: '',-->

<!--        inputVisible: false,-->
<!--        inputVisibleImport: false,-->
<!--        inputVisiblePop: false,-->

<!--        inputValue: '',-->
<!--        inputImportValue: '',-->
<!--        inputPopValue: '',-->

<!--        listQuery: {-->
<!--          pageNo: 1,-->
<!--          pageSize: 1000-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--      ...mapGetters([-->
<!--        'userInfo',-->
<!--        'tagList'-->
<!--      ]),-->
<!--    },-->
<!--    mounted() {-->
<!--      this.getInfo()-->
<!--    },-->
<!--    methods: {-->
<!--      getInfo() {-->
<!--        if (this.tagList && this.tagList.length > 0) {-->
<!--          this.list = this.tagList-->
<!--          this.washOption()-->
<!--        } else {-->
<!--          this.getList()-->
<!--        }-->
<!--      },-->
<!--      getList() {-->
<!--        getList({ ...this.listQuery, doctorId: this.userInfo.doctorId })-->
<!--          .then((response) => {-->
<!--            this.list = response.data.result-->
<!--            this.washOption()-->
<!--          })-->
<!--          .catch(err => {-->
<!--            console.error(err)-->
<!--          })-->
<!--      },-->
<!--      handleQueryChange() {-->
<!--        if (!this.query) {-->
<!--          this.washOption(list)-->
<!--          return-->
<!--        }-->
<!--        const list = []-->
<!--        for (const item in this.list) {-->
<!--          // 如果id 完全符合,填入 list 并结束循环，避免重复添加，以下同是如此-->
<!--          if (parseInt(this.list[item].id) === parseInt(this.query)) {-->
<!--            list.push(this.list[item])-->
<!--            continue-->
<!--          }-->
<!--          // 如果 context (标题) 模糊符合 填入list-->
<!--          if (this.list[item].context && this.list[item].context.indexOf(this.query) >= 0) {-->
<!--            list.push(this.list[item])-->
<!--            continue-->
<!--          }-->
<!--          // 如果 descs (描述) 模糊符合 填入list-->
<!--          if (this.list[item].descs && this.list[item].descs.indexOf(this.query) >= 0) {-->
<!--            list.push(this.list[item])-->
<!--            continue-->
<!--          }-->
<!--        }-->
<!--        this.washOption(list)-->
<!--      },-->
<!--      handleChange(change) {-->
<!--      },-->
<!--      washOption(list) {-->
<!--        this.$store.dispatch('user/set_tag', this.list)-->
<!--        list = list || this.list-->
<!--        this.dynamicTags = []-->
<!--        this.dynamicTagsPop = []-->
<!--        this.dynamicTagsImport = []-->
<!--        const imList = this.isImport.split('======')-->
<!--        for (let i = 0; i < list.length; i++) {-->
<!--          if (parseInt(this.type) === parseInt(list[i].type) || parseInt(list[i].type) === 0 || this.type === 0) {-->
<!--            if (list[i].isImport === '0') {-->
<!--              list[i].isSelect = 'no'-->
<!--              for (let j = 0; j < imList.length; j++) {-->
<!--                if (list[i].context === imList[j]) {-->
<!--                  list[i].isSelect = 'select'-->
<!--                }-->
<!--              }-->
<!--              this.dynamicTagsImport.push(list[i])-->
<!--            } else if (list[i].isImport === '2') {-->
<!--              this.dynamicTagsPop.push(list[i])-->
<!--            } else {-->
<!--              this.dynamicTags.push(list[i])-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      },-->

<!--      handleClick(tag, isImport, index) {-->
<!--        let isSelect = ''-->
<!--        if (isImport === 0) {-->
<!--          if (this.dynamicTagsImport[index].isSelect === 'select') {-->
<!--            this.dynamicTagsImport[index].isSelect = 'no'-->
<!--            isSelect = 'no'-->
<!--          } else {-->
<!--            this.dynamicTagsImport[index].isSelect = 'select'-->
<!--            isSelect = 'select'-->
<!--          }-->
<!--        }-->
<!--        let context = tag.context-->
<!--        if (tag.descs && tag.descs.length >= 0) {-->
<!--          context += ' ( ' + tag.descs + ' ) '-->
<!--        }-->
<!--        if (tag.critical === '1') {-->
<!--          context += ' ！！=> 医生在您的本次报告中发现了一些患病风险，建议您近期前往医院做进一步的详细检查！ <=！！'-->
<!--        }-->
<!--        this.$emit('appendTag', { text: context, isImport: isImport, isSelect: isSelect, import: tag.context })-->
<!--      },-->
<!--      handleClose(tag, isImport) {-->
<!--        deleteData({ id: tag.id })-->
<!--          .then((response) => {-->
<!--            // if (isImport === 1) {-->
<!--            //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)-->
<!--            // } else if (isImport === 2) {-->
<!--            //   this.dynamicTagsPop.splice(this.dynamicTagsPop.indexOf(tag), 1)-->
<!--            // } else {-->
<!--            //   this.dynamicTagsImport.splice(this.dynamicTagsImport.indexOf(tag), 1)-->
<!--            // }-->
<!--            this.list.splice(this.list.indexOf(tag), 1)-->
<!--            this.washOption()-->
<!--            this.$notify({-->
<!--              title: '成功',-->
<!--              message: '删除成功',-->
<!--              type: 'success'-->
<!--            })-->
<!--          })-->
<!--          .catch(err => {-->
<!--            console.error(err)-->
<!--          })-->
<!--      },-->

<!--      showInput() {-->
<!--        this.inputVisible = true-->
<!--        this.$nextTick(_ => {-->
<!--          this.$refs.saveTagInput.$refs.input.focus()-->
<!--        })-->
<!--      },-->

<!--      showInputImport() {-->
<!--        this.inputVisibleImport = true-->
<!--        this.$nextTick(_ => {-->
<!--          this.$refs.showInputImport.$refs.input.focus()-->
<!--        })-->
<!--      },-->

<!--      showInputPop() {-->
<!--        this.inputVisiblePop = true-->
<!--        this.$nextTick(_ => {-->
<!--          this.$refs.showInputImport.$refs.input.focus()-->
<!--        })-->
<!--      },-->

<!--      handleInputConfirm(isImport) {-->
<!--        let inputValue-->
<!--        if (isImport === '1') {-->
<!--          inputValue = this.inputValue-->
<!--          this.inputVisible = false-->
<!--          this.inputValue = ''-->
<!--        } else if (isImport === '2') {-->
<!--          inputValue = this.inputPopValue-->
<!--          this.inputVisiblePop = false-->
<!--          this.inputPopValue = ''-->
<!--        } else {-->
<!--          inputValue = this.inputImportValue-->
<!--          this.inputVisibleImport = false-->
<!--          this.inputImportValue = ''-->
<!--        }-->
<!--        const tag_item = {-->
<!--          context: inputValue,-->
<!--          type: this.type,-->
<!--          isImport: isImport,-->
<!--          doctorId: this.userInfo.doctorId,-->
<!--          describe: '',-->
<!--          critical: '0'-->
<!--        }-->
<!--        if (inputValue) {-->
<!--          addData(tag_item)-->
<!--            .then((response) => {-->
<!--              tag_item.id = response.data-->
<!--              this.list.push(tag_item)-->
<!--              this.washOption()-->
<!--              this.$notify({-->
<!--                title: '成功',-->
<!--                message: '新增成功',-->
<!--                type: 'success'-->
<!--              })-->
<!--            })-->
<!--            .catch(err => {-->
<!--              console.error(err)-->
<!--            })-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .tag {-->
<!--    .input-new-tag {-->
<!--      .el-input__inner {-->
<!--        height: 28px;-->
<!--        line-height: 28px;-->
<!--      }-->
<!--    }-->
<!--    .scrollbar-wrapper{-->
<!--      overflow-x: hidden !important;-->
<!--    }-->
<!--  }-->
<!--</style>-->

<!--<style scoped lang="scss">-->
<!--  .tag {-->

<!--  }-->

<!--  .tag-import,.tag-simple{-->
<!--    height: 160px;-->
<!--    overflow: hidden;-->
<!--    margin-bottom: 10px;-->
<!--  }-->
<!--  .el-tag  {-->
<!--    margin-right: 10px;-->
<!--    margin-bottom: 10px;-->
<!--  }-->

<!--  .button-new-tag {-->
<!--    height: 28px;-->
<!--    line-height: 24px;-->
<!--    padding-top: 0;-->
<!--    padding-bottom: 0;-->
<!--    vertical-align: bottom;-->
<!--    margin-bottom: 10px;-->
<!--    margin-right: 10px;-->
<!--  }-->

<!--  .el-form-item{-->
<!--    margin-bottom: 10px;-->
<!--  }-->

<!--  .input-new-tag {-->
<!--    width: 90px;-->
<!--    vertical-align: center;-->
<!--    margin-right: 10px;-->
<!--    margin-bottom: 10px;-->

<!--  }-->
<!--  .el-tag{-->
<!--    cursor: pointer;-->
<!--  }-->
<!--</style>-->

