<template>
  <div>
    <table-component ref="paginationTable"
                     :config="config"
                     :default-sort="defaultSort"
                     :data="data"
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
      // 请求路径
      requestUrl: {
        type: String,
        default: 'static/data.json'
      },
      // 请求前需要处理参数对象
      requestBeforeParamsHandle: {
        type: Function,
        default: params => params
      },
      requestAfterResultHandle: {
        type: Function,
        default: data => data
      }
    },
    data() {
      return {
        data: [],
        pagination: {
          page: 1,
          pageSize: 20,
          total: 48
        },
      }
    },
    mounted() {
      this.loadData(1);
    },
    methods: {
      // 获取数据
      async loadData(page, pageSize = this.pagination.pageSize) {
        try {
          const params = await Promise.resolve(() => {
            if (this.requestBeforeParamsHandle) {
              return this.requestBeforeParamsHandle();
            }
            return {};
          });
          this.resultHandle(await this.requestData(page, pageSize, params), page, pageSize);
        } catch (e) {
        }
      },
      // 请求数据
      async requestData(page, pageSize) {
        return await (await fetch(this.requestUrl + `?page=${page}&pageSize=${pageSize}`)).json();
      },
      resultHandle(result, page, pageSize) {
        /**
         * 要求格式必须处理成为
         * {
         *     list: [...],
         *     total: number
         * }
         */
        let data = result;
        if (this.requestAfterResultHandle) {
          data = this.requestAfterResultHandle(result) || {list: [], total: 0};
        }
        this.data = data.list || [];
        this.paginationInit(page, pageSize, data.total || 0)
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
      handleCurrentChange(val) {
        this.loadData(val, this.pagination.pageSize);
      },
      onSortChange(args) {
        // let {column, prop, order} = args;
        this.$emit('sortChange', {
          ...args
        });
        // 点击排序后，重新加载数据
        this.loadData(1, this.pagination.pageSize);
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
