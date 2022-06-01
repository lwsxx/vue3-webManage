<template>
  <div class="grow_card_content">
    <a-row :gutter="16">
      <template v-for="(item, index) in data" :key="item.title">
        <a-col :span="6">
          <a-card
            style="border: 1px solid #f0f0f0"
            size="small"
            :loading="loading"
            :title="item.title"
          >
            <template #extra>
              <a-tag :color="item.color">{{ item.action }}</a-tag>
            </template>
            <div class="grow_card_content_body_top">
              <a-statistic :value="item.value">
                <template #prefix> $ </template>
              </a-statistic>
              <component :style="{ fontSize: '30px', color: item.color }" :is="item.icon" />
            </div>
            <div class="grow_card_content_body_bottom">
              <span>总{{ item.title }}</span>
              <a-statistic :value="item.total">
                <template #prefix> $ </template>
              </a-statistic>
            </div>
          </a-card>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script setup>
  defineProps({
    data: Array,
    loading: Boolean,
  })
</script>

<style lang="less" scoped>
  .grow_card_content_body_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
  }
  .grow_card_content_body_bottom {
    display: flex;
    align-items: center;
    margin: 20px 20px 0 20px;
    justify-content: space-between;
    /deep/ .ant-statistic-content {
      font-size: 14px;
    }
  }
</style>
