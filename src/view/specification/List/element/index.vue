<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:55:08
 * @Description: 关务管理 - 基本资料 -  商品型号 - 型号要素
 * @FilePath: \customs-system\src\view\specification\List\element\index.vue
-->
<template>
  <div class="customs-base-specification-element-list-wrap">
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
        <div class="right-bar"/>
      </template>
      <!-- 编辑 要素值 插槽 -->
      <template #table_field_value="row">
        <ElInput
          v-if="row.id === currentEditData.id"
          v-model="currentEditData.value"
          />
        <template v-else>
          {{ row.value }}
        </template>
      </template>

      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <!-- 编辑状态中 按钮 -->
        <template v-if="row.id === currentEditData.id">
          <ElButton
            v-t="'button.save'"
            type="text"
            @click.stop="handlerEditSave"
            />
          <ElButton
            v-t="'button.cancel'"
            type="text"
            @click.stop="handlerEditCancel"
            />
        </template>
        <ElButton
          v-else
          v-t="'button.update'"
          type="text"
          @click.stop="() => handlerClickUpdate(row)"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema } from './schema';
import { Button, Input } from 'element-ui';
import { underlineToCamelcase } from '@/utils/object';
import { cloneDeepWith } from 'lodash';
import { getSpecElems, updateSpecElement } from '@/apis/baseData/spec';
export default {
  name: 'CustomsBaseSpecElem',
  components: {
    CombinationTable,
    ElButton: Button,
    ElInput: Input
  },
  props: {

    /* 品名列表 当前点击行 */
    currentRow: {
      type: Object,
      default: () => ( {} )
    }
  },
  data () {
    return {
      list: [ ],
      loading: false,
      tableSchema: tableSchema(),

      /* 当前编辑的数据 */
      currentEditData: {}
    };
  },
  created () {
    if ( this.currentRow.productId ) {
      this.findListData();
    }
  },
  methods: {

    /**
     * 点击行更新操作按钮
     * @description: 克隆当前行数据 并赋值
     * @param {*} row
     * @return {*}
     */
    handlerClickUpdate ( row ) {
      this.currentEditData = cloneDeepWith( row );
    },

    /**
     * 点击保存当前编辑中行数据
     * @description: 
     * @param {*}
     * @return {*}
     */
    async handlerEditSave () {
      this.loading = true;
      try {
        await updateSpecElement( { specId: this.currentRow.id, ...this.currentEditData } );
        this.currentEditData = {};
        this.findListData();
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading  = false;
      }
    },

    /**
     * 点击取消编辑
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerEditCancel () {
      this.currentEditData = {};
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
        const {
          data: { data = [] }
        } = await getSpecElems( this.currentRow.id );
        this.list = data.map( underlineToCamelcase );
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
.customs-base-specification-element-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
