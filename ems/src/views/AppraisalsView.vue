<template>
  <div v-if="authStore.isAuthenticated" class="min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white flex flex-col p-4">
      <router-link
        to="/appraisals/form"
        class="inline-block text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 my-4"
      >
        New Appraisal
      </router-link>
      <ul class="p-5">
        <li>
          <router-link
            to="/appraisals"
            class="block p-2 hover:bg-gray-700 rounded"
          >
            Appraisals
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-10">
      <div v-if="$route.name === 'Appraisals'"></div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="flex justify-center items-center p-4" v-else>
    <p class="text-xl p-4 border rounded-md shadow border-gray">
      Please log in
    </p>
  </div>
</template>
<script setup lang="ts">
import { useRouter, RouterLink, RouterView, useRoute } from 'vue-router'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()

const $route = useRoute()
</script>

<style scoped></style>
