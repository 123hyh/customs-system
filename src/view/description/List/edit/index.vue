<!--
 * @Author: huangyuhui
 * @Date: 2020-11-03 15:09:10
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-16 20:40:09
 * @Description: 关务管理 - 基本资料 -  海关品名  - 编辑
 * @FilePath: \customs-system\src\view\description\List\edit\index.vue
-->
<template>
  <div
    v-loading="loading"
    class="customs-base-description-edit-wrap"
    >
    <ElButton
      v-t="'button.save'"
      :disabled="!currentRow.id"
      class="custom-save-btn"
      type="primary"
      @click.stop="handlerSave"
      />
    <CombinationForm
      ref="form"
      :schema="schema"
      @change="handlerFormChange"
      >
      <!-- 海关编码 插槽 -->
      <template #field_hscode="row">
        <ElAutocomplete
          id="hscode"
          v-model="row.hscode"
          :popperAppendToBody="false"
          popperClass="hscode-query-list"
          :clearable="true"
          valueKey="code"
          :fetchSuggestions="queryHsCode"
          placeholder="请输入内容"
          @clear="handlerClearHsCode"
          @select="handleSelectHsCode"
          >
          <span slot-scope="{ item }">
            {{ `${item.code} - ${item.name}` }}
          </span>
        </ElAutocomplete>
      </template>
    </CombinationForm>
  </div>
</template>

<script>
import CombinationForm from '@/components/common/Form/CombinationForm.js';
import schema from './schema';
import { Autocomplete, Button } from 'element-ui';
import { getProductData, updateProductData } from '@/apis/baseData/description';
import { forEachObject, underlineToCamelcase } from '@/utils/object';
import { debounce } from 'lodash';
import { getHsCodeList } from '@/apis/baseData/hsCode';
export default {
  name: 'CustomsBaseDescriptionEditWrap',
  components: {
    CombinationForm,
    ElButton: Button,
    ElAutocomplete: Autocomplete
  },
  props: {

    /* 当前点击行数据 */
    currentRow: {
      type: Object,
      default: () => ( {} )
    }
  },
  data() {
    return {
      loading: false,
      schema: schema()
    };
  },
  created() {
    if ( this.currentRow.id ) {
      this.getProductData();
    }
  },
  methods: {

    /**
     * 海关编码输入查询
     * @description:
     * @param {*} queryString
     * @param {*} cb
     * @return {*}
     */
    get queryHsCode() {
      return debounce( async function ( queryHscode, cb ) {
        
        const { hscode } = this.$refs.form.getAllFormData();

        try {
          const {
            data: {
              data: { list = [] }
            }
          } = await getHsCodeList( { code: queryHscode } );
          cb( list );
        } catch ( error ) {
          console.log( error );
          cb( [] );
        }
      }, 150 );
    },

    /**
     * 选择海关编码
     * @description: 选择后修改海关编码名称
     * @param {*}
     * @return {*}
     */
    handleSelectHsCode( selectData = {} ) {
      this.$refs.form.setFormData( ( data ) => {
        data.hscodeName = selectData.name;
        return data;
      } );
    },

    /**
     * 清空海关编码
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerClearHsCode() {
      this.$refs.form.setFormData( ( data ) => {
        data.hscodeName = '';
        return data;
      } );
    },

    /**
     * 查询指定 id 的品名信息
     * @description:
     * @param {*}
     * @return {*}
     */
    async getProductData() {
      this.loading = true;
      try {
        let {
          data: { data }
        } = await getProductData( this.currentRow.id );

        /* 设置 表单数据 */
        this.$refs.form.setFormData( () => {
          return underlineToCamelcase( data );
        } );
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
    handlerFormChange() {},

    /**
     * 保存 品名 表单
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerSave() {
      const data = await this.$refs.form.validate();
      this.loading = true;
      try {
        await updateProductData( data );
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
.customs-base-description-edit-wrap {
  .custom-save-btn {
    margin: 10px 0;
    border-radius: 1px;
  }
  .el-autocomplete {
    min-width: 100%;
    width: 100%;
    .hscode-query-list {
      width: auto !important;
    }
  }
}
</style>
