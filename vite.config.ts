/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-08 09:33:10
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-04 14:43:08
 * @FilePath: \qiankun\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
// import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const isProd = process.env.NODE_ENV === 'production'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      // 自动导入相关函数
      imports: [
        'vue', // 自动导入vue相关函数，如：ref，reactive，toRef等
        'vue-router',
        'pinia'
      ],

      // 📜 自动生成类型声明
      dts: path.resolve(pathSrc, 'types/auto-imports.d.ts'),

      // 自动导入自己的组合函数（可选）
      dirs: ['src/composables'], // 会自动导入该目录下所有 export 的函数

      // 支持 Vue 模板中使用（非 <script setup> 场景）
      vueTemplate: true,

      // ESLint 支持（解决 no-undef）
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // 设为 true 表示这些全局变量是只读的
      }

      // resolvers: [VantResolver()]
    }),
    Components({
      // 📂 扫描目录
      dirs: ['src/components'], // 自动注册 components 目录下的组件

      // 🔌 支持的文件扩展名
      extensions: ['vue', 'tsx'], // 自动注册 vue, tsx 文件

      // 🔍 是否深度扫描子目录
      deep: true, // 深度搜索组件目录，包括子目录

      // 📜 自动生成全局组件类型声明
      dts: path.resolve(pathSrc, 'types/auto-components.d.ts'),
      // dtsTsx: true, // 自动生成 tsx 类型声明文件（如果使用 TSX）

      // 🧬 命名空间：启用目录作为前缀
      directoryAsNamespace: true, // 允许子目录作为组件的命名空间前缀，如：<CommonHeader />
      collapseSamePrefixes: true, // 合并文件夹和组件的相同前缀（区分驼峰式命名空间）；以防止命名空间组件名称中出现重复；避免 User/UserCard → UserUserCard，会合并为 UserCard

      // 🌐 全局命名空间（可选）：允许 <Common/Button /> 写法
      globalNamespaces: ['Common'], // 可以在任何组件中直接使用 Common/组件名 来引用, 如：<Common/Button /> ；如不需要路径式写法，可设为 []

      // 🪝 自动导入指令（默认扫描 src/directives）
      directives: true,
      // directiveDirs: ['src/directives'], // 如需自定义路径可取消注释

      // 🎯 控制“在哪些文件中自动注入 import”
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.[jt]sx?$/ // 支持 .ts, .tsx, .js, .jsx
      ],

      // 🚫 排除不需要处理的目录
      exclude: [
        /[\\/]node_modules[\\/]/, // 排除 node_modules 目录
        /[\\/]src\/components\/code\/compute\.vue$/ // 排除 code/compute.vue 文件
      ],

      // 🛡️ 安全选项：
      allowOverrides: false, // 禁止同名组件覆盖
      importPathTransform: v => v, // 🔄 导入路径转换（一般无需修改）

      // Vue 版本（可省略，自动检测）
      version: 3

      // resolvers: [
      //   VantResolver({
      //     importStyle: true
      //   })
      // ]
    })
  ],
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          viewportWidth: 750, // 设计稿宽度（750px）
          viewportUnit: 'vw', // 转换单位
          unitPrecision: 5, // 小数精度
          propList: ['*'], // 所有属性都转换
          fontViewportUnit: 'vw', // 字体单位也转 vw（可选）
          minPixelValue: 1, // <=1px 不转换
          mediaQuery: false,
          replace: true,
          exclude: [/node_modules\/vant/], // ⚠️ 排除 Vant，防止组件样式错乱
          selectorBlackList: [] // 如 ['.no-vw'] 不转换
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/mixin.scss" as *;`
      }
    }
  },
  assetsInclude: [path.resolve(__dirname, './src/assets'), '**/*.json'],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@build': path.resolve(__dirname, 'build')
    }
  },
  server: {
    host: true,
    port: 6001,
    open: true,
    cors: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: path => path.replace('/api', '')
      }
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'vant-vendor': ['vant']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : []
  }
})
