<script setup lang="ts">
import type { GeoPoint } from '@/types'

const { geoPoint } = defineProps<{ geoPoint: GeoPoint }>()
</script>

<template>
  <section>
    <p>Latitude: {{ geoPoint.latitude }}</p>
    <p>Longitude: {{ geoPoint.longitude }}</p>
  </section>
</template>

<style scoped></style>
