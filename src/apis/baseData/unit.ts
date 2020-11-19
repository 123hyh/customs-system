/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 17:35:30
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 18:34:35
 * @Description: 计量单位
 * @FilePath: \customs-system\src\apis\baseData\unit.ts
 */
import { method } from 'lodash';
import request from '../api';

/**
 * 查询单位列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getUnitList( params:{[prop:string]:any} ) {
  return request( {
    url:'/unit/conversion/page',
    method:'GET',
    params
  } );
}

/**
 * 新增单位
 * @description: 
 * @param {*}
 * @return {*}
 */

export function addUnit( data:{[prop:string]:any} ) {
  return request( {
    url: '/unit/conversion',
    method:'POST',
    data
  } );
}

/**
 * 修改单位
 * @description: 
 * @param {*}
 * @return {*}
 */
export function updateUnit( data:{[prop:string]:any} ) {
  return request( {
    url: `/unit/conversion/${data.id}`,
    method:'PUT',
    data
  } );
}
