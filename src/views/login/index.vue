<template>
  <div class="login_box">
    <div class="login-logo">
      <img src="@/assets/logo.png" />
    </div>
    <a-form
      style="width: 300px"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item name="username" :rules="[{ required: true, message: '请输入账号!' }]">
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <!--      <a-form-item name="remember">-->
      <!--        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>-->
      <!--      </a-form-item>-->

      <a-form-item>
        <a-button style="width: 100%" type="primary" html-type="submit" :loading="formState.loading"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { reactive } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { success } from '../../utils/NotificationUtils'
  import { post } from '../../utils/http'
  import { useRouter } from 'vue-router'
  // import {useStore} from 'vuex'

  export default {
    components: {
      UserOutlined,
      LockOutlined,
    },
    setup() {
      const router = useRouter()
      // const store = useStore()
      const formState = reactive({
        username: 'admin',
        password: '123456',
        remember: true,
        loading: false,
      })

      const onFinish = (values) => {
        console.log('Success:', values)
        values.webApp = 'app'
        values.rememberMe = true
        formState.loading = true
        // store.dispatch('applogin/login', values)
        post('authenticate', values).then((res) => {
          sessionStorage.clear() // 重新登录时，需要清除
          sessionStorage.setItem('userType', res.data.userType)
          sessionStorage.setItem('userName', res.data.userName)
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('userCode', res.data.userCode)
          router.push('/admin')
          success('登录成功')
          formState.loading = false
        })
      }

      return {
        formState,
        onFinish,
      }
    },
  }
</script>

<style lang="less" scoped>
  .login_box {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: url('@/assets/login.svg');
    background-size: 100%;
    flex-direction: column;
    align-items: center;
    padding-top: 240px;
  }
  .login-logo {
    margin-bottom: 30px;
  }
</style>
