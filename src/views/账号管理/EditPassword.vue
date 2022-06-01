<template>
  <div>
    <a-form
      style="background: #ffffff; padding: 20px"
      ref="editPasswordformRef"
      :model="state"
      :rules="rules"
      @finish="handleFinish"
    >
      <a-form-item label="原密码" name="oldPassword">
        <a-input-password style="width: 300px" v-model:value="state.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password style="width: 300px" v-model:value="state.newPassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="checkPassword">
        <a-input-password style="width: 300px" v-model:value="state.checkPassword" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 2 }">
        <a-button :loading="state.loading" type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'
  import { success } from '../../utils/NotificationUtils'
  export default {
    name: 'EditPassword',
    setup() {
      const editPasswordformRef = ref()
      const state = reactive({
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
        loading: false,
      })
      let validatePass = async (_rule, value) => {
        if (value === '') {
          return Promise.reject('请输入原密码')
        }
        if (value === state.newPassword) {
          return Promise.reject('新密码不能与原密码相同')
        }
      }
      let validatePass1 = async (_rule, value) => {
        if (value === '') {
          return Promise.reject('请输入新密码')
        }
        if (value === state.oldPassword) {
          return Promise.reject('新密码不能与原密码相同')
        } else {
          if (state.checkPassword !== '') {
            editPasswordformRef.value.validateFields('checkPassword')
          }
          // if (state.oldPassword === '') {
          //   editPasswordformRef.value.validateFields('oldPassword')
          // }

          return Promise.resolve()
        }
      }
      let validatePass2 = async (_rule, value) => {
        if (value === '') {
          return Promise.reject('请再一次输入密码')
        } else if (value !== state.newPassword) {
          return Promise.reject('两次密码不一致!')
        } else {
          return Promise.resolve()
        }
      }
      const rules = {
        oldPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: 'change',
          },
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass1,
            trigger: 'change',
          },
        ],
        checkPassword: [
          {
            validator: validatePass2,
            trigger: 'change',
          },
        ],
      }
      const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }

      const handleFinish = (values) => {
        state.loading = true
        setTimeout(() => {
          state.loading = false
          success('修改成功！下次登录请用新密码登录')
          editPasswordformRef.value.resetFields()
        }, 1000)
        console.log(values, state)
      }

      return {
        state,
        handleFinish,
        layout,
        rules,
        editPasswordformRef,
      }
    },
  }
</script>

<style scoped></style>
