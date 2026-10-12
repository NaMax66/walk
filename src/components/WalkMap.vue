<script setup lang="ts">
import type { GeoPoint } from '@/types'
import { onMounted } from 'vue'

const { geoPoint } = defineProps<{ geoPoint: GeoPoint }>()

async function initializeMap(): Promise<void> {
  const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary

  new Map(document.getElementById('gmap'), {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
  })
}

onMounted(() => {
  void initializeMap()
})
</script>

<template>
  <section>
    <div class="google_map" id="gmap"></div>
    <p>Latitude: {{ geoPoint.latitude }}</p>
    <p>Longitude: {{ geoPoint.longitude }}</p>
  </section>
</template>

<style scoped>
.google_map {
  min-height: 400px;
}
</style>
