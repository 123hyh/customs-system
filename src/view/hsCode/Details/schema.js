/*
 * @Author: huangyuhui
 * @Date: 2020-10-10 10:05:09
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 10:27:11
 * @Description: 财务管理 - 开票管理 - 开票申请
 * @FilePath: \customs-system\src\view\hsCode\Details\schema.js
 */
const suffix = str => `entity.order.${ str }`;
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
        label: '海关编码',
        clearable: true
      },
      hsCodeName: {
        type: 'string',
        label: '编码名称',
        clearable: true,
        rules
      },
      importSupervision: {
        type: 'string',
        label: '进口监管条件',
        clearable: true
      },
      exportSupervision: {
        type: 'string',
        label: '出口监管条件',
        clearable: true
      },
      quarantineType: {
        type: 'string',
        label: '检验检疫类别',
        clearable: true
      },
      tariffRate: {
        type: 'string',
        label: '关税率',
        clearable: true
      },
      nonFavoredNationTariff: {
        type: 'string',
        label: '非最惠国关税率',
        clearable: true
      },
      provisionalTaxRate: {
        type: 'string',
        label: '暂定税率',
        clearable: true
      },
      valueAddedTaxRate: {
        type: 'string',
        label: '增值税率',
        clearable: true
      },
      gstRate: {
        type: 'string',
        label: '消费税率',
        clearable: true
      },
      refundTaxRate: {
        type: 'string',
        label: '出口退税率',
        clearable: true
      },
      unit1: {
        type: 'string',
        label: '第一法定单位代码',
        clearable: true
      },
      unit1Name: {
        type: 'string',
        label: '第一法定单位名称',
        clearable: true
      },
      unit2: {
        type: 'string',
        label: '第二法定单位代码',
        clearable: true
      },
      unit2Name: {
        type: 'string',
        label: '第二法定单位名称',
        clearable: true
      },
      stgcmaterialFlag: {
        type: 'switch',
        label: '含战略物资',
        clearable: true
      },
      enableFlag: {
        type: 'switch',
        label: '是否可用',
        clearable: true
      },
      remark: {
        type: 'textarea',
        label: '备注',
        clearable: true
      }
    }
  }
} );
