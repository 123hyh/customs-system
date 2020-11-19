/*
 * @Author: huangyuhui
 * @Date: 2020-11-19 10:17:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 19:49:11
 * @Description: 境内目的地
 * @FilePath: \customs-system\src\apis\baseData\domestic.ts
 */

import request from '../api';

/**
 * 境内目的地列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getCItyList( params:{[prop:string]:any} ) {
  return request( {
    url:'/city/page',
    method:'GET',
    params
  } );
}

/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export function updateCity( data: {id: string, enabled: boolean} ) {
  return request( {
    url: `/city/${data.id}`,
    method: 'PUT',
    data
  } );
}

/**
 * 禁用
 * @description: 
 * @param {*}
 * @return {*}
 */
export function disabledCity( id:string ) {
  return request( {
    url: `/city/${id}/disabled`,
    method:'POST'
  } );
}

/**
 * 启用
 * @description: 
 * @param {*}
 * @return {*}
 */
export function enabledCity( id:string ) {
  return request( {
    url: `/city/${id}/enabled`,
    method:'POST'
  } );
}