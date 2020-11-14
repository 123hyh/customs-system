/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 16:49:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 12:23:49
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Table\component\Column\Operation.js
 */

import { cloneDeepWith } from 'lodash';
export default {
  functional: true,
  render ( _, ctx ) {
    const { parent, data: { props: { schema = {} } = {} } } = ctx;
    return parent.$createElement(
      'el-table-column',
      {
        props: {
          'class-name': 'scm-table-column-operation',
          label: parent.$t( schema.label ) ?? '操作',
          width: schema.width,
          fixed: 'right',
          align: schema.align ?? 'center'
        },
        scopedSlots: {
          default: ( props ) => {
            return parent.$scopedSlots.operation( cloneDeepWith( props.row ) );
          }
        }
      }
    );
  }
};
