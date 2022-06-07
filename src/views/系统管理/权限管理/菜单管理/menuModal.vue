<template>
  <a-modal
    destroy-on-close
    :visible="visible"
    :title="title"
    @cancel="cancle"
    @ok="handleOk"
    :confirm-loading="loading"
  >
    <a-form
      ref="formRef"
      :model="formState"
      name="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        label="菜单名称"
        name="menuName"
        :rules="[{ required: true, message: '请输入菜单名称!' }]"
      >
        <a-input allow-clear v-model:value="formState.menuName" />
      </a-form-item>
      <a-form-item label="上级菜单" name="shangji">
        <a-tree-select
          v-model:value="formState.shangji"
          show-search
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          allow-clear
          tree-default-expand-all
          :tree-data="treeData"
        />
      </a-form-item>
      <a-form-item
        label="排序"
        name="number"
        :rules="[{ required: true, message: '请输入菜单排序!' }]"
      >
        <a-input-number
          style="width: 100%"
          :precision="0"
          :min="1"
          allow-clear
          v-model:value="formState.number"
        />
      </a-form-item>
      <a-form-item
        label="路由"
        name="router"
        :rules="[{ required: true, message: '请输入菜单路由!' }]"
      >
        <a-input allow-clear v-model:value="formState.router" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, toRefs, reactive, ref } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  export default defineComponent({
    name: 'MenuModal',
    props: {
      title: String,
      visible: Boolean,
    },
    emits: ['cancleModal'],
    setup(props, { emit }) {
      const formRef = ref()
      let state = reactive({
        loading: false,
        formState: {},
      })
      const treeData = ref([
        {
          title: '系统管理',
          value: '系统管理',
          children: [
            {
              title: '权限管理',
              value: '权限管理',
              children: [
                {
                  title: '用户管理',
                  value: '用户管理',
                },
                {
                  title: '菜单管理',
                  value: '菜单管理',
                },
                {
                  title: '角色管理',
                  value: '角色管理',
                },
                {
                  title: '部门管理',
                  value: '部门管理',
                },
              ],
            },
            {
              title: '系统监控',
              value: '系统监控',
            },
          ],
        },
        {
          title: '首页',
          value: '首页',
        },
        {
          title: '图表',
          value: '图表',
        },
      ])
      let { formState, loading } = toRefs(state)
      //编辑时获取菜单信息
      function getData(id) {
        console.log(id)
        state.formState = { ...id }
      }
      //关闭modal
      function cancle() {
        state.formState = {}
        emit('cancleModal', false)
      }
      //确认
      function handleOk() {
        const {
          value: { validateFields },
        } = formRef
        validateFields()
          .then((values) => {
            state.loading = true
            console.log(values)
            success('编辑成功')
            state.loading = false
            cancle()
          })
          .catch((err) => {
            console.log(err)
          })
      }
      return {
        formRef,
        cancle,
        getData,
        formState,
        loading,
        handleOk,
        treeData,
      }
    },
  })
</script>

<style scoped></style>
