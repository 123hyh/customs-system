/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 14:02:29
 * @Description: 关务管理 - 基本资料 -  商品型号 - 型号客户
 * @FilePath: \SCM 2.0\src\views\customs\base\specification\List\customer\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

export function queryBarSchema() {
  return [
    {
      label: prefixI18n( 'effectiveDate' ),
      field: 'date',
      type: 'date',
      dateType: 'daterange',
      valueFormat: 'yyyy-MM-dd',
      clearable: true
    },
    {
      label: prefixI18n( 'contract.customer' ),
      field: 'client',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: prefixI18n( 'type' ),
      field: 'business',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: prefixI18n( 'name' ),
      field: 'contract',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: prefixI18n( 'status' ),
      field: 'status',
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
    isMultiple: true,
    visible: true
  },
  operation: {
    label: 'table.operation',
    width: 100,
    visible: true
  },
  column: [
    {
      label: '客户',
      field: 'customerName'
    }
  ]
} );
