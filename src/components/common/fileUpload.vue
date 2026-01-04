<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-08 09:33:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-08 14:30:46
 * @FilePath: \vue3Vant\src\components\common\fileUpload.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <component :is="render" />
</template>

<script setup lang="ts">
import { Uploader } from 'vant'
import { h, ref } from 'vue'

const fileList = ref<any[]>([])
const maxCount = ref<number>(1)

const handleFileRead = (file: any) => {
  console.log(file)
}
const render = () => {
  return h(
    Uploader,
    {
      modelValue: fileList.value,
      'max-count': maxCount.value,
      'onAfter-read': handleFileRead,
      'onBefore-read': handleFileRead,
      'onUpdate:modelValue': (val: any) => {
        fileList.value = val
      }
    },
    () => {}
  )
}

defineExpose({ render })
</script>
