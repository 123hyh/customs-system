/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 16:54:30
 * @Description: 关务管理 - 基本资料 -  海关编码 - 关联品名
 * @FilePath: \customs-system\src\view\hsCode\List\relatedDescription\schema.js
 */

export function queryBarSchema() {
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
      label: '品名',
      field: 'declare_pn',
      sortable: true,
      fixed:'left',
      width: 100
    },
    {
      label: '品名编号',
      field: 'id',
      sortable: true,
      width: 170
    },
    {
      label: '海关编码',
      field: 'hscode',
      sortable: true,
      width: 100
    },
    {
      label: '最小法定单位单价',
      field: 'min_legal_unit_price',
      sortable: true,
      width: 160
    },
    {
      label: '最大法定单位单价',
      field: 'max_legal_unit_price',
      sortable: true,
      width: 160
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
      label: '价格监管级别',
      field: 'price_level',
      sortable: true,
      width: 130
    },
    {
      label: '原始品名',
      field: 'originalPn',
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
      label: '价格基准价',
      field: 'base_price',
      sortable: true,
      width: 130
    },
    {
      label: '价格基准单位',
      field: 'base_price_unit',
      sortable: true,
      width: 150
    },
    {
      label: '最大报关价',
      field: 'max_declare_price',
      sortable: true,
      width: 130
    },
    {
      label: '最小报关价',
      field: 'min_declare_price',
      sortable: true,
      width: 130
    },
    {
      label: '允许价格偏差上限',
      field: 'upper_declare_price_limit',
      sortable: true,
      width: 160
    },
    {
      label: '允许价格偏差下限',
      field: 'lower_declare_price_limit',
      sortable: true,
      width: 160
    },
    {
      label: '净重基准',
      field: 'net_weight_base',
      sortable: true,
      width: 100
    },
    {
      label: '净重下限%',
      field: 'min_nw',
      sortable: true,
      width: 150
    },
    {
      label: '净重上限%',
      field: 'max_nw',
      sortable: true,
      width: 150
    }
  ]
} );
