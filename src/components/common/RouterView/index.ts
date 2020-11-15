/*
 * @Author: your name
 * @Date: 2020-11-15 14:34:19
 * @LastEditTime: 2020-11-15 14:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \customs_frontend\src\components\common\RouterView\index.js
 */
import { CreateElement } from 'vue';
let id = 0;

function generateBox ( h: CreateElement ) {
  return h(
    'router-view',
    {
      class: [ 'scm-paved-wrapper' ]
    }
  );
}

/**
 * 包装 router-view组件
 * @param { string } componentName 组件name
 * @param { boolean } keepAlive 是否缓存该组件
 */

export default function routerView ( componentName:string, keepAlive = true ) {
  return {
    name: componentName || `RouterWrapper_${id++}`,
    render ( h: CreateElement ) {
      return h(
        'div',
        [
          h(
            'transition',
            {
              props: {
                name: 'side'
              }
            },
            [
              keepAlive
                ? h(
                  'keep-alive',
                  [
                    generateBox( h )
                  ]
                )
                : generateBox( h )
            ]
          )
        ]
      );
    }
  };
}
