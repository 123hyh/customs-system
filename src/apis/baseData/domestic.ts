/*
 * @Author: huangyuhui
 * @Date: 2020-11-19 10:17:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 11:50:20
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