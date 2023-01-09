<template>
  <v-container class="fill-height bg-real" fluid>
    <v-row :key="renic" v-if="tela == 'dados'">
      <v-col cols="12" class="d-flex align-center justify-center">
          <v-card max-width="850" width="500" color="#E6E6FA">
              <v-card-title>
                <v-btn @click="reniciar" size="x-small" color="blue" icon="mdi-reload" variant="text">
                </v-btn>
                Meus dados...
              </v-card-title>
              <v-card-text class="ml-2 mt-md-0 mt-4">
                <v-row class="d-flex flex-sm-row flex-column">
                  <v-col cols="12" md="5" class="d-flex justify-center justify-md-start">
                    <v-img
                      class="encx-img"
                      :src="user.IMAGE"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="7" class="mt-3">
                    <p class="text-subtitle-1 font-italic"><b>Nome :</b> {{user.NAME}}</p>
                    <p class="text-subtitle-1 font-italic"><b>Email :</b> {{user.EMAIL}}</p>
                    <p class="text-subtitle-1 font-italic"><b>Cpf :</b> {{user.CPF}}</p>
                    <p class="text-subtitle-1 font-italic"><b>Pedidos realizados :</b> 10</p>
                    <p class="text-subtitle-1 font-italic"><b>Pedidos pagos</b> 10</p>
                    <p class="text-subtitle-1 font-italic"><b>Entrou em : </b> {{user.CREATED_AT}}</p>
                  </v-col>
                </v-row>
              </v-card-text>
          </v-card>
      </v-col>
    </v-row>
    <v-row v-if="tela == 'pedidos'">
        <v-col cols="12" class="d-flex align-center justify-center">
            <Pedidos></Pedidos>
        </v-col>
    </v-row>


    <v-bottom-navigation  class="bg-bottom" :elevation="7" v-model="tela">
      <v-btn value="pedidos">
        <v-icon color="#228B22">mdi-package-variant-closed</v-icon>
        <span class="auto">Meus pedidos</span>
      </v-btn>

      <v-btn value="dados">
        <v-icon color="#228B22">mdi-account</v-icon>

        <span class="auto">Meus dados</span>
      </v-btn>

      <v-btn value="nearby" @click="logout">
        <v-icon color="#D2122E">mdi-exit-to-app</v-icon>

        <span class="auto">Sair da conta</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
  import UserComp from '@/CompositionAP/UserComp'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router';
import Pedidos from './Pedidos.vue';

  const router =
  useRouter()

  const {getPerfil, logoutUser} =
  UserComp()

  const user = ref(null)
  const renic = ref(0)
  const tela = ref('dados')


  async function getUser(){
      user.value = await getPerfil()
      user.value.CREATED_AT = new Date()
      user.value.CREATED_AT = user.value.CREATED_AT.toLocaleString()
  }
  async function logout(){
      logoutUser()
      localStorage.clear('token')
      router.push('/login')

  }
  function reniciar(){
      getUser()
      renic.value += 1
  }

  await getUser()
</script>

<style lang="scss" >
  .bg-bottom{
    background-color: #E6E6FA !important;
  }
  .auto{
      color: black;
      font-weight: bold;
  }
  .encx-img{
    max-width: 200px !important;
    max-height: 200px !important;
    min-height: 180px;
    border: solid 0.0px rgb(245, 244, 244);
  }
  .img-cad{
    width: 90%;
    height: 90%;
  }
</style>
