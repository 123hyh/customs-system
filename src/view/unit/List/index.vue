<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 10:38:01
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
      <template #table_field_unitCode="row">
        <ElInput
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.unitCode"
          />
        <span v-else>
          {{ row.unitCode }}
        </span>
      </template>
      <template #table_field_unit="row">
        <ElInput
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.unit"
          />
        <span v-else>
          {{ row.unit }}
        </span>
      </template>
      <template #table_field_transUnitCode="row">
        <ElInput
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.transUnitCode"
          />
        <span v-else>
          {{ row.transUnitCode }}
        </span>
      </template>
      <template #table_field_transRate="row">
        <ElInput
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.transRate"
          />
        <span v-else>
          {{ row.transRate }}
        </span>
      </template>
      <template #table_field_pointFlag="row">
        <ElSwitch
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.pointFlag"
          />
        <ElTag
          v-else
          :type="row.enabled ? 'primary' : 'danger'"
          disableTransitions
          >
          {{ row.pointFlag |formatBoolean(getI18n) }}
        </ElTag>
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
          v-if="editTemporary.id !== row.id"
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
            @click.stop="handlerCancelEdit"
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
import { Button, Input, Switch, Select, Tag } from 'element-ui';
import { getUnitList, addUnit, updateUnit } from '@/apis/baseData/unit';
import { underlineToCamelcase } from '@/utils/object';
import { formatBoolean } from '@/filters';

export default {
  name: 'CustomsBaseUnitList',
  components: {
    CombinationTable,
    ElButton: Button,
    ElInput: Input,
    ElSwitch: Switch,
    ElTag: Tag
  },
  filters:{
    formatBoolean( v, $t ) {
      return $t( formatBoolean( v ) );
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      },

      /* 当前行编辑数据 */
      editTemporary: {}
    };
  },
  created() {
    this.findListData();
  },
  methods: {
    getI18n( key ) {
      return this.$t( key );
    },

    /**
     * 点击创建按钮
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerAppendEdit() {
      this.editTemporary = {
        __editable: true,
        unitCode: '',
        unit: '',
        pointFlag: false,
        transUnitCode: '',
        transRate: ''
      };
      this.list.unshift( this.editTemporary );
    },

    /**
     * 点击取消编辑
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerCancelEdit() {
      this.editTemporary = {};
    },

    /* 点击 更新 复制单条数据到 暂存 */
    copeToEditData( row ) {
      this.editTemporary = cloneDeepWith( row );
    },

    /**
     * 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    handerSave() {
      const data = this.editTemporary;
      if ( data.id ) {
        this.handlerUpdateUnit();
      } else {
        this.handlerAddUnit();
      }
    },

    /**
   * 新增单位
   * @description: 
   * @param {*}
   * @return {*}
   */  
    async handlerAddUnit() {
      try {
        const data = await addUnit( this.editTemporary );
        this.editTemporary = {};
        this.findListData();
      } catch ( error ) {
        console.log( error );
      }
    },

    /**
     * 修改单位
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerUpdateUnit() {
      this.loading = true;
      try {
        await updateUnit( this.editTemporary );
        this.editTemporary = {};
        this.findListData();
      } catch ( error ) {
        console.log( error );
        this.loading = false;
      }
    },

    /**
     * 查询 列表数据
     * @param {type}
     * @return {type}
     */
    async findListData( condition = {} ) {
      const { limit = 10, page = 1, formData = {} } = condition;
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await getUnitList( { limit, page, ...formData } );
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
.customs-base-unit-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
