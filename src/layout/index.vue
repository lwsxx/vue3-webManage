<template>
  <Layout class="layout">
    <Layout.Sider
      v-if="themeConfig.layout === 'sidemenu'"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      class="layout-sider"
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
        <router-view />
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

  const collapsed = ref(false)
  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
  const getTheme = computed(() => themeConfig.navTheme)
  console.log(getTheme)
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
  }
</style>
