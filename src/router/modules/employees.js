import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    name: 'employees',
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: 'detail/:id?',
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }

  },
  {
    path: 'print/:id?',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: {
      title: '打印'
    }
  }]

}
