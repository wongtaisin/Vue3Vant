<template>
  <div class="container-order">
    <router-view :key="route.path" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss" scoped>
.container-order {
  width: 750px;
  height: 100vh;
}
</style>
