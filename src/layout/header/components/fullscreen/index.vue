<template>
  <Tooltip title="全屏" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <FullscreenOutlined style="font-size: 16px" v-if="!isFullscreen" />
      <FullscreenExitOutlined style="font-size: 16px" v-else />
    </span>
  </Tooltip>
</template>
<script setup>
  import { useFullscreen } from '@vueuse/core'

  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
  import { Tooltip } from 'ant-design-vue'
  const { toggle, isFullscreen } = useFullscreen()
</script>
