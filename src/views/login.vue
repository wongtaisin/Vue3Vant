<template>
	<section class="login-page">
		<van-field v-model="params.username" label="用户名" placeholder="请输入用户名" />
		<van-field v-model="params.password" label="密码" placeholder="请输入密码" type="password" />
		<van-button type="primary" @click="handleLogin">登录</van-button>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const params = ref({
	username: '',
	password: ''
})

const handleLogin = () => {
	// 处理登录逻辑
	console.log(params.value)
}
</script>
