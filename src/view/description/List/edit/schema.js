/*
 * @Author: huangyuhui
 * @Date: 2020-10-10 10:05:09
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 19:50:14
 * @Description: 关务管理 - 基本资料 -  海关品名  - 编辑
 * @FilePath: \customs-system\src\view\description\List\edit\schema.js
 */
import { checkIntegerDecimal, checkInteger } from '@/components/common/Form/validators.js';
const rules = [
  {
    required: true,
    get message() {
      return '测试';
    },
    trigger: [ 'blur', 'change' ]
  }
];
export default () => ( {
  hscode: {
    type: 'slot',
    label: '海关编码',
    clearable: true
  },
  hscodeName: {
    type: 'string',
    label: '海关编码名称',
    disabled: true,
    clearable: true
  },
  declarePn: {
    type: 'string',
    label: '申报品名',
    rules,
    clearable: true
  },
  recordNo: {
    type: 'string',
    label: '备案序号',
    clearable: true
    
  },
  recordItem: {
    type: 'string',
    label: '备案料号',
    clearable: true
  },
  recordQty: {
    type: 'string',
    label: '备案数量',
    clearable: true,
    rules:[
      {
        validator: checkInteger()
      }
    ]
  },
  baseUnitPrice: {
    type: 'string',
    label: '价格基准价',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  maxDeclarePrice: {
    type: 'string',
    label: '最大报关价',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  minDeclarePrice: {
    type: 'string',
    label: '最小报关价',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  upperDeclarePriceLimit: {
    type: 'string',
    label: '允许价格偏差上限%',
    rules: [
      {
        validator: checkIntegerDecimal( 2 )
      }
    ],
    clearable: true
  },
  lowerDeclarePriceLimit: {
    type: 'string',
    label: '允许价格偏差下限%',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  netWeightBase: {
    type: 'string',
    label: '净重基准',
    clearable: true
  },
  minNw: {
    type: 'string',
    label: '净重下限%',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  maxNw: {
    type: 'string',
    label: '净重上限%',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  minLegalUnitPrice: {
    type: 'string',
    label: '最小法定单位单价',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  maxLegalUnitPrice: {
    type: 'string',
    label: '最大法定单位单价',
    clearable: true,
    rules:[
      {
        validator: checkIntegerDecimal( 2 )
      }
    ]
  },
  enabledFlag: {
    type: 'switch',
    label: '可用状态',
    clearable: true
  },
  priceLevel: {
    type: 'string',
    label: '价格监管级别',
    clearable: true
  },
  basePriceUnit: {
    type: 'string',
    label: '价格基准单位',
    clearable: true
  },
  importEnabledFlag: {
    type: 'switch',
    label: '进口可用',
    clearable: true
  },
  exportEnabledFlag: {
    type: 'switch',
    label: '出口可用',
    clearable: true
  }
} );
