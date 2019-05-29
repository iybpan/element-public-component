import Vue from 'vue';
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'

import plugin from '../src/index'
// import plugin from '../dist/epc.min'
import router from './route';

Vue.use(ElementUI);
Vue.use(plugin);
Vue.use(VueRouter);

/* eslint-disable no-new*/
new Vue({
  el: '#app',
  router,
  component: {
    App
  },
  render: h => h(App)
})
