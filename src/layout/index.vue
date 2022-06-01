<template>
  <Layout class="layout">
    <Layout.Sider
      v-if="themeConfig.layout === 'sidemenu'"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      :class="getIsMixedSiderBar ? 'mixed_sider_bar' : null"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" :theme="getTheme" />
    </Layout.Sider>
    <Layout>
      <PageHeader v-model:collapsed="collapsed" :theme="getTheme">
        <template v-if="themeConfig.layout === 'topmenu'" #default>
          <Logo :collapsed="collapsed" />
          <AsideMenu :collapsed="collapsed" :theme="getTheme" />
        </template>
      </PageHeader>
      <Layout.Content class="layout-content">
        <Breadcrumb />
        <transition name="fade-slide" mode="out-in" appear>
          <router-view class="app-content" />
        </transition>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { Layout } from 'ant-design-vue'
  import Logo from './logo/index.vue'
  import AsideMenu from './menu/menu.vue'
  import PageHeader from './header/index.vue'
  import themeConfig from './config/theme'
  import Breadcrumb from './breadcrumb/index.vue'

  const collapsed = ref(false)
  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
  const getTheme = computed(() => themeConfig.navTheme)
  const getIsMixedSiderBar = computed(() => themeConfig.fixSiderbar)
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
    .ant-layout {
      overflow: hidden;
    }
    .layout-content {
      flex: none;
    }
    .app-content {
      padding: 0 20px;
      height: calc(100vh - 109px);
      overflow: auto;
      //background-color: #fff;
    }
  }
  .mixed_sider_bar {
    //position: fixed;
    //top: 0;
    //left: 0;
    //height: 100%;
  }
  .fade-slide-leave-active,
  .fade-slide-enter-active {
    transition: all 0.3s;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
