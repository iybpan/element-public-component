<template>
  <div>
    <public-search-panel :config="config"
                         width="300px"
                         labelWidth="120px"
                         padding="5px 15px"
                         :loading="loading"
                         @formSubmit="onFormSubmit"
                         @itemChange="onItemChange"
                         @formReset="onFormReset">
      <template #myTemplate="{item}">
        <div>模板名为{{item.templateName}}</div>
      </template>
    </public-search-panel>
  </div>
</template>

<script>
  export default {
    name: "searchPanelDemo",
    data() {
      return {
        config: [
          {
            label: '自定义模板',
            name: 'template',
            templateName: 'myTemplate',
          }, {
            label: '输入框',
            type: 'input',
            name: 'input',
            defaultValue: '输入内容'
          }, {
            label: '数字项',
            type: 'inputNumber',
            name: 'number',
            defaultValue: 6,
            customized: {
              min: -5,
              max: 10,
              step: 1,
            }
          }, {
            label: '数字范围',
            type: 'inputNumberRange',
            name: 'inputNumberRange',
            defaultValue: [1, 5],
            customized: {
              precision: 2,
              startPlaceholder: '请输入',
              endPlaceholder: '请输入'
            }
          }, {
            label: "选项",
            type: 'select',
            name: "select",
            defaultValue: 'content',
            customized: {
              options: [{
                label: '内容',
                value: 'content'
              }]
            }
          }, {
            label: '时间',
            type: 'time',
            name: "time",
            defaultValue: '18:00:01',
            customized: {
              selectableRange: '10:00:01 - 16:06:09'
            }
          }, {
            label: '时间选择',
            type: 'timeSelect',
            name: 'timeSelect',
            defaultValue: "18:00",
            customized: {
              start: '09:00',
              end: '18:00',
              step: '01:30',
              minTime: '12:00'
            }
          }, {
            label: '时间区间选择',
            type: 'timeRange',
            name: 'timeRange',
            // defaultValue: [new Date(), new Date()],
          }, {
            label: '日期选择',
            type: 'date',
            name: 'date',
            defaultValue: '2018-11-11',
          }, {
            label: '日期选择快捷',
            type: 'dateWithShortcut',
            name: 'dateWithShortCut',
            defaultValue: '',
          }, {
            label: '月份',
            type: 'month',
            name: 'month',
            defaultValue: '2019-05-1',
          }, {
            label: '年选择',
            type: 'year',
            name: 'year',
            defaultValue: '2016',
            customized: {
              valueFormat: 'yyyy'
            }
          }, {
            label: '日期区间选择',
            type: 'dateRange',
            name: 'dateRange',
            defaultValue: '',
          }, {
            label: '日期区间快捷',
            type: 'dateRangeWithShortcut',
            name: 'dateRangeWithShortCut',
            defaultValue: '',
          }, {
            label: '日期时间',
            type: 'dateTime',
            name: 'dateTime',
            defaultValue: new Date('2011-10-09 00:00:00'),
          }, {
            label: '日期时间快捷',
            type: 'dateTimeWithShortcut',
            name: 'dateTimeWithShortcut',
            defaultValue: '',
          }, {
            label: '日期时间区间',
            type: 'dateTimeRange',
            name: 'dateTimeRange',
            width: '500px',
            labelWidth: '140px',
            defaultValue: [new Date(), new Date()],
          }, {
            label: '日期时间区间快捷',
            type: 'dateTimeRangeWithShortcut',
            name: 'dateTimeRangeWithShortcut',
            defaultValue: '',
            width: '500px',
            labelWidth: '140px',
            isAdvancedSearch: true
          }],
        msg: '测试内容',
        loading: false
      }
    },
    methods: {
      onFormSubmit(data) {
        console.log('查询', data);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000)

      },
      onFormReset() {
        console.log('重置')
      },
      onItemChange(data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>

</style>

