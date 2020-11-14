/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 16:36:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-14 13:15:57
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\String.js
 */
import { debounce } from 'lodash';
import { Input } from 'element-ui';

export default {
  abstract: true,
  components:{
    ElInput: Input
  },
  props: {
    conf: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    entity: {
      type: String,
      default: ''
    }
  },
  methods: {
    get emit () {
      return debounce( function ( data ) {
        this.$emit( 'change', data );
      }, 200 );
    }
  },
  render ( h ) {
    const {
      field,
      showPassword = false,
      disabled = false,
      clearable = false,
      placeholder = ''
    } = this.conf;
    return h(
      'el-input',
      {
        props: {
          value: this.value,
          'show-password': showPassword,
          disabled,
          clearable
        },
        attrs: {
          placeholder: this.entity
            ? this.$t( `${ this.entity }.${ placeholder }` )
            : placeholder,
          name: field,
          id: field
        },
        on: {
          input: [
            this.$listeners.input,
            val => {
              this.emit( val );
            }
          ]
        }
      }
    );
  }
};
