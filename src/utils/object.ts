/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 10:22:23
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 18:00:10
 * @Description: 
 * @FilePath: \customs-system\src\utils\object.ts
 */

/**
 * 遍历对象
 * @param {*} object
 * @param {*} handler
 */
export function forEachObject<T extends Object> (
  object: T,
  handler: ( key:string, value: any )=>{[propName:string]: any} | void
) {
  let newData:{[propName:string]: any} = {};
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
 * 下划线 key -> 驼峰
 * @description: 
 * @param {*}
 * @return {*}
 */
export function underlineToCamelcase ( object = {} ) {
  return forEachObject( object, ( key, value ) => {
    key = key.replace( /_(.)/g, ( pre, match ) => {
      return match.toUpperCase();
    } );
    return { [ key ]:value };
  } );
}