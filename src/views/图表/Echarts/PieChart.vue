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
    name: 'PieChart',
    setup() {
      let myChart = ref(null)
      onMounted(async () => {
        let chart = echarts.init(myChart.value)
        // 绘制图表
        chart.setOption({
          legend: {
            top: 'bottom',
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8,
              },
              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' },
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
