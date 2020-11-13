/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:13:26
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-10 16:45:05
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Switch.js
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
      type: Boolean,
      default: false
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
      disabled = false,
      field
    } = this.conf;
    return h(
      'el-switch',
      {
        props: {
          value: this.value,
          disabled,
          activeColor: '#13ce66'
        },
        attrs: {
          name: field
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
