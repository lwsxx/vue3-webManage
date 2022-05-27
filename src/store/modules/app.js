import { login as loginApi } from '../../api/login/login'
import router from '../../router'
export default {
  namespace: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            commit('setToken', res.data.token)
            router.replace('/admin')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
