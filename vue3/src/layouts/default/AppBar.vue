<template>
  <div>
    <v-app-bar
      :style="isNull(appN.getTemas.NAVBAR) ? ''
      : appN.getTemas.NAVBAR">
      <v-app-bar-nav-icon class="hidden-md-and-up"
      @click="ativaNav"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-sm-and-down toolbar-title"
        @click="$router.push('/')">
          <p class="mt-0 desc-detail">
            {{appN.getEmpresa}}
          </p>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-5">

        <v-btn @click="$router.push('/')"
        class="text-sm-body-1 hidden-sm-and-down desc-detail"
        prepend-icon="mdi-home" >
          Inicio
        </v-btn>

        <v-btn @click="$router.push('/produtos')"
        class="text-sm-body-1 hidden-sm-and-down desc-detail"
        prepend-icon="mdi-store" >Loja</v-btn>

        <v-btn @click="$router.push('/carrinho')"
        class="text-sm-body-1 hidden-sm-and-down desc-detail"
        prepend-icon="mdi-cart">
          <v-badge
          v-show="(counter > 0)"
          class="mt-1 mr-3"
          color="grey-lighten-1"
          :content="counter"
          >
          </v-badge>
          Carrinho
        </v-btn>

        <v-btn @click="$router.push('/login')"
        class="text-sm-body-1 hidden-sm-and-down desc-detail"
        prepend-icon="mdi-account" >Conta</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="dialog"
      temporary
    >
    <v-list density="compact">
      <v-list-subheader>Menu</v-list-subheader>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        class="mt-4"
        @click="getRouteMobile(item.value)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <template v-slot:title>
          <p>{{item.text}}</p>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useCarrinhoStore } from '@/store/CarrinhoStore'
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/store/app';
  import CrudComp from '@/CompositionAP/CRUD';
  const storeApp =
  useCarrinhoStore()

  const router =
  useRouter()

  const appN =
  useAppStore()

  const {isNull} = CrudComp()

  appN.empresaAtiva()

  const dialog = ref(false)

  function ativaNav(){
    dialog.value = dialog.value == false ? true : false
  }
  const counter = computed(()=>
    storeApp.getCountCarrinho
  )

  function getRouteMobile(route){
    dialog.value = false
    router.push('/' + route)
  }

  const items = [
    { text: 'Home', icon: 'mdi-home', value: '/' },
    { text: 'Loja', icon: 'mdi-store', value: 'produtos' },
    { text: 'Carrinho', icon: 'mdi-cart', value: 'carrinho' },
    { text: 'Login', icon: 'mdi-account', value: 'login' },
  ]

</script>
<style lang="scss">
  .titulo{
      width: 100px !important;
  }
  .toolbar-title{
    cursor: pointer;
  }



</style>
