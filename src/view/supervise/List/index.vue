<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 15:54:09
 * @Description: 关务管理 - 基本资料 -  监管方案
 * @FilePath: \customs-system\src\view\supervise\List\index.vue
-->
<template>
  <div class="customs-base-supervise-list-wrap">
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
      <template #table_field_impFlag="row">
        {{ row.impFlag | formatBoolean }}
      </template>
      <template #table_field_expFlag="row">
        {{ row.expFlag | formatBoolean }}
      </template>
      <template #table_field_enabledFlag="row">
        {{ row.enabledFlag | formatBoolean }}
      </template>
      <template #table_field_definitFlag="row">
        {{ row.definitFlag | formatBoolean }}
      </template>
      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar"/>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <ElButton
          v-t="'button.update'"
          type="text"
          @click.stop="()=>handlerJump(row.id)"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { Button } from 'element-ui';
import { getSuperviseList } from '@/apis/baseData/supervise';
import { underlineToCamelcase } from '@/utils/object';
import { formatBoolean } from '@/filters';
export default {
  name: 'CustomsBaseSuperviseList',
  components: {
    CombinationTable,
    ElButton: Button
  },
  filters:{
    formatBoolean
  },
  data () {
    return {
      list: [ ],
      total: 1000,
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
    handlerJump ( id ) {
      this.$router.push( `/base/supervise/${id}` );
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData ( condition = {} ) {
      const { limit = 10, page = 1 } = condition;
      this.loading = true;
      try {
        const { data:{ data:{ list = [], total } } } = await getSuperviseList( { limit, page } );
        this.list = list.map( underlineToCamelcase );
        this.total = Number( total );
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
.customs-base-supervise-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
