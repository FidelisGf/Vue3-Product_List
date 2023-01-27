<template>
  <v-container class="fill-height bg-real fundo-register" fluid>
    <FormUser :cad="true"></FormUser>
  </v-container>
</template>

<script setup>
  import FormUser from '@/components/FormUser.vue';
</script>

<style lang="scss" >
  .fundo-register{
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
</style>
