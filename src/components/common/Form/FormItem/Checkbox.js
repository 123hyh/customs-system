/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 10:05:04
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-29 18:26:12
 * @Description:
 * @FilePath: \SCM 2.0\src\components\common\Form\FormItem\Checkbox.js
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
      type: Array,
      default: () => ( [] )
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
      'el-checkbox-group',
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
          'el-checkbox',
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
