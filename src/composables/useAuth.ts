import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()

  const loading = ref(false)

  const logout = () => {
    router.push('/login')
  }

  return {
    loading,
    logout
  }

  // <script setup lang="ts">
  // ✅ 无需写 import { useAuth } from '@/composables/useAuth'
  // const { logout, loading } = useAuth()
  // const handleLogin = () => { logout() }
  // </script>
}
