/*
 * @Author: huangyuhui
 * @Date: 2020-09-28 15:40:35
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-16 16:45:19
 * @Description: 公共组件 工具 函数
 * @FilePath: \SCM 2.0\src\components\common\utils.js
 */

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export function forEachObject(
  object,
  handler = ( _key, _value ) => { }
) {
  let newData = {};
  for ( const key in object ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( object.hasOwnProperty( key ) ) {
      const data = handler( key, object[ key ] );
      newData = {
        ...newData,
        ...( data ?? {} )
      };
    }
  }
  return newData;
}

/**
 * 获取类型
 * @description:
 * @param {type}
 * @return {type}
 */
export function getType( val ) {
  return Object.prototype.toString.call( val ).slice( 8, -1 );
}
