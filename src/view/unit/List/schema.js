/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 18:31:16
 * @Description: 关务管理 - 基本资料 -  计量单位
 * @FilePath: \customs-system\src\view\unit\List\schema.js
 */

export function queryBarSchema () {
  return [
    {
      label: '测试1',
      field: 'date',
      type: 'date',
      dateType: 'daterange',
      valueFormat: 'yyyy-MM-dd',
      clearable: true
    },
    {
      label: '测试2',
      field: 'client',
      type: 'select',
      options: [],
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
      label: '单位代码',
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
