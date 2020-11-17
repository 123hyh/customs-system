/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 15:04:52
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 16:50:32
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