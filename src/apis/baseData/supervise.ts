/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 15:04:52
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-18 11:40:13
 * @Description: 价格监管方案
 * @FilePath: \customs-system\src\apis\baseData\supervise.ts
 */
import request from '../api';

/**
 * 查询 监管 列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getSuperviseList ( params:{[prop:string]:any} = {} ) {
  return request( {
    url: '/supervise/page',
    method:'GET',
    params
  } );
}

/**
 * 查询指定 id 的 监管方案
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getOneSupervise ( superviseId:string ) {
  return request( {
    url: `/supervise/${superviseId}`,
    method:'GET'
  } );
}

/**
 * 修改 监管方式 
 * @description: 
 * @param {any} data
 * @return {*}
 */
export  function updateSuperviseData ( data:any = {} ) {
  return request( {
    url: `/supervise/${data.id}`,
    method:'PUT',
    data
  } );
}

/** 
 * 获取 监管方式 - 条件明细
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getSuperviseDetails ( superviseId:string ) {
  return request( {
    url: `/supervise/${superviseId}/detail`,
    method:'GET'
  } );
}

/**
 * 新增 监管明细
 * @description: 
 * @param {*}
 * @return {*}
 */
export function addSuperviseDetail ( data: {superviseId:string, [prop:string]:any}  ) {
  return request( {
    url: `/supervise/${data.superviseId}/detail`,
    method: 'POST',
    data
  } );
}

/**
 * 修改 监管明细
 * @description: 
 * @param {object} data 集合
 * @param {string} data.superviseId 监管方案 id
 * @return {*}
 */
export function updateSuperviseDetail ( 
  data: {superviseId:string, id: string, [prop:string]:any}  
) {
  return request( {
    url: `/supervise/${data.superviseId}/detail/${data.id}`,
    method: 'PUT',
    data
  } );
}

/**
 * 删除 监管明细
 * @description: 
 * @param {object} data 集合
 * @param {string} data.superviseId 监管方案 id
 * @param {string} data.id 监管方案明细 id
 * @return {*}
 */
export function deleteSuperviseDetail ( 
  data: {superviseId:string, id:string, [prop:string]:any} 
) {
  return request( {
    url: `/supervise/${data.superviseId}/detail/${data.id}`,
    method: 'DELETE'
  } );
}