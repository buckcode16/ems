<template>
  <div class="flex justify-center">
    <div class="w-1/4">
      <Form
        class="border rounded-lg m-4 p-6"
        @submit="submitForm"
        :validation-schema="schema"
      >
        <div class="flex flex-col">
          <div class="flex justify-between m-2">
            <label for="email">Email</label>
            <Field name="email" id="email" type="email" />
          </div>
          <div class="flex flex-row-reverse">
            <ErrorMessage class="text-red-600 italic text-sm" name="email" />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between m-2">
            <label for="password">Password</label>
            <Field name="password" type="password" id="password" />
          </div>
          <div class="flex flex-row-reverse">
            <ErrorMessage class="text-red-600 italic text-sm" name="password" />
          </div>
        </div>

        <div class="flex flex-row-reverse">
          <button class="border rounded-md p-2" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, ErrorMessage, Field } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import axios from 'axios'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})

const submitForm = async (values) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth/login',
      data: {
        email: values.email,
        password: values.password,
      },
    })

    authStore.isAuthenticated = true
    authStore.user = response.data.data
    authStore.token = response.data.data.token

    localStorage.setItem('token', response.data.data.token)

    await fetchUserForm()

    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const fetchUserForm = async () => {
  try {
    const userFormResponse = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/user/appraisal',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    authStore.userAppraisals = userFormResponse.data
  } catch (error) {
    console.error('Fetching user form failed:', error)
  }
}
</script>

<style scoped></style>
