/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-22 15:44:36
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 15:53:24
 * @FilePath: \vue3Vant\src\pinia\modules\order.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import $axios from '@/api/index'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const orderListInit = defineStore('orderListInit', {
  // 状态库
  state: () => ({
    data: ref({}) // 使用ref初始化数据
  }),
  actions: {
    async getOrderList() {
      const data = await $axios({
        method: 'get',
        url: '/data/order.json'
      })
      return data.data
    },
    setOrderList(data: any) {
      this.data = data
    }
  },
  // 开启数据缓存
  persist: {
    key: 'orderListInit', // 存储名字
    storage: sessionStorage, // 存储方式 sessionStorage, localStorage
    pick: ['data'] // 指定state 那些参数需要持久化, [] 表示 undefind 或者 null
  }
})

// 预估价格存储
export const orderEstimate = defineStore('orderEstimate', {
  state: () => ({
    data: ref({
      engineeringFee: '',
      processFee: '',
      otherFee: '',
      sum1: '',
      taxationFee: '',
      estimatedAmount: '',
      ihtFee: '',
      freightFee: '',
      smtFee: ''
    })
  }),
  actions: {
    setOrderEstimate(data: any) {
      this.data = data
    }
  },
  getters: {}
  // persist: {
  // 	key: 'orderEstimate',
  // 	storage: sessionStorage,
  // 	pick: ['data']
  // }
})
