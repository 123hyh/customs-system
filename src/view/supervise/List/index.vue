<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 17:07:28
 * @Description: 关务管理 - 基本资料 -  监管方案
 * @FilePath: \customs-system\src\view\supervise\List\index.vue
-->
<template>
  <div class="customs-base-supervise-list-wrap">
    <CombinationTable
      ref="table"
      v-loading="loading"
      :height="height"
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
      <!-- 编辑插槽  -->
      <template #table_field_impFlag="row">
        <ElTag
          :type="row.impFlag ? 'primary' : 'danger'"
          disableTransitions
          >
          {{ row.impFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_expFlag="row">
        <ElTag
          :type="row.expFlag ? 'primary' : 'danger'"
          disableTransitions
          >
          {{ row.expFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_enabledFlag="row">
        <ElTag
          :type="row.enabledFlag ? 'primary' : 'danger'"
          disableTransitions
          >
          {{ row.enabledFlag | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <template #table_field_definitFlag="row">
        <ElTag
          :type="row.definitFlag ? 'primary' : 'danger'"
          disableTransitions
          >
          {{ row.definitFlag | formatBoolean(getI18n) }}
        </ElTag>
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
          @click.stop="() => handlerJump(row.id)"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { Button, Tag } from 'element-ui';
import { getSuperviseList } from '@/apis/baseData/supervise';
import { underlineToCamelcase } from '@/utils/object';
import { formatBoolean } from '@/filters';
import { debounce } from 'lodash';
export default {
  name: 'CustomsBaseSuperviseList',
  components: {
    CombinationTable,
    ElButton: Button,
    ElTag: Tag
  },
  filters:{
    formatBoolean( v, $t ) {
      return $t( formatBoolean( v ) );
    }
  },
  data() {
    return {
      list: [ ],
      total: 0,
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },
      height:undefined
    };
  },
  created() {
    this.findListData();
  },
  methods: {
    getI18n( key ) {
      return this.$t( key );
    },
    handlerJump( id ) {
      this.$router.push( `/base/supervise/${id}` );
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData( condition = {} ) {
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
     * 表格双击行事件
     * @param {type}
     * @return {type}
     */
    handlerRowDblclick( e ) {
      console.log( e );
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
.customs-base-supervise-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
