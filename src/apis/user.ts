/*
 * @Author: your name
 * @Date: 2020-07-07 21:16:38
 * @LastEditTime: 2020-11-16 22:55:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs_system\src\apis\user.ts
 */

import md5 from 'md5';
import { scmCommonRequest as request } from './api';

/**
 * 登录接口参数类型
 */
export type LoginParams = { ac: string, pw: string, ci: number, pa: string };

/**
 * 登录接口
 * @param data
 * @param data.ac 账号/手机/邮箱 
 * @param data.ci 组织ID,如果该账号对应多个组织的员工，该字段需要填写 
 * @param data.pw 密码 
 * @param data.pa  区号，用户使用手机登录时填写，缺省为86 
 */
export function login( data: LoginParams ) {
  data.pw = md5( data.pw );
  return request( {
    url: '/scm/login',
    method: 'post',
    data
  } );
}

/**
 * 获取用户信息
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getInfo() {
  return request( {
    url: '/info',
    method: 'get'
  } );
}

/**
 * 退出登录
 * @description: 
 * @param {*}
 * @return {*}
 */
export function logout() {
  return request( {
    url: '/logout',
    method: 'post'
  } );
}