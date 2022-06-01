<template>
  <div ref="myChart" style="width: calc(100vw - 220px - 40px); height: 98%"></div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import { mapData } from './data'
  export default {
    name: 'EchartsMap',
    setup() {
      let myChart = ref(null)
      onMounted(async () => {
        let chart = echarts.init(myChart.value)
        const json = await (await import('./china.json')).default
        echarts.registerMap('china', json)
        // 绘制图表
        chart.setOption({
          visualMap: [
            {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: false,
              orient: 'horizontal',
              inRange: {
                color: ['#e0ffff', '#006edd'],
                symbolSize: [30, 100],
              },
            },
          ],
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, .6)',
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          series: [
            {
              name: '数量',
              type: 'map',
              map: 'china',
              label: {
                show: true,
                color: 'rgb(249, 249, 249)',
                fontSize: 10,
              },
              itemStyle: {
                areaColor: '#2f82ce',
                borderColor: '#0DAAC1',
              },
              data: mapData,
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
