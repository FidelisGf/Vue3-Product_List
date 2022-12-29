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

<script>
import { useAppStore } from '@/store/app'
const storeApp = useAppStore()

export default {
   computed: {
      value : function (){
            return storeApp.loading
      }
   }
}
</script>

<style lang="scss" scoped>

</style>
