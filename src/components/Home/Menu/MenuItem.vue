<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 14:30:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 17:17:55
 * @message: 
 * @FilePath: \customs-system\src\components\Home\Menu\MenuItem.vue
-->
<template>
  <Submenu
    v-if="currentMenu.children && currentMenu.children.length" 
    :index="prefix + currentMenu.route"
    :data-sub-route="prefix + currentMenu.route"
    >
    <template slot="title">
      <i class="el-icon-menu"/>
      <span>{{ $t(currentMenu.route) }}</span>
    </template>
    <menu-item-node
      v-for="item in currentMenu.children"
      :key="item.route"
      
      :prefix="'/' + currentMenu.route"
      :currentMenu="item"
      />
  </Submenu>
  <!-- 需添加 /  -->
  <MenuItem
    v-else
    :data-route="prefix +'/'+ currentMenu.route"
    :index="prefix +'/'+ currentMenu.route"
    >
    <span slot="title">
      {{ $t(currentMenu.route) }}
    </span>
  </MenuItem>
</template>
<script>

import { MenuItem, Submenu } from 'element-ui';
export default {
  abstract: true,
  name: 'MenuItemNode',
  components: {
    MenuItem,
    Submenu
  },
  props: {

    /* 路由前缀 */
    prefix:{
      type: String,
      default:'/'
    },

    /* 当前路由参数 */
    currentMenu: {
      type: Object,
      required: true
    }
  }
};
</script>
