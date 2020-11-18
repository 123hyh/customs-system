/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-18 23:27:41
 * @Description: 关务管理 - 基本资料 -  港口区域
 * @FilePath: \SCM 2.0\src\views\customs\base\port\List\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`;

export function queryBarSchema () {
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
      label: '海关港口代码',
      field: 'code',
      sortable: true
    },
    {
      label: '港口名称',
      field: 'name',
      sortable: true
    },
    {
      label: '英文名',
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
