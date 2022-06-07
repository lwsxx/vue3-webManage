<template>
  <div class="menu-container" :style="{ height: isSideMenu ? 'calc(100vh - 64px)' : '' }">
    <a-menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="themeMenu"
      :collapsed="collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <component :is="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>

        <!-- 不显示父级菜单的一组子菜单 -->
        <template v-else-if="!item.name && item.children.length > 0">
          <a-menu-item v-for="e in item.children" :key="e.name">
            <component :is="e.meta.icon" />
            <span>{{ e.meta.title }}</span>
          </a-menu-item>
        </template>
        <SubMenu v-else :key="item.name" :route="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
  import { reactive, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../../router/index'
  import themeConfig from '../config/theme'
  import SubMenu from './menu-item.vue'
  export default {
    components: {
      SubMenu,
    },
    props: {
      collapsed: Boolean,
      theme: String,
    },
    setup(props) {
      const currentRoute = useRoute()
      console.log([currentRoute.name])
      const router = useRouter()
      const state = reactive({
        rootSubmenuKeys: ['index', 'system', 'charts'],
        openKeys: [],
        selectedKeys: [currentRoute.name],
      })
      const menus = computed(() => {
        let menu = [...routes]
        console.log(deepFilter(menu))
        return deepFilter(menu)
      })
      function deepFilter(tree, arr = []) {
        if (!tree.length) return []
        for (let item of tree) {
          if (item.hidden) continue
          let node = { ...item, children: [] }
          arr.push(node)
          if (item.children && item.children.length) {
            deepFilter(item.children, node.children)
          }
        }
        return arr
      }
      /** 侧边栏布局 */
      const isSideMenu = computed(() => themeConfig.layout === 'sidemenu')
      const theme = computed(() => themeConfig.navTheme)
      // 根据activeMenu获取指定的menu
      const getTargetMenuByActiveMenuName = (activeMenu) => {
        return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
      }

      // 获取当前打开的子菜单
      const getOpenKeys = () => {
        // const meta = currentRoute.meta
        console.log('currentRoute', currentRoute)
        // if (meta?.activeMenu) {
        //   const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
        //   return targetMenu?.meta?.namePath ?? [meta?.activeMenu]
        // }
        // return currentRoute.meta?.namePath ?? currentRoute.matched.map((n) => n.name)
        return currentRoute.matched.map((n) => n.name)
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
          // const meta = currentRoute.meta
          // if (meta?.activeMenu) {
          //   const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
          //   state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu]
          // } else {
          //   state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name]
          // }
          state.selectedKeys = [currentRoute.name]
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

      const onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
        if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          state.openKeys = openKeys
        } else {
          state.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      }
      return {
        state,
        isSideMenu,
        themeMenu: theme,
        clickMenuItem,
        menus,
        onOpenChange,
      }
    },
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
