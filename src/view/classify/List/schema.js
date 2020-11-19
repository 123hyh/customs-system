/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 21:07:09
 * @Description: 关务管理 - 归类列表
 * @FilePath: \customs-system\src\view\classify\List\schema.js
 */

export function queryBarSchema() {
  return [
    {
      label: '编码',
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
    isMultiple: true,
    visible: true
  },
  operation: {
    label: 'table.operation',
    width: 160,
    visible: true
  },
  column: [
    {
      label: '归类单号',
      field: 'id',
      sortable: true,
      fixed: 'left',
      width: 170
    },
    {
      label: '归类状态',
      field: 'classifyStatus',
      sortable: true,
      fixed: 'left',
      width: 120
    },
    {
      label: '关联单号',
      field: 'orderNo',
      sortable: true,
      width: 120

    },
    {
      label: '原始品名',
      field: 'originalPn',
      width: 120

    },
    {
      label: '申报品名',
      field: 'declarePn',
      width: 120

    },
    {
      label: '海关编码',
      field: 'hscode',
      width: 120

    },
    {
      label: '型号',
      field: 'spec',
      width: 120

    },
    {
      label: '品牌',
      field: 'brand',
      width: 120

    },
    {
      label: '产地',
      field: 'origin',
      width: 120

    },
    {
      label: '客户料号',
      field: 'materialNo',
      sortable: true,
      width: 150
    },
    {
      label: '委托客户',
      field: 'customerName',
      width: 120

    },
    {
      label: '商品描述',
      field: 'goodsDesc',
      width: 120

    },
    {
      label: '创建人/创建时间',
      field: 'create',
      width: 150
    },
    {
      label: '归类人/归类时间',
      field: 'classify',
      width: 150
    },
    {
      label: '锁定',
      field: 'lockFlag',
      sortable: true
    }
  ]
} );
