import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }

  // {
  //   path: '/record',
  //   component: Layout,
  //   redirect: '/record/classRecord',
  //   name: 'Record',
  //   meta: { title: '考勤管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'classRecord',
  //       name: 'classRecord',
  //       component: () => import('@/views/record/classRecord/index'),
  //       meta: { title: '课程考勤管理', icon: 'table' }
  //     },
  //     {
  //       path: 'studentRecord',
  //       name: 'studentRecord',
  //       component: () => import('@/views/record/studentRecord/index'),
  //       meta: { title: '学生考勤管理', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/student',
  //   component: Layout,
  //   redirect: '/studentManage',
  //   name: 'Student',
  //   children: [
  //     {
  //       path: '/studentManage',
  //       name: 'studentManage',
  //       component: () => import('@/views/student/index'),
  //       meta: { title: '学生管理', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/teacher',
  //   component: Layout,
  //   redirect: '/teacherManage',
  //   name: 'Teacher',
  //   children: [
  //     {
  //       path: '/teacherManage',
  //       name: 'teacherManage',
  //       component: () => import('@/views/teacher/index'),
  //       meta: { title: '教师管理', icon: 'el-icon-user-solid' }
  //     }
  //   ]
  // },
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes1 = [
  {
    path: '/record',
    component: Layout,
    redirect: '/record/classRecord',
    name: 'Record',
    meta: { title: '考勤管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'classRecord',
        name: 'classRecord',
        component: () => import('@/views/record/classRecord/index'),
        meta: { title: '课程考勤管理', icon: 'table' }
      },
      {
        path: 'studentRecord',
        name: 'studentRecord',
        component: () => import('@/views/record/studentRecord/index'),
        meta: { title: '学生考勤管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/studentManage',
    name: 'Student',
    children: [
      {
        path: '/studentManage',
        name: 'studentManage',
        component: () => import('@/views/student/index'),
        meta: { title: '学生管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacherManage',
    name: 'Teacher',
    children: [
      {
        path: '/teacherManage',
        name: 'teacherManage',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师管理', icon: 'el-icon-user-solid' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes2 = [
  {
    path: '/queryRecord',
    component: Layout,
    redirect: '/recordManage',
    children: [{
      path: 'recordManage',
      name: 'recordManage',
      component: () => import('@/views/recordManage/index'),
      meta: { title: '考勤记录', icon: 'table' }
    }]
  }
  // {
  //   path: '/record',
  //   component: Layout,
  //   redirect: '/record/classRecord',
  //   name: 'Record',
  //   meta: { title: '考勤管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'classRecord',
  //       name: 'classRecord',
  //       component: () => import('@/views/record/classRecord/index'),
  //       meta: { title: '课程考勤管理', icon: 'table' }
  //     },
  //     {
  //       path: 'studentRecord',
  //       name: 'studentRecord',
  //       component: () => import('@/views/record/studentRecord/index'),
  //       meta: { title: '学生考勤管理', icon: 'tree' }
  //     }
  //   ]
  // }
  // { path: '*', redirect: '/404', hidden: true }
]

// var name = store.getters.name
// var asyncRoutes = null
// if (name === 'admin') {
//   asyncRoutes = asyncRoutes1
// } else {
//   asyncRoutes = asyncRoutes2
// }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
