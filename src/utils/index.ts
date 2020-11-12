/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:52
 * @lastTime: 2020-07-28 09:07:58
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \customs_system\src\utils\index.ts
 */
import {  MenuChidrenItem } from '@/store/modules/user';
import { cloneDeepWith } from 'lodash';

export function forEachObject (
  source: { [propName: string]: any },
  handler: ( key: string, value: any ) => void
) {
  for ( const key of Object.keys( source ) ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( source.hasOwnProperty( key ) ) {
      handler( key, source[ key ] );
    }
  }
}

/* 递归 树状菜单结构 */
export function generateMenu (
  sourceList: Array<MenuChidrenItem>,
  currentRouteItem: MenuChidrenItem
) {
  
  for ( const item of sourceList ) {
    if ( item.parent === currentRouteItem.id ) {

      const cloneItem = cloneDeepWith( item );
      currentRouteItem.children = [
        ...( currentRouteItem.children || [] ),
        cloneItem
      ];
      generateMenu( sourceList, cloneItem );
    }
  }
  return currentRouteItem;
}