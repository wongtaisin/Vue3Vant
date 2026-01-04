/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-26 14:50:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 11:56:12
 * @FilePath: \vue3Vant\src\pinia\state.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
