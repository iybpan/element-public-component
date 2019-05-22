<template>
  <div>
    <i-search-p :config="config">
      <template #title="{item}">
        <div>{{msg}} - {{item.label}}</div>
      </template>
    </i-search-p>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        config: [{
          label: '标题',
          type: 'input',
          name: 'name',
          defaultValue: '内容',
          templateName: 'title',
        }, {
          // label: "选项",
          type: 'select',
          name: "select",
          defaultValue: 'content',
          options: [{
            label: '内容',
            value: 'content'
          }]
        }, {
          label: '标题',
          type: 'input',
          name: 'name',
          defaultValue: '内容'
        }],
        msg: '测试内容'
      }
    }
  }
</script>

<style scoped>

</style>
