<template>
  <div
    ref="myChart"
    style="width: calc(100vw - 220px - 40px); height: 98%; background: #ffffff"
  ></div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  export default {
    name: 'LineChart',
    setup() {
      let myChart = ref(null)
      onMounted(async () => {
        let chart = echarts.init(myChart.value)
        // 绘制图表
        chart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '30%'],
          },
          visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 1,
                lt: 3,
                color: 'rgba(0, 0, 180, 0.4)',
              },
              {
                gt: 5,
                lt: 7,
                color: 'rgba(0, 0, 180, 0.4)',
              },
            ],
          },
          series: [
            {
              type: 'line',
              smooth: 0.6,
              symbol: 'none',
              lineStyle: {
                color: '#5470C6',
                width: 5,
              },
              markLine: {
                symbol: ['none', 'none'],
                label: { show: false },
                data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
              },
              areaStyle: {},
              data: [
                ['2022-06-01', 200],
                ['2022-06-02', 560],
                ['2022-06-03', 750],
                ['2022-06-04', 580],
                ['2022-06-05', 250],
                ['2022-06-06', 300],
                ['2022-06-07', 450],
                ['2022-06-08', 300],
                ['2022-06-09', 100],
              ],
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
