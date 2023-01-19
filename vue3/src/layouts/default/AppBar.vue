<template>
  <v-app-bar class="app-bar">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="dialog = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-down">
        <p class="mt-1 font-app">WebShop</p>
      </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="mr-5">
      <v-btn @click="$router.push('/produtos')"
      class="text-sm-body-1 hidden-sm-and-down desc-detail"
      prepend-icon="mdi-store" color="white">Loja</v-btn>

      <v-btn @click="$router.push('/carrinho')"
      class="text-sm-body-1 hidden-sm-and-down desc-detail"
      prepend-icon="mdi-cart" color="white">
        <v-badge
        v-show="(counter > 0)"
        class="mt-1 mr-3"
        color="grey-lighten-2"
        :content="counter"
        >
        </v-badge>
        Carrinho
      </v-btn>

      <v-btn @click="$router.push('/login')"
      class="text-sm-body-1 hidden-sm-and-down desc-detail"
      prepend-icon="mdi-account" color="white">Conta</v-btn>
    </div>

    <v-dialog
        v-if="mobile"
        persistent
        v-model="dialog"
        @keydown.escape="dialog = false"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card color="#F0F8FF">
          <v-card-actions>
              <v-btn @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text class="d-flex flex-column">
            <v-btn color="#E6E6FA" size="x-large" text class="text-caption text-md-body-1" prepend-icon="mdi-store"
            @click="getRouteMobile('produtos')">Loja</v-btn>
            <v-btn color="#E6E6FA" size="x-large" class="text-caption text-md-body-1 mt-3" prepend-icon="mdi-cart"
            @click="getRouteMobile('carrinho')">Carrinho</v-btn>
            <v-btn color="#E6E6FA" size="x-large" class="text-caption text-md-body-1 mt-3" prepend-icon="mdi-account"
            @click="getRouteMobile('login')">Conta</v-btn>
          </v-card-text>
        </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useCarrinhoStore } from '@/store/CarrinhoStore'
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  import { useRouter } from 'vue-router';

  const storeApp =
  useCarrinhoStore()
  const router =
  useRouter()
  const {mobile} =
  useDisplay()

  const theme = ref('light')
  const dialog = ref(false)


  const counter = computed(()=>
    storeApp.getCountCarrinho
  )

  function getRouteMobile(route){
    dialog.value = false
    router.push('/' + route)
  }



</script>
<style lang="scss">
  .titulo{
      width: 100px !important;
  }



</style>
