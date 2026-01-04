<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-11-13 08:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-08 14:39:50
 * @FilePath: \vue3Vant\src\views\home.vue
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section class="container">
    <router-view :key="route.path" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  @include flexbox(space-between, center);
}
</style>
