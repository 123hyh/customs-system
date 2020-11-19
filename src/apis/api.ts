/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 09:56:39
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 11:13:49
 * @Description: 
 * @FilePath: \customs-system\src\apis\api.ts
 */
import { getI18nValue } from '@/locale/index';
import axios, { AxiosInstance } from 'axios';
import store from '@/store';

import md5 from 'md5';
import { forEachObject } from '@/utils/object';
import { Message, MessageBox } from 'element-ui';
import { filter, isEmpty } from 'lodash';

const isDev = process.env.NODE_ENV === 'development'; 

/**
 * 创建 axios 实例
 * @description: 
 * @param {string} baseURL
 * @param {number} timeout
 * @return {*}
 */
const createAxios = ( baseURL:string, timeout = 6000 ) => axios.create( {
  baseURL,
  timeout: isDev ? 0 : timeout
} );

/**
 * 注册 axios 拦截器
 * @param service 
 */
function registerServiceInterceptors( service: AxiosInstance )  {
  service.interceptors.request.use(
    function handlerRequest( config ) {

      // 混淆
      const ss = 's';
      const cc = 'c';
      const mm = 'm';
      const {
        url
      } = config;

      const timestamp = Date.now();
      const token = store.getters[ 'user/token' ];
      const lang =  'cn';

      let baseData:any = {
        lang,
        ts: timestamp,
        sign: md5( ss + timestamp + ( token || '' ) + cc + lang + timestamp + mm )
      };

      /* 开发环境 */
      if ( isDev && !/\/hscode\/page/.test( <string>config.url ) ) {
        baseData = {
          ...baseData,

          /* 海关编码不需要 */
          // _g: 123123, _o:12312312, _s:123456789 
          _g:'6671343871110152192', _o:'6672064615402176512', _s:'123456789'
        };
      }
      config.url = generateQueryParams( <string>url, baseData );

      // do something before request is sent
      if ( token ) {
        config.headers[ 'B-Token' ] = token;
      }

      /* 过滤 空值 请求参数 */
      config.params =  filterParams( config.params );
      return config;
    },
    function handlerError( error ) {
      return Promise.reject( error );
    } 
  );

  service.interceptors.response.use( ( response ) => {
    const { data:{ code, msg }, config } = response;
    if ( code === 30005 ) {

      // to re-login
      console.log( '登陆过期' );
    }
    if ( code !== undefined && code !== null && code !== 0 ) {
      Message.info( {
        message: msg,
        duration: 2 * 1000
      } );
      return Promise.reject( new Error( msg ) );
    }

    /* 统一提示 */
    if ( config.method?.toUpperCase() !== 'GET' && /^(\/login | \/logout)/.test( <string>config.url ) ) {
      Message.success(
        <string>getI18nValue( 'message.success' )
      );
    }
    return response;
  },
  error => {
    if ( error.response && error.response.status === 403 ) {

      MessageBox.confirm(
        '登陆过期了~',
        '提示', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then( () => {
        store.commit( 'user/resetUserInfo' );

        /* 1、重置 */
        location.reload(  );
        
      } );
    } else {
      Message.info( {
        message: '抱歉，系统发生了网络错误，请稍后重试',
        duration: 3 * 1000
      } );
    }
    return Promise.reject( error );
  } );
  return service;
}


/**
 * 生成 url query 参数
 * @param { string } url
 * @param { { [ propName: string ]: any } } params
 */
function generateQueryParams( url:string, params = {} ) {
  const hrefElem = document.createElement( 'a' );
  hrefElem.href = url;
  const data = new window.URLSearchParams( hrefElem.search );
  forEachObject( params, ( key:string, value ) => {
    data.append( key, value );
  } );
  return `${ hrefElem.pathname }?${ decodeURIComponent( data.toString() ) }`;
}


/**
 * 过滤空参数
 * @description: 
 * @param {*}
 * @return {*}
 */
export function filterParams( params = {} ) {
  return forEachObject( params, ( key, value ) => {
    return value !== '' ? { [ key ]:value } : {};
  } );
}

/* 平台网关 */
export const scmCommonRequest = registerServiceInterceptors( 
  createAxios( isDev ? '/api' : '' )  
);


/* 关务服务接口 */
export default registerServiceInterceptors( 
  createAxios( isDev ? '/customs' : '/customs-service' )
);