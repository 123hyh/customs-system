/*
 * @Author: huangyuhui
 * @Date: 2020-11-06 15:43:48
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 11:25:49
 * @Description: 全局过滤器
 * @FilePath: \customs-system\src\filters\index.js
 */

/**
 * boolean 转 文字 过滤器 (自带语言)
 * @param { number | boolean } value 需要转换的值
 * @return {string}
 * @example true | formatBoolean
 */
export function formatBoolean( value = false ) {
  return ( `global.${ value ? 'yes' : 'no' }` );
}

/**
 * 日期时间格式化
 * {{ Date() | formatDate }} -> 2020-09-28 15:54:52
 * {{ '2020/11/06 12:30:45' | formatDate('yyyy-MM-dd hh:mm:ss w') }} -> 2020-11-06 12:30:45 星期四
 * @param {Date} value 可以被 new Date(value) 解析的时间格式，如 Date()、2020/11/06、2020-11-06 12:00 等
 * @param {String} fmt 格式化模版
 */
export const formatDate = ( () => {
  const weekMap = new Map( [
    [ 0, '星期日' ],
    [ 1, '星期一' ],
    [ 2, '星期二' ],
    [ 3, '星期三' ],
    [ 4, '星期四' ],
    [ 5, '星期五' ],
    [ 6, '星期六' ]
  ] );
  return function formatDate( value, fmt = 'yyyy-MM-dd hh:mm:ss' ) {
    const date = new Date( value );

    const normalData = {

      // 月份
      'M+': date.getMonth() + 1, 

      // 日
      'd+': date.getDate(), 

      // 小时
      'h+': date.getHours(),

      // 分
      'm+': date.getMinutes(), 

      // 秒
      's+': date.getSeconds(),

      // 星期
      'w+': date.getDay(), 

      // 季度
      'q+': Math.floor( ( date.getMonth() + 3 ) / 3 ), 

      // 毫秒
      S: date.getMilliseconds() 
    };

    if ( /(y+)/.test( fmt ) ) {
      fmt = fmt.replace(
        RegExp.$1,
        ( date.getFullYear() + '' ).substr( 4 - RegExp.$1.length )
      );
    }

    for ( const key in normalData ) {
      if ( key === 'w+' ) {
        fmt = fmt.replace( 'w', weekMap.get( normalData[ key ] ) );
      } else if ( new RegExp( `(${ key })` ).test( fmt ) ) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? normalData[ key ]
            : ( '00' + normalData[ key ] ).substr( ( '' + normalData[ key ] ).length )
        );
      }
    }

    return fmt;
  };
} )();
