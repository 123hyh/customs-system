<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:48:38
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 17:25:48
 * @message: 
 * @FilePath: \customs-system\src\components\Home\Menu.vue
-->
<template>
  <menu>
    <ElMenu
      router
      uniqueOpened
      :defaultActive="$route.path"
      backgroundColor="#545c64"
      textColor="#fff"
      activeTextColor="#ffd04b"
      class="menu-box"
      :style="{ width: isCollapse ? 'auto' : '200px' }"
      :collapse="isCollapse"
      :collapseTransition="false"
      @open="handleOpen"
      @close="handleClose"
      >
      <!-- 递归菜单组件 -->
      <MenuItemComponent
        v-for="item in menuList"
        :key="item.menuCode"
        :currentMenu="item"
        />
    </ElMenu>
  </menu>
</template>
<script>
import Vue from 'vue';

/* 切换菜单 store  */
export const MenuStore = Vue.observable( {
  isCollapse: false,
  toggle(  ) {
    this.isCollapse = !this.isCollapse;
  }
} );
import { Menu, Scrollbar } from 'element-ui';
import MenuItemComponent from '@/components/Home/Menu/MenuItem.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Menu',
  components: {
    ElMenu: Menu,
    MenuItemComponent
  },
  computed: {

    /* 是否打开菜单 */
    isCollapse:{
      get() {
        return MenuStore.isCollapse;
      }
    },

    
    
    ...mapGetters( 'permission', [ 'menuList' ] ),
    ...mapState( 'opration', [ 'closeMenu' ] ),
    ...mapState( 'user', { menuList:'menus' } )
  },
  methods: {
    handleOpen( key, keyPath ) {
      console.log( key, keyPath );
    },
    handleClose( key, keyPath ) {
      console.log( key, keyPath );
    }
  }
};
</script>
<style lang="scss">
.menu-wrap {
  .menu-box {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
