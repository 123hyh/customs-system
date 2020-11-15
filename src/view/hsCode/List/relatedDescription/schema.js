/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 11:26:10
 * @Description: 关务管理 - 基本资料 -  海关编码 - 关联品名
 * @FilePath: \SCM 2.0\src\views\customs\base\hsCode\List\relatedDescription\schema.js
 */
const prefixI18n = str => `entity.customer.agreement.${ str }`

export function queryBarSchema() {
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
  ]
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
      field: '3',
      sortable: true,
      width: 100
    },
    {
      label: '品名编号',
      field: 'productNo',
      sortable: true,
      width: 100
    },
    {
      label: '品名',
      field: 'productName',
      sortable: true,
      width: 100
    },
    {
      label: '最小法定单位单价',
      field: 'minLegalUnitPrice',
      sortable: true,
      width: 100
    },
    {
      label: '最大法定单位单价',
      field: 'maxLegalUnitPrice',
      sortable: true,
      width: 100
    },
    {
      label: '可用状态',
      field: 'enableFlag',
      sortable: true,
      width: 100
    },
    {
      label: '进口可用',
      field: 'importEnabledFlag',
      sortable: true,
      width: 100
    },
    {
      label: '出口可用',
      field: 'exportEnabledFlag',
      sortable: true,
      width: 100
    },
    {
      label: '价格监管级别',
      field: 'priceLevel',
      sortable: true,
      width: 100
    },
    {
      label: '原始品名',
      field: 'originalPn',
      sortable: true,
      width: 100
    },
    {
      label: '申报品名',
      field: 'declarePn',
      sortable: true,
      width: 100
    },
    {
      label: '价格基准价',
      field: 'basePrice',
      sortable: true,
      width: 100
    },
    {
      label: '价格基准单位',
      field: 'basePriceUnit',
      sortable: true,
      width: 100
    },
    {
      label: '最大报关价',
      field: 'maxCustomPrice',
      sortable: true,
      width: 100
    },
    {
      label: '最小报关价',
      field: 'minCustomPrice',
      sortable: true,
      width: 100
    },
    {
      label: '允许价格偏差上限',
      field: 'upperPriceLimit',
      sortable: true,
      width: 100
    },
    {
      label: '允许价格偏差下限',
      field: 'lowerPriceLimit',
      sortable: true,
      width: 100
    },
    {
      label: '净重基准',
      field: 'netWeightBase',
      sortable: true,
      width: 100
    },
    {
      label: '净重下限%',
      field: 'minNw',
      sortable: true,
      width: 100
    },
    {
      label: '净重上限%',
      field: 'maxNw',
      sortable: true,
      width: 100
    }
  ]
} )
