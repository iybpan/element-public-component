<template>
  <div>
    <div>
      <h2>Table实例</h2>
      <el-button size="small" @click="toggleSelection()">全选/取消全选</el-button>
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
        <template #addressTpl="{row}">
          <i class="el-icon-location-outline"></i>地址
        </template>
        <template #nameTpl="{row}">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{row.name }}</p>
            <p>住址: {{ row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{row.name }}</el-tag>
            </div>
          </el-popover>
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
            filters: [
              {
                text: '2016-05-01', value: '2016-05-01'
              }, {
                text: '2016-05-02', value: '2016-05-02'
              }],
            filterMethod: (value, row, column) => {
              const property = column['property'];
              return row[property] === value;
            }
          }, {
            label: "姓名",
            prop: 'name',
            propTemplateName: 'nameTpl'
          }, {
            label: '地址',
            labelTemplateName: 'addressTpl',
            prop: 'address',
            sortable: true,
            columns: [
              {
                label: '省',
                prop: 'address.province',
                sortable: true,
              }, {
                label: '市',
                prop: 'address.city',
              }
            ]
          },
          {
            label: '完整地址',
            prop: 'address',
            formatter: (row) => {
              let {province, city, county, other} = row.address;
              return province + city + county + other;
            }
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
            name: '王小虎1',
            address: {
              province: '上海市',
              city: '上海市',
              county: '普陀区',
              other: '金沙江路 1518 弄'
            },
          }, {
            date: '2016-05-04',
            name: '王大虎',
            address: {
              province: '@@市',
              city: '@@市',
              county: '@@区',
              other: '@@@路 1517 弄'
            }
          }, {
            date: '2016-05-01',
            name: '李小猫',
            address: {
              province: '北京##市',
              city: '###市',
              county: '普陀区',
              other: '金沙江路 1519 弄'
            }
          }, {
            date: '2016-05-03',
            name: '张大龙',
            address: {
              province: '**市',
              city: '**市',
              county: '***区',
              other: '金沙江路 1516 弄'
            }
          }],
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
