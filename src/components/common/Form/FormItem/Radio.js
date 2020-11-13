/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-27 16:04:20
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Radio.js
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
      type: [ String, Number, Boolean ]
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
      placeholder = '',
      options = []
    } = this.conf;
    return h(
      'el-radio-group',
      {
        props: {
          value: this.value,
          disabled
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
      options.map( ( { label, value, disabled = false } ) => {
        return h(
          'el-radio',
          {
            props: {
              label: value,
              disabled
            },
            key: value
          },
          label
        );
      } )
    );
  }
};
