/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 18:37:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-13 23:01:34
 * @Description: 
 * @FilePath: \customs-system\src\locale\index.ts
 */

export type langType = 'en' | 'zh'

const langKey = 'jzjs-language';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './lang/zh_CN';
import en from './lang/en';

Vue.use( VueI18n );

import { useElementLocale } from './elementLocale';

const messages = {
  en,
  zh
};

/**
 * 获取当前语言
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getLang () {
  
  let browserlanguage = window.navigator.
    language.replace( /-/, '_' ).
    toLocaleLowerCase();

  browserlanguage = browserlanguage === 'zh' ? 'zh' : browserlanguage;
  

  const lanRecord = localStorage.getItem( langKey );
  useElementLocale( <langType>( lanRecord ||  browserlanguage ) );
  

  /* 如果 message 不存在 该语言选项 则取默认本地语言 */

  return ( lanRecord && Object.prototype.hasOwnProperty.call( messages, lanRecord )  ) ? 
    lanRecord : 
    browserlanguage;
}

const i18n = new VueI18n( {
  locale: getLang(),
  messages
} );


/**
 * 设置 i18n 语言
 * @param { string  } language
 */
export function setI18nLanguage ( language: langType ) {

  /* 初始 ui */
  useElementLocale( language );

  localStorage.setItem( langKey, language );
  i18n.locale = language;
  document.querySelector( 'html' )?.setAttribute( 'lang', language );
  return language;
}

/**
 * 获取 当前语言
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getLocaleName () {
  return i18n.locale;
}

/**
 * 动态设置 localeMsg
 * @param { object } messageOption 设置 语言选项
 * @param { boolean } isCover  是否合并 true: 合并；false：覆盖原Msg
 */
export function setLocaleMessage ( messageOption:{[prop:string]:any} = {}, isCover = false ) {
  
  for ( const key in messageOption ) {
    if ( Object.prototype.hasOwnProperty.call( messageOption, key ) ) {
      let result = i18n.getLocaleMessage( key ) ?? {};
      const message = messageOption[ key ];
      if ( isCover ) {
        result = message;
      } else {
        result = {
          ...result,
          ...message
        };
      }
      i18n.mergeLocaleMessage( key, result );
    }
  }
}

/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getI18nValue () {
  debugger;
}

export default i18n;