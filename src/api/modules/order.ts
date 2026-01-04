/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-20 08:31:59
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-19 09:34:26
 * @FilePath: \vue3Vant\src\axios\modules\order.ts
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import _utils from '@/utils/utils'
import $axios from '../index'

// 预估价格
export const estimatedPrice = async (params: any) => {
  let data = await $axios({
    url: `/api/fmsmart/customer/estimatedPrice`,
    method: 'post',
    data: params
  })
  return data.data
}

// 客户地址设置默认
export const setLocation = async (params: any) => {
  let data = await $axios({
    url: `/api/fmsmart/contact/setFirstAdrress?` + _utils.urlJsonList(params),
    method: 'post'
  })
  return data.data
}
