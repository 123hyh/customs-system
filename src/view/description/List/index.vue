<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:11:20
 * @Description: 关务管理 - 基本资料 -  海关品名
 * @FilePath: \customs-system\src\view\description\List\index.vue
-->
<template>
  <div class="customs-base-description-list-wrap">
    <CombinationTable
      v-loading="loading"
      maxHeight="400"
      :tableSchema="tableSchema"
      :queryBarSchema="queryBar.schema"
      :list="list"
      :total="total"
      @queryBarOpration="findListData"
      @queryBarChange="findListData"
      @select="handlerSelect"
      @refresh="handlerRefresh"
      @sortChange="handlerClickSort"
      @rowClick="handlerRowDblclick"
      @rowDoubleClick="handlerRowDblclick"
      @pageChange="handlerPageChange"
      >
      <template #table_field_enabledFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.enabledFlag ? 'primary' : 'danger'"
          >
          {{ row.enabledFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_importEnabledFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.importEnabledFlag ? 'primary' : 'danger'"
          >
          {{ row.importEnabledFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_exportEnabledFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.exportEnabledFlag ? 'primary' : 'danger'"
          >
          {{ row.exportEnabledFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar">
          <ElButton v-t="'button.export'"/>
        </div>
      </template>
    </CombinationTable>

    <ScmTabs :list="tabList"/>
    <router-view
      :key="currentRow.id"
      :currentRow="currentRow"
      />
  </div>
</template>

<script>
import ScmTabs from '@/components/common/Tbas';

import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { Button, Tag } from 'element-ui';
import { findProductList, getProductData } from '@/apis/baseData/description';
import { cloneDeepWith } from 'lodash';
import { underlineToCamelcase } from '@/utils/object';
import { formatBoolean } from '@/filters';

export default {
  name: 'CustomsBaseDescriptionListWrap',
  components: {
    CombinationTable,
    ScmTabs,
    ElButton: Button,
    ElTag: Tag
  },
  filters: {
    formatBoolean( v, $t ) {
      return $t( formatBoolean( v ) );
    }
  },
  data() {
    const currentUrl = '/base/description';
    return {
      list: [],
      total: 0,
      loading: false,

      /* 点击当前行数据 */
      currentRow: {},
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },
      tabList: [
        {
          label: '品名编辑',
          path: ''
        },
        {
          label: '报关要素',
          path: '/element'
        }
      ].map( ( item ) => {
        return { ...item, path: currentUrl + item.path };
      } )
    };
  },
  created() {
    this.findListData();
  },
  methods: {
    getI18n( key ) {
      return this.$t( key );
    },

    /**
     * 刷新列表
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerRefresh() {
      this.currentRow = {};
      this.findListData();
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData( { limit = 10, page = 1, formData = {} } = {} ) {
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await findProductList( {
          limit,
          page,
          ...formData
        } );
        this.total = Number( total );
        this.list = list.map( underlineToCamelcase );
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    },

    /**
     * 查询栏 form 变化事件
     * @description:
     * @param {type}
     */
    handlerQueryChange( data ) {
      this.findListData( data );
    },

    /**
     * 表格点击排序事件
     * @param {type}
     * @return {type}
     */
    handlerClickSort( e ) {
      console.log( '触发排序事件', e );
      this.findListData();
    },

    /**
     * 表格 单/双击行事件
     * @param {type}
     * @return {type}
     */
    async handlerRowDblclick( row = {} ) {},

    /**
     * 选择列
     * @description:
     * @param {*} row
     * @return {*}
     */
    handlerSelect( { row = {} } = {} ) {
      this.currentRow = cloneDeepWith( row );
    },

    /**
     * 分页变化事件
     * @description:
     * @param {type}
     * @return {type}
     */
    handlerPageChange( data ) {
      console.log( '触发分页事件', data );
      this.findListData( data );
    }
  }
};
</script>

<style lang="scss">
.customs-base-description-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
