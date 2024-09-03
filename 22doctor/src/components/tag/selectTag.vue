<template>

  <el-select
    v-if="isImport"
    v-model="valueList"
    filterable
    multiple
    :placeholder="listName"
    :filter-method="handleSearch"
    @change="handleOptionChange"
  >
    <!--    @blur="handleBlur"-->
    <!--    @remove-tag="handleRemoveSelect"-->

    <div slot="empty" class="el-select-empty" @click="handleAddEntry">没有相关词条，去创建</div>
    <el-option
      value="新建词条"
    >
      <span style="float: left;color: #8492a6;text-decoration:underline;font-weight: bold">新建词条</span>
    </el-option>

    <el-option
      v-for="tag in listDefault"
      :key="tag.id"
      :label="tag.context"
      :value="tag.id"
    />
  </el-select>

  <el-select
    v-else
    v-model="value"
    filterable
    popper-class="el-select-dropdown"
    :placeholder="listName"
    :reserve-keyword="isAll"
    :filter-method="handleSearch"
    @change="handleOptionChange"
  >
    <!--    @blur="handleBlur"-->
    <template v-if="!isAll">
      <div slot="empty" class="el-select-empty" @click="handleAddEntry">没有相关词条，去创建</div>
      <el-option
        value="新建词条"
      >
        <span style="float: left;color: #8492a6;text-decoration:underline;font-weight: bold">新建词条</span>
      </el-option>
    </template>
    <el-option
      v-for="tag in listDefault"
      :key="tag.id"
      :label="tag.context"
      :value="tag.id"
    >
      <span style="float: left">{{ tag.context }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ tag.id }}</span>
    </el-option>
  </el-select>

</template>

<script>
import { deepClone } from '../../utils'

export default {
  name: 'SelectTag',
  props: {
    list: {
      type: Array,
      default: null
    },
    listName: {
      type: String,
      default: ''
    },
    isImport: {
      type: Boolean,
      default: false
    },
    importList: {
      type: Array,
      default: null
    },
    type: {
      type: String,
      default: '1'
    },
    isAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '',
      valueList: [],
      valueListOld: [],
      listDefault: []
    }
  },
  watch: {
    list(list) {
      this.initList()
    },
    importList(list) {
      this.valueList = this.importList || []
    }
  },
  created() {
    this.valueList = this.importList || []
    this.init()
  },
  methods: {
    // 初始化方法
    init() {
      this.initList()
    },
    // 搜索方法
    handleSearch(value) {
      if (value) { //  val存在
        if (isNaN(value)) { //  如果不是数字，去查找 context 里的数据
          this.listDefault = this.list.filter((item) => {
            if (!!~item.context.indexOf(value) || !!~item.context.toUpperCase().indexOf(value.toUpperCase())) {
              return true
            }
          })
        } else { //  如果是数字，去查找 id 里的数据
          this.listDefault = this.list.filter((item) => {
            if (~item.id.toString().indexOf(value)) {
              return true
            }
          })
        }
      } else { //  val为空时，还原数组
        this.initList()
      }
    },
    // 选中时的方法
    handleOptionChange(value) {
      // 如果 选中的是新建词条，去新建页面。
      if (value === '新建词条' || value[value.length - 1] === '新建词条') {
        this.handleAddEntry()
        return
      }
      if (this.isImport) {
        const isImport = 0
        let isSelect = 'select'
        let selectId = -1
        if (this.valueList.length > this.valueListOld.length) {
          // 如果选中的是初步诊断并且 是新增选中的情况。
          isSelect = 'select'
          selectId = value[value.length - 1]
        } else {
          // 如果是初步诊断，并且是 删除选中的情况
          isSelect = 'no'
          const oldSum = this.valueListOld.reduce((currentSum, currentValue) => {
            currentSum += currentValue
            return currentSum
          }, 0)
          const newSum = this.valueList.reduce((currentSum, currentValue) => {
            currentSum += currentValue
            return currentSum
          }, 0)
          selectId = oldSum - newSum
        }

        this.list.forEach((item, index) => {
          if (item.id === selectId) {
            this.$emit('handleClick', item, isSelect, isImport)
          }
        })
      } else {
        // 如果不是初步诊断
        this.list.forEach((item, index) => {
          if (item.id === value) {
            this.$emit('handleClick', item)
          }
        })
      }
      this.valueListOld = this.valueList
      this.value = ''
      this.initList()
    },
    // 多选清除时的方法
    handleRemoveSelect(value) {
    },
    // 点击新增时的方法
    handleAddEntry() {
      this.value = ''
      this.initList()
      if (this.isImport) {
        this.valueList.pop()
      }
      this.$emit('handleAddEntry', this.type, this.list[0].category_id)
    },
    // 输入框失去焦点
    handleBlur() {
      this.value = ''
      this.initList()
    },
    initList() {
      if (this.isAll) {
        // this.listDefault = []
      } else {
        this.listDefault = deepClone(this.list)
      }
    }
  }
}
</script>

<style lang="scss">
  .el-select-dropdown{
    width: 200px;
    overflow: hidden;
    /*div,ul,li{*/
    /*  max-width: 100%;*/
    /*}*/
    span{
      width: 100%;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .el-select{
    .el-tag{
      display: inline;
      max-width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
