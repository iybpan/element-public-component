<template>
  <div>
    <table-component ref="paginationTable"
                     :config="config"
                     :default-sort="defaultSort"
                     :data="dataList"
                     :span-method="spanMethod"
                     :selection="selection"
                     :scoped-slots-obj="$scopedSlots"
                     @select="onSelect"
                     @selectionChange="onSelectionChange"
                     @sortChange="onSortChange"/>
    <el-pagination style="text-align: right;margin: 10px"
                   background
                   layout="total, prev, pager, next, sizes, jumper"
                   :current-page="pagination.page"
                   :page-sizes="pageSizes"
                   :page-size="pagination.pageSize"
                   :total="pagination.total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
  import TableComponent from './table-component'

  /**
   * 输出事件：
   * 1. loadData(page,size,sort);
   * 2. select(selection, row);
   * 3. selectChange(selection)
   *
   * 组件引用可以调用方法getTableRef获取table引用
   * config：配置项
   * data:
   *
   */
  export default {
    name: 'TablePagination',
    components: {
      TableComponent
    },
    props: {
      // 默认的筛选条件
      defaultSort: {
        type: Object,
        default: () => {
        }
      },
      // 是否带前置checkbox
      selection: {
        type: Boolean,
        default: false
      },
      // 表格配置项
      config: {
        type: Array,
        default: () => []
      },
      spanMethod: {
        type: Function,
        default: null
      },
      pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 50]
      },
      // 引入的数据对象
      data: {
        type: Object,
        default: () => ({
          list: [],
          page: 0,
          pageSize: 10,
          total: 0
        })
      }
    },
    data() {
      return {
        dataList: [],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    watch: {
      data(val) {
        this.dataList = val.list || [];
        // 更新页码
        this.paginationInit(val.page, val.pageSize, val.total);
      }
    },
    methods: {
      // 获取数据
      loadData(page, pageSize, sort) {
        this.$emit("loadData", page, pageSize, sort)
      },
      // 页面对象更新
      paginationInit(page, pageSize, total) {
        this.pagination.page = page;
        this.pagination.pageSize = pageSize;
        this.pagination.total = total;
      },
      handleSizeChange(val) {
        this.loadData(this.pagination.page, val);
      },
      // 页数变化事件
      handleCurrentChange(val) {
        this.loadData(val, this.pagination.pageSize);
      },
      // 点击排序时触发重新加载数据
      onSortChange(args) {
        let {
          column,
          prop,
          order
        } = args;
        // 点击排序后，重新加载数据
        this.loadData(1, this.pagination.pageSize, order);
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
        return this.$refs['paginationTable'];
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

</style>
