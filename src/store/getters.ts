import { defineStore } from 'pinia'

export const useUserStore = defineStore({
	id: 'user',
	state: () => {
		return {
			name: '张三'
		}
	},
	getters: {
		fullName: state => {
			return state.name + '丰'
		}
	}
})
