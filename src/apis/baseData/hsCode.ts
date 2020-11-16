/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 10:10:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:01:40
 * @Description: 海关编码
 * @FilePath: \customs-system\src\apis\baseData\hsCode.ts
 */
import request from '../api';

/**
 * 海关编码列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getHsCodeList ( params = {} ) {
  return request( {
    url:'/hscode/page',
    method:'GET',
    params
  } );
}

/**
 * 查询指定海关编码下的申报要素
 * @description: 
 * @param {string} hsCode
 * @return {*}
 */
export function getHsCodeElement ( hsId:string ) {
  return request( {
    url:`/hscode/${hsId}/element`,
    method: 'GET'
  } );
}

