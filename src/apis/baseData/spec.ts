/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 14:08:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:01:49
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