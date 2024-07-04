import { defineStore } from 'pinia'
import { ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const token = ref('')
  const users = ref([])
  const user = ref({})
  const userAppraisals = ref([])

  function $reset() {
    isAuthenticated.value = false
    token.value = ''
    users.value = []
    user.value = {}

    localStorage.removeItem('token')
  }
  return { isAuthenticated, token, users, user, userAppraisals, $reset }
})

export default useAuthStore
