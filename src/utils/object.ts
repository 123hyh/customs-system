/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 10:22:23
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-12 10:22:35
 * @Description: 
 * @FilePath: \supply-chain-system\src\utils\object.ts
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