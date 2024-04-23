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
            <label for="username">Name</label>
            <Field name="username" id="username" />
          </div>
          <div class="flex flex-row-reverse">
            <ErrorMessage class="text-red-600 italic text-sm" name="username" />
          </div>
        </div>
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
          <button class="border rounded-md p-2" type="submit">Submit</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})

const submitForm = async (values) => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:3000/api/auth/register',
    data: {
      username: values.username,
      email: values.email,
      password: values.password,
    },
  })

  console.log('from server', response.data)
}
</script>

<style scoped></style>
