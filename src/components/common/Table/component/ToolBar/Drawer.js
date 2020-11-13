/*
 * @Author: huangyuhui
 * @Date: 2020-09-25 13:38:01
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-25 16:39:05
 * @Description: 工具栏 抽屉 - 用于 表格字段修改
 * @FilePath: \SCM 2.0\src\components\common\Table\component\ToolBar\Drawer.js
 */
import { cloneDeepWith } from 'lodash'
import './Drawer.scss'
export default {
  abstract: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    /* 列表字段配置 */
    schema: {
      type: Array,
      default: () => ( [] )
    }
  },
  data() {
    return {
      checkeds: ['code', 'name']
    }
  },
  render( h ) {
    return h(
      'el-drawer',
      {
        props: {
          visible: this.visible,
          direction: 'rtl',
          'close-on-press-escape': false,
          'destroy-on-close': true,
          wrapperClosable: false,
          'custom-class': 'scm-tool-bar-drawer',
          size: '250px'
        },
        on: this.$listeners
      },
      [
        /* 标题 */
        h(
          'p',
          {
            slot: 'title'
          },
          this.$t( 'table.selectField' )
        ),
        /* 字段显示 */
        h(
          'el-tree',
          {
            ref: 'tree',
            props: {
              data: cloneDeepWith( this.schema ),
              draggable: true,
              'node-key': 'field',
              'show-checkbox': true,
              'default-expand-all': true,
              'default-checked-keys': this.checkeds,
              'allow-drop': ( draggingNode, dropNode, type ) => {
                return true
              }
            },
            scopedSlots: {
              default: ( { node, data } ) => {
                return h(
                  'div',
                  {
                    class: ['tree-row-block']
                  },
                  [
                    /* 固定锁按钮 */
                    h(
                      'div',
                      {
                        class: ['lock-icon-block'],
                        on: {
                          click: e => {
                            e.stopPropagation()
                            const { fixed } = data
                            if ( fixed ) {
                              data.fixed = ''
                            } else {
                              this.$set( data, 'fixed', 'left' )
                            }
                          }
                        }
                      },
                      [
                        h(
                          'i',
                          {
                            /* 锁样式  */
                            class: [data.fixed ? 'el-icon-lock is-fixed' : 'el-icon-unlock']
                          }
                        )
                      ]
                    ),
                    h( 'div', this.$t( node.label ) )
                  ]
                )
              }
            },
            slot: 'default'
          }
        ),
        /* 底部按钮 */
        h(
          'div',
          {
            class: ['scm-tool-bar-drawer-block'],
            slot: 'default'
          },
          [
            /* 取消 */
            h( 'el-button', {
              on: {
                click: e => {
                  e.stopPropagation()
                  this.$emit( 'update:visible' )
                }
              }
            },
            this.$t( 'button.cancel' )
            ),
            /* 保存 */
            h(
              'el-button',
              {
                props: {
                  type: 'primary'
                },
                on: {
                  click: e => {
                    e.stopPropagation()
                    this.$emit( 'updateSchema', cloneDeepWith( this.$refs.tree.children ) )
                  }
                }
              },
              this.$t( 'button.save' )
            )
          ]
        )
      ]
    )
  }
}
