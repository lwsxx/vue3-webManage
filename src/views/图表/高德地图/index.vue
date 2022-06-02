<template>
  <div
    ref="gaodeMap"
    style="width: calc(100vw - 220px - 40px); height: calc(100vh - 129px); margin: auto; padding: 0"
  ></div>
</template>

<script>
  import { ref, nextTick, unref, onMounted } from 'vue'
  import { useScript } from '../../../hooks/useScript'
  const A_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=9cb3e1098b3c640e1191e20f65499717'
  export default {
    name: 'GaodeMap',
    setup() {
      const gaodeMap = ref(null)
      const { toPromise } = useScript({ src: A_MAP_URL })
      async function initMap() {
        await toPromise()
        await nextTick()
        const wrapEl = unref(gaodeMap)
        if (!wrapEl) return
        const AMap = window.AMap
        new AMap.Map(wrapEl, {
          zoom: 14,
          center: [122.060287, 37.48917],
          viewMode: '3D',
        })
      }
      onMounted(() => {
        initMap()
      })

      return { gaodeMap }
    },
  }
</script>

<style scoped></style>
