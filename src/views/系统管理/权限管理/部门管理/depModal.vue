<template>
  <a-modal :visible="visible" :title="title" @cancel="cancle">
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
      <a-form-item
        label="上级部门"
        name="depName"
        :rules="[{ required: true, message: '请输入部门名称!' }]"
      >
        <a-input allow-clear v-model:value="formState.depName" />
      </a-form-item>
      <a-form-item
        label="排序"
        name="number"
        :rules="[{ required: true, message: '请输入部门名称!' }]"
      >
        <a-input allow-clear v-model:value="formState.number" />
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
          v-model:value="formState.number"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, toRefs, reactive, ref } from 'vue'
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
        formState: {},
      })
      let { formState } = toRefs(state)
      function cancle() {
        emit('cancleModal', false)
      }

      function getData(id) {
        state.formState = { ...id }
      }
      return {
        formRef,
        cancle,
        getData,
        formState,
      }
    },
  })
</script>

<style scoped></style>
