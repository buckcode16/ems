<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white">
      <router-link
        to="/appraisals/form"
        class="inline-block text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 my-4"
      >
        New Appraisal
      </router-link>
      <ul class="p-5">
        <li>
          <a href="#" class="block p-2 hover:bg-gray-700 rounded">Home</a>
        </li>
        <li>
          <a href="#" class="block p-2 hover:bg-gray-700 rounded">Profile</a>
        </li>
        <li>
          <a href="#" class="block p-2 hover:bg-gray-700 rounded">Settings</a>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from 'vue-router'

const router = useRouter()
</script>

<style scoped></style>
