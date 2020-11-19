<!--
 * @Author: your name
 * @Date: 2020-07-07 22:02:56
 * @lastTime: 2020-07-24 08:51:16
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \customs-system\src\view\login\index.vue
--> 
<template>
  <div class="login-block">
    <div class="form-wrap">
      <h2 class="system-title">
        关务管理系统
      </h2>
      <ElForm
        ref="form"
        :model="formData"
        :rules="rules"
        >
        <ElFormItem
          :label="`${$t('account')}`"
          prop="ac"
          >
          <ElInput
            v-model="formData.ac"
            clearable
            />
        </ElFormItem>
        <ElFormItem
          :label="`${$t('password')}`"
          prop="pw"
          >
          <ElInput
            v-model="formData.pw"
            showPassword
            clearable
            />
        </ElFormItem>
        <ElButton
          type="primary"
          @click.stop="handlerLogin"
          >
          {{ $t("goLogin") }}
        </ElButton>
      </ElForm>
    </div>
  </div>
</template>
<script>
import { setLocaleMessage } from '@/locale';
import loginLang from './lang.json';
setLocaleMessage( loginLang );

import { Form, FormItem, Input, Button } from 'element-ui';
import { mapActions } from 'vuex';
// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV;

export default {
  name: 'Login',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  data() {
    return {
      formData: {
        ac: isDev ? 'dsz0' : '',
        pw: isDev ? 'dsz0' : ''
      },
      rules: {
        ac: [
          {
            required: true,
            message: this.$t( 'validate.required', {
              label: this.$t( 'account' )
            } )
          }
        ],
        pw: [
          {
            required: true,
            message: this.$t( 'validate.required', {
              label: this.$t( 'password' )
            } )
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions( 'user', [ 'login' ] ),
    handlerLogin() {
      this.$refs.form.validate( async ( e ) => {
        if ( e ) {
          await this.login( this.formData );
          const searchObj = new URLSearchParams( location.search );
          const redirect = searchObj.get( 'redirect' );
          this.$router.replace( redirect ?? '/' );
        }
      } );
    }
  }
};
</script>
<style lang="scss">
.login-block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-wrap {
    width: 300px;
    height: 400px;
    .system-title {
      text-align: center;
    }
    .el-input__inner {
      border-radius: 1px;
    }
  }
}
</style>