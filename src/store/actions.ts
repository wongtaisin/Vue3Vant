/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-18 15:12:36
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-09 16:32:01
 * @FilePath: \vue3Vant\src\pinia\actions.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import $axios from '@/api/index'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 获取用户信息
export const getInfo = defineStore('getInfo', {
  // 状态库
  state: () => ({
    data: ref({}) // 使用ref初始化数据
  }),
  actions: {
    async getUserInfo() {
      const data = await $axios({
        method: 'get',
        url: '/admin/getInfo'
      })
      return data
    },
    setUserInfo(data: any) {
      this.data = data.user
    }
  },
  getters: {},
  // 开启数据缓存
  persist: {
    key: 'userInfo', // 存储名字
    storage: sessionStorage, // 存储方式 sessionStorage, localStorage
    pick: ['data'] // 指定state 那些参数需要持久化, [] 表示 undefind 或者 null
  }
})
