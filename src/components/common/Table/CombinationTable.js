/*
 * @Author: huangyuhui
 * @Date: 2020-09-23 17:07:25
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 17:50:11
 * @Description: 组合表格( 查询栏 、工具、表格 、分页 )
 * @FilePath: \customs-system\src\components\common\Table\CombinationTable.js
 */
import QueryBar from '../QueryBar/index.js';
import ToolBar from './component/ToolBar/index.js';
import Pagination from './component/Pagination/index.js';
import BaseTable from './BaseTable.js';
import { forEachObject } from '../utils';
import { useIndexedDb } from '../indexedDb';
import { cloneDeepWith } from 'lodash';
const isProduction = process.env.NODE_ENV !== 'development';
function addSuffix( str ) {
  const date = Date.now();
  return `${ date }_combinationTable_${ str }`;
}
import Vue from 'vue';

/* 刷新数据集合 */
const refreshMap = new Map();

/* 当前排序数据 */
const sortMap = new Map();

export default {
  name: 'ScmCombinationTable',
  destroy() {
    const uid = this._uid;
    refreshMap.delete( uid );
    sortMap.delete( uid );
  },
  methods: {

    /**
     * 初始化db 数据
     * @description:
     * @param {*}
     * @return {*}
     */
    async initDbData() {
      if ( this.entityName && isProduction ) {
        this.dbResult = Object.freeze( await useIndexedDb( 'CombinationTable' ) );
        const db = await this.dbResult;
        const result = await db.getItem( this.entityName );
        if ( result ) {
          this.column = result;
        }
      }
    },

    /**
     * 注册刷新组件参数
     */
    registerRefresh() {
      refreshMap.set(
        this._uid,
        Vue.observable(
          {
            QueryBar: addSuffix( 'queryBar' ),
            BaseTable: addSuffix( 'baseTable' ),
            Pagination: addSuffix( 'pagination' )
          }
        )
      );
    },

    /* 刷新组件 */
    refreshComponent( updateKeys = [ 'QueryBar', 'BaseTable', 'Pagination' ] ) {
      const refreshData = refreshMap.get( this._uid );

      /* 在刷新表格时 把当前组件 的 sortData 数据清理 */
      if ( updateKeys.includes( 'BaseTable' ) ) {
        sortMap.set( this._uid, {} );
      }
      if ( refreshData ) {
        const r = refreshData;
        for ( const item of updateKeys ) {
          r[ item ] = addSuffix( item );
        }
      }
    }
  },
  created() {
    this.registerRefresh();
    sortMap.set( this._uid, {} );
    this.initDbData();
  },
  components: {
    QueryBar,
    ToolBar,
    BaseTable,
    Pagination
  },
  props: {

    /* 查询栏参数( 不传则不显示 ) */
    queryBarSchema: {
      type: Array
    },

    /* 表格参数 */
    tableSchema: {
      type: Object,
      required: true
    },

    /* 分页总数 ( 不传则不显示 ) */
    total: {
      type: Number
    },

    /* 列表数据 */
    list: {
      type: Array,
      required: true
    },

    /* 存储schema 的实体名称 */
    entityName: String
  },
  data() {
    return {
      column: [],

      /* db实例 */
      dbResult: null
    };
  },
  computed: {

    /* 修改后的 表格列数据 ( 如果 修改过则 取 当前组件的 column 否则 props中的 )*/
    newColumn: {
      get() {
        return cloneDeepWith( this.column.length ? this.column : this.tableSchema.column );
      },
      set( val ) {
        this.column = val;
      }
    },

    /* 当前 表格的多选框数据 ( 向外暴露 )*/
    selections() {
      return cloneDeepWith( this.$refs?.BaseTable?.$selectData || [] );
    }
  },
  render( h ) {
    const currentRefreshs = refreshMap.get( this._uid );
    const {
      QueryBar: queryBarKey,
      BaseTable: baseTableKey,
      Pagination: paginationKey
    } = currentRefreshs;
    return h(
      'div',
      {
        class: [ 'scm-combination-table' ]
      },
      [

        /* 查询栏 */
        this.queryBarSchema && h(
          'QueryBar',
          {
            ref: 'QueryBar',
            key: queryBarKey,
            props: {
              schema: this.queryBarSchema
            },
            on: {
              opration: data => {
                this.refreshComponent( [
                  'BaseTable',
                  'Pagination'
                ] );
                this.$emit( 'queryBarOpration', data );
              },
              change: data => {
                this.refreshComponent( [
                  'BaseTable',
                  'Pagination'
                ] );
                this.$emit( 'queryBarChange', data );
              }
            }
          }
        ),

        /* 工具栏 */
        h(
          'ToolBar',
          {
            props: {
              schema: this.newColumn
            },
            scopedSlots: {
              // eslint-disable-next-line camelcase
              tool_bar: this.$scopedSlots.tool_bar
            },
            on: {
              refresh: () => {
                this.refreshComponent();
                this.$emit( 'refresh' );
              },

              /* 工具栏 修改表格 schema  */
              updateSchema: ( data = [] ) => {
                if ( this.entityName && isProduction ) {
                  this.dbResult?.setItem( this.entityName, data );
                }
                this.newColumn = data;
              }
            }
          }
        ),

        /* 表格 */
        h(
          'BaseTable',
          {
            ref: 'BaseTable',
            key: baseTableKey,
            scopedSlots: {

              /* 每个字段都拥有插槽 */
              ...forEachObject(
                this.$scopedSlots,
                // eslint-disable-next-line consistent-return
                ( key, value ) => {
                  const reg = /^table_/;
                  if ( reg.test( key ) ) {
                    return {
                      [ key.replace( reg, '' ) ]: value
                    };
                  }
                }
              )
            },
            attrs: this.$attrs,
            props: {
              schema: {
                ...this.tableSchema,
                column: this.newColumn
              },
              list: this.list
            },
            on: {
              sortChange: [
                data => {

                  /* 点击排序重置分页 */
                  this.refreshComponent( [ 'Pagination' ] );

                  /* 缓存当前 排序参数 */
                  sortMap.set( this._uid, data );

                  const result = { ...data };
                  if ( this.$refs.QueryBar ) {
                    result.formData = this.$refs.QueryBar.formData;
                  }
                  this.$emit( 'sortChange', result );
                }
              ],
              rowClick: ( ...args ) => this.$emit( 'rowClick', ...args ),
              rowDoubleClick: ( ...args ) => this.$emit( 'rowDoubleClick', ...args ),
              selectionChange: ( ...args ) => this.$emit( 'selectionChange', ...args ),
              selectAll: ( ...args ) => this.$emit( 'selectAll', ...args ),
              select: ( ...args ) => this.$emit( 'select', ...args ),
              updateColumn: ( ...data ) => {
                this.$emit( 'updateColumn', ...data );
              }
            }
          }
        ),

        /* 统计插槽 */
        this.$scopedSlots.summary && this.$scopedSlots.summary(),

        /* 分页组件 */
        typeof this.total === 'number' && h(
          'Pagination',
          {
            ref: 'pagination',
            props: {
              refreshKey: paginationKey,
              total: this.total
            },
            on: {

              /* 分页变化事件 */
              change: data => {
                const result = {
                  ...data,
                  sortData: sortMap.get( this._uid )
                };
                if ( this.$refs.QueryBar ) {
                  result.formData = this.$refs.QueryBar.formData;
                }
                this.$emit(
                  'pageChange',
                  result
                );
              }
            }
          }
        )
      ].filter( Boolean )
    );
  }
};
