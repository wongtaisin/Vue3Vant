/*
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-23 08:34:49
 * @LastEditors: wingddd wongtaisin1024@gmial.com
 * @LastEditTime: 2024-11-23 08:35:33
 * @FilePath: \vue3Vant\src\axios\login.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import $axios from '@/api/index'

// 登录方法
export const login = (params: any) => {
  return $axios({
    url: '/admin/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: params
  })
}

// 注册方法
export const register = (params: any) => {
  return $axios({
    url: '/admin/register',
    headers: { isToken: false },
    method: 'post',
    data: params
  })
}

// 获取用户详细信息
export const getInfo = () => {
  return $axios({
    url: '/admin/getInfo',
    method: 'get'
  })
}

// 退出方法
export const logout = () => {
  return $axios({
    url: '/admin/logout',
    method: 'post'
  })
}

// 获取验证码
export const getCodeImg = () => {
  return $axios({
    url: '/admin/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
