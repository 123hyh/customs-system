/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 13:44:52
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-12 19:33:19
 * @Description: 动态路由
 * @FilePath: \customs_system\src\router\asyncRoutes.ts
 */
import  { RouteConfig } from 'vue-router';

export const asyncRoutes: Array<RouteConfig> = [
  {
    alias: '',
    path: '/Home',
    meta: {
      title: ''
    },
    component: () =>
      import(
        /* webpackChunkName: "homeContainer" */ '@/view/Home/HomeContainer.vue'
      ),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () =>
          import(
            /* webpackChunkName: "home" */ '@/view/Home/children/Home.vue'
          )
      }, 
      {
        path: 'refresh',
        component: () =>
          import(
            /* webpackChunkName: "refresh" */ '@/view/Home/children/Refresh.vue'
          )
      },
      {
        path: '*',
        component: () => import( 
          /* webpackChunkName: "notFind" */ '@/view/NotFind/index.vue' 
        )
      }
    ]
  }
];