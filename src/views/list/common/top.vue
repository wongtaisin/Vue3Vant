<!--
 * @Author: wingddd wongtaisin1024@gmial.com
 * @Date: 2024-11-15 13:46:29
 * @LastEditors: wingddd wongtaisin1024@gmial.com
 * @LastEditTime: 2024-11-16 15:49:56
 * @FilePath: \vue3Vant\src\views\list\common\top.vue
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <section>
    <el-affix position="top">
      <div class="top">
        <div class="main">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="4">
              <span class="title">PCBA订单列表</span>
            </el-col>
            <el-col :span="12">
              <!-- <el-menu :popper-offset="16" class="el-menu-popper-demo" ellipsis mode="horizontal">
								<el-menu-item index="1">PCBA计价下单</el-menu-item>
								<el-menu-item index="2">PCBA订单列表</el-menu-item>
							</el-menu>-->
            </el-col>
            <!-- <el-col :span="3"></el-col> -->
          </el-row>
        </div>
      </div>
    </el-affix>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.top {
  background: white;
  height: 60px;
  line-height: 60px;
  .main {
    max-width: 100%;
    margin: 0 auto;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
  :deep(.el-menu--horizontal.el-menu) {
    border-bottom: 0;
  }
}
</style>
