<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 16:39:46
 * @Description: 关务管理 - 基本资料 -  海关编码 - 关联品名
 * @FilePath: \customs-system\src\view\hsCode\List\relatedDescription\index.vue
-->
<template>
  <div class="customs-base-hscode-relateddesc-list-wrap">
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
        <div class="right-bar"/>
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { getHsRelationProduct } from '@/apis/baseData/description';
export default {
  name: 'CustomsBaseHscodeRelateddescListWrap',
  components: {
    CombinationTable
  },
  props:{

    /* 上级传下的 海关编码 id */
    currentRow:{
      type: Object,
      default: () => ( {} )
    }
  },
  data() {
    return {
      list: [  ],
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      }
    };
  },
  created() {
    if ( this.currentRow.code ) {
      this.findListData();
    }
  },
  methods: {

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData( e ) {
      this.loading = true;
      try {
        const { data:{ data:{ list } } } = await getHsRelationProduct( this.currentRow.code );
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
.customs-base-hscode-relateddesc-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
