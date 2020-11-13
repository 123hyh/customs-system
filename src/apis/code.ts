/*
 * @Author: your name
 * @Date: 2020-11-13 23:40:49
 * @LastEditTime: 2020-11-13 23:42:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs_frontend\src\apis\code.ts
 */
import request from './api';
import { cloneDeepWith } from 'lodash';

/* 缓存集合 */
let cacheMap = Object.create( null );

/**
 * 清空缓存
 * @return {boolean}
 */
export function clearDictCache () {
  cacheMap = Object.create( null );
  return true;
}

/**
 * 获取码值字典
 *
 * @param { string } type 码值类型
 * @returns { Promise<{[propName: string]:any}> }
 */
export async function getCodeDict ( type:string ) {

  /* 缓存中需要判断是否过期 */
  const currentCacheData = cacheMap[ type ];
  if ( currentCacheData && currentCacheData.expire > Date.now() ) {
    return cloneDeepWith( currentCacheData );
  }

  try {
    const { data } = await request( {
      url: `/code/${type}/dict`,
      method: 'GET'
    } );
    cacheMap[ type ] = {

      /* 到期时间 ( 用于下次刷新码值 10 minute ) */
      expire: Date.now() + 60 * 1000 * 10,
      data
    };
  } catch ( error ) {
    console.log( error );
  }

  return cloneDeepWith( cacheMap[ type ] ?? {} );
}