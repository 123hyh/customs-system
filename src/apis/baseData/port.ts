/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 17:44:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:38:17
 * @Description: 港口
 * @FilePath: \customs-system\src\apis\baseData\port.ts
 */
import request from '../api';

/**
 * 港口列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getPortList( params:{[prop:string]:any} ) {
  return request( {
    url:'/port/page',
    method:'GET',
    params
  } );
}

/**
 * 禁用港口
 * @description: 
 * @param {*}
 * @return {*}
 */
export function disabledPort( id:string ) {
  return request( {
    url:`/port/${id}/disabled`,
    method:'POST'
  } );
}

/**
 * 启用港口
 * @description: 
 * @param {*}
 * @return {*}
 */
export function enabledPort( id:string ) {
  return request( {
    url:`/port/${id}/enabled`,
    method:'POST'
  } );
}