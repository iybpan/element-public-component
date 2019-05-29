<template>
  <el-table ref="multipleTable"
            :data="data"
            :span-method="spanMethod"
            :default-sort="defaultSort"
            :header-cell-style="myHeaderStyle"
            @select="onSelect"
            @selection-change="onSelectionChange"
            @sort-change="onSortChange">
    <el-table-column v-if="selection"
                     type="selection"
                     width="55"/>
    <TableColumnRender v-for="item in config"
                       :key="item.prop"
                       :item="item"
                       :scoped-slots-obj="scopedSlotsObj2"/>
  </el-table>
</template>

<script>

  import TableColumnRender from './table-column-render'

  export default {
    name: 'TableComponent',
    components: {
      TableColumnRender
    },
    props: {
      defaultSort: {
        type: Object,
        default: () => {
        }
      },
      selection: {
        type: Boolean,
        default: false
      },
      config: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      spanMethod: {
        type: Function,
        default: null
      },
      scopedSlotsObj: {
        type: Object,
        default: () => undefined
      }
    },
    data() {
      return {}
    },
    computed: {
      scopedSlotsObj2() {
        return this.scopedSlotsObj || this.$scopedSlots;
      }
    },
    methods: {
      onSortChange(args) {
        // let {column, prop, order} = args;
        this.$emit('sortChange', {
          ...args
        });
      },
      // 用户手动点击时候触发，selection表示已选择的，row表示当前选中项
      onSelect(selection, row) {
        this.$emit('select', selection, row)
      },
      // 只要有改变的都触发
      onSelectionChange(selection) {
        this.$emit('selectChange', selection)
      },
      // 获取引用后就可以执行以下方法https://element.eleme.io/#/zh-CN/component/table#table-methods
      getTableRef() {
        return this.$refs['multipleTable'];
      },
      myHeaderStyle() {
        return {
          'background-color': '#fafafa'
        }
      }
    }
  }
</script>

<style scoped>
  .table-thead {
    display: inline-block;
    color: black;
  }
</style>
