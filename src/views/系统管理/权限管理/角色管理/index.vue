<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="roleName" label="角色名称">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.roleName"
                placeholder="请输入角色名称"
              />
            </a-form-item>
            <a-form-item name="status" label="状态">
              <a-select
                allow-clear
                style="width: 200px"
                v-model:value="state.status"
                placeholder="请选择状态"
              >
                <a-select-option value="disable">停用</a-select-option>
                <a-select-option value="normal">启用</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="fetch">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="table_search_form">
          <a-button style="margin-bottom: 10px" type="primary" @click="add">
            <PlusOutlined />
            新增
          </a-button>
          <a-table
            :columns="columns"
            :data-source="state.dataSource"
            :loading="state.loading"
            :row-key="(record) => record.id"
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'status'">
                <a-tag
                  style="margin-right: 0"
                  :color="record.status === 'disable' ? 'red' : 'green'"
                  >{{ record.status === 'disable' ? '停用' : '启用' }}</a-tag
                >
              </template>
              <template v-if="column.key === 'action'">
                <a @click="() => edit(record.id)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除该角色吗?" @confirm="() => confirm(record.id)">
                  <a class="red" href="#">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <template v-if="record.status === 'disable'">
                  <a-popconfirm title="确定启用该角色吗?" @confirm="() => confirm(record.id)">
                    <a href="#">启用</a>
                  </a-popconfirm>
                </template>
                <template v-else>
                  <a-popconfirm title="确定停用该角色吗?" @confirm="() => confirm(record.id)">
                    <a class="red" href="#">停用</a>
                  </a-popconfirm>
                </template>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  import { useRouter } from 'vue-router'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'Index',
    components: {
      PlusOutlined,
    },
    setup(props) {
      const router = useRouter()
      const columns = [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          width: 280,
          // align: 'center',
        },
        {
          title: '角色值',
          dataIndex: 'roleValue',
          width: 280,
          // align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
        },
        {
          title: '备注',
          dataIndex: 'beizhu',
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
        loading: false,
        dataSource: [],
        title: '',
      })

      onMounted(() => {
        fetch()
      })

      async function fetch() {
        let queryConditions = {}
        let values = {}
        queryConditions = await searchForm.value.validateFields()
        values = queryValues(queryConditions)
        const params = { ...values }
        console.log(params)
        state.loading = true
        setTimeout(() => {
          state.loading = false
          state.dataSource = [
            {
              id: 1,
              roleName: '超级管理员',
              status: 'normal',
              beizhu: '超级管理员',
              roleValue: 'admin',
            },
            {
              id: 2,
              roleName: '测试',
              roleValue: 'test',
              status: 'disable',
              beizhu: '测试',
            },
            {
              id: 3,
              roleName: '普通用户',
              roleValue: 'use',
              status: 'normal',
              beizhu: '普通用户',
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
        fetch()
      }

      const confirm = (e) => {
        console.log(e)
        success('操作成功')
        fetch()
      }

      function add() {
        router.push({ name: 'roleList-roleAdd' })
      }

      function edit(id) {
        router.push({ name: 'roleList-roleEdit', params: { id } })
      }

      return {
        searchForm,
        state,
        columns,
        reset,
        fetch,
        confirm,
        add,
        edit,
      }
    },
  })
</script>

<style scoped></style>
