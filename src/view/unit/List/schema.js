/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-18 23:29:29
 * @Description: 关务管理 - 基本资料 -  计量单位
 * @FilePath: \customs-system\src\view\unit\List\schema.js
 */

export function queryBarSchema() {
  return [
    {
      label: '单位编码',
      field: 'unitCode',
      type: 'string',
      clearable: true
    },
    {
      label: '名称',
      field: 'unit',
      type: 'string',
      clearable: true
    }
    
  ];
}

/* 表格schema */
export const tableSchema = () => ( {
  selection: {
    width: 50,
    isMultiple: false,
    visible: true
  },
  operation: {
    label: 'table.operation',
    width: 100,
    visible: true
  },
  column: [
    {
      label: '单位编码',
      field: 'unitCode',
      sortable: true
    },
    {
      label: '单位名称',
      field: 'unit',
      sortable: true
    },
    {
      label: '对应统计计量单位代码',
      field: 'transUnitCode',
      sortable: true
    },
    {
      label: '换算率',
      field: 'transRate',
      sortable: true
    },
    {
      label: '允许小数',
      field: 'pointFlag',
      sortable: true
    }
  ]
} );
