/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-12-11 10:52:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2024-12-16 14:02:31
 * @FilePath: \vue3Vant\src\utils\directives.ts
 * @Description: 自定义指令集合
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

// 定义事件类型
type EventType = 'input' | 'blur'

/**
 * 触发DOM事件
 * @param el DOM元素
 * @param type 事件类型
 */
const trigger = (el: HTMLElement, type: EventType): void => {
  const event = new Event(type, { bubbles: true })
  el.dispatchEvent(event)
}

/**
 * 格式化数字,保留4位小数
 * @param val 输入值
 * @returns 格式化后的字符串
 */
const formatNum = (val: string): string => {
  const regex = /^\d*\.?\d{0,4}/
  const match = val.match(regex)
  return match?.[0] || ''
}

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param wait 等待时间（毫秒）
 */
const debounce = <T extends (...args: any[]) => any>(func: T, wait = 300): T => {
  let timer: NodeJS.Timeout | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, wait)
  } as T
}

/**
 * 创建输入处理函数
 * @param fmt 格式化函数
 */
const createInputHandler = (fmt: (val: string) => string) => {
  return (input: HTMLInputElement): void => {
    const oldValue = input.value
    const newValue = fmt(oldValue)

    if (oldValue !== newValue) {
      input.value = newValue
      trigger(input, 'input')
    }
  }
}

/**
 * 绑定输入框事件
 * @param el DOM元素
 * @param fmt 格式化函数
 */
const bindInput = (
  el: HTMLElement | HTMLInputElement,
  fmt: (val: string) => string | number
): void => {
  const input = el instanceof HTMLInputElement ? el : el.querySelector('input')
  if (!input) return

  const handleInput = (input: HTMLInputElement): void => {
    const oldValue = input.value
    const newValue = String(fmt(oldValue))

    if (oldValue !== newValue) {
      input.value = newValue
      trigger(input, 'input')
    }
  }

  const debouncedHandler = debounce(handleInput, 300)

  input.addEventListener('input', () => debouncedHandler(input))
  input.addEventListener('blur', () => handleInput(input))
}

// 指令对象
const directives = {
  // 数字输入,限制最大值999999,保留4位小数
  number: (el: HTMLElement): void => {
    bindInput(el, val => {
      if (!val) return '0'
      const formatted = formatNum(val)
      return Number(+formatted > 999999 ? formatted.slice(0, 6) : formatted)
    })
  },

  // 折扣率输入,限制0-100,保留4位小数
  discountRate: (el: HTMLElement): void => {
    bindInput(el, val => {
      if (!val) return '0'
      const formatted = formatNum(val)
      return +formatted > 100 ? '100' : formatted
    })
  },

  // 开关输入,只能输入0或1
  one: (el: HTMLElement): void => {
    bindInput(el, val => {
      if (!val) return '0'
      return formatNum(val) ? '1' : '0'
    })
  }
}

// 导出指令
export default {
  number: { bind: directives.number },
  discountRate: { bind: directives.discountRate },
  one: { bind: directives.one }
}
