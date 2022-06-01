<template>
  <a-card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'"> <LineChart /> </p>
    <p v-if="activeKey === 'tab2'"> <BarChart /></p>
  </a-card>
</template>

<script setup>
  import { ref } from 'vue'
  import LineChart from './LineChart.vue'
  import BarChart from './BarChart.vue'
  const activeKey = ref('tab1')

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '流量趋势',
    },
    {
      key: 'tab2',
      tab: '访问量',
    },
  ]

  function onTabChange(key) {
    activeKey.value = key
  }
</script>

<style lang="less" scoped></style>
