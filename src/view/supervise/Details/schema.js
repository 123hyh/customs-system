/*
 * @Author: huangyuhui
 * @Date: 2020-11-17 16:01:12
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 16:22:07
 * @Description: 
 * @FilePath: \customs-system\src\view\supervise\Details\schema.js
 */
export default () => ( {
    
  name:{
    type: 'string',
    label:'监管方案名称',
    disabled: true
  },
  level:{
    type: 'string',
    label:'价格级别',
    disabled: true,
    rules:[
      {
        required: true,
        message:'必填'
      }
    ]
  },
  impFlag:{
    type: 'switch',
    label:'进口可用',
    disabled: true
  },
  expFlag:{
    type: 'switch',
    label:'出口可用',
    disabled: true
  },
  enabledFlag:{
    type: 'switch',
    label:'是否有效'
  },
  remark:{
    type: 'textarea',
    clearable: true,
    label:'备注'
  }
  
} );