<template>
  <v-main>
    <v-snackbar
      v-model="snac"
      :timeout="timeout"
      color="black"
    >
      {{ msg }}
      <template v-slot:actions>
        <v-btn
          color="red-darken-2"
          variant="text"
          @click="close"
          icon
        >
        <v-icon>
          mdi-close
        </v-icon>

        </v-btn>
      </template>
    </v-snackbar>
    <suspense>
      <router-view />
    </suspense>
    <v-footer :style="storeApp.getTemas.FOOTER"
    v-if="$route.name!='Perfil'">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in icons"
          :key="link"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          <v-icon>{{ link }}</v-icon>
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }}
          <strong>© Empresarial LTDA</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-main>

</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import {ref, computed, } from 'vue'
  const storeApp = useAppStore()

  const tmp = ref(null)
  const icons = ref([
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ])
  let snac = computed({
      get: ()=> storeApp.getSnack,
      set: () => {
        storeApp.closeSnack()
      }
  })
  const msg = computed({
      get: ()=> storeApp.getMsg
  })
  const timeout = ref(2000)
  function close(){
      storeApp.closeSnack()
  }
</script>
<style lang="scss">
   .imagem{
    transition: transform 0.25s;
    position: relative;
    box-shadow: rgba(141, 141, 141, 0.397) 0px 10px 14px;
  }
  .zoom{
   background-color: transparent;
   width: 100%;
   height: 100%;
   float: right;
  }

  .cores{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .imagem:hover{
    transform: scale(1.05);
  }
  .mod-img{
    overflow: hidden;
  }
  .cores:hover{
    transform: translate(0px, -0.9px);
    transition: 0.1s;
    box-shadow: rgba(226, 222, 222, 0.397) 0px 0px 15px;
  }
  .cores-selec{
    border: 1px solid rgb(112, 112, 112);
  }
  .cores-selec:hover{
    transform: translate(1px, -0.10px);
    transition: 0.5s;
    cursor: pointer;
    box-shadow: 2px 1px 1px 0px #8a8a8a !important;
  }
  .cores-selec:active{
    border: 2px solid rgb(250, 247, 247);
    box-shadow: 1px 2px 1px 2px #414749 !important;
  }

  .slides{
      width: 100% !important;
  }

  .princip-list{
    background-color: #e2edf6;
  }
  .auto{
      color: rgb(255, 255, 255) !important;
      font-weight: bold;
  }
  .encx-img{
    width: 620px !important;
    height: 620px !important;

  }

  .mod-imagem{
    width: 500px !important;
    min-height: 420px !important;
    max-height: 500px !important;
    box-shadow: 0px 0px 0px 0px #414749 !important;
  }
  .font-app{
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .desc-detail{
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  .dividers{
    background-color: #353535 !important;
    color : #757474 !important;
  }
  .div-img-cad-produto{
    height: 325px !important;
    width: 100% !important;
  }
  .div-img-cad-detail{
    height: 225px !important;
  }
  .img-card{
    background-color: #353535;
    background-image: linear-gradient(160deg, #353535 0%, #262626 100%);
  }
  .btn-home{
    background-color: #131c22;
  }
</style>
