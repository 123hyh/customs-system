<!--
 * @Author: your name
 * @Date: 2020-07-07 20:24:47
 * @lastTime: 2020-07-29 10:42:58
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \customs-system\src\components\Home\HomeContainer.vue
-->
<template>
  <div class="home-wrap">
    <Menu class="menu-wrap"/>
    <div
      :class="{ 'content-wrap': true, 'is-open-menu': isCollapse === false }"
      >
      <HeaderCom class="header-wrap"/>
      <Nav/>
      <div
        class="block-content"
        :style="mainStyle"
        data-elem="main"
        >
        <router-view class="main-wrap"/>
      </div>
    </div>
  </div>
</template>
<script>
import { setLocaleMessage } from '@/locale';
import menuLang from './lang.json';
setLocaleMessage( menuLang );
import Form from '@/components/common/Form/CombinationForm.js';
import Menu from '@/components/Home/Menu.vue';
import Header from '@/components/Home/Header.vue';
import Nav from '@/components/Home/Nav.vue';
import { mapGetters, mapState } from 'vuex';
import { debounce } from 'lodash';
import { MenuStore } from './Menu';

export default {
  name: 'Home',
  components: {
    Menu,
    HeaderCom: Header,
    Nav
  },
  data () {
    return {
      mainStyle: { height: '' }
    };
  },
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] ),

    /* 是否打开菜单 */
    isCollapse () {
      return MenuStore.isCollapse;
    }
  },
  created () {
    const onResize = debounce( () => {
      const { children } = document.querySelector( '.content-wrap' );
      const topPx = Array.of( ...children ).reduce( ( prevHeight, currenElem ) => {
        if ( currenElem.getAttribute( 'data-elem' ) !== 'main' ) {
          prevHeight += currenElem.offsetHeight;
        }
        return prevHeight;
      }, 0 );
      this.mainStyle.height = `calc( 100% - ${topPx}px - 40px ) `;
    }, 150 );

    this.$on( 'hook:mounted', () => {
      onResize();
      this.$nextTick( () => {
        window.addEventListener( 'resize', onResize );
      } );
    } );
    this.$on( 'hook:beforeDestory', () => {
      window.removeEventListener( 'resize', onResize );
    } );
  }
};
</script>
<style lang="scss">
$header_height: 60px;

.home-wrap {
  width: 100%;
  height: 100%;
  display: flex;

  .menu-wrap {
    all: unset;
    height: 100%;
    overflow: auto;
  }
  /* 菜单打开时 */
  .is-open-menu {
    width: calc(100% - 200px);
  }
  .content-wrap {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    .header-wrap {
      flex-basis: 100%;
      height: $header_height;
    }

    .block-content {
      overflow: auto;
      flex-grow: 1;
      background-color: #f6f8f9;
      padding: 20px ;
    }
  }
  .main-wrap {
    box-sizing: border-box;
  }
}
</style>
