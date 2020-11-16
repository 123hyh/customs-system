<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-06 11:14:43
 * @Description: 关务管理 - 基本资料 -  海关编码 - 非最惠国
 * @FilePath: \SCM 2.0\src\views\customs\base\hsCode\Details\notDiscount\index.vue
-->
<template>
  <div class="customs-base-hscode-notdiscount-list-wrap">
    <CombinationTable
      v-loading="loading"
      :tableSchema="tableSchema"
      :queryBarSchema="queryBar.schema"
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
          <el-button
            v-t="'button.create'"
            type="primary"
            />
          <el-button
            v-t="'button.delete'"
            type="danger"
            />
        </div>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <el-button
          v-t="'button.details'"
          v-jump="`/finance/invoiceProof/receivable/${row.id || 1}`"
          type="text"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
export default {
  name: 'CustomsBaseHscodeNotdiscountListWrap',
  components: {
    CombinationTable
  },
  data () {
    return {
      list: [ { age: 1 } ],
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      }
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
.customs-base-hscode-notdiscount-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
