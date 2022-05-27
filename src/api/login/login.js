import request from '../../utils/request'

export const login = (data) => {
  return request({
    url: 'authenticate',
    method: 'POST',
    data,
  })
}
