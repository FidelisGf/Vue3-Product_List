<template>
  <v-container class="fill-height fundo-register"
  fluid :style="storeApp.getTemas.PRIMARIA">
    <FormUser :cad="true"></FormUser>
  </v-container>
</template>

<script setup>
  import FormUser from '@/components/FormUser.vue';
  import { useAppStore } from '@/store/app';
  const storeApp = useAppStore()
</script>

<style lang="scss" >
  .fundo-register{
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
</style>
