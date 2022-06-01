<template>
  <div ref="myChart" style="width: 100%; height: 300px"></div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  export default {
    name: 'ProductSalesPie',
    setup() {
      let myChart = ref(null)
      onMounted(() => {
        let chart = echarts.init(myChart.value)
        // 绘制图表
        chart.setOption({
          tooltip: {
            trigger: 'item',
          },

          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              data: [
                { value: 500, name: '电子产品' },
                { value: 310, name: '服装' },
                { value: 274, name: '化妆品' },
                { value: 400, name: '家居' },
              ].sort(function (a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay() {
                return Math.random() * 400
              },
            },
          ],
        })
        window.onresize = function () {
          //自适应大小
          chart.resize()
        }
      })
      return { myChart }
    },
  }
</script>

<style scoped></style>
