<template>

  <v-app :theme="theme" >
    <Loading class="d-flex justify-center align-center"></Loading>
    <default-bar/>
    <default-view/>
  </v-app>
</template>

<script setup>
  import {defineAsyncComponent, ref} from 'vue'
  import Loading from '@/components/Loading.vue';

  const theme = ref('dark')

  const DefaultView = defineAsyncComponent(()=>
      import('./View.vue')
  )
  const DefaultBar = defineAsyncComponent(()=>
      import('./AppBar.vue')
  )

</script>
<style lang="scss">


</style>
