<template>
  <a-dropdown placement="bottomRight">
    <a style="color: rgba(0, 0, 0, 0.65)" class="ant-dropdown-link" @click.prevent>
      <a-badge :count="dataNum">
        <BellOutlined style="font-size: 16px" />
      </a-badge>
    </a>
    <template #overlay> </template>
  </a-dropdown>
</template>
<script setup>
  import { ref, shallowRef, computed, watch } from 'vue'
  import { BellOutlined } from '@ant-design/icons-vue'
  let dataNum = ref(3)
</script>
