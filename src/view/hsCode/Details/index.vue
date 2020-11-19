<!--
 * @Author: huangyuhui
 * @Date: 2020-11-03 13:57:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 10:53:53
 * @Description: 基础资料 海关编码 详情
 * @FilePath: \customs-system\src\view\hsCode\Details\index.vue
-->
<template>
  <div class="customs-base-hscode-details">
    <CombinationForm
      ref="form"
      :schema="schema"
      class="form-box"
      @change="handlerFormChange"
      />
    <ScmTabs :list="tabList"/>
    <router-view/>
    <!-- 底部按钮 -->
    <div class="operation-block">
      <ElButton
        v-jump:back
        plain
        icon="el-icon-back"
        >
        {{
          $t("button.cancel")
        }}
      </ElButton>
      <ElButton
        type="primary"
        icon="el-icon-document-checked"
        @click.stop="handlerSave"
        >
        {{ $t("button.save") }}
      </ElButton>
      <ElButton
        type="success"
        icon="el-icon-check"
        >
        {{
          $t("button.submit")
        }}
      </ElButton>
      <ElButton
        type="danger"
        icon="el-icon-refresh-left"
        >
        {{
          $t("button.returnC")
        }}
      </ElButton>
      <ElButton
        type="success"
        icon="el-icon-circle-check"
        >
        {{
          $t("button.audit")
        }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import ScmTabs from '@/components/common/Tbas';
import CombinationForm from '@/components/common/Form/CombinationForm.js';
import schema from './schema';
import { Button } from 'element-ui';
export default {
  name: 'CustomsBaseHscodeDetails',
  components: {
    CombinationForm,
    ScmTabs,
    ElButton:Button
  },
  data() {
    return {
      schema: schema()
    };
  },
  computed: {
    baseUrl() {
      return `/base/hsCode/${ this.$route.params.id }`;
    },
    tabList() {
      return [
        {
          path: '',
          label: '报关要素'
        },
        {
          path: '/notDiscount',
          label: '非最惠国'
        }
      ].map( ( item ) => ( { ...item,
        path: this.baseUrl + item.path } ) );
    }
  },
  methods: {

    /**
     * 表单字段值变化事件
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerFormChange() {}
  }
};
</script>

<style lang='scss'>
.customs-base-hscode-details {
  .scm-tabs-wrapper {
    margin-top: 10px;
  }
  .operation-block {
    button {
      border-radius: 1px;
      padding-inline-start: 25px;
      padding-inline-end: 25px;
    }
    text-align: right;
  }
}
</style>
