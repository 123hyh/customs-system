/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 14:08:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:39:01
 * @Description: 
 * @FilePath: \customs-system\src\apis\baseData\spec.ts
 */

import request from '../api';

/**
  * 查询商品型号列表
  * @description: 
  * @param {*} params
  * @return {*}
  */
export function getSpecList ( params = {} ) {
  return request( {
    url:'/spec/page',
    method: 'GET',
    params
  } );
}

/**
 * 查询指定型号的要素
 * @description: 
 * @param {string} specId 型号id
 * @return {*}
 */
export function getSpecElems ( specId:string ) {
  return request( {
    url: `/spec/${specId}/element/`,
    method: 'GET'
  } );
}

/**
 * 修改 型号 - 要素
 * @description: 
 * @param {*}
 * @return {*}
 */

export function updateSpecElement ( data:{specId:string, id:string, [prop:string]:any} ) {
  return request( {
    url:`/spec/${data.specId}/element/${data.id}`,
    method:'PUT',
    data
  } );
}