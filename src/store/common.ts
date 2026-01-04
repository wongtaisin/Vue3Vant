/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-21 09:59:35
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-09 16:32:25
 * @FilePath: \vue3Vant\src\pinia\common.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import $axios from '@/api/index'
import { defineStore } from 'pinia'
import { showToast } from 'vant'
import { computed, ref } from 'vue'

// 错误提示
let errorMessage = (res: any) => {
  showToast({
    type: 'error',
    message: res.msg || `请求错误`
  })
}

const customerInit = defineStore('counter', () => {
  // (1).ref() 就是 state 属性
  // (2).computed() 就是 getters
  // (3).function() 就是 actions
  // 1. 下面是state
  const data = ref({})
  let myNum = ref(100)
  //2. 下面是getters
  let doubleNum = computed(() => myNum.value * 2)
  // 3. 下面是action
  const increase = () => {
    myNum.value++
  }
  const getUserInfo = async () => {
    await $axios({
      method: 'get',
      url: '/api/fmsmart/customer/init'
    }).then((res: any) => {
      if (res.code == 200) {
        // 确保数值类型正确
        data.value = typeof res.data === 'string' ? Number(res.data) : res.data
      } else errorMessage(res)
    })
  }
  return {
    data,
    myNum,
    doubleNum,
    increase,
    getUserInfo
  }
})

export default customerInit
