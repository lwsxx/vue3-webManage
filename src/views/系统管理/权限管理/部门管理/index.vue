<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="depName" label="部门名称">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.depName"
                placeholder="请输入部门名称"
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
                <a @click="() => edit(record)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除该部门吗?" @confirm="() => confirm(record.id)">
                  <a class="red" href="#">删除</a>
                </a-popconfirm>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
    <DepModal
      ref="DepModal"
      @cancleModal="cancleModal"
      :title="state.title"
      :visible="state.depModal"
    />
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import DepModal from './depModal.vue'
  export default defineComponent({
    name: 'Index',
    components: {
      PlusOutlined,
      DepModal,
    },
    setup(props) {
      const columns = [
        {
          title: '部门名称',
          dataIndex: 'depName',
          width: 280,
          align: 'center',
        },
        {
          title: '排序',
          dataIndex: 'number',
          width: 150,
          align: 'center',
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
      const DepModal = ref()
      const searchForm = ref()
      const state = reactive({
        loading: false,
        dataSource: [],
        depModal: false,
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
              depName: '测试部门',
              number: 1,
              status: 'normal',
              beizhu: '测试部门 10',
              children: [
                {
                  id: 101,
                  depName: '测试一部',
                  number: 1,
                  status: 'normal',
                  beizhu: '测试一部',
                },
                {
                  id: 102,
                  depName: '测试二部',
                  number: 2,
                  status: 'normal',
                  beizhu: '测试二部',
                },
                {
                  id: 103,
                  depName: '测试三部',
                  number: 3,
                  status: 'disable',
                  beizhu: '测试三部',
                },
              ],
            },
            {
              id: 2,
              depName: '技术部门',
              number: 2,
              status: 'normal',
              beizhu: '技术部门 10',
            },
            {
              id: 3,
              depName: '人事部门',
              number: 3,
              status: 'normal',
              beizhu: '人事部门 10',
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
        state.title = '新增部门'
        state.depModal = true
      }

      function edit(id) {
        state.depModal = true
        state.title = '编辑部门'
        nextTick(() => {
          DepModal.value.getData(id)
        })
      }

      function cancleModal(value) {
        state.depModal = value
      }

      return {
        DepModal,
        searchForm,
        state,
        columns,
        reset,
        fetch,
        confirm,
        add,
        edit,
        cancleModal,
      }
    },
  })
</script>

<style scoped></style>
