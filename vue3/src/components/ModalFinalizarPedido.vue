<template>
  <v-card min-height="315px" class="bg-real" >
    <v-card-actions class="mt-n4 ml-n4">
      <v-btn @click="fecharModal" size="small" icon color="red" variant="text"><v-icon>mdi-close</v-icon></v-btn>
    </v-card-actions>
    <v-card-title class="text-subtitle-1 text-md-h5 font-weight-bold mt-n6">
      Pedido {{numero_pedido}} aberto com sucesso...
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
            <v-btn color="#ACE1AF" @click="goWhats" prepend-icon="mdi-whatsapp"  size="small" class=" ml-md-0">
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
  import { useCarrinhoStore } from '@/store/CarrinhoStore';
  import { ref, computed } from 'vue'


  const storeApp = useCarrinhoStore()
  const emit = defineEmits(['fechar'])
  const numero_pedido = computed(()=>
    storeApp.getIdPedido
  )
  function fecharModal(){
      emit('fechar', false)
  }

  function goWhats(){
      const url = "https://api.whatsapp.com/send?phone="
      const number = '45998463475'
      const msg = "Boa%20Tarde%20gostaria%20de%20ter%20informações%20sobre%20o%20meu%20pedido%20Numero%20" + storeApp.getIdPedido.toString()
      const end_url = `${url}${number}&text=${msg}`
      window.open(end_url, '_blank').focus();
  }

</script>

<style lang="scss" >

</style>
