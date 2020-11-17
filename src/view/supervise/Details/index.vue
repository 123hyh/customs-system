<!--
 * @Author: huangyuhui
 * @Date: 2020-11-17 15:51:08
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 17:29:51
 * @Description: 
 * @FilePath: \customs-system\src\view\supervise\Details\index.vue
-->
<template>
  <div
    v-loading="loading"
    class="customs-base-supervise-details-wrap"
    >
    <CombinationForm
      ref="form"
      :schema="schema"
      @change="handlerFormChange"
      />
    <!-- 明细组件 可定义才显示 -->
    <DetailsList
      v-if="isDefinit"
      :superviseId="$route.params.id"
      />
    <!-- 底部按钮 -->
    <div class="operation-block">
      <ElButton
        v-jump:replace="'/base/supervise'"
        plain
        icon="el-icon-back"
        >
        {{ $t("button.cancel") }}
      </ElButton>
      <ElButton
        type="primary"
        icon="el-icon-document-checked"
        @click.stop="handlerSave"
        >
        {{ $t("button.save") }}
      </ElButton>
    </div>
  </div>
</template>

<script>
import CombinationForm from '@/components/common/Form/CombinationForm.js';
import DetailsList from './List';
import schema from './schema';
import { Button } from 'element-ui';
import {
  getOneSupervise,
  updateSuperviseData
} from '@/apis/baseData/supervise';
import { underlineToCamelcase } from '@/utils/object';
export default {
  name: 'CustomsBaseSuperviseDetail',
  components: {
    CombinationForm,
    DetailsList,
    ElButton: Button
  },
  data () {
    return {
      loading: false,
      schema: schema(),

      /* 是否可以定义 */
      isDefinit: false
    };
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      this.loading = true;
      try {
        const {
          data: { data }
        } = await getOneSupervise( this.$route.params.id );
        this.isDefinit = !!data.definit_flag;
        this.$refs.form.setFormData( () => underlineToCamelcase( data ) );
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    },

    /**
     * 表单值变化事件
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerFormChange () {},

    /**
     * 点击保存
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerSave () {
      this.loading = true;
      try {
        const data = await this.$refs.form.validate();
        await updateSuperviseData( data );
        this.getData();
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
.customs-base-supervise-details-wrap {
  height: inherit;
  position: relative;
  .operation-block {
    button {
      border-radius: 1px;
      padding-inline-start: 25px;
      padding-inline-end: 25px;
    }
    text-align: right;
    position: absolute;
    bottom: 20px;
    right: 50px;
  }
}
</style>
