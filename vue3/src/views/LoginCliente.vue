<template>
  <v-container class="fill-height d-flex justify-center align-center bg-login" fluid>

    <div class="fundo d-flex justify-center align-center " color="red">
        <v-card class="conteudo d-flex flex-sm-row flex-column justify-center card"
         >
            <div>
              <img
                class="mt-0 mt-sm-0 img"
                src="@/assets/eCommerce-concch.jpg"
              />
            </div>

            <div class="conteudo">
              <v-card-title class="d-flex justify-center mt-1">
                  Login
              </v-card-title>
              <v-card-text class="d-flex justify-center flex-column mt-2">
                <v-text-field
                  v-model="user.NAME.value"
                  color="teal-darken-1"
                  label="Nome"
                  variant="underlined"
                  prepend-inner-icon="mdi-account"
                  :rules="NomeRules"
                  dark
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.PASSWORD.value"
                  color="teal-darken-1"
                  label="Senha"
                  variant="underlined"
                  dark
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  :rules="pwRules"
                  required
                ></v-text-field>
                <a class="link " @click="$router.push('/cadastro')">Cadastre-se aqui</a>
              </v-card-text>
              <v-card-actions class="d-flex justify-center flex-row">
                <v-btn variant="text" color="#E32636" >Voltar</v-btn>
                <v-btn variant="text" color="#018749" @click="login" >Logar</v-btn>
              </v-card-actions>
            </div>


        </v-card>
    </div>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import  UserComp from '@/CompositionAP/UserComp'
  const {user, login, logoutUser, isNameGrande} = UserComp()
  //logoutUser()
  const valid = ref(true)
  const NomeRules = [
      v=> !!v || 'Nome é obrigatorio',
  ]
  const pwRules = [
      v => !!v || 'Senha é obrigatoria',
  ]
</script>

<style lang="scss" scoped>
    .fundo{
        max-width: 850px !important;
        max-height: 100% !important;
        min-height: 80% !important;
    }
    .card{
        max-width: 100% !important;

    }
    .conteudo{
        min-width: 50% !important;
        min-height: 100% !important;
        max-width: 100% !important;
        background: #16222A;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #4a4c4d, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #151616, #131c22); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .img{
        width: 100%;
        height: 100% !important;
    }

    .link {
        cursor: pointer;
        text-decoration: underline;
        color : rgb(255, 255, 255)
    }
    .bg-login{
      background: #000000 !important;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
</style>
