/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-27 19:35:01
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Select.js
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
      type: [ String, Number, Array, Boolean ]
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
      field = '',
      disabled = false,
      clearable = false,
      multiple = false,
      placeholder = '',

      options = []
    } = this.conf;
    return h(
      'el-select',
      {
        props: {
          value: this.value,
          filterable: true,
          popperAppendToBody: false,
          multiple,
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
      },
      options.map(
        ( { label, value, disabled = false } ) => {
          return h(
            'el-option',
            {
              props: {
                label,
                value,
                disabled
              },
              key: value
            }
          );
        }
      )
    );
  }
};
