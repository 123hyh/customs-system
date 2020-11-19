/*
 * @Author: huangyuhui
 * @Date: 2020-10-10 10:05:09
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 17:24:12
 * @Description: 财务管理 - 开票管理 - 开票申请
 * @FilePath: \customs-system\src\view\classify\Details\before\schema.js
 */
const rules = [
  {
    required: true,
    get message() {
      return 'test';
    },
    trigger: [ 'blur', 'change' ]
  }
];
export default () => ( {
  baseData: {
    card: true,
    label: '基础信息',
    properties: {
      hsCode: {
        type: 'string',
        label: '原始品名',
        clearable: true
      },
      hsCodeName: {
        type: 'string',
        label: '型号',
        clearable: true,
        rules
      },
      brand: {
        type: 'string',
        label: '品牌',
        clearable: true
      },
      exportSupervision: {
        type: 'string',
        label: '产地',
        clearable: true
      },
      quarantineType: {
        type: 'string',
        label: '客户料号',
        clearable: true
      },
      tariffRate: {
        type: 'string',
        label: '委托客户',
        clearable: true
      },
      nonFavoredNationTariff: {
        type: 'string',
        label: '关联订单号',
        clearable: true
      },
      provisionalTaxRate: {
        type: 'string',
        label: '商品描述',
        clearable: true
      }
    }
  }
} );
