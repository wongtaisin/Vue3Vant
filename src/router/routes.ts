/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-08 14:40:46
 * @FilePath: \vue3Vant\src\router\routes.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/',
    name: 'Home',
    redirect: 'list',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/list',
        name: 'list',
        redirect: '/list/order',
        component: () => import('@/views/list/index.vue'),
        meta: {
          title: '订单列表',
          activeMenu: '/list/order'
        },
        children: [
          {
            path: '/list/order',
            component: () => import('@/views/list/order.vue'),
            name: '订单',
            meta: {
              path: '/list/order',
              name: '订单',
              type: 'list-order'
            }
          }
        ]
      }
    ]
  }
]

export default routes
