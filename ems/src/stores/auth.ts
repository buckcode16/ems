import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref('')
  const user = ref({})
  const userAppraisals = ref([])

  function $reset() {
    isAuthenticated.value = false
    token.value = ''
    user.value = {}

    localStorage.removeItem('token')
  }
  return { isAuthenticated, token, user, userAppraisals, $reset }
})

export default useAuthStore
