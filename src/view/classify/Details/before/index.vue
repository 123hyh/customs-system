<!--
 * @Author: huangyuhui
 * @Date: 2020-11-03 13:57:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 17:44:18
 * @Description: 基础资料 海关编码 详情
 * @FilePath: \customs-system\src\view\classify\Details\before\index.vue
-->
<template>
  <div class="customs-base-hscode-details">
    <ElPageHeader
      content="详情页面"
      @back="() => $router.back()"
      />
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
        plain
        icon="el-icon-back"
        @click.stop="() => $router.back()"
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
    </div>
  </div>
</template>

<script>
import ScmTabs from '@/components/common/Tbas';
import CombinationForm from '@/components/common/Form/CombinationForm.js';
import schema from './schema';
import { Button, PageHeader } from 'element-ui';
export default {
  name: 'CustomsBaseHscodeDetails',
  components: {
    CombinationForm,
    ScmTabs,
    ElButton:Button,
    ElPageHeader:PageHeader
  },
  data() {
    return {
      schema: schema()
    };
  },
  computed: {
    baseUrl() {
      return `/classify/${this.$route.params.id}`;
    },
    tabList() {
      return [
        {
          path: '',
          label: '归类详情'
        },
        {
          path: '/file',
          label: '相关文件'
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
  .el-page-header{
    margin-bottom: 20px;
  }
  .scm-tabs-wrapper {
    margin-top: 10px;
  }
  .operation-block {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      border-radius: 1px;
      padding-inline-start: 25px;
      padding-inline-end: 25px;
    }
    text-align: right;
  }
}
</style>
