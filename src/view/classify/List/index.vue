<!--
 * @Author: huangyuhui
 * @Date: 2020-09-22 11:34:33
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:58:09
 * @Description: 关务管理 - 归类列表
 * @FilePath: \customs-system\src\view\classify\List\index.vue
-->
<template>
  <div class="customs-classify-list">
    <CombinationTable
      ref="table"
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
      <template #tool_bar>
        <div class="right-bar">
          <ElButton
            v-t="'button.new'"
            type="primary"
            @click.stop="handlerClickNew"
            />
          <ElButton
            v-t="'button.classify'"
            type="primary"
            @click.stop="handlerBatchClassify"
            />
          <ElButton v-t="'button.export'"/>
        </div>
      </template>
      <!-- 表格操作列 -->
      <template v-slot:table_operation="row">
        <template v-if="editTemporary.id !== row.id">
          <ElButton
            v-t="'button.details'"
            type="text"
            @click.stop="() => handlerJumpDetails(row)"
            />
          <ElButton
            v-t="'button.classify'"
            type="text"
            />
          <ElDropdown>
            <span class="el-dropdown-link">
              {{ $t("button.more") + $t("table.operation") }}
              <i class="el-icon-arrow-down el-icon--right"/>
            </span>
            <ElDropdownMenu slot="dropdown">
              <ElDropdownItem>{{ $t("button.delete") }}</ElDropdownItem>
              <ElDropdownItem>{{ $t("button.returnC") }}</ElDropdownItem>
              <ElDropdownItem>{{ $t("button.unlock") }}</ElDropdownItem>
            </ElDropdownMenu>
          </ElDropdown>
        </template>
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
    <!-- 新增弹窗 -->
    <component
      :is="newModal.visible ? 'newModal' : ''"
      :visible.sync="newModal.visible"
      @refresh="handlerRefresh"
      />
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { tableSchema, queryBarSchema } from './schema';
import { cloneDeepWith } from 'lodash';
import { formatBoolean } from '@/filters';
import newModal from './NewModal';
import { getClassifyList } from '@/apis/module/classify';
import {
  Button,
  Switch,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';
import { getPortList } from '@/apis/baseData/port';
import { underlineToCamelcase } from '@/utils/object';
export default {
  name: 'CustomsBasePortListWrap',
  components: {
    CombinationTable,
    ElSwitch: Switch,
    ElTag: Tag,
    ElButton: Button,
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem,
    newModal
  },
  filters: {
    formatBoolean( v, t ) {
      return t( formatBoolean( v ) );
    }
  },
  data() {
    return {
      newModal: {
        visible: false
      },
      list: [
        { status: 'waitClassify', id: 1 },
        { status: 'waitClassify', id: 2 },
        { status: 'save', id: 3 }
      ],
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
     * 批量归类
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerBatchClassify() {
      const selections = this.$refs.table?.selections;
      if ( selections.some( ( item ) => item.status === 'save' ) ) {
        console.log( '不允许' );
      } else {
        const ids = selections.reduce( ( prev, item ) => {
          prev += `${prev ? ',' : ''}${item.id}`;
          return prev;
        }, '' );
        this.$router.push( `/classify/${ids}/after` );
      }
    },

    /**
     * 点击详情 跳转
     * @description: 判断逻辑 待归类状态之前 的跳至before
     * @param {*}
     * @return {*}
     */
    handlerJumpDetails( row = {} ) {
      const { status, id = 1 } = row;
      this.$router.push( {
        path: `/classify/${id}${status === 'save' ? '' : '/after'}`
      } );
    },

    /**
     * 刷新列表
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerRefresh() {},

    /**
     * 点击新增
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerClickNew() {
      this.newModal.visible = true;
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
      const { limit = 10, page = 1, formData = {} } = condition;
      this.loading = true;
      try {
        const {
          data: {
            data: { list = [], total }
          }
        } = await getClassifyList( {
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
.customs-classify-list {
  .right-bar {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
