<template>
  <v-container class="fill-height  fundo-perfil"
   fluid :style="isNull(storeApp.getTemas.PRIMARIA)
   ? '' : storeApp.getTemas.PRIMARIA">
    <v-row
      :key="renic"
      v-if="tela == 'dados'"
    >
      <v-col cols="12"
      class="d-flex
      justify-center">
          <v-card :width="smAndDown ? 350 : 850"
          :style="isNull(storeApp.getTemas.CARDS_PERFIL) ? '' :
          storeApp.getTemas.CARDS_PERFIL">
              <v-card-title>
                <v-btn @click="reniciar" size="x-small"
                color="yellow" icon="mdi-reload" variant="text">
                </v-btn>
                Meus dados...
              </v-card-title>
              <v-card-text class=" mt-md-6 mt-4">
                <v-row class="flex-sm-row flex-column">
                  <v-col cols="12" md="6" class="
                  justify-center
                  justify-md-center">
                    <v-img
                    v-if="user.IMAGE == 'data:image/png;base64,'"
                    :width="smAndDown ? 250 : 350"
                    :height="smAndDown ? 250 : 350"
                    src="@/assets/4123763.png"

                    ></v-img>
                    <v-img
                      v-else

                      :src="user.IMAGE"
                      :width="smAndDown ? 250 : 350"
                      :height="smAndDown ? 250 : 350"

                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-3 d-flex
                   justify-center
                   justify-md-center">
                    <div class="d-flex flex-column align-
                    content-center justify-center">
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Nome :</b> {{user.NAME}}
                      </p>
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Email :</b> {{user.EMAIL}}
                      </p>
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Cpf :</b> {{user.CPF}}
                      </p>
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Pedidos realizados :</b>
                        {{user.pRealizados}}</p>
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Pedidos pagos</b> {{user.pPagos}}
                      </p>
                      <p class="text-subtitle-1 text-md-h6 ">
                        <b>Entrou em : </b> {{user.CREATED_AT}}
                      </p>
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
        <FormUser :cad="false" ></FormUser>
      </v-col>
    </v-row>

    <v-bottom-navigation
    :style="isNull(storeApp.getTemas.NAVBAR) ? ''
    : storeApp.getTemas.NAVBAR"
    :elevation="7" v-model="tela">
      <v-btn value="pedidos">
        <v-icon color="#03C03C">mdi-package-variant-closed</v-icon>
        <span class="desc-detail">Meus pedidos</span>
      </v-btn>
      <v-btn value="edit-dados">
        <v-icon color="#03C03C">mdi-account-edit</v-icon>

        <span class="desc-detail">Editar dados</span>
      </v-btn>
      <v-btn value="dados">
        <v-icon color="#03C03C">mdi-account</v-icon>

        <span class="desc-detail">Meus dados</span>
      </v-btn>
      <v-btn value="nearby" @click="logout">
        <v-icon color="#E52B50">mdi-exit-to-app</v-icon>
        <span class="desc-detail">Sair da conta</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
  import UserComp from '@/CompositionAP/UserComp'
  import { ref, defineAsyncComponent} from 'vue'
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  import { useAppStore } from '@/store/app';

  const storeApp = useAppStore()

  const {smAndDown} = useDisplay()
  const FormUser = defineAsyncComponent(()=>
      import('@/components/FormUser.vue')
  )
  const Pedidos = defineAsyncComponent(()=>
      import('./Pedidos.vue')
  )



  const {
    getPerfil,
    logout,
    isNull} = UserComp()

  const user = ref(null)
  const renic = ref(0)
  const tela = ref('dados')

  async function getUser(){
      user.value = await getPerfil()
      user.value.CREATED_AT = new Date(user.value.CREATED_AT)
      user.value.CREATED_AT = user.value.CREATED_AT.toLocaleString()
  }

  function reniciar(){
      getUser()
      renic.value += 1
  }

  await getUser()
</script>

<style lang="scss" >

  .fundo-perfil{

      display: flex !important;
      align-items: center !important;
  }
</style>
