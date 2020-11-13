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
    <CombinationTable :tableSchema="{}"/>
  </div>
</template>
<script>
import { setI18nLanguage, getLocaleName } from '@/locale';
import { DatePicker } from 'element-ui';
import CombinationTable from '@/components/common/Table/CombinationTable';
export default {
  name: 'Dashboard',
  components:{
    DatePicker,
    CombinationTable
  },
  methods:{
    handlerToggle () {
      const lang = getLocaleName(); 
      setI18nLanguage( lang === 'en' ? 'zh' : 'en' );
    }
  }
};
</script>