<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 14:03:02
 * @Description: 关务管理 - 基本资料 -  海关品名 - 报关要素
 * @FilePath: \customs-system\src\view\description\List\element\index.vue
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
      <template #table_field_type="row">
        <ElSelect
          v-if="row.id === currentEditData.id"
          v-model="currentEditData.type"
          clearable
          >
          <ElOption
            v-for="(value, key) in valueOption"
            :key="key"
            :label="value"
            :value="key"
            />
        </ElSelect>
        <template v-else>
          <ElTag
            v-if="row.type"
            disableTransitions
            >
            {{ row.type | codeLabel(valueOption) }}
          </ElTag>
          <template v-else>
            {{ row.type }}
          </template>
        </template>
      </template>
      <template #table_field_value="row">
        <ElInput
          v-if="row.id === currentEditData.id"
          v-model="currentEditData.value"
          clearable=""
          />
        <template v-else>
          {{ row.value }}
        </template>
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
import { Button, Input, Option, Select, Tag } from 'element-ui';
import { cloneDeepWith } from 'lodash';
import {
  getProductElement,
  updateProductElement
} from '@/apis/baseData/description';
import { getCodeDict } from '@/apis/code';
import { underlineToCamelcase } from '@/utils/object';

export default {
  name: 'CustomsBaseDescriptionElem',
  components: {
    CombinationTable,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option,
    ElInput: Input,
    ElTag: Tag
  },
  filters:{

    /* 取值方式 转文字 */
    codeLabel( value, options ) {
      return options[ value ] || '';
    }
  },
  props: {

    /* 当前点击海关编码列表行数据 */
    currentRow: {
      type: Object,
      default: () => ( {} )
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      tableSchema: tableSchema(),

      /* 取值方式 选项 */
      valueOption: {},

      /* 当前编辑行 */
      currentEditData: {}
    };
  },
  created() {
    this.getCodeDict();
    if ( this.currentRow.hscodeId ) {
      this.findListData();
    }
  },
  methods: {

    /**
     * 获取码值
     * @description:
     * @param {*}
     * @return {*}
     */
    async getCodeDict() {
      try {
        const { data } = await getCodeDict( 'CUS_ELEMENT_ORIGIN' );
        this.valueOption = data;
      } catch ( error ) {
        console.log( error );
      }
    },

    /**
     * 点击行更新操作按钮
     * @description:
     * @param {*} row
     * @return {*}
     */
    handlerRowClickUpdate( row = {} ) {
      this.currentEditData = cloneDeepWith( row );
    },

    /**
     * 编辑状态中 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerEditSave() {
      this.loading = true;
      try {
        await updateProductElement( this.currentEditData );
        this.currentEditData = {};
        this.findListData();
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    },

    /**
     * 编辑状态中 点击取消
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerEditCancel() {
      this.currentEditData = {};
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData( e ) {
      this.loading = true;
      try {
        const {
          data: { data = [] }
        } = await getProductElement( this.currentRow.id );
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
.customs-base-hscode-element-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
