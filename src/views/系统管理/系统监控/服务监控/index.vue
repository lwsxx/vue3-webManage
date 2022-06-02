<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card style="border: 1px solid #f0f0f0" :loading="loading" title="运行环境">
          <a-descriptions :column="1" :label-style="{ width: '50%' }">
            <a-descriptions-item label="操作系统">{{ runtime.os }}</a-descriptions-item>
            <a-descriptions-item label="系统架构">{{ runtime.arch }}</a-descriptions-item>
            <a-descriptions-item label="Node版本">
              <a-tag color="processing" size="small">{{ runtime.nodeVersion }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="NPM版本">
              <a-tag color="processing" size="small">{{ runtime.npmVersion }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card style="border: 1px solid #f0f0f0" :loading="loading" title="CPU">
          <a-descriptions :column="1" :label-style="{ width: '50%' }">
            <a-descriptions-item label="详细">{{ parseCpuInfo }}</a-descriptions-item>
            <a-descriptions-item label="负载">
              <a-progress
                :percent="
                  formarPercentage(cpu.rawCurrentLoad, cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad)
                "
                :stroke-color="
                  customProgressColor(
                    cpu.rawCurrentLoad,
                    cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad,
                  )
                "
              />
            </a-descriptions-item>
            <a-descriptions-item label="负载1">
              <a-progress
                :percent="
                  formarPercentage(cpu.rawCurrentLoad, cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad)
                "
                :stroke-color="
                  customProgressColor(
                    cpu.rawCurrentLoad,
                    cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad,
                  )
                "
              />
            </a-descriptions-item>
            <a-descriptions-item label="负载2">
              <a-progress
                :percent="
                  formarPercentage(cpu.rawCurrentLoad, cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad)
                "
                :stroke-color="
                  customProgressColor(
                    cpu.rawCurrentLoad,
                    cpu.rawCurrentLoadIdle + cpu.rawCurrentLoad,
                  )
                "
              />
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card style="border: 1px solid #f0f0f0" :loading="loading" title="磁盘">
          <div class="card_body_content">
            <a-descriptions :column="1" style="width: 50%">
              <a-descriptions-item label="总空间">{{ disk.size + ' GB' }}</a-descriptions-item>
              <a-descriptions-item label="已用空间">{{ disk.used + ' GB' }}</a-descriptions-item>
              <a-descriptions-item label="可用空间">
                {{ disk.available + ' GB' }}
              </a-descriptions-item>
            </a-descriptions>
            <div class="card_body_content_right">
              <a-progress
                type="dashboard"
                :percent="parseDiskPercentage"
                :width="100"
                :stroke-color="customDiskProgressColor"
              />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card style="border: 1px solid #f0f0f0" :loading="loading" title="内存">
          <div class="card_body_content">
            <a-descriptions :column="1" style="width: 50%">
              <a-descriptions-item label="总内存">{{ memory.total + ' GB' }}</a-descriptions-item>
              <a-descriptions-item label="已用内存">{{ memory.used + ' GB' }}</a-descriptions-item>
              <a-descriptions-item label="可用内存">
                {{ memory.available + ' GB' }}
              </a-descriptions-item>
            </a-descriptions>
            <div class="card_body_content_right">
              <a-progress
                type="dashboard"
                :percent="parseMemoryPercentage"
                :width="100"
                :stroke-color="customMemoryProgressColor"
              />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { computed, onMounted, reactive, ref, toRefs } from 'vue'
  const loading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
  const sysInfo = reactive({
    runtime: {
      os: 'Windows 10',
      arch: 'X64',
      nodeVersion: 'v14.17.5',
      npmVersion: 'v7.13.0',
    },
    disk: {
      size: 100,
      used: 79,
      available: 21,
    },
    memory: {
      total: 3.7,
      used: 1.78,
      available: 1.91,
    },
    cpu: {
      manufacturer: 'Intel(R)',
      brand: 'Xeon(R) Platinum 8163',
      physicalCores: 0,
      model: '',
      speed: 2.5,
      rawCurrentLoad: 840,
      rawCurrentLoadIdle: 18140,
      coresLoad: [],
    },
  })
  const { runtime, disk, memory, cpu } = toRefs(sysInfo)
  const parseCpuInfo = computed(() => {
    return `${cpu.value.manufacturer} ${cpu.value.brand} @ ${cpu.value.speed}GHz`
  })
  const formarPercentage = (used, total) => {
    if (total <= 0) {
      return 0
    }
    return Math.floor((used / total) * 100)
  }
  const customProgressColor = (used, total) => {
    let percentage = formarPercentage(used, total)
    if (percentage < 30) {
      return '#5cb87a'
    } else if (percentage < 70) {
      return '#e6a23c'
    } else {
      return '#f53f3f'
    }
  }
  const customDiskProgressColor = computed(() => {
    let percentage = parseDiskPercentage
    if (percentage.value < 30) {
      return '#5cb87a'
    } else if (percentage.value < 70) {
      return '#e6a23c'
    } else {
      return '#f53f3f'
    }
  })
  const parseDiskPercentage = computed(() => {
    if (disk.value.size <= 0) {
      return 0
    }
    return Math.floor((disk.value.used / disk.value.size) * 100)
  })
  const customMemoryProgressColor = computed(() => {
    let percentage = parseMemoryPercentage
    if (percentage.value < 30) {
      return '#5cb87a'
    } else if (percentage.value < 70) {
      return '#e6a23c'
    } else {
      return '#f53f3f'
    }
  })
  const parseMemoryPercentage = computed(() => {
    if (memory.value.total <= 0) {
      return 0
    }
    return Math.floor((memory.value.used / memory.value.total) * 100)
  })
</script>

<style lang="less" scoped>
  .card_body_content {
    display: flex;
    width: 100%;
    align-items: center;
    .card_body_content_right {
      width: 50%;
    }
  }
</style>
