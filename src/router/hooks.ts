/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:34
 * @lastTime: 2020-07-08 17:40:07
 * @LastAuthor: huangyuhui
 * @Description: 路由钩子
 * @FilePath: \supply-chain-system\src\router\hooks.ts
 */

import store from '@/store';
import { registerAsyncRoutes } from './index';
import QProgress from 'qier-progress';

export const progressBar = new QProgress( {
  minimum: 0.08,
  height: 3,
  color: '#e9a409'
} );

import vueRouter from 'vue-router/types';

export function registerRouterHooks ( router: vueRouter ) {
  
  /* 1、初始化页面时 如果 vuex user 存在 token 则 注册动态路由 */
  const token = store.getters[ 'user/token' ];
  if ( token  ) {
    registerAsyncRoutes();
    router.currentRoute.path !== '/' && router.replace( '/' );
  } else {
    progressBar.finish();
    router.replace( `/login?redirect=${router.currentRoute.path}` );
    
  }

  router.beforeEach( ( to, from, next ) => {
    const toekn = store.getters[ 'user/token' ];
    if ( toekn &&  /^\/login(.)*/.test( to.path )  ) {
      next( '/' );
    }
    progressBar.start();
    next();
  } );

  router.afterEach( ( to, from ) => {
    progressBar.finish();
  } );

  router.onError( ( err ) => {} );
}

