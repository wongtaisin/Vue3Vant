/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-21 09:59:35
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 11:39:48
 * @FilePath: \vue3Vant\src\utils\index.ts
 * @Description: 工具函数和指令注册
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import CommonFileUpload from '@/components/common/fileUpload.vue'
import CommonPagination from '@/components/common/pagination.vue'
import { Dialog, Toast } from 'vant'
import type { App, Component } from 'vue'
import directives from './directives'
import utils from './utils'

// 定义指令对象类型接口
interface DirectiveMap {
  [key: string]: any
}

// 全局组件注册配置
const components: Array<{ name: string; component: Component }> = [
  { name: 'CommonPagination', component: CommonPagination },
  { name: 'CommonFileUpload', component: CommonFileUpload }
]

/**
 * 注册全局工具函数和指令
 * @desc 将工具函数和自定义指令注册到Vue应用实例中
 * @param {App} app - Vue应用实例
 */
const install = (app: App): void => {
  // 注册工具函数
  app.config.globalProperties.$utils = utils

  // 注册指令
  Object.entries(directives as DirectiveMap).forEach(([name, directive]) => {
    app.directive(name, directive)
  })

  // 注册组件
  components.forEach(({ name, component }) => {
    app.component(name, component)
  })
}

// 声明类型,扩展Vue全局属性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $utils: typeof utils // 声明$utils工具函数的类型
  }
}

export const showMessage = (message: string) => {
  Toast(message)
}

export const confirmDialog = async () => {
  try {
    await Dialog.confirm({
      title: '标题',
      message: '确认执行此操作吗？',
      showCancelButton: true
    })
    // 用户点击确认
    return true
  } catch {
    // 用户点击取消
    return false
  }
}

// 导出install函数供main.ts使用
export default install
