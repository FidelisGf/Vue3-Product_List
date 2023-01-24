<template>
  <v-overlay
    v-model="value"
  >
          <v-progress-circular

            indeterminate
            location-strategy="connected"
            scroll-strategy="block"
          >
          </v-progress-circular>

  </v-overlay>
</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import { computed } from 'vue';
  const storeApp =
  useAppStore()

  const value = computed(()=>
      storeApp.loading
  )

</script>

<style lang="scss" scoped>

</style>
