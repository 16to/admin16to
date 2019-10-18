export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            name: 'home',
            icon: 'home',
            component: './Home',
          },
          // 表格功能
          {
            path: '/table',
            name: 'table',
            icon: 'smile',
            component: '../layouts/ContentLayout',
            routes: [
              {
                path: '/table',
                hideInMenu: true,
                component: './table/index',
              },
              {
                path: '/table/add',
                name:"add",
                hideInMenu: true,
                component: './table/add',
              },
              {
                path: '/table/update/:id',
                name:"update",
                hideInMenu: true,
                component: './table/update',
              },
              {
                component: './404',
              },
            ]
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]