/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 13:53:18
 * @Description: 关务管理 - 基本资料 -  海关编码 - 非最惠国
 * @FilePath: \customs-system\src\view\hsCode\Details\notDiscount\schema.js
 */

export function queryBarSchema () {
  return [
    {
      label: '有效日期',
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
    },
    {
      label: '业务类型',
      field: 'business',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: '名称',
      field: 'contract',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: '状态',
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
    visible: true
  },
  operation: {
    label: 'table.operation',
    width: 100,
    visible: true
  },
  column: [
    {
      label: '国别代码',
      field: 'countryCode',
      sortable: true
    },
    {
      label: '国家名称',
      field: 'countryName',
      sortable: true
    },
    {
      label: '关税率',
      field: 'tariffRate',
      sortable: true
    },
    {
      label: '加征关税率',
      field: 'addTariffRate',
      sortable: true
    },
    {
      label: '消费税率',
      field: 'consumintptiontaxRate',
      sortable: true
    },
    {
      label: '启用时间',
      field: 'termStart',
      sortable: true
    },
    {
      label: '止用时间',
      field: 'termEnd',
      sortable: true
    }
  ]
} );
