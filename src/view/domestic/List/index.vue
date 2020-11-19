<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 10:58:10
 * @Description: 关务管理 - 基本资料 -  境内目的
 * @FilePath: \customs-system\src\view\domestic\List\index.vue
-->
<template>
  <div class="customs-base-domestic-list-wrap">
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
      <template #table_field_countryEname="row">
        <ElInput
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.countryEname"
          />
        <span v-else>
          {{ row.countryEname }}
        </span>
      </template>
      <template #table_field_enabled="row">
        <ElSwitch
          v-if="editTemporary.id === row.id"
          v-model="editTemporary.enabled"
          />
        <ElTag
          v-else
          :disableTransitions="true"
          :type="row.enabled ? 'primary' : 'danger'"
          >
          {{
            row.enabled | formatBoolean(getI18n)
          }}
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
import { Button, Input, Switch, Tag } from 'element-ui';
import { getCItyList } from '@/apis/baseData/domestic';
import { underlineToCamelcase } from '@/utils/object';
export default {
  name: 'CustomsBaseDomesticListWrap',
  components: {
    CombinationTable,
    ElTag: Tag,
    ElButton: Button,
    ElSwitch: Switch,
    ElInput: Input
  },
  filters: {
    formatBoolean( v, $t ) {
      return $t( formatBoolean( v ) );
    }
  },
  data() {
    return {
      list: [
        { age: 1,
          countryCode: 1,
          enabledFlag: true,
          key: 1 },
        { age: 1,
          countryCode: 2,
          enabledFlag: false,
          key: 2 }
      ],

      /* 当前行编辑数据 */
      editTemporary: {},
      total: 1000,
      loading: false,
      tableSchema: tableSchema(),
      queryBar: {
        schema: queryBarSchema()
      }
    };
  },
  created() {
    this.findListData();
  },
  methods: {
    getI18n( key ) {
      return this.$t( key );
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
    async findListData( condition = {} ) {
      const { page = 1, limit = 10, formData = {} } = condition;
      this.loading = true;
      try {
        const { data:{ data:{ list = [], total } } } = await getCItyList(
          { page, limit, ...formData }
        );
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
.customs-base-domestic-list-wrap {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }
}
</style>
