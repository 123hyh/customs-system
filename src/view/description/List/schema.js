/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 17:31:02
 * @Description: 关务管理 - 基本资料 -  海关品名
 * @FilePath: \customs-system\src\view\description\List\schema.js
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
      label: '海关编码',
      field: 'hscode',
      sortable: true,
      width: 100
    },
    {
      label: '申报品名',
      field: 'declare_pn',
      sortable: true,
      width: 100
    },
    {
      label: '可用状态',
      field: 'enabled_flag',
      sortable: true,
      width: 100
    },
    {
      label: '进口可用',
      field: 'import_enabled_flag',
      sortable: true,
      width: 100
    },
    {
      label: '出口可用',
      field: 'export_enabled_flag',
      sortable: true,
      width: 100
    },
    {
      label: '备案序号',
      field: 'record_no',
      sortable: true,
      width: 100
    },
    {
      label: '备案料号',
      field: 'record_item',
      sortable: true,
      width: 100
    },
    {
      label: '备案数量',
      field: 'record_qty',
      sortable: true,
      width: 100
    },
    {
      label: '价格监管级别',
      field: 'price_level',
      sortable: true
    },
    {
      label: '价格基准价',
      field: 'base_unit_price',
      sortable: true
    },
    {
      label: '价格基准单位',
      field: 'base_price_unit',
      sortable: true
    }
  ]
} );
