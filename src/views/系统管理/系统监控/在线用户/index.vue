<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="userName" label="用户名">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.userName"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item name="ip" label="登录IP">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.ip"
                placeholder="请输入登录IP"
              />
            </a-form-item>
            <a-form-item name="time" label="登录时间">
              <a-date-picker
                allow-clear
                style="width: 200px"
                v-model:value="state.time"
                placeholder="请选择登录时间"
              />
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
              <template v-if="column.key === 'action' && record.username !== 'admin'">
                <a-popconfirm title="确定将该用户下线吗?" @confirm="() => confirm(record.id)">
                  <a href="#">下线</a>
                </a-popconfirm>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  import dayjs from 'dayjs'
  let pageSize = 10
  export default defineComponent({
    name: 'Index',
    setup() {
      const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          width: 280,
          align: 'center',
        },
        {
          title: '登录IP',
          dataIndex: 'ip',
          width: 150,
          align: 'center',
        },
        {
          title: '登录时间',
          dataIndex: 'time',
          align: 'center',
          formItemProps: {
            component: 'DatePicker',
            componentProps: {
              class: 'w-full',
            },
          },
        },
        {
          title: '操作系统',
          dataIndex: 'os',
          align: 'center',
        },
        {
          title: '浏览器',
          dataIndex: 'browser',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
        },
      ]
      const searchForm = ref()
      const state = reactive({
        userName: '',
        ip: '',
        time: '',
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
        let page = state.pagination.current - 1
        let size = !state.pagination.pageSize ? 10 : state.pagination.pageSize
        queryConditions = await searchForm.value.validateFields()
        queryConditions.time = queryConditions.time
          ? dayjs(queryConditions.time).format('YYYY-MM-DD')
          : ''
        const params = { page, size, ...queryConditions }
        console.log(params)
        state.loading = true
        setTimeout(() => {
          state.loading = false
          state.dataSource = [
            {
              id: 1,
              username: 'admin',
              ip: '127.0.0.1',
              time: '2022-05-31 16:33:19',
              os: 'Windows 10',
              browser: 'Edge 101.0.1210.39',
            },
            {
              id: 2,
              username: 'ceshi',
              ip: '127.0.0.1',
              time: '2022-06-01 16:33:19',
              os: 'Windows 10',
              browser: 'Chrome 101.0.4951.67',
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

      const confirm = (e) => {
        console.log(e)
        success('操作成功')
        search()
      }

      return {
        pageSize,
        searchForm,
        state,
        columns,
        reset,
        search,
        handleTableChange,
        fetch,
        confirm,
      }
    },
  })
</script>

<style scoped></style>
