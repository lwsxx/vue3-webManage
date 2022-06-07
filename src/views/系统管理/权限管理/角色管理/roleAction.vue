<template>
  <div>
    <a-card title="角色信息">
      <a-form ref="formRef" :model="formState" name="formRef">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              label="角色名称"
              name="roleName"
              :rules="[{ required: true, message: '请输入角色名称!' }]"
            >
              <a-input allow-clear v-model:value="formState.roleName" />
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="2">
            <a-form-item
              label="角色值"
              name="roleValue"
              :rules="[{ required: true, message: '请输入角色值!' }]"
            >
              <a-input allow-clear v-model:value="formState.roleValue" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="&nbsp;&nbsp;&nbsp;备&emsp;&emsp;注" name="beizhu">
              <a-textarea
                :auto-size="{ minRows: 3, maxRows: 5 }"
                allow-clear
                v-model:value="formState.beizhu"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card title="授权菜单信息">
      <a-row>
        <a-col :span="10" :offset="1">
          <a-checkbox v-model:checked="checkAll" @change="selectAll">全选</a-checkbox>
          <a-button type="link" @click="() => expand(true)">展开</a-button>
          /
          <a-button type="link" @click="() => expand(false)">折叠</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10" :offset="1">
          <a-tree
            :selectable="false"
            style="margin-top: 10px"
            v-model:expandedKeys="expandedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            :tree-data="treeData"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10" :offset="1">
          <a-button style="margin-top: 50px" type="primary" @click="submit">保存</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, ref, toRefs, watch, toRaw } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { warn } from '../../../../utils/NotificationUtils'

  export default defineComponent({
    name: 'RoleAction',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const formRef = ref()
      let state = reactive({
        loading: false,
        checkAll: false,
        formState: {},
      })
      const expandedKeys = ref([])
      const checkedKeys = ref([])
      const treeData = ref([])
      const allMenuIds = ref([])
      let { formState, loading, checkAll } = toRefs(state)
      onMounted(() => {
        console.log(route.params.id)
        const data = {
          roleName: '管理员',
          roleValue: 'admin',
        }
        fetch()
        if (route.params.id) {
          state.formState = { ...data }
          checkedKeys.value = [101, 1011]
        }
      })
      //获取所有菜单
      function fetch() {
        treeData.value = [
          {
            key: 1,
            title: '系统管理',
            children: [
              {
                key: 101,
                title: '权限管理',
                children: [
                  {
                    key: 1011,
                    title: '用户管理',
                  },
                  {
                    key: 1012,
                    title: '菜单管理',
                  },
                  {
                    key: 1013,
                    title: '角色管理',
                  },
                  {
                    key: 1014,
                    title: '部门管理',
                  },
                ],
              },
              {
                key: 102,
                title: '系统监控',
                children: [
                  {
                    key: 1021,
                    title: '在线用户',
                  },
                  {
                    key: 1022,
                    title: '登录日志',
                  },
                  {
                    key: 1023,
                    title: '服务监控',
                  },
                  {
                    key: 1024,
                    title: '请求日志',
                  },
                ],
              },
            ],
          },
          {
            key: 2,
            title: '首页',
          },
          {
            key: 3,
            title: '图表',
          },
        ]
        const getAllIds = (arr) => {
          arr.forEach((item) => {
            allMenuIds.value.push(item.key)
            if (item.children) getAllIds(item.children)
          })
        }
        getAllIds(treeData.value)
      }
      function selectAll(e) {
        checkedKeys.value = e.target.checked ? allMenuIds.value : []
      }
      function expand(expand) {
        expandedKeys.value = expand ? allMenuIds.value : []
      }
      async function submit() {
        let roleValues = await formRef.value.validateFields()
        state.loading = true
        if (checkedKeys.value.length === 0) {
          return warn('请选择授权菜单')
        }
        console.log(roleValues, toRaw(checkedKeys.value))
        state.loading = false
        router.back()
      }
      watch(expandedKeys, () => {
        console.log('expandedKeys', expandedKeys.value)
      })
      // watch(
      //   checkedKeys,
      //   () => {
      //     console.log('checkedKeys', checkedKeys.value)
      //   },
      //   {
      //     immediate: true,
      //   },
      // )
      return {
        formRef,
        formState,
        loading,
        checkAll,
        submit,
        expandedKeys,
        checkedKeys,
        treeData,
        selectAll,
        expand,
      }
    },
  })
</script>

<style scoped></style>
