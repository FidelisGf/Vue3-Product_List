<template>
  <v-container class="fill-height d-flex justify-center align-center bg-login" fluid>

    <div class="fundo d-flex justify-center align-center " color="red">
        <v-card class="d-flex flex-sm-row flex-column justify-center card"
        color="#F0F8FF" >
            <div class="conteudo">
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
                <a class="link" @click="$router.push('/cadastro')">Cadastre-se aqui</a>
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
    }
    .img{
        width: 100%;
        height: 100% !important;
    }

    .link {
        cursor: pointer;
        text-decoration: underline;
        color : rgb(15, 15, 15)
    }
    .bg-login{
      background: #B9D9EB;
    }
</style>
