/*
 * @Author: huangyuhui
 * @Date: 2020-09-22 14:24:41
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-28 16:09:07
 * @Description: 工具栏组件
 * @FilePath: \SCM 2.0\src\components\common\Table\component\ToolBar\index.js
 */
import './index.scss'
import { debounce } from 'lodash'
import Drawer from '@/components/common/Table/component/ToolBar/Drawer.js'
export default {
  name: 'SCM_ToolBar',
  components: {
    Drawer
  },
  data() {
    return {
      /* 控制 抽屉显示 */
      drawerVisible: false
    }
  },
  props: {
    /* 列表字段集合 */
    schema: {
      type: Array,
      default: () => ( [] )
    }
  },
  methods: {
    /**
     * 刷新按钮事件
     */
    get handlerRefresh() {
      return debounce(
        function() {
          this.$emit( 'refresh' )
        },
        200
      )
    }
  },
  render( h ) {
    return h(
      'div',
      {
        class: ['scm-tool-bar-block']
      },
      [
        /* 左侧插槽 */
        this.$scopedSlots.tool_bar && this.$scopedSlots.tool_bar(),
        h(
          'div',
          {
            class: ['right-tool']
          },
          [
          /* 列操作 */
            h(
              'el-tooltip',
              {
                props: {
                  content: this.$t( 'tip.editColumns' )
                }
              },
              [
                h( 'div', [
                  h(
                    'el-button',
                    {
                      class: ['icon-block'],
                      props: {
                        type: 'text',
                        icon: 'el-icon-menu'
                      },
                      on: {
                        click: e => {
                          e.stopPropagation()
                          this.drawerVisible = true
                        }
                      }
                    }
                  )
                ] )

              ]
            ),
            /* 刷新 */
            h(
              'el-tooltip',
              {
                props: {
                  content: this.$t( 'layout.tagsView.refresh' )
                }
              },
              [
                h(
                  'div',
                  [
                    h(
                      'el-button',
                      {
                        class: ['icon-block'],
                        props: {
                          type: 'text',
                          icon: 'el-icon-refresh'
                        },
                        on: {
                          click: e => {
                            e.stopPropagation()
                            if ( e.target.classList.contains( 'refresh-animation' ) === false ) {
                              e.target.classList.add( 'refresh-animation' )
                              let time = setTimeout(
                                () => {
                                  clearTimeout( time )
                                  time = null
                                  e.target.classList.remove( 'refresh-animation' )
                                },
                                1000
                              )
                            }
                            this.handlerRefresh()
                          }
                        }
                      }
                    )
                  ]
                )
              ]
            )
          ].filter( Boolean )
        ),
        /* 列表字段 显示 设置 */
        h(
          'Drawer',
          {
            props: {
              visible: this.drawerVisible,
              schema: this.schema
            },
            on: {
              'update:visible': () => {
                this.drawerVisible = false
              },
              /* 修改 schema */
              updateSchema: data => {
                this.$emit( 'updateSchema', data )
                this.drawerVisible = false
              }
            }
          }
        )
      ]
    )
  }
}
