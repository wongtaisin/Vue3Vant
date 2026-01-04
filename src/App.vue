<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-08 09:33:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 15:55:06
 * @FilePath: \Vue3Vant4\src\App.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <component :is="render" />
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'vant'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const render = () => h(ConfigProvider, {}, () => h(RouterView))

defineExpose({ render })
</script>

<style>
/* 全局样式 */
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
}
</style>
