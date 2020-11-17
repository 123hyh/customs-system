/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 15:49:35
 * @Description: 关务管理 - 基本资料 -  监管方案
 * @FilePath: \customs-system\src\view\supervise\List\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

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
      label: '测试',
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
      label: '监管方案名称',
      field: 'name',
      sortable: true,
      width: 150
    },
    {
      label: '价格级别',
      field: 'level',
      sortable: true,
      width: 100
    },
    {
      label: '进口可用',
      field: 'impFlag',
      sortable: true,
      width: 100
    },
    {
      label: '出口可用',
      field: 'expFlag',
      sortable: true,
      width: 100
    },
    {
      label: '是否有效',
      field: 'enabledFlag',
      sortable: true
    },
    {
      label: '是否可以定义',
      field: 'definitFlag',
      sortable: true
    },
    {
      label: '备注',
      field: 'remark',
      sortable: true
    }
  ]
} );
