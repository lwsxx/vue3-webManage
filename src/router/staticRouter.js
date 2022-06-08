import Layout from '../layout/index.vue'
export default [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    children: [
      {
        path: 'index',
        name: '/admin/index',
        component: () => import('../views/首页/index.vue'),
        meta: {
          title: '首页',
          icon: 'DashboardOutlined',
        },
      },
      {
        path: 'editPassword',
        name: '/admin/editPassword',
        hidden: true,
        component: () => import('../views/账号管理/EditPassword.vue'),
        meta: {
          title: '账号管理',
        },
      },
    ],
  },
  {
    path: '/admin/system',
    name: '/admin/system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
    },
    children: [
      {
        path: 'permssion',
        name: '/admin/system/permssion',
        component: () => import('../views/系统管理/权限管理/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'VerifiedOutlined',
        },
        children: [
          {
            path: 'userList',
            name: '/admin/system/permssion/userList',
            component: () => import('../views/系统管理/权限管理/用户管理/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'UserOutlined',
            },
          },
          {
            path: 'userList/userAdd',
            name: '/admin/system/permssion/userList/userAdd',
            hidden: true,
            component: () => import('../views/系统管理/权限管理/用户管理/userAction.vue'),
            meta: {
              title: '新增用户',
              currentActiveMenu: '/admin/system/permssion/userList',
            },
          },
          {
            path: 'userList/userEdit/:id',
            name: '/admin/system/permssion/userList/userEdit',
            hidden: true,
            component: () => import('../views/系统管理/权限管理/用户管理/userAction.vue'),
            meta: {
              title: '编辑用户',
              currentActiveMenu: '/admin/system/permssion/userList',
            },
          },
          {
            path: 'menuList',
            name: '/admin/system/permssion/menuList',
            component: () => import('../views/系统管理/权限管理/菜单管理/index.vue'),
            meta: {
              title: '菜单管理',
              icon: 'MenuOutlined',
            },
          },
          {
            path: 'roleList',
            name: '/admin/system/permssion/roleList',
            component: () => import('../views/系统管理/权限管理/角色管理/index.vue'),
            meta: {
              title: '角色管理',
              icon: 'UserSwitchOutlined',
            },
          },
          {
            path: 'roleList/roleAdd',
            name: '/admin/system/permssion/roleList/roleAdd',
            hidden: true,
            component: () => import('../views/系统管理/权限管理/角色管理/roleAction.vue'),
            meta: {
              title: '新增角色',
              currentActiveMenu: '/admin/system/permssion/roleList',
            },
          },
          {
            path: 'roleList/roleEdit/:id',
            name: '/admin/system/permssion/roleList/roleEdit',
            hidden: true,
            component: () => import('../views/系统管理/权限管理/角色管理/roleAction.vue'),
            meta: {
              title: '编辑角色',
              currentActiveMenu: '/admin/system/permssion/roleList',
            },
          },
          {
            path: 'departmentList',
            name: '/admin/system/permssion/departmentList',
            component: () => import('../views/系统管理/权限管理/部门管理/index.vue'),
            meta: {
              title: '部门管理',
              icon: 'GoldOutlined',
            },
          },
        ],
      },
      {
        path: 'monitor',
        name: '/admin/system/monitor',
        component: () => import('../views/系统管理/系统监控/index.vue'),
        meta: {
          title: '系统监控',
          icon: 'FundViewOutlined',
        },
        children: [
          {
            path: 'online',
            name: '/admin/system/monitor/online',
            component: () => import('../views/系统管理/系统监控/在线用户/index.vue'),
            meta: {
              title: '在线用户',
              icon: 'FundOutlined',
            },
          },
          {
            path: 'login-log',
            name: '/admin/system/monitor/login-log',
            component: () => import('../views/系统管理/系统监控/登录日志/index.vue'),
            meta: {
              title: '登录日志',
              icon: 'ContactsOutlined',
            },
          },
          {
            path: 'serve',
            name: '/admin/system/monitor/serve',
            component: () => import('../views/系统管理/系统监控/服务监控/index.vue'),
            meta: {
              title: '服务监控',
              icon: 'DesktopOutlined',
            },
          },
          {
            path: 'req-log',
            name: '/admin/system/monitor/req-log',
            component: () => import('../views/系统管理/系统监控/请求日志/index.vue'),
            meta: {
              title: '请求日志',
              icon: 'ConsoleSqlOutlined',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/admin/charts',
    name: '/admin/charts',
    component: Layout,
    meta: {
      title: '图表',
      icon: 'BankOutlined',
    },
    children: [
      // {
      //   path: 'baiduMap',
      //   name: 'baiduMap',
      //   component: () => import('../views/图表/百度地图/index.vue'),
      //   meta: {
      //     title: '百度地图',
      //   },
      // },
      {
        path: 'gaodeMap',
        name: '/admin/charts/gaodeMap',
        component: () => import('../views/图表/高德地图/index.vue'),
        meta: {
          title: '高德地图',
        },
      },
      {
        path: 'echarts',
        name: '/admin/charts/echarts',
        component: () => import('../views/图表/Echarts/index.vue'),
        meta: {
          title: 'Echarts',
        },
        children: [
          {
            path: 'map',
            name: '/admin/charts/echarts/map',
            component: () => import('../views/图表/Echarts/Map.vue'),
            meta: {
              title: '地图',
            },
          },
          {
            path: 'lineChart',
            name: '/admin/charts/echarts/lineChart',
            component: () => import('../views/图表/Echarts/LineChart.vue'),
            meta: {
              title: '折线图',
            },
          },
          {
            path: 'barChart',
            name: '/admin/charts/echarts/barChart',
            component: () => import('../views/图表/Echarts/BarChart.vue'),
            meta: {
              title: '柱状图',
            },
          },
          {
            path: 'pieChart',
            name: '/admin/charts/echarts/pieChart',
            component: () => import('../views/图表/Echarts/PieChart.vue'),
            meta: {
              title: '饼图',
            },
          },
        ],
      },
    ],
  },
  {
    // https://next.router.vuejs.org/guide/migration/index.html#removed-star-or-catch-all-routes
    path: '/:path(.*)*',
    name: 'NotFound',
    hidden: true,
    component: () => import('../views/error/404.vue'),
  },
]
