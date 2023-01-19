<template>

  <v-app :theme="theme" >
    <Loading class="d-flex justify-center align-center"></Loading>
    <default-bar @modeOn="onclickMode"/>
    <default-view/>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import DefaultBar from './AppBar.vue'
  import { ref } from 'vue'
  import Loading from '@/components/Loading.vue';
  const theme = ref('dark')
  function onclickMode(e){
      console.log(e)
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
</script>
<style lang="scss">


</style>
