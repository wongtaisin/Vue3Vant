<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-12-16 14:41:09
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 15:00:39
 * @FilePath: \vue3Vant\src\components\code.vue
 * @Description:
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <div class="code-container">
    <canvas ref="codeCanvas" @click="generateCode" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const codeCanvas = ref<HTMLCanvasElement | null>(null)
const codeText = ref('')

// 生成验证码
const generateCode = () => {
  const canvas = codeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布尺寸
  canvas.width = 120
  canvas.height = 40

  // 生成随机验证码
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  codeText.value = Array(4)
    .fill(0)
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join('')

  // 绘制背景
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制文字
  ctx.font = 'bold 24px Arial'
  ctx.fillStyle = '#333'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // 随机旋转和位置偏移
  for (let i = 0; i < codeText.value.length; i++) {
    const x = 25 + i * 25
    const y = 20 + Math.random() * 8 - 4
    const angle = (Math.random() - 0.5) * 0.3
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(codeText.value[i], 0, 0)
    ctx.restore()
  }

  // 添加干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // 添加干扰点
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

onMounted(() => {
  generateCode()
})

defineExpose({
  getCodeText: () => codeText.value,
  generateCode
})
</script>

<style scoped>
.code-container {
  display: inline-block;
  cursor: pointer;
}

canvas {
  vertical-align: middle;
}
</style>
