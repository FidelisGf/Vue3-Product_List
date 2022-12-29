<template>
  <v-app-bar>
    <v-app-bar-nav-icon class="hidden-sm-and-up" @click="dialog = true"></v-app-bar-nav-icon>
    <v-toolbar-title class="hidden-sm-and-down">WebShop</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="mr-5">
      <v-btn @click="$router.push('/produtos')" class="text-sm-body-1 hidden-sm-and-down" prepend-icon="mdi-store">Loja</v-btn>
      <v-btn class="text-sm-body-1 hidden-sm-and-down" prepend-icon="mdi-cart">Carrinho</v-btn>
      <v-btn class="text-sm-body-1 hidden-sm-and-down" prepend-icon="mdi-account">Conta</v-btn>
    </div>

    <v-dialog
        persistent
        v-model="dialog"
        @keydown.escape="dialog = false"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
          <v-card-actions>
              <v-btn @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text class="d-flex flex-column">
            <v-btn text class="text-caption text-md-body-1" prepend-icon="mdi-store">Loja</v-btn>
            <v-btn class="text-caption text-md-body-1" prepend-icon="mdi-cart">Carrinho</v-btn>
            <v-btn class="text-caption text-md-body-1" prepend-icon="mdi-account">Conta</v-btn>
          </v-card-text>
        </v-card>


    </v-dialog>
  </v-app-bar>
</template>

<script>
  import { def } from '@vue/shared';
  import { ref } from 'vue'

  export default {
      data(){
          return {
            theme : ref('light'),
            dialog : false
          }
      }
  }


</script>
