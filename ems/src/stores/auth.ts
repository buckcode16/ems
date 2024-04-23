import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref('')
  const user = ref({})

  function $reset() {
    isAuthenticated.value = false
    token.value = ''
    user.value = {}

    localStorage.removeItem('token')
  }
  return { isAuthenticated, token, user, $reset }
})

export default useAuthStore
