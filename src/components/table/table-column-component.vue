<template>
  <el-table-column :label="item.label"
                   :prop="item.prop"
                   :formatter="item.formatter"
                   :sortable="item.sortable?'custom':false"
                   :width="item.width">
    <template slot="header"
              slot-scope="scope">
    <span class="table-thead">
    <slot :name="item.labelTemplateName"
          :row="scope.row"
          :column="scope.column"
          :$index="scope.$index">
    {{ item.label }}
    </slot>
    </span>
    </template>
    <template slot="default"
              slot-scope="scope">
      <slot :name="item.propTemplateName"
            :row="scope.row"
            :column="scope.column"
            :$index="scope.$index"
            :store="scope.store">
        <template v-if="!item.column">{{resolveProp(scope.row,item.prop)}}</template>
      </slot>
    </template>
    <table-column-component v-for="column in item.columns" :item="column"></table-column-component>
  </el-table-column>
</template>

<script>

  export default {
    name: "table-column-component",
    props: {
      item: {
        type: Object,
        default: () => {
        },
      },
    },
    methods:{
      resolveProp(row, column) {
        if (column.formatter) {
          return column.formatter(row, column);
        }
        let key = column.prop;
        let arr;
        let data = row;
        try {
          arr = key.split('.');
          while (arr.length > 1) {
            data = data[arr.shift()];
          }
        } catch (e) {
          return '';
        }
        return data[arr[0]];
      },
    }
  }

</script>

<style scoped>
  .table-thead {
    display: inline-block;
    color: black;
  }
</style>
