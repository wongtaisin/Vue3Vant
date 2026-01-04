<template>
	<section>
		<el-affix :offset="80">
			<div class="left">
				<el-anchor :offset="100">
					<div :key="i" @click="handleClick(res.title)" class="menu" v-for="(res, i) in item">
						<svg aria-hidden="true" class="icon" style="width: 36px; height: 36px">
							<use :xlink:href="`#${res.icon}`" />
						</svg>
						<div class="font">{{ res.font }}</div>
					</div>
				</el-anchor>
			</div>
		</el-affix>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const item = ref([
	{
		icon: 'icon-dingdan',
		font: '订单',
		title: 'order'
	},
	{
		icon: 'icon-caogao',
		font: '草稿',
		title: 'draft'
	}
])

const router = useRouter()

const handleClick = (tab: any) => {
	if (tab === 'order') router.push({ path: '/pcbaOrder' })
	if (tab === 'draft') router.push({ path: '/pcbaDraft' })
}
</script>

<style lang="scss" scoped>
.left {
	background: white;
	width: 66px;
	padding: 0px 10px 20px;
	margin-right: 20px;

	.menu {
		text-align: center;
		padding-top: 20px;

		cursor: pointer;

		i {
			font-size: 32px;
		}

		.font {
			width: 66px;
			color: #909399;
			white-space: pre-wrap;
		}
	}

	:deep(.el-anchor.el-anchor--vertical .el-anchor__list) {
		padding-left: 0;
	}

	:deep(.el-anchor.el-anchor--vertical .el-anchor__marker) {
		width: 0;
	}
}
</style>
