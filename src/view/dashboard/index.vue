<!--
 * @Author: huangyuhui
 * @since: 2020-07-14 09:45:08
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-14 11:21:30
 * @message: 
 * @FilePath: \customs-system\src\view\dashboard\index.vue
--> 
<template>
  <div>
    <p>home page</p>
    <button v-reload>
      测试刷新当前路由
    </button>
    <button @click="handlerToggle">
      切换语言
    </button>
    <DatePicker type="datetime"/>
    <!-- 表格 -->
    <CombinationTable
      :tableSchema="schema"
      :list="[{}]"
      >
      <template #table_operation>
        <div>123</div>
      </template>
    </CombinationTable>
    <!-- 表单 -->
    <CombinationForm
      ref="form"
      :schema="formSchema"
      />
    <button @click="handlerValidate">
      校验
    </button>
  </div>
</template>
<script>
import { setI18nLanguage, getLocaleName } from '@/locale';
import { DatePicker } from 'element-ui';
import CombinationTable from '@/components/common/Table/CombinationTable';
import CombinationForm from '@/components/common/Form/CombinationForm';
export default {
  name: 'Dashboard',
  components:{
    DatePicker,
    CombinationTable,
    CombinationForm
  },
  computed:{
    formSchema () {
      return {
        baseData:{
          card:true,
          label:'基础数据',
          properties:{
            name: {
              type: 'string',
              label:'姓名',
              rules:[
                {
                  required: true,
                  message: '测试',
                  trigger: [ 'change', 'blur' ]
                }
              ]
            }
          }
        }
      };
    },
    schema () {
      return {
        index:{
          width:100
        },
        selection:{
          width: 100
        },
        operation:{
          width: 100,
          label:'操作',
          visible: true
        },
        column:[
          {
            label:'姓名',
            field: 'name'
          }
        ]
      };
    }
  },
  methods:{
    async handlerValidate () {
      const data =  await this.$refs.form.validate();
      debugger;
    },
    handlerToggle () {
      const lang = getLocaleName(); 
      setI18nLanguage( lang === 'en' ? 'zh' : 'en' );
    }
  }
};
</script>