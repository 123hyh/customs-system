/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 13:44:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-15 14:56:56
 * @Description: 动态路由
 * @FilePath: \customs-system\src\router\asyncRoutes.ts
 */
import  { RouteConfig } from 'vue-router';
import routerView from '@/components/common/RouterView';
export const asyncRoutes: Array<RouteConfig> = [
  {
    alias: '',
    path: '/Home',
    meta: {
      title: ''
    },
    component: () =>
      import(

        /* webpackChunkName: "home" */
        '@/components/Home/index.vue'
      ),
    children: [
      {
        path: '',
        meta: {
        },
        component: () =>
          import(

            /* webpackChunkName: "dashboard" */
            '@/view/dashboard/index.vue'
          )
      }, 
      {
        path: 'base',
        meta:{
        },
        component: routerView( 'CustomsBaseData' ),
        children:[
          {
            path:'',
            alias:'hsCode',
            component: () => import(

              /* webpackChunkName: "hsCode" */
              '@/view/hsCode/List/index.vue' )
          }
        ]
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