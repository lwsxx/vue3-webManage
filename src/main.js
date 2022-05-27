import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { setupRouter } from './router'
import store from './store/index'
import App from './App.vue'
// import '../src/router/permission'

const app = createApp(App)
app.use(Antd)
app.use(store)

async function setupApp() {
  // 挂载路由
  await setupRouter(app)

  app.mount('#app')
}

setupApp()
