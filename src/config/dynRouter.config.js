import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
import { process, caseStudy } from '@/core/icons'
export const dynRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '首页',
    static: true
  },
  redirect: '/auto/completeList',
  children: [{
    path: '/auto',
    name: 'auto',
    redirect: '/auto/completeList',
    component: PageView,
    meta: {
      title: '自动生成',
      'icon': 'code',
      keepAlive: true
    },
    children: [{
      path: '/auto/completeList',
      name: 'frame',
      component: () => import('@/views/auto/AutoList'),
      meta: {
        title: '代码生成',
        keepAlive: true
      }
    }]
  }, {
    path: '/sys',
    redirect: '/sys/user',
    component: PageView,
    meta: {
      title: '系统',
      'icon': 'setting'
    },
    children: [{
      path: '/sys/user',
      name: 'user',
      component: () => import('@/views/sys/user/UserList'),
      meta: {
        title: '用户管理',
        keepAlive: true
      }
    }, {
      path: '/sys/personal',
      name: 'personal',
      hidden: true,
      component: () => import('@/views/user/UserInfo'),
      meta: {
        title: '个人资料',
        keepAlive: true,
        hidden: true,
        static: true
      }
    }, {
      path: '/sys/role',
      name: 'role',
      component: () => import('@/views/sys/role/RoleList'),
      meta: {
        title: '角色管理',
        keepAlive: true
      }
    }, {
      path: '/sys/menu',
      name: 'menu',
      component: () => import('@/views/sys/menu/MenuList'),
      meta: {
        title: '菜单管理',
        keepAlive: true
      }
    }, {
      path: '/sys/api',
      name: 'api',
      component: () => import('@/views/sys/api/ApiList'),
      meta: {
        title: '接口管理',
        keepAlive: true
      }
    }, {
      path: '/sys/organization',
      name: 'organization',
      component: () => import('@/views/sys/organization/OrganizationList'),
      meta: {
        title: '组织机构',
        keepAlive: true
      }
    }, {
      path: '/sys/area',
      name: 'area',
      component: () => import('@/views/sys/area/AreaList'),
      meta: {
        title: '区域管理',
        keepAlive: true
      }
    }, {
      path: '/sys/dict',
      name: 'dict',
      component: () => import('@/views/sys/dict/DictList'),
      meta: {
        title: '数据字典',
        keepAlive: true
      }
    }, {
      path: '/sys/log',
      name: 'log',
      component: () => import('@/views/sys/log/LogList'),
      meta: {
        title: '操作日志',
        keepAlive: true
      }
    }]
  }, {
    path: '/example',
    component: PageView,
    meta: {
      title: '示例',
      icon: caseStudy,
      static: true
    },
    children: [{
      path: '/example/bigFile',
      name: 'bigFile',
      component: () => import('@/views/example/BigFile'),
      meta: {
        title: '大文件上传',
        keepAlive: true,
        static: true
      }
    }]
  }, {
    path: '/process',
    component: PageView,
    meta: {
      title: '流程管理',
      icon: process,
      static: true
    },
    children: [
      {
        path: '/process/definition',
        name: 'definition',
        component: () => import('@/views/process/definition/Definition'),
        meta: {
          title: '流程定义',
          keepAlive: true,
          static: true
        }
      },
      {
        path: '/process/instance',
        name: 'instance',
        component: () => import('@/views/process/instance/Instance'),
        meta: {
          title: '流程实例',
          keepAlive: true,
          static: true
        }
      },
      {
        path: '/process/task',
        name: 'task',
        component: () => import('@/views/process/task/Task'),
        meta: {
          title: '流程任务',
          keepAlive: true,
          static: true
        }
      },
      {
        path: '/process/model',
        name: 'model',
        component: () => import('@/views/process/model/Model'),
        meta: {
          title: '流程模型',
          keepAlive: true,
          static: true
        }
      },
      {
        path: '/process/form',
        name: 'form',
        component: () => import('@/views/process/form/Form'),
        meta: {
          title: '表单设计',
          keepAlive: true,
          static: true
        }
      },
      {
        path: '/process/app',
        name: 'app',
        component: () => import('@/views/process/app/App'),
        meta: {
          title: 'App模块',
          keepAlive: true,
          static: true
        }
      }
    ]
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true,
  meta: {
    static: true
  }
}]
