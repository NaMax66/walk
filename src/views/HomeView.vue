<script setup lang="ts">
import { useGeolocation } from '@/composables/useGeolocation.ts'
import { onMounted, watch } from 'vue'
import WalkMap from '@/components/WalkMap.vue'
const { locate, state } = useGeolocation()

watch(state, (cur, prev) => {
  console.log(`${prev.status} -> ${cur.status}`)
})

onMounted(locate)
</script>

<template>
  <div>
    <WalkMap v-if="state.status === 'success'" :geoPoint="state.geolocationReading.point" />

    <p v-if="state.status === 'locating'">loading...</p>
    <p v-if="state.status === 'error'">error :((</p>
  </div>
</template>

<style scoped></style>
