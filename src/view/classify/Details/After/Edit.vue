<!--
 * @Author: huangyuhui
 * @Date: 2020-11-19 18:17:21
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-11-19 20:51:54
 * @Description: 编辑归类
 * @FilePath: \customs-system\src\view\classify\Details\After\Edit.vue
-->
<template>
  <div>
    <CombinationForm
      ref="form"
      :schema="schema"
      v-on="$listeners"
      >
      <template #field_hscode="row">
        <ElAutocomplate
          v-model="row.hscode"
          clearable
          valueKey="hscode"
          :fetchSuggestions="handlerSearch"
          @clear="handlerHsCodeClear"
          @select="handlerSelectHsCode"
          >
          <template #default="{ item }">
            {{ item.hscode + " - " + item.declarePn }}
          </template>
        </ElAutocomplate>
      </template>
    </CombinationForm>
    <p>申报要素</p>
    <CombinationForm
      :key="hscode"
      :schema="elementsSchema"
      />
  </div>
</template>

<script>
import CombinationForm from '@/components/common/Form/CombinationForm.js';
import { Autocomplete } from 'element-ui';
import {
  findProductList,
  getProductElement
} from '@/apis/baseData/description';
import { underlineToCamelcase } from '@/utils/object';

export default {
  name: 'CustomsClassifyAfterEdit',
  components: {
    CombinationForm,
    ElAutocomplate: Autocomplete
  },
  props: {
    currentEditData: {
      type: Object,
      default: () => ( {} )
    }
  },
  data() {
    return {
      schema: {
        hscode: {
          type: 'slot',
          label: '海关编码'
        },
        declarePn: {
          type: 'string',
          label: '海关品名'
        },
        unit1Name: {
          type: 'string',
          label: '法定第一单位',
          disabled: true
        },
        unit2Name: {
          type: 'string',
          label: '法定第二单位',
          disabled: true
        },
        t1: {
          type: 'string',
          label: '最惠国进口税率',
          disabled: true
        },
        t2: {
          type: 'string',
          label: '普通进口税率',
          disabled: true
        },
        t3: {
          type: 'string',
          label: '暂定进口税率',
          disabled: true
        },
        exciseRate: {
          type: 'string',
          label: '消费税率',
          disabled: true
        },
        exportTariffRate: {
          type: 'string',
          label: '出口关税率',
          disabled: true
        },
        addRate: {
          type: 'string',
          label: '增值税',
          disabled: true
        },
        supervision: {
          type: 'string',
          label: '监管条件',
          disabled: true
        },
        quarantineType: {
          type: 'string',
          label: '检验检疫类别',
          disabled: true
        },
        i3cFlag: {
          type: 'switch',
          label: '3C认证'
        }
      },

      /* 申报要素 */
      elements: [],

      /* 当前海关编码 */
      hscode:''
    };
  },
  computed: {
    elementsSchema() {
      return this.elements.reduce( ( prev, item, index ) => {
        prev[ index ] = {
          type: 'string',
          label: item.name
        };
        return prev;
      }, {} );
    }
  },
  mounted() {
    this.$refs.form.setFormData( () => this.currentEditData );
  },
  methods: {

    /**
     * 输入海关编码查询
     * @description:
     * @param {*}
     * @return {*}
     */
    async handlerSearch( queryString, cb ) {
      const {
        data: {
          data: { list }
        }
      } = await findProductList( { limit: null, page: 1 } );
      cb( list.map( underlineToCamelcase ) );
    },

    /**
     * 选中海关编码
     * @description: 选择后 查询 申报要素
     * @param {*}
     * @return {*}
     */
    handlerSelectHsCode( row ) {
      this.$refs.form.setFormData( ( data ) => {
        this.hscode = row.hscode;
        data.declarePn = row.declarePn;
        return data;
      } );

      this.getElements( row.id );
    },

    /**
     * 点击清空 海关编码
     * @description:
     * @param {*}
     * @return {*}
     */
    handlerHsCodeClear() {
      this.hscode = '';
      this.elements = [];
    },

    /**
     * 查询当前品名下的 申报要素
     * @description:
     * @param {*}
     * @return {*}
     */
    async getElements( productId ) {
      this.loading = true;
      try {
        const {
          data: { data }
        } = await getProductElement( productId );
        this.elements = data.map( underlineToCamelcase );
      } catch ( error ) {
        console.log( error );
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.el-autocomplete {
  width: 100%;
}
</style>