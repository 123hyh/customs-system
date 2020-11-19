/*
 * @Author: huangyuhui
 * @Date: 2020-11-16 13:28:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:00:39
 * @Description:  品名 api
 * @FilePath: \customs-system\src\apis\baseData\description.ts
 */
import request from '../api';

/**
 * 查询品名列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function findProductList( params = {} ) {
  return request( {
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
export function getProductData( id: string ) {
  return request( {
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
export function getHsRelationProduct( hscode:string ) {
  return request( {
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
export function updateProductData( data:{[prop:string]:any} = {} ) {
  return request( {
    url: `/product/${data.id}`,
    method: 'PUT',
    data
  } );
}

/**
 * 查询 品名下的申报要素
 * @description: 
 * @param {*}
 * @return {*}
 */
export  function getProductElement( productId: string ) {
  return request( {
    url: `/product/${productId}/element`,
    method: 'GET'
  } );
}

/**
 * 修改品名 - 报关要素
 * @description: 
 * @param {*}
 * @return {*}
 */
export function updateProductElement( data: {[prop:string]:any} ) {
  const { productId, id } = data;
  return request( {
    url: `/product/${productId}/element/${id}`,
    method:'PUT',
    data
  } );
}
