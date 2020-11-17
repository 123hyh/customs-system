<!--
 * @Author: huangyuhui
 * @Date: 2020-11-17 16:28:44
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-17 17:08:27
 * @Description: 
 * @FilePath: \customs-system\src\view\supervise\Details\List\index.vue
-->
<template>
  <div class="customs-base-supervise-details-list">
    <p>监管条件明细</p>
    <CombinationTable
      :tableSchema="tableSchema"
      :list="list"
      @refresh="getList"
      />
  </div>
</template>

<script>
import CombinationTable from '@/components/common/Table/CombinationTable';
import { getSuperviseDetails } from '@/apis/baseData/supervise';

export default {
  name:'SuperviseDetailsList',
  components: {
    CombinationTable
  },
  props:{

    /* 监管方式 id */
    superviseId:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: [],
      tableSchema: {
        column: [
          {
            filed: 'value',
            label: '定义值'
          }
        ]
      }
    };
  },
  created () {
    if ( this.superviseId ) {
      this.getList();
    }
  },
  methods: {

    /**
     * 获取列表
     * @description: 
     * @param {*}
     * @return {*}
     */
    async getList () {
      try {
        const { data:{ data } } = await getSuperviseDetails( this.superviseId );
        this.list = data;
      } catch ( error ) {
        console.log( error );
      }
    }
  }
};
</script>

<style lang='scss'>
.customs-base-supervise-details-list {

}
</style>
