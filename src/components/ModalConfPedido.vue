<template>
  <div class="d-flex justify-center" v-if="flag == false">
    <v-card class="bg-carrinho"  >
      <v-card-title>Confirmação do pedido...</v-card-title>
      <v-card-subtitle>
        Verifique os dados do pedido,
         depois cliquem em "confirmar" para finalizá-lo
      </v-card-subtitle>
      <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="11"
              sm="11"
              class="d-flex flex-row"
            >
              <v-text-field

                label="Cupom de desconto"
                type="text"

                v-model="NmCupom"
                variant="filled"
                placeholder="WELCOME25"
              >
              </v-text-field>
              <v-btn size="small"
              class="mt-3 ml-3"
              color="#2E7D32"
              variant="text"
              @click="tryCupom"
              >
                <v-icon class="mt-1">
                  mdi-ticket-percent-outline
                </v-icon>
                <span class="ml-1">Aplicar</span>
              </v-btn>
            </v-col>
            <v-col class="d-flex flex-column mt-n8 ml-2">
              <p class="text-body-1 font-italic
              font-weight-bold">
                Valor do Pedido : {{parseFloat(vlTotal).
                  toLocaleString('pt-br',{style: 'currency',
                  currency: 'BRL'})}}
              </p>
              <p class="text-body-1 font-italic
              font-weight-bold pt-1">
                Valor do Desconto : {{parseFloat(vlDesconto).
                  toLocaleString('pt-br',{style: 'currency',
                  currency: 'BRL'})}}
              </p>
              <p class="text-body-1 font-italic
              font-weight-bold pt-1">
                Subtotal : {{parseFloat(vlFinal).
                  toLocaleString('pt-br',{style: 'currency',
                  currency: 'BRL'}) }}
              </p>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-n4">
        <v-btn variant="text" @click="fecharModal" color="#FF033E">
          Voltar
        </v-btn>
        <v-btn variant="text" @click="finalizar" color="#2E7D32">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else class="d-flex justify-center">
    <ModalFinalizarPedido @fechar="fecharModal" ></ModalFinalizarPedido>
  </div>


</template>
<script setup>
import { ref, computed } from 'vue'
import Carrinho from '@/CompositionAP/Carrinho'
import ModalFinalizarPedido from './ModalFinalizarPedido.vue';
const {finalizaPedido, getCupom, applyCupom} = Carrinho()
const emit = defineEmits(['fechar'])
const NmCupom = ref('');
const idCupom = ref(null);
const flag = ref(false)
const props = defineProps({
    vlTotal : Number
})
const vlDesconto = ref(0)
const vlFinal = computed(()=>
    parseFloat(props.vlTotal) - parseFloat(vlDesconto.value)
  )

function fecharModal(){
    emit('fechar', false)
}
  async function tryCupom(){
    let payload = {current_page: null, opcao: null,
    start: null, end: null,
    search: null, Shop: "T", Precos : null, categoria : null,
    NOME : NmCupom.value}
    let resp = await getCupom(payload)
    if(resp != null){
      idCupom.value = resp.ID
      vlDesconto.value = (parseFloat(vlFinal.value) * parseFloat(resp.DESCONTO)) / 100
    }
  }
  function finalizar(){
    let payload = {ID : idCupom.value}
    if(payload.ID != null){
      applyCupom(payload)
    }
    finalizaPedido(payload)
    flag.value = true
  }
</script>

<style lang="scss" >

</style>
