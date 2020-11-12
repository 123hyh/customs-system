/*
 * @Author: huangyuhui
 * @Date: 2020-11-12 18:37:34
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-12 19:49:29
 * @Description: 
 * @FilePath: \customs_system\src\locale\index.ts
 */

type langType = ['en' | 'zhCn']

const langKey = 'jzjs-language';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use( VueI18n );


const messages = {
  en: {},
  zhCn: {}
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

  browserlanguage = browserlanguage === 'zh' ? 'zhCn' : browserlanguage;

  const lanRecord = localStorage.getItem( langKey );

  /* 如果 message 不存在 该语言选项 则取默认本地语言 */

  // eslint-disable-next-line no-prototype-builtins
  return ( lanRecord && messages.hasOwnProperty( lanRecord ) ) ? lanRecord : browserlanguage;
}

const i18n = new VueI18n( {
  locale: getLang(),
  messages
} );

/**
 * 设置 i18n 语言
 * @param {string} lang
 */
export function setI18nLanguage ( lang: langType[number] ) {
  localStorage.setItem( langKey, lang );
  i18n.locale = lang;
  document.querySelector( 'html' )?.setAttribute( 'lang', lang );
  return lang;
}

/**
 * 动态设置 localeMsg
 * @param { object } messageOption 设置 语言选项
 * @param { boolean } isCover  是否合并 true: 合并；false：覆盖原Msg
 */
export function setLocaleMessage ( messageOption:{[prop:string]:any} = {}, isCover = false ) {
  for ( const key in messageOption ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( messageOption.hasOwnProperty( key ) ) {
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
      i18n.setLocaleMessage( key, result );
    }
  }
}


export default i18n;