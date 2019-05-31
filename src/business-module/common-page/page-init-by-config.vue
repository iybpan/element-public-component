<template>
  <div class="box">
    <div class="button-box">
      <slot name="export">
        <el-button v-if="downloadUrl"
                   size="small"
                   icon="el-icon-download">
          导出数据
        </el-button>
      </slot>
    </div>
    <SearchPanel class="form"
                 :config="searchFormConfig"
                 @formSubmit="formSubmit"/>
    <TablePagination class="table"
                     :config="tableConfig"
                     :data="tableListObj"
                     @loadData="onLoadData"/>
  </div>
</template>

<script>
  import SearchPanel from '../../components/search-panel/search-panel'
  import TablePagination from '../../components/table/table-pagination-component'

  export default {
    name: 'PageInitByConfig',
    components: {
      SearchPanel, TablePagination
    },
    props: {
      // 获取配置的请求地址
      config: {
        type: Array,
        default: () => []
      },
      // 查询列表数据的请求地址
      requestUrl: {
        type: String,
        require: true
      },
      downloadUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchFormValue: {},
        tableListObj: {}
      }
    },
    computed: {
      searchFormConfig() {
        return this.config;
      },
      tableConfig() {
        return this.config.map(c => ({
          label: c.label,
          prop: c.name
        }));
      }
    },
    methods: {
      formSubmit(data) {
        this.searchFormValue = data;
      },
      onLoadData(page, size, sort) {
        // this.$axios
      }

    }
  }
</script>

<style scoped lang="scss">

  .box {
    background: #f5f6fa;

    .button-box {
      position: absolute;
      right: 30px;
      top: -50px;
    }

    .form {
      background-color: #fff;
      border-radius: 6px;
    }

    .table {
      margin-top: 30px;
      background-color: #fff;
      padding: 20px;
      border-radius: 6px;
    }
  }

</style>
