<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 14:30:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 17:17:55
 * @message: 
 * @FilePath: \customs_system\src\components\Home\Menu\MenuItem.vue
-->
<template>
  <Submenu
    v-if="currentMenu.children && currentMenu.children.length" 
    :index="currentMenu.route"
    >
    <template slot="title">
      <i class="el-icon-menu"/>
      <span>{{ $t(currentMenu.route) }}</span>
    </template>
    <menu-item-node
      v-for="item in currentMenu.children"
      :key="item.route"
      :currentMenu="item"
      />
  </Submenu>
  <MenuItem
    v-else
    :index="currentMenu.route"
    >
    <span slot="title">
      {{ $t(currentMenu.route) }}
    </span>
  </MenuItem>
</template>
<script>
import { setLocaleMessage } from '@/locale';
import( /* webpackChunkName: "menuLang" */'../lang.json' ).then( e => {
  setLocaleMessage( e.default );
} );
import { MenuItem, Submenu } from 'element-ui';
export default {
  abstract: true,
  name: 'MenuItemNode',
  components: {
    MenuItem,
    Submenu
  },
  props: {
    currentMenu: {
      type: Object,
      required: true
    }
  }
};
</script>
