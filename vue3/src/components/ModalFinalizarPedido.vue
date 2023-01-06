<template>
  <v-card min-height="315px" >
    <v-card-actions class="mt-n4 ml-n4">
      <v-btn @click="fecharModal" size="small" icon color="red" variant="text"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-actions>
    <v-card-title class="text-subtitle-1 text-md-h5 font-weight-bold mt-n6">
      Pedido Nº255 aberto com sucesso...
    </v-card-title>
    <v-card-subtitle class="pl-5 mt-n2 mt-sm-0 text-subtitle-2 text-md-subtitle-1 font-italic">
      <p>Siga os passos descritos a seguir</p>
    </v-card-subtitle>
    <v-card-text>

      <v-row class="d-flex flex-column">
        <v-col cols="12">
          <p class="text-body-2 mt-n2 mt-sm-0 text-sm-body-1 font-weight-medium"> Quase tudo pronto. Agora nos envie o numero do seu pedido pelo whats ou por
          e-mail para prosseguirmos ao pagamento.</p>
        </v-col>
        <v-col cols="12" class="mt-n2 mt-sm-0">
            <p><b>Informações de contato : </b></p>
            <div class="pl-md-2 pl-2 text-sm-body-1 text-caption">
              <p>Numero de telefone para contato : <b>(45) 998463475</b></p>
              <p>Endereço de email para contato : <b>jpinformaticafoz@gmail.com</b></p>
              <p><b>Informe o numero do pedido na mensagem.</b></p>
            </div>
        </v-col>
        <v-col cols="12" class="d-flex flex-sm-row flex-column justify-start mt-n3 mt-sm-0">
            <v-btn color="#ACE1AF" prepend-icon="mdi-whatsapp"  size="small" class=" ml-md-0">
              <span>Enviar mensagem agora</span>
            </v-btn>
            <v-btn color="#8cc751" prepend-icon="mdi-email" size="small" class="ml-sm-2 mt-2 mt-sm-0" >
              <span>Enviar email agora</span>
            </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script setup>


  const emit = defineEmits(['fechar'])

  function fecharModal(){
      emit('fechar', false)
  }

</script>

<style lang="scss" scoped>

</style>
