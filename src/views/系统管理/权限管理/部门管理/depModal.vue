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
        label="部门名称"
        name="depName"
        :rules="[{ required: true, message: '请输入部门名称!' }]"
      >
        <a-input allow-clear v-model:value="formState.depName" />
      </a-form-item>
      <a-form-item label="上级部门" name="shangji">
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
        :rules="[{ required: true, message: '请输入部门排序!' }]"
      >
        <a-input-number
          style="width: 100%"
          :precision="0"
          :min="1"
          allow-clear
          v-model:value="formState.number"
        />
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
          v-model:value="formState.beizhu"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, toRefs, reactive, ref } from 'vue'
  import { success } from '../../../../utils/NotificationUtils'
  export default defineComponent({
    name: 'DepModal',
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
          title: '测试部门',
          value: '测试部门',
          children: [
            {
              title: '测试一部',
              value: '测试一部',
            },
            {
              title: '测试二部',
              value: '测试二部',
            },
            {
              title: '测试三部',
              value: '测试三部',
            },
          ],
        },
        {
          title: '技术部门',
          value: '技术部门',
        },
        {
          title: '人事部门',
          value: '人事部门',
        },
      ])
      let { formState, loading } = toRefs(state)
      //编辑时获取部门信息
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
