/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 11:46:55
 * @Description: 关务管理 - 基本资料 -  海关编码 - 报关要素
 * @FilePath: \customs-system\src\view\hsCode\Details\element\schema.js
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

  operation: {
    label: 'table.operation',
    width: 100,
    visible: true
  },
  column: [
    {
      label: '序号',
      field: 'sort_no',
      width: 80,
      sortable: true
    },
    {
      label: '要素名称',
      field: 'name',
      sortable: true
    },
    {
      label: '取值方式',
      field: 'type',
      sortable: true
    }
  ]
} );
