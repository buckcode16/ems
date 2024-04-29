<template>
  <div
    class="m-4 border rounded-lg border-gray-200"
    id="datepickerId"
    inline-datepicker
    data-date=""
  ></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Datepicker from 'flowbite-datepicker/Datepicker'
onMounted(() => {
  const datepickerEl = document.getElementById('datepickerId')
  new Datepicker(datepickerEl)
})
</script>

<style scoped>
::v-deep(.shadow-lg) {
  box-shadow: none !important;
}
</style>
