<template>
  <v-app-bar class="app-bar">
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="dialog = true"></v-app-bar-nav-icon>



      <v-toolbar-title class="hidden-sm-and-down">
            <v-img
              width="50px"
              height="50px"
              src="@/assets/6803408.png"
              class="ml-n2"
            >

            </v-img>




      </v-toolbar-title>


    <v-spacer></v-spacer>
    <div class="mr-5">
      <v-btn @click="$router.push('/produtos')"
      class="text-sm-body-1 hidden-sm-and-down"
      prepend-icon="mdi-store" color="#00573F">Loja</v-btn>

      <v-btn @click="$router.push('/carrinho')"
      class="text-sm-body-1 hidden-sm-and-down"
      prepend-icon="mdi-cart" color="#00573F">
        <v-badge
        v-show="(counter > 0)"
        class="mt-1 mr-3"
        color="teal-darken-2"
        :content="counter"
        >
        </v-badge>
        Carrinho
      </v-btn>

      <v-btn @click="$router.push('/login')"
      class="text-sm-body-1 hidden-sm-and-down"
      prepend-icon="mdi-account" color="#00573F">Conta</v-btn>
    </div>

    <v-dialog
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

<script>
  import { def } from '@vue/shared';
  import { ref } from 'vue'
  import { useCarrinhoStore } from '@/store/CarrinhoStore'
  const storeApp = useCarrinhoStore()

  export default {
      data(){
          return {
            theme : ref('light'),
            dialog : false
          }
      },
      computed:{
          counter : function(){
              return storeApp.getCountCarrinho
          }
      },
      methods:{
          getRouteMobile(route){
              this.dialog = false
              this.$router.push(`/${route}`)
          }
      }
  }


</script>
<style lang="scss">
  .titulo{
      width: 100px !important;
  }



</style>
