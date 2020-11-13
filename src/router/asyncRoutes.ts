/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 13:44:52
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-13 19:28:28
 * @Description: 动态路由
 * @FilePath: \customs-system\src\router\asyncRoutes.ts
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

        /* webpackChunkName: "homeContainer" */ 
        '@/components/Home/HomeContainer.vue'
      ),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () =>
          import(

            /* webpackChunkName: "home" */
            '@/view/dashboard/index.vue'
          )
      }, 
      {
        path: 'refresh',
        component: () =>
          import(

            /* webpackChunkName: "refresh" */ 
            '@/view/Refresh/index.vue'
          )
      },
      {
        path: '*',
        component: () => import( 

          /* webpackChunkName: "notFind" */
          '@/view/NotFind/index.vue' 
        )
      }
    ]
  }
];