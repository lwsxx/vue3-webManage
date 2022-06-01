<template>
  <div>
    <GrowCard :data="cardData" :loading="loading" />
    <SiteAnalysis :loading="loading" class="shouye_content_box" />
    <div class="shouye_content_box">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="转化率" style="border: 1px solid #f0f0f0" :loading="loading">
            <VisitRadar />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="访问来源" style="border: 1px solid #f0f0f0" :loading="loading">
            <VisitSourcePie />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="成交占比" style="border: 1px solid #f0f0f0" :loading="loading">
            <ProductSalesPie />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
  import GrowCard from './components/GrowCard.vue'
  import SiteAnalysis from './components/SiteAnalysis.vue'
  import ProductSalesPie from './components/ProductSalesPie.vue'
  import VisitRadar from './components/VisitRadar.vue'
  import VisitSourcePie from './components/VisitSourcePie.vue'
  import { reactive, ref } from 'vue'
  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 1500)
  const cardData = reactive([
    {
      title: '访问数',
      icon: 'alert-outlined',
      value: 2000,
      total: 120000,
      color: 'green',
      action: '月',
    },
    {
      title: '成交额',
      icon: 'account-book-outlined',
      value: 20000,
      total: 500000,
      color: 'blue',
      action: '月',
    },
    {
      title: '下载数',
      icon: 'download-outlined',
      value: 8000,
      total: 120000,
      color: 'orange',
      action: '周',
    },
    {
      title: '成交数',
      icon: 'schedule-outlined',
      value: 5000,
      total: 50000,
      color: 'purple',
      action: '年',
    },
  ])
</script>

<style scoped>
  .shouye_content_box {
    margin: 20px 0;
  }
</style>
