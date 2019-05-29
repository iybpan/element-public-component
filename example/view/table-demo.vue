<template>
  <div>
    <div>table：
      <el-button size="small" @click="toggleSelection()">全选/取消全选</el-button>
    </div>
    <public-table ref="pubTable"
                  v-loading="loading"
                  selection
                  style="width: 80%"
                  :config="tableConfig"
                  :data="tableData"
                  :spanMethod="spanMethod"
                  @sortChange="onSortChange">
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
    </public-table>
  </div>
</template>

<script>
  export default {
    name: "table-demo",
    data() {
      return {
        loading: false,
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
                // prop: 'address.city',
                formatter: this.formatter,
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: {
              province: '上海市',
              city: '上海市a',
              county: '普陀区bbb',
              other: '金沙江路 1518 弄'
            },
            info: {
              a: 123
            }
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: {
              province: '上海市aaa',
              city: '上海市',
              county: '普陀区123',
              other: '金沙江路 1517 弄'
            },
            info: {
              a: '============'
            }
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: {
              province: '上海市',
              city: '上海市====',
              county: '普陀区',
              other: '金沙江路 1519 弄'
            },
            info: {
              a: 'fdsa'
            }
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: {
              province: '上海市',
              city: '上海市------',
              county: '普陀区',
              other: '金沙江路 1516 弄'
            },
            info: {
              a: 'to2ooo'
            }
          }]
      }
    },
    methods: {
      formatter(row, column) {
        let {province, city, county, other} = row.address;
        return province + city + county + other;
      },
      // 处理单元格合并方法
      spanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      onSortChange({column, prop, order}) {
        console.log(column, prop, order)
      },
      toggleSelection(rows) {
        const ref = this.$refs['pubTable'].getTableRef();
        ref.toggleAllSelection();
      },
    }
  }
</script>

<style scoped>

</style>
