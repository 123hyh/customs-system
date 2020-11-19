<!--
 * @Author: huangyuhui
 * @Date: 2020-11-19 17:22:27
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:01:07
 * @Description: 
 * @FilePath: \customs-system\src\view\classify\Details\after\index.vue
-->
<template>
  <div
    v-loading="loading"
    class="customs-classify-after"
    >
    <ElPageHeader
      content="详情页面"
      @back="() => $router.back()"
      />
    <BaseTable
      :list="list"
      :schema="schema"
      @select="handlerSelect"
      />
    <!-- 缓存 申报要素 -->
    <keep-alive>
      <component
        :is="'EditForm'"
        :key="editTemp.id"
        :currentEditData="editTemp"
        @change="handlerEditChange"
        />
    </keep-alive>
  </div>
</template>

<script>
import BaseTable from '@/components/common/Table/BaseTable';
import { newSchema } from '../../List/NewModal';
import EditForm from './Edit';
import { PageHeader } from 'element-ui';
export default {
  name:'CustomsClassifyAfter',
  components:{
    BaseTable,
    EditForm,
    ElPageHeader:PageHeader

  },
  data() {
    return {
      loading: false,
      list:[],

      /* 当前编辑 */
      editTemp: {},
      schema:{
        selection: {
          isMultiple:false,
          width: 50
        },
        column: newSchema().map( ( { width, ...options } = {} ) => {
          return options;
        } )
      }
    };
  },
  created() {
    this.getList();
  },
  methods:{

    /**
     * 选择某一条编辑
     * @description: 
     * @param {*}
     * @return {*}
     */
    handlerSelect( { row } = {} ) {
      this.editTemp = row;
    },
    getList() {
      this.loading = true;

      try {
        const ids = this.$route.params.id.split( ',' );
        this.list = ids.map( item => ( { id: item } ) );
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    },

    /**
     * 表单编辑变化
     * @description: 
     * @param {*} data
     * @return {*}
     */
    handlerEditChange( { field, data } = {} ) {

      this.editTemp[ field ] = data;
    }
  }
};
</script>

<style lang='scss'>
.customs-classify-after{
  .el-page-header{
    margin-bottom: 20px;
  }
}
</style>