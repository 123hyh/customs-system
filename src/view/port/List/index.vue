<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-18 23:56:16
 * @Description: 关务管理 - 基本资料 -  港口区域
 * @FilePath: \customs-system\src\view\port\List\index.vue
-->
<template>
  <div class="customs-base-port-list-wrap">
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
      <!-- 编辑 插槽 -->
      <template #table_field_enabled="row">
        <!-- 是否可用 -->
        <ElSwitch
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.enabled"
          />
        <ElTag
          v-else
          :type="row.enabled ? '' : 'danger'"
          disableTransitions
          >
          {{ row.enabled | formatBoolean(getI18n) }}
        </ElTag>
      </template>
      <!-- 工具栏 -->
      <template v-slot:tool_bar>
        <div class="right-bar"/>
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
import { formatBoolean } from '@/filters';
import { Button, Switch, Tag } from 'element-ui';
import { getPortList } from '@/apis/baseData/port';
import { underlineToCamelcase } from '@/utils/object';
export default {
  name: 'CustomsBasePortListWrap',
  components: {
    CombinationTable,
    ElSwitch: Switch,
    ElTag: Tag,
    ElButton: Button
  },
  filters: {
    formatBoolean ( v, t ) {
      return t( formatBoolean( v ) );
    }
  },
  data () {
    return {
      list: [ { age: 1, key: 1 } ],
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
    getI18n ( key ) {
      return this.$t( key );
    },

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
    async findListData ( condition = {} ) {
      const { limit = 10, page = 1, formData = {} } = condition;
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await getPortList( {
          limit,
          page,
          ...formData
        } );
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
.customs-base-port-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
