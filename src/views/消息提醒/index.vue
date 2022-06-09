<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="neirong" label="消息内容">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.neirong"
                placeholder="请输入消息内容"
              />
            </a-form-item>
            <a-form-item name="time" label="日期">
              <a-range-picker allow-clear v-model:value="state.time" />
            </a-form-item>
            <a-form-item name="type" label="类型">
              <a-select
                allow-clear
                style="width: 200px"
                v-model:value="state.type"
                placeholder="请选择类型"
              >
                <a-select-option value="通知">通知</a-select-option>
                <a-select-option value="消息">消息</a-select-option>
                <a-select-option value="代办">代办</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item name="status" label="处理状态">
              <a-select
                allow-clear
                style="width: 200px"
                v-model:value="state.status"
                placeholder="请选择处理状态"
              >
                <a-select-option value="已处理">已处理</a-select-option>
                <a-select-option value="未处理">未处理</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="search">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="table_search_form">
          <a-button
            style="margin-bottom: 10px"
            type="primary"
            @click="edit"
            :disabled="!hasSelected"
          >
            <EditOutlined />
            标记已处理
          </a-button>
          <a-table
            :columns="columns"
            :data-source="state.dataSource"
            :loading="state.loading"
            :row-key="(record) => record.id"
            :pagination="state.pagination"
            @change="handleTableChange"
            :row-selection="rowSelection"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'status'">
                <a-tag
                  style="margin-right: 0"
                  :color="record.status === '未处理' ? 'red' : 'green'"
                >
                  {{ record.status }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive, computed, toRaw } from 'vue'
  import { EditOutlined } from '@ant-design/icons-vue'
  import dayjs from 'dayjs'
  import { success } from '../../utils/NotificationUtils'
  import { dateToUTCForEnd, dateToUTCForstart } from '../../utils/dateUtil'
  let pageSize = 10
  const state = reactive({
    loading: false,
    dataSource: [],
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => `共 ${total} 条 `,
    },
  })
  const searchForm = ref()
  const columns = [
    {
      title: '消息内容',
      dataIndex: 'neirong',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '日期',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      align: 'center',
    },
  ]

  onMounted(() => {
    fetch()
  })

  function queryValues(data) {
    return Object.keys(data)
      .filter((key) => data[key] !== null && data[key] !== undefined)
      .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
  }

  async function fetch() {
    let queryConditions = {}
    let values = {}
    let page = state.pagination.current - 1
    let size = !state.pagination.pageSize ? 10 : state.pagination.pageSize
    queryConditions = await searchForm.value.validateFields()
    let startTime =
      queryConditions?.time &&
      toRaw(queryConditions.time)[0] &&
      dateToUTCForstart(toRaw(queryConditions.time)[0])
    let endTime =
      queryConditions?.time &&
      toRaw(queryConditions.time)[1] &&
      dateToUTCForEnd(toRaw(queryConditions.time)[1])
    queryConditions.xiaoxishijianStart = startTime
    queryConditions.xiaoxishijianEnd = endTime
    console.log(queryConditions)
    values = queryValues(queryConditions)
    const params = { page, size, ...values }
    console.log(params)
    state.loading = true
    setTimeout(() => {
      state.loading = false
      state.dataSource = [
        {
          id: 1,
          neirong: 'admin',
          time: '2022-05-31 16:33:19',
          type: '通知',
          status: '未处理',
        },
        {
          id: 2,
          neirong: 'admin',
          time: '2022-05-31 16:33:19',
          type: '消息',
          status: '已处理',
        },
      ]
    }, 500)
  }

  function reset() {
    searchForm.value.resetFields()
    const pager = { ...state.pagination }
    pager.current = 1
    pager.pageSize = pageSize
    state.pagination = pager
    fetch()
  }

  function search() {
    const pager = { ...state.pagination }
    pager.current = 1
    state.pagination = pager
    fetch()
  }

  function handleTableChange(pagination) {
    console.log(pagination)
    const pager = { ...state.pagination }
    pager.current = pagination.current
    pager.pageSize = pagination.pageSize
    state.pagination = pager
    fetch()
  }
  const hasSelected = computed(() => state.selectedRowKeys.length > 0)

  const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys
  }

  const rowSelection = computed(() => {
    return {
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange,
      getCheckboxProps: (record) => {
        if (record.status === '已处理') {
          return { disabled: true }
        }
      },
    }
  })

  const edit = () => {
    console.log(state.selectedRowKeys)
    success('操作成功')
    state.selectedRowKeys = []
    search()
  }
</script>

<style scoped></style>
