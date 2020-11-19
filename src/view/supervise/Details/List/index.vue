<!--
 * @Author: huangyuhui
 * @Date: 2020-11-17 16:28:44
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-18 12:54:53
 * @Description: 
 * @FilePath: \customs-system\src\view\supervise\Details\List\index.vue
-->
<template>
  <div
    v-loading="loading"
    class="customs-base-supervise-details-list"
    >
    <p>监管条件明细</p>
    <CombinationTable
      :tableSchema="tableSchema"
      :list="list"
      @refresh="handlerRefresh"
      >
      <template #tool_bar>
        <div>
          <ElButton
            v-t="'button.create'"
            type="primary"
            @click.stop="handlerCreate"
            />
        </div>
      </template>
      <template #table_field_value="row">
        <ElInput
          v-if="row.id === editTemp.id"
          v-model="editTemp.value"
          />
        <template v-else>
          {{ row.value }}
        </template>
      </template>
      <!-- 操作列 -->
      <template #table_operation="row">
        <div>
          <template v-if="row.id === editTemp.id">
            <ElButton
              v-t="'button.save'"
              type="text"
              @click.stop="handlerSave"
              />
            <ElButton
              v-t="'button.cancel'"
              type="text"
              @click.stop="handlerCancel"
              />
          </template>
          <template v-else>
            <ElButton
              v-t="'button.update'"
              type="text"
              @click.stop="() => handlerClickUpdate(row)"
              />
            <ElButton
              v-t="'button.delete'"
              type="text"
              @click.stop="() => handlerDelete(row)"
              />
          </template>
        </div>
      </template>
    </CombinationTable>
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import {
  addSuperviseDetail,
  getSuperviseDetails,
  updateSuperviseDetail,
  deleteSuperviseDetail
} from '@/apis/baseData/supervise';
import { Button, Input, MessageBox } from 'element-ui';
import { cloneDeepWith, isEmpty } from 'lodash';

export default {
  name: 'SuperviseDetailsList',
  components: {
    CombinationTable,
    ElButton: Button,
    ElInput: Input
  },
  props: {

    /* 监管方式 id */
    superviseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,

      /* 编辑暂存 */
      editTemp: {},
      list: [],
      tableSchema: {
        operation: {
          width: '150',
          label: 'table.operation'
        },
        column: [
          {
            field: 'value',
            label: '定义值'
          }
        ]
      }
    };
  },
  created() {
    if ( this.superviseId ) {
      this.getList();
    }
  },
  methods: {

    /**
     * 点击刷新
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerRefresh() {
      this.editTemp = {};
      this.getList();
    },

    /**
     * 点击删除行
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerDelete( row ) {
      await MessageBox.confirm( this.$tc( 'message.delete', 1 ), {
        type:'warning',
        title:this.$t( 'message.warn' )
      } );
      this.loading = true;
      try {
        await deleteSuperviseDetail( {
          superviseId: this.superviseId,
          id: row.id
        } );
        this.getList();
      } catch ( error ) {
        console.log( error );
        this.loading = false;
      }
    },

    /**
     * 点击操作列 - 更新按钮
     * @description:
     * @param {*} row
     * @return {*}
     */
    handlerClickUpdate( row ) {
      this.editTemp = cloneDeepWith( row );
    },

    /**
     * 点击取消
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerCancel() {
      if ( this.editTemp.id === undefined ) {
        this.list.shift();
      } else {
        this.editTemp = {};
      }
    },

    /**
     * 点击创建
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerCreate() {
      if ( isEmpty( this.editTemp ) ) {
        const obj = { value: '' };
        this.editTemp = obj;
        this.list.unshift( obj );
      }
      
    },

    /**
     * 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerSave() {
      if ( this.editTemp.id === undefined ) {
        this.handlerAddDetail();
      } else {
        this.handlerUpdateDetail();
      }
    },

    /**
     * 修改明细
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerUpdateDetail() {
      this.loading = true;
      try {
        await updateSuperviseDetail( {
          superviseId: this.superviseId,
          ...this.editTemp
        } );
        this.editTemp = {};
        this.getList();
      } catch ( error ) {
        console.log( error );
        this.loading = false;
      }
    },

    /**
     * 新增明细
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerAddDetail() {
      this.loading = true;
      try {
        await addSuperviseDetail( {
          superviseId: this.superviseId,
          ...this.editTemp
        } );
        this.editTemp = {};
        this.getList();
      } catch ( error ) {
        console.log( error );
        this.loading = false;
      }
    },

    /**
     * 获取列表
     * @description:
     * @param {*}
     * @return {*}
     */
    async getList() {
      this.loading = true;
      try {
        const {
          data: { data }
        } = await getSuperviseDetails( this.superviseId );
        this.list = data;
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang='scss'>
.customs-base-supervise-details-list {
}
</style>
