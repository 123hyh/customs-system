<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 11:44:27
 * @Description: 关务管理 - 基本资料 -  海关编码
 * @FilePath: \customs-system\src\view\hsCode\List\index.vue
-->
<template>
  <div class="customs-base-hscode-list-wrap">
    <CombinationTable
      v-loading="loading"
      height="400"
      :tableSchema="tableSchema"
      :queryBarSchema="queryBar.schema"
      :list="list"
      :total="total"
      @queryBarOpration="findListData"
      @queryBarChange="findListData"
      @refresh="handlerRefresh"
      @sortChange="handlerClickSort"
      @rowClick="handlerRowDblclick"
      @rowDoubleClick="handlerRowDblclick"
      @pageChange="handlerPageChange"
      >
      <template #table_field_inspFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.inspFlag ? 'primary' : 'danger'"
          >
          {{ row.inspFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_inspAFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.inspAFlag ? 'primary' : 'danger'"
          >
          {{ row.inspAFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_i3cFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.i3cFlag ? 'primary' : 'danger'"
          >
          {{ row.i3cFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_enabledFlag="row">
        <ElTag
          :disableTransitions="true"
          :type="row.enabledFlag ? 'primary' : 'danger'"
          >
          {{ row.enabledFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_exportTariffRate="row">
        {{ row.exportTariffRate | formatPercentage }}
      </template>
      <template #table_field_addRate="row">
        {{ row.addRate | formatPercentage }}
      </template>
      <template #table_field_exciseRate="row">
        {{ row.exciseRate | formatPercentage }}
      </template>
      <template #table_field_exportRebateRate="row">
        {{ row.exportRebateRate | formatPercentage }}
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
      :key="currentRow.id + currentRow.code"
      :currentRow="currentRow"
      />
  </div>
</template>

<script>
import ScmTabs from '@/components/common/Tbas';
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { Button, Tag } from 'element-ui';
import { getHsCodeList } from '@/apis/baseData/hsCode';
import { cloneDeepWith } from 'lodash';
import { underlineToCamelcase } from '@/utils/object';
import { formatBoolean } from '@/filters';

export default {
  name: 'CustomsBaseHscodeListWrap',
  components: {
    CombinationTable,
    ScmTabs,
    ElButton: Button,
    ElTag: Tag
  },
  filters:{
    formatBoolean( v, $t ) {
      return  $t( formatBoolean( v ) );
    },
    formatPercentage( v ) {
      return v !== undefined && v !== null ? `${v}%` : v;
    }
  },
  data() {
    const currentUrl = '/base/hsCode';

    return {
      list: [],
      total: 0,
      loading: false,

      /* 当前点击行的 id */
      currentRow: {},
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },
      tabList: [
        {
          label: '报关要素',
          path: ''
        },
        {
          label: '关联品名',
          path: '/relatedDescription'
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
    async findListData( params = {} ) {
      const { limit = 10, page = 1, formData = {}, sortData } = params;
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await getHsCodeList( { limit, page, ...formData } );
        this.list = list.map( underlineToCamelcase );
        this.total = Number( total );
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
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
     * 表格 单/双击 行事件
     * @description 查询报关要素
     * @param {type}
     * @return {type}
     */
    handlerRowDblclick( row ) {
      this.currentRow  = cloneDeepWith( row );
      this.currentRow.hscodeId = this.currentRow.id;
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
.customs-base-hscode-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
