/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 10:10:11
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 15:20:16
 * @Description: 海关编码
 * @FilePath: \customs-system\src\apis\baseData\hsCode.ts
 */
import { customsRequest } from '../api';

/**
 * 海关编码列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getHsCodeList ( params = {} ) {
  return customsRequest( {
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
  return customsRequest( {
    url:`/hscode/${hsId}/element`,
    method: 'GET'
  } );
}

