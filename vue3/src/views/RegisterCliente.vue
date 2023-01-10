<template>
  <v-container class="fill-height bg-real" fluid>
    <FormUser :cad="true"></FormUser>
  </v-container>
</template>

<script setup>
  import FormUser from '@/components/FormUser.vue';


</script>

<style lang="scss" >
.card-cad{
  background: rgb(255, 255, 255) !important;
}
.mold-img{
    width: 80px !important;
    height: 80px !important;
    border: solid 0.1px rgb(185, 185, 185);

}
.img-cad{
    width: 80%;
    height: 80%;

}
</style>
