/*
 * @Author: huangyuhui
 * @Date: 2020-11-13 18:41:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-13 23:07:45
 * @Description:  设置 ui 语言
 * @FilePath: \customs-system\src\locale\elementLocale.ts
 */
import locale from 'element-ui/lib/locale/index.js';
import i18n, { langType, setLocaleMessage } from './index';
import { get } from 'lodash';
const locales = {
  en: () => import( 

    /* webpackChunkName: "element_lang_en" */
    'element-ui/lib/locale/lang/en.js'
  ),
  zh: () => import( 

    /* webpackChunkName: "element_lang_zh" */
    'element-ui/lib/locale/lang/zh-CN.js'
  )
};

/**
 * 设置 ui locale
 * @description: 
 * @param {langType} lang lang
 * @return {*}
 */
export async function useElementLocale ( lang :langType ) {
  if ( Object.prototype.hasOwnProperty.call( locales, lang ) ) {
    try {
   
      const { default: elMessage } = await locales[ lang ]();

      locale.use( elMessage );
      setLocaleMessage(  elMessage );
      locale.i18n( ( key:string ) => {
        return  get( elMessage, key );
      } );
    } catch ( error ) {
      console.log( error );
    }
  }

}