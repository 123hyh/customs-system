/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 13:56:20
 * @Description: 关务管理 - 基本资料 -  商品型号
 * @FilePath: \SCM 2.0\src\views\customs\base\specification\List\schema.js
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
      label: '型号',
      field: 'specName',
      sortable: true,
      width: 100
    },
    {
      label: '品牌',
      field: 'specBrand',
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
      label: '海关编码',
      field: 'hsCode',
      sortable: true,
      width: 100
    },
    {
      label: '要素',
      field: 'declareEles',
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
      label: '是否需要3C鉴定',
      field: 'i3cFlag',
      sortable: true,
      width: 100
    },
    {
      label: '已指定客户',
      field: 'specifyCustomerFlag',
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
      label: '最近一次报关价',
      field: 'lastCustomPrice',
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
      label: '净重基准',
      field: 'netweightBase',
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
} );
