/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 11:25:24
 * @Description: 关务管理 - 基本资料 -  海关编码
 * @FilePath: \SCM 2.0\src\views\customs\base\hsCode\List\schema.js
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
      label: '海关编码',
      field: 'hsCode',
      sortable: true,
      width: 100
    },
    {
      label: '编码名称',
      field: 'hsCodeName',
      sortable: true,
      width: 100
    },
    {
      label: '进口监管条件',
      field: 'importSupervision',
      sortable: true,
      width: 100
    },
    {
      label: '是否商检',
      field: 'inspFlag',
      sortable: true,
      width: 100
    },
    {
      label: '是否A检',
      field: 'inspAFlag',
      sortable: true,
      width: 100
    },
    {
      label: '检验检疫类别',
      field: 'quarantineType',
      sortable: true,
      width: 100
    },
    {
      label: '需要3C鉴定',
      field: 'i3cFlag',
      sortable: true,
      width: 100
    },
    {
      label: '关税率',
      field: 'tariffRate',
      sortable: true,
      width: 100
    },
    {
      label: '非最惠国关税率',
      field: 'nonFavoredNationTariff',
      sortable: true,
      width: 100
    },
    {
      label: '暂定税率',
      field: 'provisionalTaxRate',
      sortable: true,
      width: 100
    },
    {
      label: '增值税率',
      field: 'valueAddedTaxRate',
      sortable: true,
      width: 100
    },
    {
      label: '消费税率',
      field: 'gstRate',
      sortable: true,
      width: 100
    },
    {
      label: '出口退税率',
      field: 'refundTaxRate',
      sortable: true,
      width: 100
    },
    {
      label: '第一法定单位',
      field: 'unit1Name',
      sortable: true,
      width: 100
    },
    {
      label: '第二法定单位',
      field: 'unit2Name',
      sortable: true,
      width: 100
    },
    {
      label: '含战略物资',
      field: 'stgcmaterialFlag',
      sortable: true,
      width: 100
    },
    {
      label: '启用',
      field: 'enableFlag',
      sortable: true,
      width: 100
    }
  ]
} );
