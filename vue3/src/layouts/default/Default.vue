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
  import { ref, onBeforeMount } from 'vue'
  import Loading from '@/components/Loading.vue';
  import { useAppStore } from '@/store/app';

  const storeApp = useAppStore()

  const theme = ref('dark')

  onBeforeMount(async ()=>{
    await storeApp.getTemasEmpresa()
  })

  function onclickMode(e){
      console.log(e)
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
</script>
<style lang="scss">
.btns{
  background: #C9CCD3;
  background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
  background-blend-mode: lighten;
}

</style>
