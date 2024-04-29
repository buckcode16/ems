<template>
  <div v-if="authStore.isAuthenticated" class="flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div>Avatar</div>
      <div>Profile</div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-10">
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 h-1/2 flex flex-col gap-20">
          <UserList />
          <AppraisalProgress />
        </div>

        <div class="col-span-1 h-1/2 flex flex-col items-center">
          <DatePicker />
          <Chart />
        </div>
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
import UserList from '@/components/UserList.vue'
import AppraisalProgress from '@/components/AppraisalProgress.vue'
import DatePicker from '@/components/DatePicker.vue'
import Chart from '@/components/Chart.vue'

const authStore = useAuthStore()
</script>
