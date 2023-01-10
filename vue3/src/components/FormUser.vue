<template>
  <div class="d-flex justify-center card">

    <v-card max-width="500px" class="card-cad" >
      <v-card-title class="font-weight-bold">
        {{title}}
      </v-card-title>
      <v-card-subtitle class="font-weight-black text-md-subtitle-1 text-caption ">
          <p>As informações colocadas aqui serão confirmadas </p>
          <p>posteriormente.</p>
          <label  class="arqv mt-3" for="arqv">Anexar Foto</label>
      </v-card-subtitle>
      <v-card-text class="d-flex flex-row mt-3 mt-md-0">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
                >
          <v-row>

            <v-col cols="12" class="d-flex justify-center  ml-sm-0">
              <div class="mold-img d-flex justify-center align-center">
                <input
                  type="file"
                  ref="image"
                  label="Add Image"
                  @change="uploadImage"
                  id="arqv"
                >
                <v-avatar  v-if="image_colocada" rounded="0"  size="80">
                  <img

                    class="mt-0 mt-sm-0 img-cad"
                    :src="image_url"

                  />
                </v-avatar>
              </div>

          </v-col>

          <v-col cols="12" sm="12">
            <v-text-field
              v-model="user.NAME.value"
              color="#A58CB3"
              label="Nome"
              :rules="NomeRules"

              dark
              required
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.EMAIL.value"
            color="#A58CB3"
            label="Email"
            :rules="EmailRules"
            dark
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.CPF.value"
            color="#A58CB3"
            :rules="cpfRules"
            label="Cpf"
            dark
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.PASSWORD.value"
            color="#A58CB3"
            label="Senha"
            dark
            type="password"
            :rules="pwRules"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.CF_PASSWORD.value"
            color="#A58CB3"
            label="Confirme a senha"
            dark
            type="password"
            :rules="cfPwRules"
            required
          ></v-text-field>
        </v-col>

      </v-row>
    </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-end mt-n3">
      <v-btn variant="text" color="red-darken-1" @click="voltar" >Voltar</v-btn>
      <v-btn variant="text" color="#006400" @click="test" >{{txtBotao}}</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
  import { useRouter } from 'vue-router';
  import  UserComp from '@/CompositionAP/UserComp'

  const props = defineProps({
    cad : Boolean
  })

  const route = useRouter()



  const image_file = ref(null)
  const image_url = ref(null)
  const image_colocada = ref(false)
  const {user, register, clearUser, getPerfil, update} = UserComp()
  const valid = ref(true)

  const title = ref('Cadastro de cliente')
  const txtBotao = ref('Cadastrar')



  const NomeRules = [
      v=> !!v || 'Nome é obrigatorio',
      v=> (v && v.length >= 6) || 'Nome deve ter no minimo 6 caracteres'
  ]
  const EmailRules = [
      v => !!v || 'Email é obrigatorio',
      v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
  ]
  const pwRules = [
      v => !!v || 'Senha é obrigatoria',
      v => (v && v.length >= 6) || 'Senha deve ter no minimo 6 caracteres'
  ]
  const cfPwRules = [
      v => !!v || 'Confirmar a senha é obrigatorio',
      v => (v == user.PASSWORD.value) || 'As senhas não conferem'
  ]
  const cpfRules = [
      v => !!v || 'Cpf é obrigatorio',
      v => (v && v.length == 11) || 'Cpf inválido'
  ]

  let image_user = null


  checkPropsAndForm()

  async function test(){
    if(props.cad ==  true){

      register(image_file, valid.value)
      clearUser()
      clearImage()
    }else{

      updateUser()
    }

  }
  function uploadImage(e){
      image_colocada.value = true
      image_user = e.target.files
      const fr = new FileReader()
      fr.readAsDataURL(image_user[0])
      fr.addEventListener('load', ()=>{
      image_url.value = fr.result
      image_file.value = image_user[0]

    })
  }
  function clearImage(){
      image_colocada.value = false
      image_url.value = null
      image_file.value = null

  }
  async function getUser(){
      let prov = await getPerfil()
      user.ID.value = prov.ID
      user.EMAIL.value = prov.EMAIL
      user.CPF.value = prov.CPF
      user.NAME.value = prov.NAME
      user.IMAGE = prov.BLOB
      image_url.value = prov.IMAGE
      image_colocada.value = true

  }
  async function updateUser(){

    update(image_file, valid.value)
  }
  function checkPropsAndForm(){
    if(props.cad == false){
      txtBotao.value = 'Editar'
      title.value = 'Editar Usuario'
      getUser()
    }
  }
  function voltar(){
      route.back()
  }
</script>

<style lang="scss" scoped>
input[type="file"] {
  width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}
.arqv {
  font-size: 1.05em;
  font-weight: 500;
  color: rgb(0, 0, 0);

  display: inline-block;

}
input[type="file"]:focus + .arqv,
input[type="file"] +  .arqv:hover{
  background-color: rgb(194, 52, 52);
}
.card-cad{
  background: rgb(255, 255, 255) !important;
}
.mold-img{
    width: 80px !important;
    height: 80px !important;
    border: solid 0.1px rgb(185, 185, 185);

}
.img-cad{
    width: 80%;
    height: 80%;

}
</style>
