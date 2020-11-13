/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 16:36:25
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-28 10:40:12
 * @Description: 文本域
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Textarea.JS
 */
import { debounce } from 'lodash';

export default {
  abstract: true,
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
      disabled = false,
      clearable = false,
      placeholder = ''
    } = this.conf;
    return h(
      'el-input',
      {
        props: {
          value: this.value,
          type: 'textarea',
          autosize: true,
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
