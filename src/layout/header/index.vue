<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
            <component
              style="font-size: 16px"
              :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
            />
          </span>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <HeaderBell />
      <FullScreen />
      <a-dropdown placement="bottomRight">
        <a style="color: rgba(0, 0, 0, 0.65)" class="ant-dropdown-link" @click.prevent>
          <UserOutlined style="font-size: 16px" />
          {{ userName }}
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="ToZhanghaoguanli"> 账号管理 </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <div @click.prevent="doLogout"> <PoweroffOutlined /> 退出系统 </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </Space>
  </Layout.Header>
</template>

<script setup>
  import { computed, createVNode } from 'vue'
  import { useRouter } from 'vue-router'
  import { UserOutlined } from '@ant-design/icons-vue'
  import {
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons-vue'
  import { Modal, Space } from 'ant-design-vue'
  import themeConfig from '../config/theme'
  import FullScreen from './components/fullscreen/index.vue'
  import HeaderBell from './components/headerbell/index.vue'
  defineProps({
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String,
    },
  })
  const router = useRouter()
  const userName = sessionStorage.getItem('userName')
  const emit = defineEmits(['update:collapsed'])
  const headerStyle = computed(() => {
    const { navTheme, layout } = themeConfig
    const isDark = navTheme === 'dark' && layout === 'topmenu'
    return {
      backgroundColor: navTheme === 'realDark' || isDark ? '' : 'rgba(255, 255, 255, 0.85)',
      color: isDark ? 'rgba(255, 255, 255, 0.85)' : '',
    }
  })

  // 退出登录
  const doLogout = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: createVNode(QuestionCircleOutlined),
      centered: true,
      onOk: () => {
        sessionStorage.clear()
        router.push('/')
      },
    })
  }

  //  账号管理
  const ToZhanghaoguanli = () => {
    router.push('editPassword')
  }
</script>

<style lang="less" scoped>
  .layout-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    height: @header-height;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;

    * {
      cursor: pointer;
    }
  }
</style>
