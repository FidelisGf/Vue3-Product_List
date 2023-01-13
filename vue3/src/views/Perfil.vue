<template>
  <v-container class="fill-height bg-real" fluid>
    <v-row :key="renic" v-if="tela == 'dados'" >
      <v-col cols="12" class="d-flex align-center align-content-center justify-center">
          <v-card width="850" color="#E6E6FA">
              <v-card-title>
                <v-btn @click="reniciar" size="x-small" color="blue" icon="mdi-reload" variant="text">
                </v-btn>
                Meus dados...
              </v-card-title>
              <v-card-text class="ml-2 mt-md-6 mt-4">
                <v-row class="d-flex flex-sm-row flex-column">
                  <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
                    <v-img
                    v-if="user.IMAGE == 'data:image/png;base64,'"
                    class="encx-img"
                    src="@/assets/4123763.png"

                    ></v-img>
                    <v-img
                      v-else
                      class="encx-img"
                      :src="user.IMAGE"

                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-3 d-flex justify-center justify-md-start">
                    <div class="d-flex flex-column">
                      <p class="text-subtitle-1 text-md-h6 "><b>Nome :</b> {{user.NAME}}</p>
                      <p class="text-subtitle-1 text-md-h6 "><b>Email :</b> {{user.EMAIL}}</p>
                      <p class="text-subtitle-1 text-md-h6 "><b>Cpf :</b> {{user.CPF}}</p>
                      <p class="text-subtitle-1 text-md-h6 "><b>Pedidos realizados :</b>{{user.pRealizados}}</p>
                      <p class="text-subtitle-1 text-md-h6 "><b>Pedidos pagos</b> {{user.pPagos}}</p>
                      <p class="text-subtitle-1 text-md-h6 "><b>Entrou em : </b> {{user.CREATED_AT}}</p>
                    </div>
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
    <v-row v-if="tela == 'edit-dados'">
      <v-col cols="12" >
        <FormUser :cad="false" :is="current"></FormUser>
      </v-col>
    </v-row>


    <v-bottom-navigation  class="bg-bottom" :elevation="7" v-model="tela">
      <v-btn value="pedidos">
        <v-icon color="#228B22">mdi-package-variant-closed</v-icon>
        <span class="auto">Meus pedidos</span>
      </v-btn>
      <v-btn value="edit-dados">
        <v-icon color="#228B22">mdi-account-edit</v-icon>

        <span class="auto">Editar dados</span>
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
  import FormUser from '@/components/FormUser.vue';
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
  const current = ref('FormUser')

  async function getUser(){
      user.value = await getPerfil()

      user.value.CREATED_AT = new Date(user.value.CREATED_AT)
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


</style>
