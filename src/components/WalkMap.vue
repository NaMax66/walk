<script setup lang="ts">
import type { GeoPoint } from '@/types'
import { onMounted, shallowRef, watch } from 'vue'

const { geoPoint } = defineProps<{ geoPoint?: GeoPoint }>()

const map = shallowRef<google.maps.Map>()
const marker = shallowRef<google.maps.marker.AdvancedMarkerElement>()

async function initializeMap(): Promise<void> {
  const mapElement = document.getElementById('gmap')

  const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary

  if (!mapElement) {
    throw new Error('Map container was not found')
  }

  map.value = new Map(mapElement, {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 2,
    mapId: 'DEMO_MAP_ID',
  })
}

watch([map, () => geoPoint], async ([mapInstance, point]) => {
  if (!mapInstance || !point) return

  const position = {
    lat: point.latitude,
    lng: point.longitude,
  }

  mapInstance.panTo(position)

  mapInstance.setZoom(16)

  if (!marker.value) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    marker.value = new AdvancedMarkerElement({
      map: mapInstance,
      position,
      title: "It's me",
    })

    return
  }

  marker.value.position = position
})

onMounted(() => {
  void initializeMap()
})
</script>

<template>
  <section>
    <div class="google_map" id="gmap"></div>
  </section>
</template>

<style scoped>
.google_map {
  min-height: 400px;
}
</style>
