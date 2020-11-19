/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 11:44:57
 * @Description: 关务管理 - 基本资料 -  海关编码
 * @FilePath: \customs-system\src\view\hsCode\List\schema.js
 */

export function queryBarSchema() {
  return [
    {
      label: '海关编码',
      field: 'code',
      type: 'string',
      options: [],
      clearable: true
    },
    {
      label: '名称',
      field: 'name',
      type: 'string',
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
      field: 'code',
      sortable: true,
      width: 100,
      fixed:'left'
    },
    {
      label: '编码名称',
      field: 'name',
      sortable: true,
      width: 200,
      fixed:'left'

    },
    {
      label: '进口监管条件',
      field: 'importSupervision',
      sortable: true,
      width: 150
    },
    {
      label: '检验检疫类别',
      field: 'quarantineType',
      sortable: true,
      width: 150
    },
    {
      label: '是否商检',
      field: 'inspFlag',
      sortable: true,
      width: 120
    },
    {
      label: '是否A检',
      field: 'inspAFlag',
      sortable: true,
      width: 100
    },
    {
      label: '需要3C鉴定',
      field: 'i3cFlag',
      sortable: true,
      width: 120
    },
    {
      label: '关税率',
      field: 'exportTariffRate',
      sortable: true,
      width: 100
    },
    {
      label: '非最惠国关税率',
      field: 'nonFavoredNationTariff',
      sortable: true,
      width: 150
    },
    {
      label: '出口暂定税率',
      field: 'exportProvisionalRate',
      sortable: true,
      width: 150
    },
    {
      label: '增值税率',
      field: 'addRate',
      sortable: true,
      width: 100
    },
    {
      label: '消费税率',
      field: 'exciseRate',
      sortable: true,
      width: 100
    },
    {
      label: '出口退税率',
      field: 'exportRebateRate',
      sortable: true,
      width: 150
    },
    {
      label: '第一法定单位',
      field: 'unit1Name',
      sortable: true,
      width: 150
    },
    {
      label: '第二法定单位',
      field: 'unit2Name',
      sortable: true,
      width: 150
    },
    {
      label: '含战略物资',
      field: 'stgcmaterialFlag',
      sortable: true,
      width: 150
    },
    {
      label: '启用',
      field: 'enabledFlag',
      sortable: true,
      width: 100
    }
  ]
} );
