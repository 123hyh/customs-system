<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-16 23:05:07
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
      @refresh="handlerRefresh"
      @sortChange="handlerClickSort"
      @rowClick="handlerRowDblclick"
      @rowDoubleClick="handlerRowDblclick"
      @pageChange="handlerPageChange"
      >
      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar">
          <ElButton v-t="'button.export'"/>
        </div>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <ElButton
          v-t="'button.details'"
          v-jump="`/customs/base/hsCode/${row.id || 1}`"
          type="text"
          />
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
import { Button } from 'element-ui';
import { findProductList, getProductData } from '@/apis/baseData/description';
import { cloneDeepWith } from 'lodash';
export default {
  name: 'CustomsBaseDescriptionListWrap',
  components: {
    CombinationTable,
    ScmTabs,
    ElButton:Button
  },
  data () {
    const currentUrl = '/base/description';
    return {
      list: [  ],
      total: 0,
      loading: false,

      /* 点击当前行数据 */
      currentRow:{},
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
      ].map( item => {
        return { ...item,
          path: currentUrl + item.path };
      } )
    };
  },
  created () {
    this.findListData();
  },
  methods: {

    /**
     * 刷新列表
     * @description: 
     * @param {*}
     * @return {*}
     */
    handlerRefresh () {
      this.currentRow = {};
      this.findListData();
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData ( { limit = 10, page = 1 } = {} ) {
      this.loading = true;
      try {
        const { data:{ data:{ list, total } } } = await findProductList( { limit, page } );
        this.total = Number( total );
        this.list = list;
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
    handlerQueryChange ( data ) {
      this.findListData( data );
    },

    /**
     * 表格点击排序事件
     * @param {type}
     * @return {type}
     */
    handlerClickSort ( e ) {
      console.log( '触发排序事件', e );
      this.findListData();
    },

    /**
     * 表格 单/双击行事件
     * @param {type}
     * @return {type}
     */
    async handlerRowDblclick ( row = {} ) {
      this.currentRow = cloneDeepWith( row );
      this.currentRow.hscodeId = row.hscode_id;
    },

    /**
     * 分页变化事件
     * @description:
     * @param {type}
     * @return {type}
     */
    handlerPageChange ( data ) {
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
