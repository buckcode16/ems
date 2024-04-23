<template>
  <div class="flex space-x-1">
    <button
      v-for="index in maxStars"
      :key="index"
      class="star"
      :class="{
        'text-yellow-500': ratingValue >= index || hoverRating >= index,
        'text-gray-400': ratingValue < index && hoverRating < index,
      }"
      @click="() => setRating(index)"
      @mouseover="() => (hoverRating = index)"
      @mouseleave="() => (hoverRating = ratingValue)"
    >
      ☆
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialRating: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['update:rating'])

const ratingValue = ref(props.initialRating)
const hoverRating = ref(0)

function setRating(index) {
  ratingValue.value = index
  emit('update:rating', index)
}

watch(
  () => props.initialRating,
  (newValue) => {
    ratingValue.value = newValue
  },
)
</script>

<style>
.star {
  cursor: pointer;
  font-size: 25px;
  background-color: transparent;
  border: none;
}
</style>
