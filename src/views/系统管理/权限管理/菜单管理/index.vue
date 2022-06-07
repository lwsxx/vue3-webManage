<template>
  <div>
    <div class="view_content_box">
      <a-space direction="vertical" size="middle" style="width: 100%">
        <div class="table_search_form">
          <a-form :model="state" ref="searchForm" layout="inline">
            <a-form-item name="menuName" label="菜单名称">
              <a-input
                allow-clear
                style="width: 200px"
                v-model:value="state.menuName"
                placeholder="请输入菜单名称"
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
                <a-popconfirm title="确定删除该菜单吗?" @confirm="() => confirm(record.id)">
                  <a class="red" href="#">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <template v-if="record.status === 'disable'">
                  <a-popconfirm title="确定启用该菜单吗?" @confirm="() => confirm(record.id)">
                    <a href="#">启用</a>
                  </a-popconfirm>
                </template>
                <template v-else>
                  <a-popconfirm title="确定停用该菜单吗?" @confirm="() => confirm(record.id)">
                    <a class="red" href="#">停用</a>
                  </a-popconfirm>
                </template>
              </template>
            </template>
          </a-table>
        </div>
      </a-space>
    </div>
    <MenuModal
      ref="MenuModal"
      @cancleModal="cancleModal"
      :title="state.title"
      :visible="state.menuModal"
    />
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import MenuModal from './menuModal.vue'
  export default defineComponent({
    name: 'Index',
    components: {
      PlusOutlined,
      MenuModal,
    },
    setup(props) {
      const columns = [
        {
          title: '菜单名称',
          dataIndex: 'menuName',
          width: 280,
          // align: 'center',
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
          title: '路由',
          dataIndex: 'router',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
        },
      ]
      const MenuModal = ref()
      const searchForm = ref()
      const state = reactive({
        loading: false,
        dataSource: [],
        menuModal: false,
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
              menuName: '系统管理',
              number: 1,
              status: 'normal',
              router: '/admin/system',
              shangji: '',
              children: [
                {
                  id: 101,
                  menuName: '权限管理',
                  number: 101,
                  status: 'normal',
                  router: '/admin/system/permssion',
                  shangji: '系统管理',
                  children: [
                    {
                      id: 1011,
                      menuName: '用户管理',
                      number: 1011,
                      status: 'normal',
                      router: '/admin/system/permssion/userList',
                      shangji: '权限管理',
                    },
                    {
                      id: 1012,
                      menuName: '菜单管理',
                      number: 1012,
                      status: 'normal',
                      router: '/admin/system/permssion/menuList',
                      shangji: '权限管理',
                    },
                    {
                      id: 1013,
                      menuName: '角色管理',
                      number: 1013,
                      status: 'normal',
                      router: '/admin/system/permssion/roleList',
                      shangji: '权限管理',
                    },
                    {
                      id: 1014,
                      menuName: '部门管理',
                      number: 1014,
                      status: 'normal',
                      router: '/admin/system/permssion/departmentList',
                      shangji: '权限管理',
                    },
                  ],
                },
                {
                  id: 102,
                  menuName: '系统监控',
                  number: 102,
                  shangji: '系统管理',
                  router: '/admin/system/monitor',
                  status: 'normal',
                  children: [
                    {
                      id: 1021,
                      menuName: '在线用户',
                      number: 1021,
                      status: 'normal',
                      shangji: '系统监控',
                      router: '/admin/system/online',
                    },
                    {
                      id: 1022,
                      menuName: '登录日志',
                      number: 1022,
                      status: 'normal',
                      shangji: '系统监控',
                      router: '/admin/system/login-log',
                    },
                    {
                      id: 1023,
                      menuName: '服务监控',
                      number: 1023,
                      status: 'normal',
                      shangji: '系统监控',
                      router: '/admin/system/serve',
                    },
                    {
                      id: 1024,
                      menuName: '请求日志',
                      number: 1024,
                      status: 'normal',
                      shangji: '系统监控',
                      router: '/admin/system/req-log',
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              menuName: '首页',
              number: 2,
              shangji: '',
              router: '/admin/index',
              status: 'normal',
            },
            {
              id: 3,
              menuName: '图表',
              number: 3,
              shangji: '',
              router: '/admin/charts',
              status: 'normal',
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
        state.title = '新增菜单'
        state.menuModal = true
      }

      function edit(id) {
        state.menuModal = true
        state.title = '编辑菜单'
        nextTick(() => {
          MenuModal.value.getData(id)
        })
      }

      function cancleModal(value) {
        state.menuModal = value
      }

      return {
        MenuModal,
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
