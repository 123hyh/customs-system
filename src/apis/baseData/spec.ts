/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 14:08:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 14:13:58
 * @Description: 
 * @FilePath: \customs-system\src\apis\baseData\spec.ts
 */

import { customsRequest } from '../api';

/**
  * 查询商品型号列表
  * @description: 
  * @param {*} params
  * @return {*}
  */
export function getSpecList ( params = {} ) {
  return customsRequest( {
    url:'/spec/page',
    method: 'GET',
    params
  } );
}