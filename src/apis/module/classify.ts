/*
 * @Author: huangyuhui
 * @Date: 2020-11-19 20:43:32
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:44:38
 * @Description: 归类接口
 * @FilePath: \customs-system\src\apis\module\classify.ts
 */
import request from '../api';

/**
 * 查询归类列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getClassifyList( params:{[prop:string]:any} ) {
  return request( {
    url: '/classify/page',
    method:'GET',
    params
  } );
}
