import * as antIcons from '@ant-design/icons-vue'

export function setupAntdIcon(app) {
  // 注册组件
  Object.keys(antIcons).forEach((key) => {
    app.component(key, antIcons[key])
  })

  // 使用组件
  // <component :is="menu.icon" />
  // <component is="PieChartOutlined" />
}
