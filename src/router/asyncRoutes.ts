/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 13:44:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:27:04
 * @Description: 动态路由
 * @FilePath: \customs-system\src\router\asyncRoutes.ts
 */
const pathToRegexpOptions = {
  strict: true
};
import  { RouteConfig } from 'vue-router';
import routerView from '@/components/common/RouterView';
export const asyncRoutes: Array<RouteConfig> = [
  {
    alias: '',
    path: '/home',
    meta: {
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

      /* 基础资料 */
      {
        path: 'base',
        meta:{
        },
        redirect:'/base/hsCode',
        component: routerView( 'CustomsBaseDataWrap' ),
        children:[

          /* 海关编码 */
          {
            path:'hsCode',
            component: routerView( 'CustomsBaseDataHsCode' ),
            children:[
              {
                path: '',
                component: () => import(

                  /* webpackChunkName: "hsCode" */
                  '@/view/hsCode/List/index.vue' 
                ),
                children:[
                  {
                    path:'',
                    component:() => import( '@/view/hsCode/Details/element/index.vue' )
                  },
                  {
                    path: 'relatedDescription',
                    component:() => import( '@/view/hsCode/List/relatedDescription/index.vue' )
                  }
                ]
              },

              /* 海关编码 - 详情 */
              {
                path: ':id',
                pathToRegexpOptions,
                component: () => import( '@/view/hsCode/Details/index.vue' ),
                children:[
                  {
                    path: '',
                    component:() => import( '@/view/hsCode/Details/element/index.vue' )
                  },
                  {
                    path: 'notDiscount',
                    component:() => import( '@/view/hsCode/Details/notDiscount/index.vue' )
                  }
                ]
              }
            ]
          
          },

          /* 品名 */
          {
            path:'description',
            component: routerView( 'CustomsBaseDescriptionWrap' ),
            children:[
              {
                path:'',
                component: () => import( '@/view/description/List/index.vue' ),
                children:[
                  {
                    path: '',
                    component: () => import( '@/view/description/List/edit/index.vue' )
                  },
                  {
                    path:'element',
                    component: () => import( '@/view/hsCode/Details/element/index.vue' )
                  }
                ]
              }
            ]
          },

          /* 商品型号 */
          {
            path: 'spec',
            component: routerView( 'CustomsBaseSpecWrap' ),
            children:[
              {
                path:'',
                component: () => import( '@/view/specification/List/index.vue' ),
                children:[
                  {
                    path: '',
                    component: () => import( '@/view/specification/List/element/index.vue' )
                  },
                  {
                    path:'customer',
                    component: () => import( '@/view/specification/List/customer/index.vue' )
                  }
                ]
              }
            ]
          },

          /* 监管方案 */
          {
            path: 'supervise',
            component: routerView( 'CustomsBaseSuperviseWrap' ),
            children:[
              {
                path: '',
                component: () => import( '@/view/supervise/List/index.vue' )
              }
            ]
          },

          /* 计量单位 */
          {
            path: 'unit',
            component: () => import( '@/view/unit/List/index.vue' )
          },

          /* 港口 */
          {
            path: 'port',
            component: () => import( '@/view/port/List/index.vue' )
          },

          /* 境内目的地 */
          {
            path: 'domestic',
            component: () => import( '@/view/domestic/List/index.vue' )
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