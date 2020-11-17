<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 10:39:46
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
      <!-- 取值方式 编辑 -->
      <template #table_field_valueMode="row">
        <ElSelect
          v-if="row.id === currentEditData.id"
          v-model="currentEditData.valueMode"
          >
          <ElOption
            v-for="item in editData.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </ElSelect>
      </template>
      
      <!-- 表格操作列 -->
      <template #table_operation="row">
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
          @click.stop="() => handlerRowClickUpdate(row)"
          />
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema } from './schema';
import { Button, Option, Select } from 'element-ui';
import { getHsCodeElement } from '@/apis/baseData/hsCode';
import { cloneDeepWith } from 'lodash';

export default {
  name: 'FinanceInvoiceproofReceivableListWrap',
  components: {
    CombinationTable,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option
  },
  props: {

    /* 当前点击海关编码列表行数据 */
    currentRow: {
      type: Object,
      default: () => ( {} )
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      tableSchema: tableSchema(),

      /* 编辑行初始数据 */
      editData: {
        options: [
          {
            label: 'packing',
            value: '1'
          },
          {
            label: '订单取值',
            value: '2'
          }
        ]
      },

      /* 当前编辑行 */
      currentEditData: {}
    };
  },
  created () {
    if ( this.currentRow.hscodeId ) {
      this.findListData();
    }
  },
  methods: {

    /**
     * 点击行更新操作按钮
     * @description:
     * @param {*} row
     * @return {*}
     */
    handlerRowClickUpdate ( row = {} ) {
      this.currentEditData = cloneDeepWith( row );
    },

    /**
     * 编辑状态中 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerEditSave () {
      debugger;
    },

    /**
     * 编辑状态中 点击取消
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
      this.loading = true;
      try {
        const {
          data: { data }
        } = await getHsCodeElement( this.currentRow.id );
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
