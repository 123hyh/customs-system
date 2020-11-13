/*
 * @Author: your name
 * @Date: 2020-07-07 21:18:50
 * @lastTime: 2020-07-29 10:34:38
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \customs-system\src\router\index.ts
 */

import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { registerRouterHooks } from './hooks';
import { asyncRoutes } from './asyncRoutes';
Vue.use( Router );

const MODE = 'history';
import Login from '@/view/login/index.vue';

const baseRoutes: Array<RouteConfig> = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: () => import( 
      /* webpackChunkName: "notFind" */ '@/view/NotFind/index.vue' 
    )
  }
];


const routerInstance = new Router( {
  mode: MODE,
  routes: baseRoutes
} );

registerRouterHooks( routerInstance );

export default routerInstance;

/**
 * 注册 动态路由
 * @description: 
 * @param {*}
 * @return {*}
 */
export function registerAsyncRoutes () {
  routerInstance.addRoutes( asyncRoutes );
}
