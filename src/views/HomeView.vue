<script setup lang="ts">
import { useGeolocation } from '@/composables/useGeolocation.ts'
import { computed, onMounted, watch } from 'vue'
import WalkMap from '@/components/WalkMap.vue'
const { locate, state } = useGeolocation()

watch(state, (cur, prev) => {
  console.log(`${prev.status} -> ${cur.status}`)
})

const geoPoint = computed(() => {
  return state.value.status === 'success' ? state.value.geolocationReading.point : undefined
})

onMounted(locate)
</script>

<template>
  <div>
    <WalkMap :geoPoint="geoPoint" />

    <p v-if="state.status === 'locating'">Determining your location...</p>
    <p v-if="state.status === 'error'">error :((</p>
  </div>
</template>

<style scoped></style>
