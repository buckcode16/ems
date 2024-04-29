<template>
  <div class="overflow-scroll border rounded-lg border-gray-250">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="py-3 px-6 text-left">Assigned by</th>
          <th class="py-3 px-6 text-left">Manager</th>
          <th class="py-3 px-6 text-center">Appraisal start</th>
          <th class="py-3 px-6 text-center">Appraisal end</th>
          <th class="py-3 px-6 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="appraisal in appraisals"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ appraisal.username }}
          </td>
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {{ appraisal.manager }}
          </td>
          <td class="py-3 px-6 text-center">{{ appraisal.app_start }}</td>
          <td class="py-3 px-6 text-center">{{ appraisal.app_end }}</td>
          <td class="py-3 px-6 text-center">
            Status
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const appraisals = [
  {
    username: 'a',
    manager: 'A',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'b',
    manager: 'B',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'c',
    manager: 'C',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'd',
    manager: 'D',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'a',
    manager: 'A',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'b',
    manager: 'B',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'c',
    manager: 'C',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
  },
  {
    username: 'd',
    manager: 'D',
    app_start: '01-01-2022',
    app_end: '01-01-2022',
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
