/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 15:49:12
 * @Description: 关务管理 - 基本资料 -  商品型号 - 型号要素
 * @FilePath: \customs-system\src\view\specification\List\element\schema.js
 */

export function queryBarSchema () {
  return [
    {
      label: '测试',
      field: 'date',
      type: 'date',
      dateType: 'daterange',
      valueFormat: 'yyyy-MM-dd',
      clearable: true
    },
    {
      label: '客户',
      field: 'client',
      type: 'select',
      options: [],
      clearable: true
    }
  ];
}

/* 表格schema */
export const tableSchema = () => ( {
  operation: {
    label: 'table.operation',
    width: 100,
    visible: true
  },
  column: [
    {
      label: '序号',
      field: 'sortNo',
      width: 80,
      sortable: true
    },
    {
      label: '要素名称',
      field: 'name',
      sortable: true
    },
    {
      label: '要素值',
      field: 'value',
      sortable: true
    }
  ]
} );
