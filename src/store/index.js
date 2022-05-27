import { createStore } from 'vuex'
import app from './modules/app'

const store = createStore({
  modules: {
    applogin: app,
  },
})

export default store
