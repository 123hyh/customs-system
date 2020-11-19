/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 13:44:52
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:02:04
 * @Description: 动态路由
 * @FilePath: \customs-system\src\router\asyncRoutes.ts
 */

const pathToRegexpOptions = {
  strict: true
};

import routerView from '@/components/common/RouterView';
export const asyncRoutes: any[] = [
  {
    path: '',
    component: () =>
      import(

        /* webpackChunkName: "home" */
        '@/components/Home/index.vue'
      ),
    children: [
      {
        path: '',
        component: () =>
          import(

            /* webpackChunkName: "dashboard" */
            '@/view/dashboard/index.vue'
          )
      },

      /* 基础资料 */
      {
        path: 'base',
        permissions: true,
        redirect: '/base/hsCode',
        component: routerView( 'CustomsBaseDataWrap' ),
        children: [

          /* 海关编码 */
          {
            path: 'hsCode',
            component: routerView( 'CustomsBaseDataHsCode' ),
            children: [
              {
                path: '',
                component: () =>
                  import(

                    /* webpackChunkName: "hsCode" */
                    '@/view/hsCode/List/index.vue'
                  ),
                children: [
                  {
                    path: '',
                    component: () =>
                      import(

                        /* webpackChunkName: "hsCode/element" */
                        '@/view/hsCode/Details/element/index.vue'
                      )
                  },
                  {
                    path: 'relatedDescription',
                    component: () =>
                      import(

                        /* webpackChunkName: "hsCode/relatedDescription" */ 
                        '@/view/hsCode/List/relatedDescription/index.vue'
                      )
                  }
                ]
              },

              /* 海关编码 - 详情 */
              {
                path: ':id',
                pathToRegexpOptions,
                component: () =>
                  import(

                    /* webpackChunkName: "hsCode/Details" */ 
                    '@/view/hsCode/Details/index.vue'
                  ),
                children: [
                  {
                    path: '',
                    component: () =>
                      import(

                        /* webpackChunkName: "hsCode/element" */ 
                        '@/view/hsCode/Details/element/index.vue'
                      )
                  },
                  {
                    path: 'notDiscount',
                    component: () =>
                      import(

                        /* webpackChunkName: "hsCode/notDiscount" */ 
                        '@/view/hsCode/Details/notDiscount/index.vue'
                      )
                  }
                ]
              }
            ]
          },

          /* 品名 */
          {
            path: 'description',
            component: routerView( 'CustomsBaseDescriptionWrap' ),
            children: [
              {
                path: '',
                component: () =>
                  import(

                    /* webpackChunkName: "description" */ 
                    '@/view/description/List/index.vue'
                  ),
                children: [
                  {
                    path: '',
                    component: () =>
                      import(

                        /* webpackChunkName: "description/edit" */ 
                        '@/view/description/List/edit/index.vue'
                      )
                  },
                  {
                    path: 'element',
                    component: () =>
                      import(

                        /* webpackChunkName: "description/element" */ 
                        '@/view/description/List/element/index.vue'
                      )
                  }
                ]
              }
            ]
          },

          /* 商品型号 */
          {
            path: 'spec',
            component: routerView( 'CustomsBaseSpecWrap' ),
            children: [
              {
                path: '',
                component: () =>
                  import(

                    /* webpackChunkName: "specification" */
                    '@/view/specification/List/index.vue'
                  ),
                children: [
                  {
                    path: '',
                    component: () =>
                      import(

                        /* webpackChunkName: "specification/element" */ 
                        '@/view/specification/List/element/index.vue'
                      )
                  },
                  {
                    path: 'customer',
                    component: () =>
                      import(

                        /* webpackChunkName: "specification/customer" */ 
                        '@/view/specification/List/customer/index.vue'
                      )
                  }
                ]
              }
            ]
          },

          /* 监管方案 */
          {
            path: 'supervise',
            component: routerView( 'CustomsBaseSuperviseWrap', false ),
            children: [
              {
                path: '',
                name:'superviseList',
                component: () =>
                  import(

                    /* webpackChunkName: "supervise" */
                    '@/view/supervise/List/index.vue'
                  )
              },
              {
                path: ':id',
                name:'superviseDetails',
                pathToRegexpOptions,
                component: () =>
                  import(

                    /* webpackChunkName: "supervise/details" */
                    '@/view/supervise/Details/index.vue'
                  )
              }
            ]
          },

          /* 计量单位 */
          {
            path: 'unit',
            component: () =>
              import(

                /* webpackChunkName: "unit" */
                '@/view/unit/List/index.vue'
              )
          },

          /* 港口 */
          {
            path: 'port',
            component: () =>
              import(

                /* webpackChunkName: "port" */ 
                '@/view/port/List/index.vue'
              )
          },

          /* 境内目的地 */
          {
            path: 'domestic',
            component: () =>
              import(

                /* webpackChunkName: "domestic" */
                '@/view/domestic/List/index.vue'
              )
          }
        ]
      },
      {
        path: 'classify',
        component: routerView( 'CustomsClassifyWrap', false ),
        children:[
          {
            path: '',
            name: 'classifyList',
            component:() => import( 

              /* webpackChunkName: "classify" */
              '@/view/classify/List/index.vue' 
            )
          },
          {
            path: ':id',
            name: 'classifyDetails',
            pathToRegexpOptions,
            component:routerView( 'CustomsClassifyDetailWrap', false ),
            children:[

              /* 提交之前 */
              {
                path: '',
                component:() => import( 

                  /* webpackChunkName: "classify/before" */
                  '@/view/classify/Details/Before/index.vue' 
                ),
                children:[
                  {
                    path: '',
                    component:() => import( 

                      /* webpackChunkName: "classify/beforeDetails" */
                      '@/view/classify/Details/Before/Details/index.vue' 
                    )
                  },
                  {
                    path:'file',
                    component: () => import(

                      /* webpackChunkName: "classify/beforeFile" */
                      '@/view/classify/Details/Before/File/index.vue'
                    )
                  }
                ]
              },

              /* 提交之后 */
              {
                path: 'after',
                component:() => import( 

                  /* webpackChunkName: "classify/after" */
                  '@/view/classify/Details/After/index.vue' 
                )
              }
            ]
          }
        ]
      },

      /* 刷新页 */
      {
        path: 'refresh',
        component: () =>
          import(

            /* webpackChunkName: "refresh" */
            '@/view/Refresh/index.vue'
          )
      },

      /* 404 */
      {
        path: '*',
        component: () =>
          import(

            /* webpackChunkName: "notFind" */
            '@/view/NotFind/index.vue'
          )
      }
    ]
  }
];
