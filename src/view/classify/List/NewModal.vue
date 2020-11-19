<!--
 * @Author: huangyuhui
 * @Date: 2020-11-19 16:17:46
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 18:00:44
 * @Description: 新增 归类单
 * @FilePath: \customs-system\src\view\classify\List\newModal.vue
-->
<template>
  <ScmModal
    class="classify-new-wap"
    v-bind="$attrs"
    width="1360px"
    @close="handlerClose"
    >
    <template #title>
      新增归类
    </template>
    <template #default>
      <div class="top-operation-wrap">
        <ElButton
          v-t="'button.add'"
          type="primary"
          @click.stop="handlerClickAdd"
          />
        <ElButton v-t="'button.import'"/>
      </div>
      <BaseTable
        height="500"
        :list="list"
        :schema="schema"
        >
        <template #field_enabled="row">
          <ElInput v-model="row.enabled"/>
        </template>
        <template #operation="row">
          <div>
            <ElButton
              v-t="'button.delete'"
              type="text"
              @click.stop="() => handlerClickDelete(row)"
              />
          </div>
        </template>
      </BaseTable>
    </template>
    <template #footer>
      <div>
        <ElButton
          v-t="'button.cancel'"
          @click="handlerClose"
          />
        <ElButton
          v-t="'button.save'"
          type="primary"
          @click.stop="handlerSave"
          />
      </div>
    </template>
  </ScmModal>
</template>

<script>
import ScmModal from '@/components/common/ModalWindow';
import BaseTable from '@/components/common/Table/BaseTable';
import { Button, Input } from 'element-ui';
import { remove } from 'lodash';

export function newSchema() {
  return [
    {
      label: '关联单号',
      field: 'englishName',
      sortable: true,
      width: 120
    },
    {
      label: '原始品名',
      field: 'enabled',
      width: 120
    },
    {
      label: '申报品名',
      field: 'enabled1',
      width: 120
    },
    {
      label: '海关编码',
      field: 'hscode',
      width: 120
    },
    {
      label: '型号',
      field: 'spec',
      width: 120
    },
    {
      label: '品牌',
      field: 'brand',
      width: 120
    },
    {
      label: '产地',
      field: 'origin',
      width: 120
    },
    {
      label: '客户料号',
      field: 'origin1',
      sortable: true,
      width: 150
    },
    {
      label: '委托客户',
      field: 'customer',
      width: 120
    },
    {
      label: '商品描述',
      field: 'desc',
      width: 120
    }
  ];
}
export default {
  name: 'CustomsNewClassify',
  components: {
    ScmModal,
    BaseTable,
    ElButton: Button,
    ElInput: Input
  },
  data() {
    return {
      list: [  ],
      schema: {
        operation: {
          width: 100,
          label: 'table.operation'
        },
        column: newSchema()
      }
    };
  },
  methods: {

    /**
     * 点击删除
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerClickDelete( row ) {
      this.list = remove( this.list, ( item ) => {
        return item.key !== row.key;
      } );
    },

    /**
     * 点击创建一条
     * @description:
     * @param {*}
     * @return {*}
     */
    get handlerClickAdd() {
      let counter = 0;
      return function () {
        this.list.unshift( { key: counter++ } );
      };
    },

    /**
     * 关闭模态窗
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerClose() {
      this.$emit( 'update:visible', false );
    },

    /**
     * 点击底部保存
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerSave() {
      this.loading = true;
      try {
        this.handlerClose();
        this.$emit( 'refresh' );
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
.classify-new-wap {
  .top-operation-wrap {
    margin: 10px 0;
  }
}
</style>