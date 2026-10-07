<script setup lang="ts">
import { useGeolocation } from '@/composables/useGeolocation.ts'
import { onMounted, watch } from 'vue'
const { locate, state } = useGeolocation()

watch(state, (cur, prev) => {
  console.log(`${prev.status} -> ${cur.status}`)
})

onMounted(locate)
</script>

<template>
  <div></div>
</template>

<style scoped></style>
