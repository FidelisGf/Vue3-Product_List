<template>

  <v-app :theme="theme" >
    <Loading class="d-flex justify-center align-center"></Loading>
    <View/>
    <AppBar/>
  </v-app>
</template>

<script setup>
  import {ref, onBeforeMount} from 'vue'
  import Loading from '@/components/Loading.vue';
  import { useAppStore } from '@/store/app';
  import View from './View.vue';
  import AppBar from './AppBar.vue';

  onBeforeMount(async ()=>{
    useAppStore().getTemasEmpresa()
  })



  const theme = ref('light')



</script>
<style lang="scss">


</style>
