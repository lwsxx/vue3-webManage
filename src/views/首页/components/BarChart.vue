<template>
  <div ref="myChart" style="width: 100%; height: 280px"></div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  export default {
    name: 'BarChart',
    setup() {
      let myChart = ref(null)
      onMounted(() => {
        let chart = echarts.init(myChart.value)
        // 绘制图表
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
              type: 'bar',
              barMaxWidth: 80,
              itemStyle: {
                color: '#5ab1ef',
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
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
