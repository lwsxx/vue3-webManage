<template>
  <div class="menu-container" :style="{ height: isSideMenu ? 'calc(100vh - 64px)' : '' }">
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus">
        <a-menu-item > {{ item }} </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
  import { reactive, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../../router/index'
  import themeConfig from '../config/theme'

  const props = ['collapsed', 'theme']
  // 当前路由
  const currentRoute = useRoute()
  const router = useRouter()
  const state = reactive({
    openKeys: [],
    selectedKeys: [currentRoute.name],
  })

  const menus = computed(() => {
    let menu = [...routes]
    console.log(menu)
    return menu
      .map((item) => {
        if (item.hidden) return null
        if (!item.name && item.children) {
          return item.children
        }
      })
      .filter((item) => item !== null)
  })
  console.log('menus', menus)
  /** 侧边栏布局 */
  const isSideMenu = computed(() => themeConfig.layout === 'sidemenu')
  const theme = computed(() => themeConfig.navTheme)
  // 根据activeMenu获取指定的menu
  const getTargetMenuByActiveMenuName = (activeMenu) => {
    return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
  }

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const meta = currentRoute.meta
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
      return targetMenu?.meta?.namePath ?? [meta?.activeMenu]
    }

    return currentRoute?.hidden
      ? state?.openKeys || []
      : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
  }

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    (newVal) => {
      state.openKeys = newVal ? [] : getOpenKeys()
      state.selectedKeys = [currentRoute.name]
    },
  )

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name === 'login' || props.collapsed) return
      state.openKeys = getOpenKeys()
      const meta = currentRoute.meta
      if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
        state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu]
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name]
      }
    },
    {
      immediate: true,
    },
  )

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    if (key === currentRoute.name) return
    if (/http(s)?:/.test(key)) {
      window.open(key)
    } else {
      router.push({ name: key })
    }
  }
</script>

<style lang="less" scoped>
  .menu-container {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>
