<template>
  <div>
    <a-card title="用户信息">
      <a-form
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 6 }"
        layout="horizontal"
        ref="formRef"
        name="formRef"
        :model="formState"
      >
        <a-form-item
          label="用户名称"
          name="userName"
          :rules="[{ required: true, message: '请输入用户名称!' }]"
        >
          <a-input allow-clear v-model:value="formState.userName" />
        </a-form-item>
        <a-form-item
          label="登录账号"
          name="loginCode"
          :rules="[{ required: true, message: '请输入登录账号!' }]"
        >
          <a-input allow-clear v-model:value="formState.loginCode" />
        </a-form-item>
        <a-form-item
          label="手机号码"
          name="number"
          :rules="[
            { required: true, message: '请输入手机号码!' },
            { len: 11, message: '手机号长度为11位' },
            {
              pattern: '^[0-9]*$',
              message: '手机号非法',
            },
          ]"
        >
          <a-input allow-clear v-model:value="formState.number" />
        </a-form-item>
        <a-form-item
          label="所属部门"
          name="department"
          :rules="[{ required: true, message: '请选择所属部门!' }]"
        >
          <a-cascader :options="options" allow-clear v-model:value="formState.department" />
        </a-form-item>
        <a-form-item label="用户头像">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="imgActions"
            :headers="headers"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img style="width: 100%" v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <LoadingOutlined v-if="loading" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <a-button type="primary" @click="submit" :loading="confirmLoading">保存</a-button>
          <a-button @click="ceshi">ceshi</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
  import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
  import { error, success } from '../../../../utils/NotificationUtils'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const formRef = ref()
  const formState = ref({})
  const fileList = ref([])
  const loading = ref(false)
  const imageUrl = ref('')
  const imgActions = `${import.meta.env.VITE_BASE_URL}/api/upload`
  const headers = { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  const confirmLoading = ref(false)
  const options = [
    {
      label: '测试部门',
      value: '测试部门',
      children: [
        {
          label: '测试一部',
          value: '测试一部',
        },
        {
          label: '测试二部',
          value: '测试二部',
        },
        {
          label: '测试三部',
          value: '测试三部',
        },
      ],
    },
    {
      label: '技术部门',
      value: '技术部门',
    },
    {
      label: '人事部门',
      value: '人事部门',
    },
  ]
  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      loading.value = true
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (base64Url) => {
        imageUrl.value = base64Url
        loading.value = false
      })
    }
    if (info.file.status === 'error') {
      loading.value = false
      error('上传失败')
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      error('只能上传JPG格式')
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      error('图片大小超过2MB')
    }
    return isJpgOrPng && isLt2M
  }
  onMounted(() => {
    console.log(route.params.id)
    const data = {
      userName: '管理员',
      loginCode: 'admin',
      number: '15968956878',
      department: ['人事部门'],
    }
    if (route.params.id) {
      formState.value = { ...data }
      imageUrl.value = 'https://ruoweiedu.com:19997/resource/image/20220519094959119.jpg'
    }
  })
  const submit = () => {
    const {
      value: { validateFields },
    } = formRef
    validateFields()
      .then((values) => {
        confirmLoading.value = true
        console.log(values)
        success('编辑成功')
        confirmLoading.value = false
        router.back()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const ceshi = () => {
    router.push({
      name: `/admin/system/permssion/userList/userEdit/:id/info`,
      params: { id: route.params.id },
    })
  }
</script>

<style scoped lang="less">
  /deep/ .ant-upload {
    padding: 4px;
  }
</style>
