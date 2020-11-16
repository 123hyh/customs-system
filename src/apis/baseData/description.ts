/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 13:28:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 17:55:35
 * @Description:  品名 api
 * @FilePath: \customs-system\src\apis\baseData\description.ts
 */
import { customsRequest } from '../api';

/**
 * 查询品名列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function findProductList ( params = {} ) {
  return customsRequest( {
    url: '/product/page',
    method:'GET',
    params
  } );
}

/**
 * 查询指定 id 的品名
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getProductData ( id: string ) {
  return customsRequest( {
    url: `/product/${id}`,
    method:'GET'
  } );
}

/**
 * 查询海关编码 关联的品名
 * @description: 
 * @param {string} hscode 对应海关编码
 * @return {*}
 */
export function getHsRelationProduct ( hscode:string ) {
  return customsRequest( {
    url:`/product/${hscode}/relation/`,
    method:'GET'
  } );
}

/**
 * 修改海关品名数据
 * @description: 
 * @param {object} data
 * @return {*}
 */
export function updateProductData ( data:{[prop:string]:any} = {} ) {
  return customsRequest( {
    url: `/product/${data.id}`,
    method: 'PUT',
    data
  } );
}