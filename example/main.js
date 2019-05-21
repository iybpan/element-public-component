import Vue from 'vue';
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import plugin from '../src/index'
// import plugin from '../dist/epc'

Vue.use(ElementUI);
Vue.use(plugin);

new Vue({
    el: '#app',
    component: {
        App
    },
    render: h => h(App)
})