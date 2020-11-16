<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 17:03:33
 * @Description: 关务管理 - 基本资料 -  海关编码 - 报关要素
 * @FilePath: \customs-system\src\view\hsCode\Details\element\index.vue
-->
<template>
  <div class="customs-base-hscode-element-list-wrap">
    <CombinationTable
      v-loading="loading"
      :tableSchema="tableSchema"
      :list="list"
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
        </div>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation>
        <ElButton
          v-t="'button.details'"
          type="text"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema  } from './schema';
import { Button } from 'element-ui';
import {  getHsCodeElement } from '@/apis/baseData/hsCode';

export default {
  name: 'FinanceInvoiceproofReceivableListWrap',
  components: {
    CombinationTable,
    ElButton: Button
  },
  props:{

    /* 当前点击海关编码列表行数据 */
    currentRow:{
      type: Object,
      default: () => ( {} )
    }
  },
  data () {
    return {
      list: [  ],
      loading: false,
      tableSchema: tableSchema()
    };
  },
  created () {
    if ( this.currentRow.hscodeId ) {
      this.findListData();
    }
  },
  methods: {

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData ( e ) {
      this.loading = true;
      try {
        const { data:{ data } } = await getHsCodeElement( this.currentRow.id );
        this.list = data;
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
.customs-base-hscode-element-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
