<template>
  <!-- 目录 -->
  <template v-if="isShowSubMenu">
    <Menu.SubMenu :key="props.menuInfo?.name" v-bind="$attrs">
      <template #title>
        <span>
          <!--          <component :is="props.menuInfo.meta?.icon" />-->
          <span>{{ props.menuInfo.name }}</span>
        </span>
      </template>
      <template v-for="item in menuChildren" :key="item.name || item.path">
        <!-- 递归生成菜单 -->
        <MyMenuItem :menu-info="item" />
      </template>
    </Menu.SubMenu>
  </template>
  <!-- 菜单 -->
  <template v-else>
    <a-menu-item :key="props.menuInfo?.name">
      <!--      <component :is="props.menuInfo.meta?.icon" />-->
      <span>{{ props.menuInfo }}</span>
    </a-menu-item>
  </template>
</template>

<script setup>
  import { computed } from 'vue'

  // eslint-disable-next-line no-undef
  defineOptions({
    name: 'MyMenuItem',
  })

  const props = ['menuInfo']
  const menuChildren = computed(() => {
    console.log(props.menuInfo)
    return [...(props.menuInfo?.children || [])].filter((n) => !n?.hidden)
  })

  const isShowSubMenu = computed(() => {
    const menuInfo = props.menuInfo
    return (
      menuInfo?.meta?.type === 0 ||
      (!Object.is(menuInfo?.meta?.hideChildrenInMenu, true) && menuInfo?.children?.length)
    )
  })
</script>

<style scoped></style>
