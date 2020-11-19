/*
 * @Author: your name
 * @Date: 2020-07-07 22:16:59
 * @lastTime: 2020-07-08 15:20:58
 * @LastAuthor: huangyuhui
 * @Description: User Store
 * @FilePath: \customs_system\src\store\modules\user.ts
 */
import { login, getInfo, logout, LoginParams } from '@/apis/user';
import {  cloneDeepWith } from 'lodash';
import { generateMenu } from '@/utils/index';

export interface MenuItemType {
  id: string;
  level: number;
  parent: string;
  route: string;
}
export interface MenuChidrenItem extends MenuItemType {
  children?: Array<MenuItemType>
}

type UserStore = {
  account: string;
  lastLogin: number;
  name: string;
  staff: string;
  token: string;
  menus: Array<MenuChidrenItem>;
};

import { Module } from 'vuex';
const user: Module<UserStore, {
}> = {
  namespaced: true,
  state: {
    account: '',
    lastLogin: 0,
    name: '',
    staff: '',
    token: '',
    menus: []
  },
  mutations: {

    /**
     * 设置用户信息
     * @description: 
     * @param {*} state
     * @param {*} payload
     * @return {*}
     */
    setUserInfo( state, payload ) {
      const {
        account,
        last_login: lastLogin,
        name,
        staff,
        token
      } = payload;
      state.account = account;
      state.lastLogin = lastLogin;
      state.name = name;
      state.staff = staff;
      state.token = token;

    },

    /**
     * 重置 用户信息
     * @description: 
     * @param {*} state
     * @return {*}
     */
    resetUserInfo( state ) {
      state.account = '';
      state.lastLogin = 0;
      state.menus = [];
      state.staff = '';
      state.name = '';
      state.token = '';
    },

    /**
     * 设置菜单
     * @description: 
     * @param {*} state
     * @param {Array} payload
     * @return {*}
     */
    setMenus( state, payload: Array<MenuChidrenItem> ) {
      const customsRoute = payload.find( ( item: MenuChidrenItem ) => item.route === 'customs' );
      customsRoute && generateMenu( payload, customsRoute );
      if ( customsRoute ) {
        state.menus = [ ...( customsRoute.children || [] ) ];
      }
    }
  },
  actions: {

    /**
     * 登陆
     * @description:
     * @param {*} param1
     * @param {LoginParams} payload
     */
    async login( { commit }, payload: LoginParams ): Promise<boolean | any> {
      try {
        const {
          data: { data, token }
        } = await login( cloneDeepWith( payload ) );
        const { registerAsyncRoutes } = await import( '@/router' );
        registerAsyncRoutes();
        commit( 'setUserInfo', { ...data, token } );
        commit( 'setMenus', data.menus );
        return true;
      } catch ( error ) {
        console.log( error );
        return Promise.reject( error );
      }
    },

    /**
     * 获取用户信息
     * @description:
     * @param {*}
     */
    async userInfo( { commit } ): Promise<boolean | any> {
      try {
        const {
          data: { data, token }
        } = await getInfo();

        const { registerAsyncRoutes } = await import( '@/router' );
        registerAsyncRoutes();
        commit( 'setUserInfo', { ...data, token } );
        return true;
      } catch ( error ) {
        console.log( error );
        return Promise.reject( error );
      }
    },

    /**
   * @description: 
   * @param {*}
   * @return {*}
   */
    async logout( { commit } ) {
      try {
        await logout();
        commit( 'resetUserInfo' );
        return true;
      } catch ( error ) {
        console.log( error );
        return Promise.reject( error );
      }
    }
  },
  getters: {
    token( state ) {
      return state.token;
    }
  }
};
export default user;
