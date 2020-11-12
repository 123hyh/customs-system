<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:48:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-23 15:43:41
 * @message: 
 * @FilePath: \customs_system\src\components\Home\Header.vue
-->
<template>
  <header>
    <!-- 左边菜单操作按钮 -->
    <div class="menu-opration">
      <div>
        <i
          title="菜单"
          :class="classList"
          @click.stop="handlerToggleMenu"
          />
      </div>
      <Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>列表</BreadcrumbItem>
        <BreadcrumbItem>选项</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- nav  -->
    <div/>
    <!-- 用户操作区域 -->
    <div class="block-opration">
      <div>
        <i
          v-reload
          :title="`${$t('refresh')}`"
          class="el-icon-refresh icon-size"
          />
        <i
          :title="`${$t('fullScreen')}`"
          class="el-icon-full-screen icon-size"
          @click.stop="handlerFullscreen"
          />
        <Popconfirm
          :title="`${$t('confirmMsg.logout')}`"
          @confirm="handlerLogout"
          >
          <ElButton
            slot="reference"
            size="small"
            type="primary"
            >
            退出
          </ElButton>
        </Popconfirm>
      </div>
    </div>
  </header>
</template>
<script>
import { MenuStore } from './Menu.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { Breadcrumb, BreadcrumbItem, Popconfirm, Button } from 'element-ui';
export default {
  name: 'Header',
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Popconfirm,
    ElButton: Button
  },
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] ),
    classList () {
      return {
        'el-icon-s-unfold': this.closeMenu,
        'el-icon-s-fold': !this.closeMenu
      };
    }
  },
  methods: {
    ...mapMutations( 'opration', [ 'SET_MENU_STATUS' ] ),
    ...mapActions( 'user', [ 'logout' ] ),

    /**
     * 展开/收起菜单
     * @description: 
     * @param {*}
     * @return {*}
     */
    handlerToggleMenu () {
      MenuStore.toggle();
    },

    /**
     * 点击全屏事件
     * @description:
     * @param {type}
     * @return:
     */

    handlerFullscreen () {
      if ( document.fullscreen ) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },

    /**
     * 退出登录
     * @description: 
     * @param {*}
     * @return {*}
     */
    async handlerLogout () {
      try {
        await this.logout();
        location.reload( '/login' );
      } catch ( error ) {
        console.log( error );
      }
    }
  
  }
};
</script>
<style lang="scss">
.header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .menu-opration {
    display: flex;
    align-items: center;
    i {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .el-breadcrumb {
      margin-left: 1em;
    }
  }
  .block-opration {
    .icon-size {
      font-size: 20px;
    }
    i {
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
