/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 17:44:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 17:46:37
 * @Description: 港口
 * @FilePath: \customs-system\src\apis\baseData\port.ts
 */
import request from '../api'
/**
 * 港口列表
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getPortList(params:{[prop:string]:any}) {
  return request({
    url:`/port/list`,
    method:'GET',
    params
  })
}
