/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-26 14:50:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 11:55:38
 * @FilePath: \vue3Vant\src\axios\common.ts
 * @Description: 公共方法
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import $axios from './index'

interface DownloadParams {
  id: string | number
  fileName: string
}

/**
 * 下载文件
 * @param params 下载参数
 * @returns Promise<void>
 */
export const downloadFile = async (params: DownloadParams): Promise<void> => {
  try {
    const res = await $axios({
      url: `/api/fmsmart/file/downloadData?fileId=${params.id}`,
      method: 'get',
      responseType: 'blob'
    })

    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = params.fileName

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 释放blob URL
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('文件下载失败:', error)
    throw error
  }
}
