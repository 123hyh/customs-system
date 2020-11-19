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
import { cloneDeepWith } from 'lodash';

const baseRoutes: Array<RouteConfig> = [

  /* 登录 */
  {
    path: '/login',
    component: Login
  },

  /* 404 */
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
export function registerAsyncRoutes( menuList:any[] = [] ) {
  
  const cloneAsyncRoutes = cloneDeepWith( asyncRoutes );
  
  const baseList:any[] = cloneAsyncRoutes[ 0 ].children;
  
  cloneAsyncRoutes[ 0 ].children  =  baseList.reduce( ( prev, item ) => {

    /* 判断 routeItem 的 permissions 选项值 */
    if ( item.permissions  ) {
      const [ currentMenuItem ] = menuList.filter( mItem => mItem.route === item.path );
      if ( currentMenuItem ) {
        prev.push( item );
        if ( item.children ) {
          item.children = filterRoutes( currentMenuItem.children, item.children );
        }
      }
    } else {
      prev.push( item );
    }
    return prev;
  }, [] );
  
  /* 1、根据菜单权限 配置动态路由表 */
  routerInstance.addRoutes( cloneAsyncRoutes );
}

/**
 * 过滤 权限路由表
 * @description: 
 * @param {any} permissionList
 * @param {any} routes
 * @return {*}
 */
function filterRoutes( permissionList:any[], routes: any[] ) {
  return routes.reduce( ( prev, currentRoute ) => {
    const [ pItem ] = permissionList.filter( pItem => pItem.route === currentRoute.path );
    if ( pItem ) {
      if ( pItem.children ) {
        currentRoute.children = filterRoutes( pItem.children, currentRoute.children );
      }
      prev.push( currentRoute );
    }
    return prev;
  }, [] );
}
