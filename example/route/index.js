import VueRouter from 'vue-router'

import TableDemo from '../view/table-demo'
import TablePaginationDemo from '../view/table-pagination-demo'
import SearchPanelDemo from '../view/search-panel-demo'

const router = new VueRouter({
  routes: [
    {
      path: '/table',
      component: TableDemo
    }, {
      path: '/searchPanel',
      component: SearchPanelDemo
    }, {
      path: '/tablePagination',
      component: TablePaginationDemo
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/tablePagination'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next(); //如果匹配到正确跳转
  }
});

export default router;
