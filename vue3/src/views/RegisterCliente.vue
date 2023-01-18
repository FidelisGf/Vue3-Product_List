<template>
  <v-container class="fill-height bg-cad" fluid>
    <FormUser :cad="true"></FormUser>
  </v-container>
</template>

<script setup>
  import FormUser from '@/components/FormUser.vue';


</script>

<style lang="scss" scoped>
.bg-cad{
  background-color: #afdbf5;
  background-image: linear-gradient(165deg, #afdbf5 0%, #b0e0e6 100%);
}
</style>
