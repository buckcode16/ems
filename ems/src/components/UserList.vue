<template>
  <div class="overflow-scroll border rounded-lg border-gray-250">
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
          <td class="py-3 px-6 text-center">{{ user.profilePic }}</td>
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
const users = [
  {
    username: 'a',
    email: 'a',
    profilePic: 'a',
    lastOnline: 'a',
    department: 'a',
  },
  {
    username: 'b',
    email: 'b',
    profilePic: 'b',
    lastOnline: 'b',
    department: 'b',
  },
  {
    username: 'c',
    email: 'c',
    profilePic: 'c',
    lastOnline: 'c',
    department: 'c',
  },
  {
    username: 'd',
    email: 'd',
    profilePic: 'd',
    lastOnline: 'd',
    department: 'd',
  },
  {
    username: 'a',
    email: 'a',
    profilePic: 'a',
    lastOnline: 'a',
    department: 'a',
  },
  {
    username: 'b',
    email: 'b',
    profilePic: 'b',
    lastOnline: 'b',
    department: 'b',
  },
  {
    username: 'c',
    email: 'c',
    profilePic: 'c',
    lastOnline: 'c',
    department: 'c',
  },
  {
    username: 'd',
    email: 'd',
    profilePic: 'd',
    lastOnline: 'd',
    department: 'd',
  },
  {
    username: 'a',
    email: 'a',
    profilePic: 'a',
    lastOnline: 'a',
    department: 'a',
  },
  {
    username: 'b',
    email: 'b',
    profilePic: 'b',
    lastOnline: 'b',
    department: 'b',
  },
  {
    username: 'c',
    email: 'c',
    profilePic: 'c',
    lastOnline: 'c',
    department: 'c',
  },
  {
    username: 'd',
    email: 'd',
    profilePic: 'd',
    lastOnline: 'd',
    department: 'd',
  },
]
</script>

<style scoped>
th {
  position: sticky;
  top: 0;
  background-color: #1f2937; /* Same as bg-gray-800 */
  z-index: 10; /* Ensures the header is above other content when scrolling */
}
</style>
