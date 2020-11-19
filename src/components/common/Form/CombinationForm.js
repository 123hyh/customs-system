/* eslint-disable no-prototype-builtins */
/*
 * @Author: huangyuhui
 * @Date: 2020-09-27 11:00:47
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 19:57:08
 * @Description: 组合表单组件
 * @FilePath: \customs-system\src\components\common\Form\CombinationForm.js
 */
import Vue from 'vue';
import { forEachObject } from '../utils';
import { cloneDeepWith, debounce } from 'lodash';
import { Form, FormItem, Tooltip } from 'element-ui';
import './CombinationForm.scss';
import schema from './CombinationFormSchema';

import { pickDict, getDictSchemaItem, setDictValue } from './useDict.js';
import { getCodeDict } from '@/apis/code.ts';

/* 缓存组件表单数据集合 */
const cacheMap = new Map();

/* 组件别名 map */
const aliasComponentNames = {
  string: 'StringItem',
  date: 'DateItem',
  select: 'SelectItem',
  switch: 'SwitchItem',
  checkbox: 'CheckboxItem',
  radio: 'RadioItem',
  textarea: 'TextareaItem'
};

/**
 * 生成 form 表单
 * @param {object} params
 * @param {objec} params.schema 表单 schema
 * @param {objec} params.data 表单数据集合
 * @param {function} params.h $createElement方法
 */
function generateForm( params = {} ) {
  const { schema = {}, data = {}, h, /* 字段前缀 */ prefix = '' } = params;
  const nodes = [];
  forEachObject( schema, ( key, itemSchema = {} ) => {
    const { card = false, type } = itemSchema;
    if ( card ) {
      const { label = '', properties = {} } = itemSchema;

      /* 当 type 为 object时 创建 该集合 */
      if ( type === 'object' ) {
        if ( data.hasOwnProperty( key ) === false ) {
          Vue.set( data, key, Vue.observable( {} ) );
        }
      }
      nodes.push(
        h(
          'div',
          {
            class: [ 'scm-form-card', `scm-form-card-${ key }` ]
          },
          [

            /* form card 标题 */
            h( 'p',
              {
                class: [ 'scm-form-card-title' ]
              },
              [
                h( 'span', this.$t( label ) ),

                /* 点击按钮 */
                h( 'i',
                  {
                    class: [ 'toggle-icon', this.cardVisibleMap[ key ] ? 'el-icon-arrow-down' : 'el-icon-arrow-up' ],
                    on: {
                      click: () => {
                        this.cardVisibleMap[ key ] = !this.cardVisibleMap[ key ];
                        this.$forceUpdate();
                      }
                    }
                  }
                )
              ]
            ),
            h( 'div',
              {
                class: [ 'scm-form-card-container', this.cardVisibleMap[ key ] === false && 'hidden-form' ]
              },
              generateForm.call( this, {
                schema: properties,

                /* type 不为 object 递归传入 当前 data */
                data: type === 'object' ? data[ key ] : data,

                /* object 类型 需要 添加 prefx 传入 form-item 的 prop 参数 */
                prefix: type === 'object' ? 
                  prefix ? `${prefix}.${key}` : key :
                  undefined,
                h
              } )
            )
          ]
        )
      );
    } else {
      const { label, rules = [], multiple = false, visible = true, tip, ...options } = itemSchema;

      /* 初始化表单数据集合 */
      ( () => {
        if ( data[ key ] === undefined ) {
          const datas = {
            checkbox: [],
            string: undefined,
            switch: false,
            select: multiple ? [] : undefined,
            date: undefined,
            radio: undefined
          };
          Vue.set( data, key, datas[ type ] );
        }
      } )();
      nodes.push(
        visible
          ? h(
            'el-form-item',
            {
              class: [ 'scm-form-item', `form-item-${ key }` ],
              props: {
                label: this.$t( label ),
                prop: prefix ? `${ prefix }.${ key }` : key,
                'label-width': '100px',
                rules,
                for: key
              },
              on: {
                'el.form.change': data => {
                  this.$emit( 'change', {
                    field: key,
                    data,
                    formData: cloneDeepWith( cacheMap.get( this._uid ) )
                  } );
                }
              }
            },
            [

              /* 标题插槽 */
              tip && h(
                'span',
                {
                  slot: 'label'
                },
                [
                  h( 'span', this.$t( label ) ),
                  h( 'el-tooltip', {
                    class: [ 'tip-icon' ],
                    props: {
                      content: this.$t( tip ),
                      placement: 'top'
                    }
                  },
                  [
                    h( 'i', { class: [ 'el-icon-question' ] } )
                  ]
                  )
                ]
              ),

              /* 表单 item / 插槽 */
              type === 'slot' ? 
                this.$scopedSlots[ `field_${key}` ]( data ) :
                h(
                  aliasComponentNames[ type ],
                  {
                    props: {
                      value: data[ key ],
                      conf: {
                        ...options,
                        field: key
                      }
                    },
                    on: {
                      input: ( value ) => {
                        data[ key ] = value;
                      }
                    }
                  }
                )
            ].filter( Boolean )
          )
          : undefined
      );
    }
  } );
  return nodes;
}

export default {
  name: 'ScmCombinationForm',
  methods: {

    /**
     * 获取当前表单数据
     * @description: 
     * @param {*}
     * @return {*}
     */
    getAllFormData() {
      return cloneDeepWith( cacheMap.get( this._uid ) );
    },

    /**
     * 修改表单数据
     * @param { <T>(formData: T) => Promise<T> } handler 修改数据的回调，可返回promise
     * @returns {Promise<any>}
     */
    async setFormData( handler ) {
      if ( typeof handler === 'function' ) {
        const data = await handler( cloneDeepWith( cacheMap.get( this._uid ) ) );

        /* 重新写入 map  进行深克隆，避免出现引用 */
        cacheMap.set( this._uid, Vue.observable( cloneDeepWith( data ) ) );

        /* 避免视图不刷新 */
        this.$forceUpdate();
      }
    },

    /**
     * 校验表单，通过后返回 data
     * @returns { Promise<any> }
     */
    validate() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise( async ( resolve, reject ) => {
        this.$refs.form.validate( e => {
          if ( e ) {
            resolve( Object.freeze( cloneDeepWith( cacheMap.get( this._uid ) ) ) );
          } else {

            /* 如果校验过 跳至第一个未校验过的位置 */
            this.$nextTick( () => {
              const errorElem = this.$el.querySelector( '.el-form-item__error' );
              const top = errorElem?.offsetTop;
              if ( typeof top === 'number' ) {
                this.$el.parentElement.scrollTop = top;
              }
            } );
            reject( false );
          }
        } );
      } );
    },

    /**
     * 重置表单
     * @returns {boolean}
     */
    resetFields() {
      this.$refs.form.resetFields();
      return true;
    },

    /**
     * 移除表单校验结果
     * @description 参数参考 element-ui表单方法的clearValidate
     * @param {Array<string> | string} params
     */
    clearValidate( params ) {
      this.$refs.form.clearValidate( params );
      return true;
    },
    async setDict( dicts = [] ) {
      try {
        const data = await Promise.all( dicts.map( item => getCodeDict( item ) ) );

        /* 设置 options */
        data.forEach( ( item, index ) => {
          const dict = dicts[ index ];
          this.dictValues[ dict ].forEach( schemaItem => {
            schemaItem.options = item;
          } );
        } );
      } catch ( error ) {
        console.log( error );
      }
    }
  },
  props: {
    schema: {
      type: Object,
      default: () => ( schema )
    }
  },
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElTooltip: Tooltip,
    StringItem: () => import( './FormItem/String' ),
    TextareaItem: () => import( './FormItem/Textarea' ),
    SelectItem: () => import( './FormItem/Select' ),
    SwitchItem: () => import( './FormItem/Switch' ),
    DateItem: () => import( './FormItem/Date' ),
    CheckboxItem: () => import( './FormItem/Checkbox' ),
    RadioItem: () => import( './FormItem/Radio' )
  },
  beforeCreate() {
    cacheMap.set( this._uid, Vue.observable( {} ) );
    this.$once( 'hook:beforeDestroy', () => {
      cacheMap.delete( this._uid );
    } );
  },
  created() {
    console.log( this.dicts );

    /* 监听字典值变化 */
    this.$watch( 'dicts', debounce( ( value ) => {
      setDictValue( value, this.dictValues );
    }, 200 ), {
      deep: true,
      immediate: true
    } );
  },
  computed: {

    /* 所有字典值 */
    dicts() {
      return pickDict( this.schema );
    },
    dictValues() {
      return getDictSchemaItem( this.schema );
    },

    /* 展开/关闭 分组表单集合 */
    cardVisibleMap() {
      const vs = {};
      function getVisible( schema ) {
        forEachObject( schema, ( key, { card, visible = true, properties } = {} ) => {
          if ( card ) {
            vs[ key ] = visible;
          }
          if ( properties ) {
            getVisible( properties );
          }
        } );
      }
      getVisible( this.schema );
      return vs;
    }
  },

  render( h ) {
    const formData = cacheMap.get( this._uid );
    return h( 'el-form', {
      class: [ 'scm-combination-form' ],
      props: {
        model: formData,
        inline: true
      },
      ref: 'form'
    },
    generateForm.call( this, {
      schema: cloneDeepWith( this.schema ),
      data: formData,
      h
    } )
    );
  }
};

/**
 * 查找 form schem 子项的 方法
 * @param {object} schema from表单schema
 * @param {string[] | string} fields 需要查找的字段名
 * @returns { null | object | object[] }
 */
export function findSchemaItem( schema = {}, fields ) {
  let result = typeof fields === 'string' ? null : [];
  // eslint-disable-next-line consistent-return
  function _map( field ) {
    if ( field ) {
      forEachObject( schema, ( key, value ) => {
        const { properties } = value;
        if ( key === field ) {
          Array.isArray( fields )
            ? result.push( value )
            : result = value;
        } else if ( properties ) {
          _map( properties );
        }
      } );
    } else {
      return null;
    }
  }
  Array.isArray( fields )
    ? fields.forEach( _map )
    : _map( fields );

  return result;
}
