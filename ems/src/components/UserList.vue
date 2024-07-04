<template>
  <div class="overflow-scroll border rounded-lg border-gray-250 h-[500px]">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="py-3 px-6 text-left">Avatar</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-center">Department</th>
          <th class="py-3 px-6 text-center">Last Online</th>
          <th class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-center">
            <img class="max-h-5" :src="user.profilePic" alt="" />
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ user.username }}
          </td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-center">{{ user.department }}</td>
          <td class="py-3 px-6 text-center">{{ user.lastOnline }}</td>
          <td class="py-3 px-6 text-center">
            <button class="text-blue-500 hover:text-blue-600">Message</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const users = ref([])

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

onMounted(() => {
  console.log('userList', authStore.users)

  const formattedUsers = authStore.users.map((u) => ({
    ...u,
    lastOnline: new Date(u.lastOnline).toLocaleDateString('en-US', options),
  }))

  users.value = formattedUsers
  console.log('users.value', users.value)
})
</script>

<style scoped>
th {
  position: sticky;
  top: 0;
  background-color: #1f2937;
  z-index: 10;
}
</style>
