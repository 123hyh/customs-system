<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-15 16:21:01
 * @Description: 关务管理 - 基本资料 -  海关编码
 * @FilePath: \SCM 2.0\src\views\customs\base\hsCode\List\index.vue
-->
<template>
  <div class="customs-base-hscode-list-wrap">
    <CombinationTable
      v-loading="loading"
      :tableSchema="tableSchema"
      :queryBarSchema="queryBar.schema"
      :list="list"
      :total="total"
      @queryBarOpration="findListData"
      @queryBarChange="findListData"
      @refresh="findListData"
      @sortChange="handlerClickSort"
      @rowClick="handlerRowDblclick"
      @rowDoubleClick="handlerRowDblclick"
      @pageChange="handlerPageChange"
      >
      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar">
          <ElButton
            v-t="'button.create'"
            type="primary"
            />
          <ElButton
            v-t="'button.delete'"
            type="danger"
            />
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
    <router-view/>
  </div>
</template>

<script>
import ScmTabs from '@/components/common/Tbas';

import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { Button } from 'element-ui';
export default {
  name: 'CustomsBaseHscodeListWrap',
  components: {
    CombinationTable,
    ScmTabs,
    ElButton:Button
    
  },
  data () {
    return {
      list: [ { age: 1 } ],
      total: 1000,
      loading: false,
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
      ].map( item => {
        return { ...item,
          path: this.$route.path + item.path };
      } )
    };
  },
  created () {
    this.findListData();
  },
  methods: {

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData ( e ) {
      console.log( e );
      this.loading = true;
      try {
        console.log( 1 );
      } catch ( error ) {
        console.log( error );
      } finally {
        let time = setTimeout( () => {
          this.loading = false;
          clearTimeout( time );
          time = null;
        }, 1000 );
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
     * 表格双击行事件
     * @param {type}
     * @return {type}
     */
    handlerRowDblclick ( e ) {
      console.log( e );
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
.customs-base-hscode-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
