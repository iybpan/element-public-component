<template>
  <public-table-pagination :config="tableConfig">
    <template #date="{row}">
      <i class="el-icon-time"></i>
      <span style="margin-left: 10px">{{ row.date }}</span>
    </template>
    <template #name="{row}">
      第二栏的姓名-====
    </template>
    <template #name1="{row}">
      <el-popover trigger="hover" placement="top">
        <p>姓名: {{row.name }}</p>
        <p>住址: {{ row.address }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{row.name }}</el-tag>
        </div>
      </el-popover>
    </template>
    <template #name2Label="{row}">
      测试表头22
    </template>
    <template #action="{row}">
      <el-button
        size="mini">编辑
      </el-button>
      <el-button
        size="mini"
        type="danger">删除
      </el-button>
    </template>
  </public-table-pagination>
</template>

<script>
  export default {
    name: "table-pagination-demo",
    data() {
      return {
        tableConfig: [
          {
            label: '日期',
            prop: 'date',
            sortable: true,
            // propTemplateName: 'date',
          }, {
            label: '姓名',
            labelTemplateName: 'name',
            prop: 'address',
            sortable: true,
            columns: [
              {
                label: '省',
                prop: 'name1',
                propTemplateName: 'name1',
                sortable: true,
              }, {
                label: '市',
                labelTemplateName: "name2Label",
                prop: 'address.city',
                // formatter: this.formatter,
              }
            ]
          },
          {
            label: "操作",
            prop: 'action',
            propTemplateName: 'action',
            sortable: true,
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
