<script setup lang="ts">
import {useGeolocation} from "@/composables/useGeolocation.ts";
const location = useGeolocation();

location.locate();
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
