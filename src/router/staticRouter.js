import Layout from '../layout/index.vue'
export default [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    children: [
      {
        path: 'index',
        name: 'admin-index',
        component: () => import('../views/admin/index.vue'),
        meta: {
          title: '首页',
          icon: 'MenuOutlined',
        },
      },
    ],
  },
  // {
  //   path: '/form',
  //   name: 'Form',
  //   component: Layout,
  //   meta: {
  //     title: '表单',
  //     icon: 'ContainerOutlined',
  //     roles: ['admin'],
  //   },
  //   children: [
  //     {
  //       path: 'classic',
  //       name: 'Classic',
  //       component: () => import('../views/form/classic.vue'),
  //       meta: {
  //         title: '经典表单',
  //         icon: 'ContainerOutlined',
  //       },
  //     },
  //   ],
  // },
  {
    // https://next.router.vuejs.org/guide/migration/index.html#removed-star-or-catch-all-routes
    path: '/:path(.*)*',
    name: 'NotFound',
    hidden: true,
    component: () => import('../views/error/404.vue'),
  },
]
