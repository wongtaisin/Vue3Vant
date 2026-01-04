/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-08 09:33:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-08 15:56:09
 * @FilePath: \vue3Vant\src\main.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
// 导入必要的依赖
import Vant from 'vant'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 导入样式文件
import '@/assets/css/style.scss'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import 'vant/lib/index.css' // 全局引入 Vant 样式

// 导入工具函数
import install from './utils'

const app = createApp(App)

// 创建Vue应用实例并配置
const plugins = [pinia, router, install, Vant]

plugins.forEach(plugin => {
  app.use(plugin)
})

app.mount('#app')
