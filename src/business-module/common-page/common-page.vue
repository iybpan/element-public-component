<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(tab,index) of tabs"
                   :key="index.toString()"
                   :name="index.toString()"
                   :label="tab.title">
        <template v-if="tab.slot">
          <slot :name="tab.slot"></slot>
        </template>
        <template v-else-if="tab.component">
          <component :is="tab.component"></component>
        </template>
        <template v-else-if="tab.config">
          <page-init-by-config :config="tab.config"
                               :request-url="tab.requestUrl"></page-init-by-config>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import PageInitByConfig from "./page-init-by-config";

  export default {
    name: "common-page",
    components: {PageInitByConfig: PageInitByConfig},
    props: {
      activeIndex: {
        type: Number,
        default: 0
      },
    },
    created() {
      this.activeName = this.activeIndex.toString();
    },
    data() {
      return {
        activeName: '',
        tabs: [{
          title: "用户管理",
          // component: '',
          // slot: '',
          config: [
            {
              "label": "身份证",
              "name": "cardNum",
              "type": "input"
            },
            {
              "label": "姓名",
              "name": "name",
              "type": "input"
            },
            {
              "label": "性别",
              "name": "sex",
              "type": "input"
            }
          ],
          requestUrl: ''
        }, {
          title: "配置管理",
          // component: '',
          // slot: '',
          config: [
            {
              "label": "身份证",
              "name": "cardNum",
              "type": "input"
            },
            {
              "label": "性别",
              "name": "sex",
              "type": 'input'
            }
          ],
          requestUrl: ''
        }]
      }
    }
  }
</script>

<style scoped lang="scss">

  $themeColor: #1EAEFF;

  .container {
    background: #fff;
  }

  /deep/ .el-tabs__content{
    overflow: visible;
  }

  /deep/ .el-tabs__nav-wrap {
    padding: 20px 24px 0;

    &:after{
      content: '';
      background-color: #fff;
    }

    .el-tabs__nav {
      .el-tabs__item {
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        color: #CCC;

        &.is-active {
          opacity: 1;
          color: $themeColor;
        }
      }
    }
  }

</style>
