/*
 * @Author: huangyuhui
 * @Date: 2020-10-09 11:56:02
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:53:56
 * @Description: 关务管理 - 基本资料 -  商品型号
 * @FilePath: \customs-system\src\view\specification\List\schema.js
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
      label: '类型',
      field: 'business',
      type: 'select',
      options: [],
      clearable: true
    },
    {
      label: '测试',
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
  column: [
    {
      label: '型号',
      field: 'spec',
      fixed:'left',
      sortable: true,
      width: 100
    },
    {
      label: '品牌',
      field: 'brand',
      sortable: true,
      width: 100
    },
    {
      label: '品名',
      field: 'declarePn',
      sortable: true,
      width: 100
    },
    {
      label: '海关编码',
      field: 'hscode',
      sortable: true,
      width: 100
    },
    {
      label: '要素',
      field: 'declarations',
      sortable: true,
      width: 200
    },
    {
      label: '监管条件',
      field: 'supervision',
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
      field: 'baseUnitPrice',
      sortable: true,
      width: 100
    },
    {
      label: '最大报关价',
      field: 'maxDeclarePrice',
      sortable: true,
      width: 100
    },
    {
      label: '最小报关价',
      field: 'minDeclarePrice',
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
      field: 'upperDeclarePriceLimit',
      sortable: true,
      width: 100
    },
    {
      label: '允许价格偏差下限',
      field: 'lowerDeclarePriceLimit',
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
} );
