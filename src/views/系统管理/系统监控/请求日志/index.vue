<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="userName" label="操作人">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.userName"
                placeholder="请输入操作人"
              />
            </a-form-item>
            <a-form-item name="ip" label="请求IP">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.ip"
                placeholder="请输入请求IP"
              />
            </a-form-item>
            <a-form-item name="method" label="请求方式">
              <a-select
                allow-clear
                style="width: 200px"
                v-model:value="state.method"
                placeholder="请选择请求方式"
              >
                <a-select-option value="POST">POST</a-select-option>
                <a-select-option value="GET">GET</a-select-option>
                <a-select-option value="PUT">PUT</a-select-option>
                <a-select-option value="DELETE">DELETE</a-select-option>
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
          <a-table
            :columns="columns"
            :data-source="state.dataSource"
            :loading="state.loading"
            :row-key="(record) => record.id"
            :pagination="state.pagination"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'method'">
                <a-tag style="margin-right: 0" color="processing">{{ record.method }}</a-tag>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <a-tag style="margin-right: 0" :color="getStatusType(record.status)">{{
                  record.status
                }}</a-tag>
              </template>
              <template v-if="column.dataIndex === 'consumeTime'">
                <a-tag style="margin-right: 0" :color="getConsumeTimeType(record.consumeTime)">{{
                  `${record.consumeTime}ms`
                }}</a-tag>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'

  const getStatusType = (status) => {
    if (status >= 200 && status < 300) {
      return 'success'
    } else if (status >= 300 && status < 400) {
      return 'default'
    } else if (status >= 400 && status < 500) {
      return 'warning'
    } else if (status >= 500) {
      return 'error'
    } else {
      return 'default'
    }
  }
  const getConsumeTimeType = (time) => {
    if (time <= 20) {
      return 'success'
    } else if (time <= 40) {
      return 'warning'
    } else {
      return 'error'
    }
  }
  const columns = [
    {
      title: '请求IP',
      dataIndex: 'ip',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '操作人',
      dataIndex: 'userName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '请求地址',
      dataIndex: 'action',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '响应状态',
      dataIndex: 'status',
      align: 'center',
      // bodyCell: ({ record }) => <a-tag color={getStatusType(record.status)}>{record.status}</a-tag>,
    },
    {
      title: '耗时',
      dataIndex: 'consumeTime',
      align: 'center',
      // bodyCell: ({ record }) => (
      //   <a-tag color={getConsumeTimeType(record.consumeTime)}>{`${record.consumeTime}ms`}</a-tag>
      // ),
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 220,
    },
  ]
  let pageSize = 10
  const searchForm = ref()
  const state = reactive({
    loading: false,
    dataSource: [],
    pagination: {
      current: 1,
      pageSize,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total) => `共 ${total} 条 `,
    },
  })

  onMounted(() => {
    fetch()
  })

  async function fetch() {
    let queryConditions = {}
    let values = {}
    let page = state.pagination.current - 1
    let size = !state.pagination.pageSize ? 10 : state.pagination.pageSize
    queryConditions = await searchForm.value.validate()
    values = queryValues(queryConditions)
    const params = { page, size, ...values }
    console.log(params)
    state.loading = true
    setTimeout(() => {
      state.loading = false
      state.dataSource = [
        {
          id: 1,
          userName: 'admin',
          ip: '127.0.0.1',
          params: '{}',
          action: '/admin/logList',
          status: 200,
          method: 'GET',
          consumeTime: 13,
          createTime: '2022-06-02 10:00:03',
        },
        {
          id: 2,
          userName: 'admin',
          ip: '127.0.0.1',
          params: '{"page":0,"size":10}',
          action: '/admin/List',
          status: 200,
          method: 'POST',
          consumeTime: 22,
          createTime: '2022-06-02 10:00:03',
        },
      ]
    }, 500)
  }

  function queryValues(data) {
    return Object.keys(data)
      .filter((key) => data[key] !== null && data[key] !== undefined)
      .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
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
    const pager = { ...state.pagination }
    pager.current = pagination.current
    pager.pageSize = pagination.pageSize
    state.pagination = pager
    fetch()
  }
</script>

<style scoped></style>
