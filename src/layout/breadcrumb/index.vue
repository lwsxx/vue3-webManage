<template>
  <a-breadcrumb style="height: 45px; line-height: 45px; margin-left: 30px">
    <a-breadcrumb-item v-for="item in breadCrumbData" :key="item.path">
      <router-link to="" @click="clickBread(item)" v-if="isLink(item)">
        {{ item.meta.title || '' }}
      </router-link>
      <span v-else>
        {{ item.meta.title || '' }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
  import { useRoute, useRouter } from 'vue-router'
  import { watch, ref, toRaw } from 'vue'
  import { routes } from '../../router/index'
  import { getAllParentPath } from '../../router/helper/menuHelper'

  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const currentRouteName = useRoute()
      const { currentRoute } = useRouter()
      const breadCrumbData = ref([])
      function deepFilter(tree, arr = []) {
        if (!tree.length) return []
        for (let item of tree) {
          // if (item.hidden) continue
          if (item.path === '/') continue
          if (item.name === 'Login') continue
          if (item.name === 'NotFound') continue
          let node = { ...item, children: [] }
          arr.push(node)
          if (item.children && item.children.length) {
            deepFilter(item.children, node.children)
          }
        }
        return arr
      }
      function getMenu() {
        return deepFilter([...routes])
      }
      function getMatched(menus, parent) {
        const metched = []
        menus.forEach((item) => {
          if (parent.includes(item.name)) {
            metched.push({
              ...item,
            })
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent))
          }
        })
        return metched
      }
      function filterName(list) {
        let arr = list
        list.map((item, index) => {
          if (!item.name) {
            arr.splice(index, 1)
          }
        })
        return arr
      }
      watch(
        route,
        async () => {
          console.log('路由更新了')
          const menus = await getMenu()
          const routeMatched = currentRoute.value.matched
          const cur = routeMatched?.[routeMatched.length - 1]
          let path = ''
          let parent = []
          if (cur && cur?.meta?.currentActiveMenu) {
            for (let i = 0; i < cur.meta.currentActiveMenu.length; i++) {
              path = cur.meta.currentActiveMenu[i]
              parent = parent.concat(getAllParentPath(menus, path))
            }
          } else {
            path = currentRoute.value.path
            parent = getAllParentPath(menus, path)
          }
          const filterMenus = menus.filter((item) => item.name === parent[0])
          const matched = getMatched(filterMenus, parent)
          if (!matched || matched.length === 0) return
          const breadcrumbList = filterName(matched)
          if (currentRoute.value.meta?.currentActiveMenu) {
            breadcrumbList.push({
              ...currentRoute.value,
            })
          }
          breadCrumbData.value = breadcrumbList
          console.log('面包屑------------------')
          console.log(breadcrumbList)
        },
        {
          immediate: true,
        },
      )
      function isLink(item) {
        let arr = toRaw(item)
        return arr.children && arr.children.length === 0 && arr.name !== currentRouteName.name
      }
      function clickBread(item) {
        if (item.name && item.params) {
          router.push({ name: item.name, params: item.params })
        }
        router.push({ name: item.name })
      }
      return { breadCrumbData, isLink, clickBread }
    },
  }
</script>
