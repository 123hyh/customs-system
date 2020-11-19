/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 17:01:13
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
      field: 'code',
      sortable: true,
      fixed: 'left',
      width: 120
    },
    {
      label: '归类状态',
      field: 'status',
      sortable: true,
      fixed: 'left',
      width: 120
    },
    {
      label: '关联单号',
      field: 'englishName',
      sortable: true,
      width: 120

    },
    {
      label: '原始品名',
      field: 'enabled',
      width: 120

    },
    {
      label: '申报品名',
      field: 'enabled1',
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
      field: 'origin1',
      sortable: true,
      width: 150
    },
    {
      label: '委托客户',
      field: 'customer',
      width: 120

    },
    {
      label: '商品描述',
      field: 'desc',
      width: 120

    },
    {
      label: '创建人/创建时间',
      field: 'creator',
      width: 150
    },
    {
      label: '归类人/归类时间',
      field: 'classify',
      width: 150
    },
    {
      label: '锁定',
      field: 'lock',
      sortable: true
    }
  ]
} );
