import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import VitePluginWindicss from 'vite-plugin-windicss'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import dayjs from 'dayjs'
import pkg from './package.json'
import DefineOptions from 'unplugin-vue-define-options/vite'

const CWD = process.cwd()
const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default defineConfig({
  // 需要用到的插件数组
  plugins: [
    // 自动引入插件集成HMR,支持jsx写法
    vue(),
    vueJsx(),
    VitePluginWindicss(),
    DefineOptions(),
    // 兼容不支持esm的浏览器
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // 使用svg
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(CWD, 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'svg-icon-[dir]-[name]',
    }),
    // antdVue组件样式按需加载
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        },
      ],
    }),
  ],
  base: '/', // 用于开发环境的公共基础路径
  // 全局常量定义
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  // 别名配置，在项目中可以使用@表示src文件夹
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // 指定传递给 CSS 预处理器的选项
  css: {
    preprocessorOptions: {
      // 指定全局less文件配置
      less: {
        javascriptEnabled: true,
        // 配置 less 变量
        modifyVars: {},
        additionalData: `
            @import "ant-design-vue/lib/style/themes/default.less";
            @import "@/styles/global.less";
          `,
      },
    },
  },
  // 开发服务器选项配置
  server: {
    open: true, // 项目启动后自动打开浏览器
    // port: 8088,
    // proxy: {
    //   '/api': {
    //     target: '',
    //     // target: 'http://localhost:7001',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   '/ws-api': {
    //     target: '',
    //     // target: 'http://localhost:7002',
    //     changeOrigin: true, // 是否允许跨域
    //     ws: true
    //   }
    // }
  },
  // 构建选项配置
  build: {
    // target: 'es2015',
    // cssTarget: 'chrome79',
    // brotliSize: false,
    chunkSizeWarningLimit: 2000, // 打包体积大小警告限制
    // rollupOptions: {
    //   experimentalTopLevelAwait: true,
    // },
  },
})
