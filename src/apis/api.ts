/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 09:56:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 13:32:42
 * @Description: 
 * @FilePath: \supply-chain-system\src\apis\api.ts
 */
import axios, { AxiosInstance } from 'axios';
import store from '@/store';

import md5 from 'md5';
import { forEachObject } from '@/utils/object';
import { Message, MessageBox } from 'element-ui';

function getToken () {
  return '';
}

const createAxios = ( baseURL:string ) => axios.create( {
  baseURL,
  timeout: 6000
} );

/**
 * 注册 axios 拦截器
 * @param service 
 */
function registerServiceInterceptors  ( service: AxiosInstance )  {
  service.interceptors.request.use(
    function handlerRequest ( config ) {

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

      config.url = generateQueryParams( <string>url, {
        lang,
        ts: timestamp,
        sign: md5( ss + timestamp + ( token || '' ) + cc + lang + timestamp + mm )
      } );

      // do something before request is sent
      if ( token ) {
        config.headers[ 'B-Token' ] = token;
      }

      return config;
    },
    function handlerError ( error ) {
      return Promise.reject( error );
    } 
  );

  service.interceptors.response.use( ( response ) => {
    
    const { data:{ code, msg } } = response;
    if ( code === 30005 ) {

      // to re-login
      console.log( '登陆过期' );
    }
    if ( code !== undefined && code !== null && code !== 0 ) {
      Message.info( {
        message: msg,
        duration: 3 * 1000
      } );
      return Promise.reject( new Error( msg ) );
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
function generateQueryParams ( url:string, params = {} ) {
  const hrefElem = document.createElement( 'a' );
  hrefElem.href = url;
  const data = new window.URLSearchParams( hrefElem.search );
  forEachObject( params, ( key:string, value ) => {
    data.append( key, value );
  } );
  return `${ hrefElem.pathname }?${ decodeURIComponent( data.toString() ) }`;
}

export default registerServiceInterceptors( createAxios( '/api' ) );