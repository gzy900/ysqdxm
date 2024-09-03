<template>
  <div>
    <el-card style="margin-top: 20px" class='page-content'>
      <div class='custom-tree-container'>
        <div class='block'>
          <!--      <p>使用 render-content</p>-->
          <el-tree
            :data='data'
            show-checkbox
            node-key='id'
            default-expand-all
            :expand-on-click-node='false'
            :render-content='renderContent'>
          </el-tree>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
let id = 1000

export default {
  data() {
    const data = [{
      id: 1,
      label: '上海移视科技',
      children: [{
        id: 4,
        label: '第十人民医院',
        children: [{
          id: 9,
          label: '社区A',
          children: [{
            id: 9,
            label: '医生A',
            icon: 'el-icon-user-solid'
          }, {
            id: 9,
            label: '用户B',
            icon: ''

          }]

        }, {
          id: 10,
          label: '社区B'
        }]
      }, {
        id: 4,
        label: '第十一人民医院',
        children: [{
          id: 9,
          label: '社区A'
        }, {
          id: 10,
          label: '社区B'
        }]
      }, {
        id: 4,
        label: '第十一人民医院',
        children: [{
          id: 9,
          label: '社区A'
        }, {
          id: 10,
          label: '社区B'
        }]
      }, {
        id: 4,
        label: '第十一人民医院',
        children: [{
          id: 9,
          label: '社区A'
        }, {
          id: 10,
          label: '社区B'
        }]
      }, {
        id: 4,
        label: '第十一人民医院',
        children: [{
          id: 9,
          label: '社区A'
        }, {
          id: 10,
          label: '社区B'
        }]
      }, {
        id: 4,
        label: '第十一人民医院',
        children: [{
          id: 9,
          label: '社区A'
        }, {
          id: 10,
          label: '社区B'
        }]
      }
      ]
    }]
    return {
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>
            {node.label}
          </span>
          <span style='margin-left:40px'>
            <el-button size='mini' type='text' on-click={() => this.append(data)}>新增</el-button>
            <el-button size='mini' type='text' on-click={() => this.remove(node, data)}>删除</el-button>
          </span>
        </span>)
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*justify-content: flex-start;*/
  font-size: 14px;
  padding-right: 8px;
}
</style>
