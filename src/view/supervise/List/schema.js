/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 14:24:57
 * @Description: 关务管理 - 基本资料 -  监管方案
 * @FilePath: \SCM 2.0\src\views\customs\base\supervise\List\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

export function queryBarSchema () {
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
      field: 'pricesuperviseName',
      sortable: true,
      width: 100
    },
    {
      label: '价格级别',
      field: 'priceLevel',
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
      label: '监管描述',
      field: 'remark',
      sortable: true
    }
  ]
} );
