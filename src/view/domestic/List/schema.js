/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 10:56:14
 * @Description: 关务管理 - 基本资料 -  境内目的地
 * @FilePath: \customs-system\src\view\domestic\List\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

export function queryBarSchema() {
  return [
    {
      label: '代码',
      field: 'code',
      type: 'string',
      clearable: true
    },
    {
      label: '名称',
      field: 'name',
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
      field: 'code',
      sortable: true
    },
    {
      label: '境内目的地',
      field: 'name',
      sortable: true
    },
    {
      label: '英文名称',
      field: 'englishName',
      sortable: true
    },
    {
      label: '是否有效',
      field: 'enabled',
      sortable: true
    }
  ]
} );
