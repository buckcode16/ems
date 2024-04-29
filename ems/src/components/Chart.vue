<template>
  <DoughnutChart :chartData="testData" />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const testData = {
  labels: ['Completed', 'In Progress', 'New'],
  datasets: [
    {
      data: [100, 40, 60],
      backgroundColor: ['#93ff78', '#ff9f78', '#78a7ff'],
    },
  ],
}
</script>
