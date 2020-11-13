/*
 * @Author: huangyuhui
 * @Date: 2020-11-13 18:41:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-13 18:52:56
 * @Description:  设置 ui 语言
 * @FilePath: \customs-system\src\locale\elementLocale.ts
 */
import locale from 'element-ui/lib/locale/index.js';
import { langType } from './index';

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
  try {
    const { default: elMessage } = await locales[ lang ]();
    locale.use( elMessage );
  } catch ( error ) {
    console.log( error );
  }
  
}