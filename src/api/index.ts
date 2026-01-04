/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-16 16:49:41
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 11:55:33
 * @FilePath: \vue3Vant\src\axios\index.ts
 * @Description: Axios 配置与拦截器
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { logout } from '@/api/login'
import { getToken, loginUserKey } from '@/utils/auth'
import cache from '@/utils/cache'
import errorCode from '@/utils/errorCode'
import { tansParams } from '@/utils/jysz'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { showConfirmDialog, showFailToast, showLoadingToast, showNotify } from 'vant'

// 是否显示重新登录弹窗标志
export const isRelogin = {
  show: false
}

// 基础配置
const axiosConfig = {
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
}

Object.assign(axios.defaults, axiosConfig)

// 防重复提交配置
const repeatSubmitConfig = {
  interval: 1000, // 间隔时间(ms)
  maxSize: 5 * 1024 * 1024 // 最大请求数据大小(5M)
}

// 检查是否重复提交
const checkRepeatSubmit = (config: InternalAxiosRequestConfig<any>) => {
  const requestObj = {
    url: config.url,
    data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
    time: new Date().getTime()
  }

  const requestSize = Object.keys(JSON.stringify(requestObj)).length
  if (requestSize >= repeatSubmitConfig.maxSize) {
    console.warn(`[${config.url}]: 请求数据大小超出允许的5M限制，无法进行防重复提交验证。`)
    return true
  }

  const sessionObj = cache.session.getJSON('sessionObj')
  if (!sessionObj) {
    cache.session.setJSON('sessionObj', requestObj)
    return true
  }

  const { url: s_url, data: s_data, time: s_time } = sessionObj
  if (
    s_data === requestObj.data &&
    requestObj.time - s_time < repeatSubmitConfig.interval &&
    s_url === requestObj.url
  ) {
    console.warn(`[${s_url}]: 数据正在处理，请勿重复提交`)
    return false
  }

  cache.session.setJSON('sessionObj', requestObj)
  return true
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false

    // 添加token
    if (getToken() && !isToken) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
      config.headers['Userkey'] = loginUserKey()
    }

    // GET请求参数处理
    if (config.method === 'get' && config.params) {
      config.url = `${config.url}?${tansParams(config.params)}`.slice(0, -1)
      config.params = {}
    }

    // 防重复提交处理
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      if (!checkRepeatSubmit(config)) {
        return Promise.reject(new Error('数据正在处理，请勿重复提交'))
      }
    }

    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
axios.interceptors.response.use(
  res => {
    // 二进制数据直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }

    const code = res.data.code || 200
    const msg = res.data.msg || errorCode['default']

    // 处理不同状态码
    switch (code) {
      case 200:
        return res.data
      case 401:
        if (!isRelogin.show) {
          isRelogin.show = true
          showConfirmDialog({
            title: '系统提示',
            message: '登录状态已过期，您可以继续留在该页面，或者重新登录'
          })
            .then(() => {
              isRelogin.show = false
              logout().then(() => {
                location.href = '/login'
              })
            })
            .catch(() => {
              isRelogin.show = false
            })
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      case 500:
        showFailToast(msg)
        return Promise.reject(new Error(msg))
      case 601:
        showFailToast(msg)
        return Promise.reject('error')
      default:
        showNotify(msg)
        return Promise.reject('error')
    }
  },
  error => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = `系统接口${message.slice(-3)}异常`
    }

    showLoadingToast({
      message,
      forbidClick: true,
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default axios
