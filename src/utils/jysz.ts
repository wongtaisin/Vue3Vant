/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-26 14:50:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-09 15:29:43
 * @FilePath: \vue3Vant\src\utils\jysz.ts
 * @Description: 工具函数库 - 参数处理和数据验证
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

interface Params {
  [key: string]: string | number | boolean | Record<string, string | number | boolean>
}

/**
 * 将对象参数转换为URL查询字符串
 * @param params 要转换的参数对象
 * @returns 转换后的查询字符串
 */
export const tansParams = (params: Params): string => {
  const parts: string[] = []

  Object.entries(params).forEach(([propName, value]) => {
    if (value == null || value === '') return

    if (typeof value === 'object') {
      Object.entries(value).forEach(([key, subValue]) => {
        if (subValue != null && subValue !== '') {
          const paramKey = `${propName}[${key}]`
          parts.push(`${encodeURIComponent(paramKey)}=${encodeURIComponent(String(subValue))}`)
        }
      })
    } else {
      parts.push(`${encodeURIComponent(propName)}=${encodeURIComponent(String(value))}`)
    }
  })

  return parts.join('&')
}

/**
 * 验证数据是否为Blob格式
 * @param data 要验证的数据
 * @returns 是否为非JSON的Blob数据
 */
export const blobValidate = (data: { type: string }): boolean => {
  return data.type !== 'application/json'
}
