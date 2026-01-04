<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-12-16 14:41:09
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 15:04:38
 * @FilePath: \vue3Vant\src\components\computeCode.vue
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

// 生成随机数字(1-9)
const getRandomNumber = () => Math.floor(Math.random() * 9) + 1

// 生成随机运算符
const getRandomOperator = () => {
  const operators = ['+', '-', '*', '/']
  return operators[Math.floor(Math.random() * operators.length)]
}

// 生成验证码
const generateCode = () => {
  const canvas = codeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布尺寸
  canvas.width = 120
  canvas.height = 40

  // 生成随机算术表达式
  const num1 = getRandomNumber()
  const num2 = getRandomNumber()
  const operator = getRandomOperator()

  let result: number
  switch (operator) {
    case '+':
      result = num1 + num2
      break
    case '-':
      result = num1 - num2
      break
    case '*':
      result = num1 * num2
      break
    case '/':
      // 确保除法结果为整数
      result = num1
      codeText.value = `${num1 * num2}${operator}${num2}`
      break
    default:
      result = num1 + num2
  }

  if (operator !== '/') {
    codeText.value = `${num1}${operator}${num2}`
  }

  // 绘制背景
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制文字
  ctx.font = 'bold 24px Arial'
  ctx.fillStyle = '#333'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  // 随机旋转和位置偏移
  const expression = codeText.value
  for (let i = 0; i < expression.length; i++) {
    const x = 20 + i * 20
    const y = 20 + Math.random() * 8 - 4
    const angle = (Math.random() - 0.5) * 0.3
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(expression[i], 0, 0)
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
  for (let i = 0; i < 30; i++) {
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
  getCodeText: () => {
    const [num1, operator, num2] = codeText.value.match(/\d+|\D/g) || []
    if (!num1 || !operator || !num2) return ''

    switch (operator) {
      case '+':
        return String(Number(num1) + Number(num2))
      case '-':
        return String(Number(num1) - Number(num2))
      case '*':
        return String(Number(num1) * Number(num2))
      case '/':
        return String(Number(num1) / Number(num2))
      default:
        return ''
    }
  },
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
