/*
 * @Author: huangyuhui
 * @since: 2020-07-07 16:29:09
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-08-04 15:55:17
 * @message:
 * @FilePath: \customs-system\src\main.js
 */
import Vue from 'vue';
Vue.config.productionTip = false;
import i18n from './locale';
import '@/styles/index.scss';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex:  2000
};

/* 加载bar */
import { progressBar } from './router/hooks';
progressBar.start();


/* 添加 错误处理 */
/* import { errorHandler } from '@/utils/errorLog.ts';
errorHandler( Vue );
 */
/* 注册 刷新路由指令 */
import { registerGlobalDirectives } from '@/directives/index.ts';
Vue.use( registerGlobalDirectives );


/* 关闭 bar */
progressBar.finish();

export default new Vue( {
  store,
  router,
  i18n,
  el: '#app',
  render: ( h ) => h( App )
} );
