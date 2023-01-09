<template>
  <v-card width="800" color="#E6E6FA">
      <v-card-title>
          <v-btn @click="reniciar" size="x-small" color="blue" icon="mdi-reload" variant="text"></v-btn>
          Seus Pedidos...
      </v-card-title>
      <v-card-text>
        <v-row v-for="(pedido, index) in pedidos" :key="pedido.ID">
          <v-col cols="12">
            <v-card color="#F0F8FF">
              <v-card-title class="d-flex justify-space-between">
                <p>Pedido #{{pedido.ID}}</p>
                <v-icon v-if="pedido.APROVADO == 'T'" color="green-darken-2">
                  <span >mdi-package-variant-closed-check</span>
                </v-icon>
                <v-icon v-else color="red-darken-3">
                  <span >mdi-package-variant-minus</span>
                </v-icon>
              </v-card-title>
              <v-card-subtitle class="text-body-2 d-flex flex-row mb-1
              justify-space-between">
                <div class="d-flex flex-md-row flex-column font-weight-medium">
                  <p class="font-weight-medium" >Data do Pedido : {{pedido.CREATED_AT}}</p>
                  <p class="pl-md-4">Estado :
                    <span class="text-green" v-if="pedido.APROVADO == 'T'">
                      Pago
                    </span>
                    <span class="text-red" v-else>
                      Pendente
                    </span>
                  </p>
                </div>
                <v-btn v-if="!open[index]" @click="openClose(index)" class="mt-n0 pl-0 pl-md-0"
                size="x-small" icon variant="text">
                  <v-icon color="green-darken-4">
                    <span >mdi-arrow-down</span>

                  </v-icon>
                </v-btn>
                <v-btn v-else @click="close(index)" class="mt-n0 pl-0 pl-md-0"
                size="x-small" icon variant="text">
                  <v-icon color="green-darken-4">
                    <span>mdi-arrow-up</span>
                  </v-icon>
                </v-btn>

              </v-card-subtitle>
              <v-card-text v-if="open[index]">

                <div class="d-flex flex-md-row flex-column mt-n5">
                  <p class=" text-body-2 font-weight-medium">Forma de Pagamento : {{pedido.METODO_PAGAMENTO}}</p>
                  <p class="pl-md-10 text-body-2 font-weight-medium">Valor Total : {{parseFloat(pedido.VALOR_TOTAL).
                    toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                </div>
                <v-divider class="mt-2"></v-divider>
                <v-row class="mt-1 mb-1" v-for="produto in pedido.PRODUTOS" :key="produto.ID">
                  <v-col cols="6" sm="4">
                    <v-img max-width="200" :src="produto.IMAGE"></v-img>
                  </v-col>
                  <v-col cols="6" class="d-flex flex-column
                  text-caption text-md-subtitle-1">
                    <p class="font-weight-medium"><b>Nome :</b> {{produto.NOME}}</p>
                    <p class="font-weight-medium"><b>Valor :</b> {{parseFloat(produto.VALOR).
                      toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                    <p class="font-weight-medium"><b>Quantidade :</b> 10 Unidades</p>
                    <p class="font-weight-medium"><b>SubTotal : </b>{{parseFloat(produto.VALOR * 10).
                      toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                  </v-col>
                  <v-divider></v-divider>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref, computed, shallowRef } from 'vue'
  import PedidoComp from '@/CompositionAP/PedidoComp'

  const open = ref([])
  const pedidos  = shallowRef(null)
  const renic = ref(0)

  const {getAllPedidos} =
  PedidoComp()

  function openClose(index){
      open.value[index] = true
  }
  function close(index){
    open.value[index] = false
  }
  function reniciar(){
      getPedidos()
      renic.value += 1
  }
  async function getPedidos(){

    console.log(open.value)
    let payload = { current_page: 1, opcao: null, start: null, end: null,
    search: null, Shop: "T", Precos : null, categoria : null};
    pedidos.value = await getAllPedidos(payload)
    let leng = Object.keys(pedidos).length
    for(let i = 0; i <= leng; i++){
        open.value[i] = false
    }

  }
  getPedidos()
</script>

<style lang="scss" scoped>
  .mod-timeline{
    width: 100%;
    height: 20%;
  }
</style>
