<template>
  <a-breadcrumb style="height: 45px; line-height: 45px; margin-left: 30px">
    <a-breadcrumb-item
      v-for="item in route.matched.filter((item) => Object.keys(item.meta).length > 0)"
      :key="item.path"
    >
      {{ item.meta.title ? item.meta.title : '' }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
  import { useRoute } from 'vue-router'
  export default {
    setup() {
      const route = useRoute()
      return { route }
    },
  }
</script>
