<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:48:20
 * @Description: 关务管理 - 基本资料 -  商品型号
 * @FilePath: \customs-system\src\view\specification\List\index.vue
-->
<template>
  <div class="customs-base-specification-list-wrap">
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
            v-t="'button.delete'"
            type="danger"
            />
          <ElButton
            v-t="'button.enable'"
            type="primary"
            />
          <ElButton
            v-t="'button.disable'"
            type="warning"
            />
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
import { Button } from 'element-ui';
import { getSpecList } from '@/apis/baseData/spec';
import { underlineToCamelcase } from '@/utils/object';
import { cloneDeepWith } from 'lodash';
export default {
  name: 'CustomsBaseSpecificationListWrap',
  components: {
    CombinationTable,
    ScmTabs,
    ElButton: Button
  },
  data () {
    const currentUrl = '/base/spec';
    return {
      list: [],
      total: 0,
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },

      /* 当前点击的行 */
      currentRow: {},
      tabList: [
        {
          label: '型号要素',
          path: ''
        },
        {
          label: '型号客户',
          path: '/customer'
        }
      ].map( ( item ) => {
        return { ...item, path: currentUrl + item.path };
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
    async findListData ( { page = 1, limit = 10 } = {} ) {
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await getSpecList( { page, limit } );
        this.list = underlineToCamelcase( list );
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
    handlerRowDblclick ( row ) {
      this.currentRow = cloneDeepWith( row );
      this.currentRow.hscodeId = this.currentRow.id;
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
.customs-base-specification-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
