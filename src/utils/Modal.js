import { Modal } from 'ant-design-vue'
export const ErrorModal = (info) => {
  Modal.error({
    title: info,
  })
}
