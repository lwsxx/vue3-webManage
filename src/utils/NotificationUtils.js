import { notification } from 'ant-design-vue'
export const success = (info) => {
  notification.success({
    message: info,
  })
}

export const warn = (info) => {
  notification.warning({
    message: info,
  })
}
export const error = (info) => {
  notification.error({
    message: info,
  })
}
