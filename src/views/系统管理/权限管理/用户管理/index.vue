<template>
  <div>
    <div class="view_content_box" style="display: flex">
      <a-card title="部门列表" style="width: 20%" size="small">
        <template #extra>
          <a-input-search v-model:value="searchValue" size="small" />
        </template>
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="treeData"
          v-model:selectedKeys="selectedKeys"
          @expand="onExpand"
        >
          <template #title="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </a-card>
      <div class="content_right">
        <a-space direction="vertical" size="middle" style="width: 100%">
          <div class="table_search_form">
            <a-form :model="state" ref="searchForm" layout="inline">
              <a-form-item style="margin-bottom: 10px" name="userName" label="用户名称">
                <a-input
                  allow-clear
                  style="width: 200px"
                  v-model:value="state.userName"
                  placeholder="请输入用户名称"
                />
              </a-form-item>
              <a-form-item style="margin-bottom: 10px" name="loginCode" label="登录账号">
                <a-input
                  allow-clear
                  style="width: 200px"
                  v-model:value="state.loginCode"
                  placeholder="请输入登录账号"
                />
              </a-form-item>
              <a-form-item style="margin-bottom: 10px" name="phone" label="手机号码">
                <a-input
                  allow-clear
                  style="width: 200px"
                  v-model:value="state.phone"
                  placeholder="请输入手机号码"
                />
              </a-form-item>
              <a-form-item style="margin-bottom: 10px" name="status" label="用户状态">
                <a-select
                  allow-clear
                  style="width: 200px"
                  v-model:value="state.status"
                  placeholder="请选择用户状态"
                >
                  <a-select-option value="disable">停用</a-select-option>
                  <a-select-option value="normal">启用</a-select-option>
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
            <a-button style="margin-bottom: 10px" type="primary" @click="add">
              <PlusOutlined />
              新增
            </a-button>
            <a-table
              :columns="columns"
              :data-source="state.dataSource"
              :loading="state.loading"
              :row-key="(record) => record.id"
              :pagination="state.pagination"
              @change="handleTableChange"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'img'">
                  <a-avatar :size="50" :src="record.img" />
                </template>
                <template v-if="column.dataIndex === 'status'">
                  <a-tag
                    style="margin-right: 0"
                    :color="record.status === 'disable' ? 'red' : 'green'"
                    >{{ record.status === 'disable' ? '停用' : '启用' }}
                  </a-tag>
                </template>
                <template v-if="column.key === 'action'">
                  <a @click="() => edit(record.id)">编辑</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="确定删除该用户吗?" @confirm="() => confirm(record.id)">
                    <a class="red" href="#">删除</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <template v-if="record.status === 'disable'">
                    <a-popconfirm title="确定启用该用户吗?" @confirm="() => confirm(record.id)">
                      <a href="#">启用</a>
                    </a-popconfirm>
                  </template>
                  <template v-else>
                    <a-popconfirm title="确定停用该用户吗?" @confirm="() => confirm(record.id)">
                      <a class="red" href="#">停用</a>
                    </a-popconfirm>
                  </template>
                  <a-divider type="vertical" />
                  <a-popconfirm title="确定重置该用户的密码吗?" @confirm="() => confirm(record.id)">
                    <a href="#">重置密码</a>
                  </a-popconfirm>
                </template>
              </template>
            </a-table>
          </div>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, ref, toRaw, watch } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'
  export default {
    name: 'UserList',
    components: {
      PlusOutlined,
    },
    setup() {
      const router = useRouter()
      const columns = [
        {
          title: '用户头像',
          dataIndex: 'img',
          align: 'center',
        },
        {
          title: '用户名称',
          dataIndex: 'userName',
          align: 'center',
        },
        {
          title: '登录账号',
          dataIndex: 'loginCode',
          width: 150,
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          align: 'center',
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
        },
      ]
      let dataList = []
      let pageSize = 10
      const expandedKeys = ref([])
      const selectedKeys = ref([])
      const searchValue = ref('')
      const autoExpandParent = ref(true)
      const treeData = ref([])
      const searchForm = ref()
      const state = reactive({
        loading: false,
        dataSource: [],
        title: '',
        pagination: {
          current: 1,
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条 `,
        },
      })
      onMounted(() => {
        getTreeData()
        fetch()
      })
      async function fetch() {
        let queryConditions = {}
        let values = {}
        let page = state.pagination.current - 1
        let size = !state.pagination.pageSize ? 10 : state.pagination.pageSize
        queryConditions = await searchForm.value.validateFields()
        if (selectedKeys.value.length > 0) {
          queryConditions.suoshubumen = toRaw(selectedKeys.value)
        }
        values = queryValues(queryConditions)
        const params = { page, size, ...values }
        console.log(params)
        state.loading = true
        setTimeout(() => {
          state.loading = false
          state.dataSource = [
            {
              id: 1,
              img: 'https://ruoweiedu.com:19997/resource/image/20220519094959119.jpg',
              userName: '超级管理员',
              status: 'normal',
              loginCode: 'admin',
              phone: '15963589589',
              department: '人事部门',
            },
            {
              id: 2,
              userName: '超级管理员',
              status: 'normal',
              loginCode: 'admin',
              phone: '15963589589',
              department: '人事部门',
            },
            {
              id: 3,
              userName: '超级管理员',
              status: 'disable',
              loginCode: 'admin',
              phone: '15963589589',
              department: '人事部门',
            },
          ]
        }, 500)
      }
      function getTreeData() {
        treeData.value = [
          {
            title: '测试部门',
            key: '测试部门',
            children: [
              {
                title: '测试一部',
                key: '测试一部',
              },
              {
                title: '测试二部',
                key: '测试二部',
              },
              {
                title: '测试三部',
                key: '测试三部',
              },
            ],
          },
          {
            title: '技术部门',
            key: '技术部门',
          },
          {
            title: '人事部门',
            key: '人事部门',
          },
        ]
      }

      function queryValues(data) {
        return Object.keys(data)
          .filter((key) => data[key] !== null && data[key] !== undefined)
          .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
      }

      function reset() {
        selectedKeys.value = []
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

      const onExpand = (keys) => {
        expandedKeys.value = keys
        autoExpandParent.value = false
      }

      function getParentKey(key, tree) {
        let parentKey
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i]
          if (node.children) {
            if (node.children.some((item) => item.key === key)) {
              parentKey = node.key
            } else if (getParentKey(key, node.children)) {
              parentKey = getParentKey(key, node.children)
            }
          }
        }
        return parentKey
      }

      function generateList(data) {
        for (let i = 0; i < data.length; i++) {
          const node = data[i]
          const key = node.key
          dataList.push({
            key,
            title: key,
          })
          if (node.children) {
            generateList(node.children)
          }
        }
      }

      watch(searchValue, (value) => {
        generateList(treeData.value)
        expandedKeys.value = dataList
          .map((item) => {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, treeData.value)
            }
            return null
          })
          .filter((item, i, self) => item && self.indexOf(item) === i)
        searchValue.value = value
        autoExpandParent.value = true
      })

      watch(selectedKeys, (value) => {
        if (value.length > 0) {
          search()
        }
      })

      const confirm = (e) => {
        console.log(e)
        success('操作成功')
        search()
      }

      function add() {
        router.push({ name: '/admin/system/permssion/userList/userAdd' })
      }

      function edit(id) {
        router.push({ name: '/admin/system/permssion/userList/userEdit/:id', params: { id } })
      }

      return {
        columns,
        expandedKeys,
        selectedKeys,
        searchValue,
        autoExpandParent,
        treeData,
        onExpand,
        searchForm,
        state,
        reset,
        search,
        handleTableChange,
        confirm,
        add,
        edit,
      }
    },
  }
</script>

<style scoped lang="less">
  .content_right {
    width: 80%;
    padding-left: 15px;
  }
</style>
