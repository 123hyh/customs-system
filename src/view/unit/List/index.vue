<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 11:17:01
 * @Description: 关务管理 - 基本资料 -  计量单位
 * @FilePath: \customs-system\src\view\unit\List\index.vue
-->
<template>
  <div class="customs-base-unit-list-wrap">
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
      <!-- 编辑栏 插槽 -->
      <template #table_field_code="row">
        <el-input
          v-if="editTemporary.key === row.key"
          v-model="editTemporary.code"
          />
        <span v-else>
          {{ row.code }}
        </span>
      </template>
      <template #table_field_name="row">
        <el-input
          v-if="editTemporary.key === row.key"
          v-model="editTemporary.name"
          />
        <span v-else>
          {{ row.name }}
        </span>
      </template>
      <template #table_field_transCode="row">
        <el-input
          v-if="editTemporary.key === row.key"
          v-model="editTemporary.transCode"
          />
        <span v-else>
          {{ row.transCode }}
        </span>
      </template>
      <template #table_field_transRate="row">
        <el-input
          v-if="editTemporary.key === row.key"
          v-model="editTemporary.transRate"
          />
        <span v-else>
          {{ row.transRate }}
        </span>
      </template>

      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar">
          <ElButton
            v-t="'button.create'"
            type="primary"
            />
        </div>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <ElButton
          v-if="editTemporary.key !== row.key"
          v-t="'button.update'"
          type="text"
          @click.stop="() => copeToEditData(row)"
          />
        <template v-else>
          <ElButton
            v-t="'button.save'"
            type="text"
            @click="handerSave"
            />
          <ElButton
            v-t="'button.cancel'"
            type="text"
            @click.stop="() => (editTemporary = {})"
            />
        </template>
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { cloneDeepWith } from 'lodash';
import { Button } from 'element-ui';
export default {
  name: 'CustomsBaseUnitListWrap',
  components: {
    CombinationTable,
    ElButton: Button
  },
  data () {
    return {
      list: [ { age: 1,
        key: 1 } ],
      total: 1000,
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },

      /* 当前行编辑数据 */
      editTemporary: {}
    };
  },
  created () {
    this.findListData();
  },
  methods: {

    /* 点击 更新 复制单条数据到 暂存 */
    copeToEditData ( row ) {
      this.editTemporary = cloneDeepWith( row );
    },

    /**
     * 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    handerSave () {
      const index = this.list.findIndex(
        ( item ) => item.key === this.editTemporary.key
      );
      this.list[ index ] = this.editTemporary;
      this.editTemporary = {};
      this.findListData();
    },

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
.customs-base-unit-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
