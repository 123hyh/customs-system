/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-18 23:30:09
 * @Description: 关务管理 - 基本资料 -  境内目的地
 * @FilePath: \SCM 2.0\src\views\customs\base\domestic\List\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

export function queryBarSchema () {
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
      label: '代码',
      field: 'countryCode',
      sortable: true
    },
    {
      label: '境内目的地',
      field: 'countryName',
      sortable: true
    },
    {
      label: '英文名称',
      field: 'countryEname',
      sortable: true
    },
    {
      label: '是否有效',
      field: 'enabledFlag',
      sortable: true
    }
  ]
} );
