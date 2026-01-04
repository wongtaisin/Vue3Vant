<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-08 09:33:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 14:31:43
 * @FilePath: \qiankun\src\views\list\order.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <section class="container">
    <component :is="render" />
    <div class="btn-box">
      <van-button class="btn" type="primary" @click="handleSign">去签名</van-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Cell, List } from 'vant'
import { h, ref } from 'vue'

const params = ref([
  {
    label: '姓名',
    value: '订单'
  },
  {
    label: '姓名2',
    value: '订单2'
  },
  {
    label: '姓名3',
    value: '订单3'
  },
  {
    label: '姓名4',
    value: '订单4'
  },
  {
    label: '姓名5',
    value: '订单5'
  }
])

const render = () => {
  return h(
    List,
    {
      finished: true,
      // finishedText: '没有更多了',
      loading: true
    },
    () => {
      return params.value.map(item => h(Cell, { title: item.label }, () => item.value))
    }
  )
}

const handleSign = () => {
  console.log('去签名')
}

defineExpose({ render })
</script>

<style lang="scss" scoped>
.btn-box {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  .btn {
    width: 100%;
  }
}
</style>
