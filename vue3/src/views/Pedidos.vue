<template>
  <v-card width="800" :style="storeApp.getTemas.CARDS_PERFIL">
      <v-card-title>
          <v-btn @click="reniciar" size="x-small" color="yellow" icon="mdi-reload" variant="text"></v-btn>
          Seus Pedidos...
      </v-card-title>
      <v-card-text>
        <v-row v-for="(pedido, index) in pedidos" :key="pedido.ID">
          <v-col cols="12">
            <v-card :style="storeApp.getTemas.CARD_PEDIDOS">
              <v-card-title class="d-flex justify-space-between desc-detail">
                <p>Pedido #{{pedido.ID}}</p>
                <v-icon v-if="pedido.APROVADO == 'T'" color="#03C03C">
                  mdi-package-variant-closed-check
                </v-icon>
                <v-icon v-else color="yellow">
                  mdi-package-variant-minus
                </v-icon>
              </v-card-title>
              <v-card-subtitle class="text-body-2 d-flex flex-row mb-1
              justify-space-between desc-detail">
                <div class="d-flex flex-md-row flex-column font-weight-medium">
                  <p class="font-weight-medium" >Data do Pedido : {{pedido.CREATED_AT}}</p>
                  <p class="pl-md-4">Estado :
                    <span class="text-green" v-if="pedido.APROVADO == 'T'">
                      Pago
                    </span>
                    <span class="text-pendente font-weight-tin" v-else>
                      Pagamento pendente !
                    </span>
                  </p>
                </div>
                <v-btn v-if="!open[index]" @click="openClose(index, pedido.ID)"
                class="mt-n0 pl-0 pl-md-0"
                size="x-small" icon variant="text">
                  <v-icon color="#03C03C">
                    mdi-arrow-down
                  </v-icon>
                </v-btn>
                <v-btn v-else @click="close(index)" class="mt-n0 pl-0 pl-md-0"
                size="x-small" icon variant="text">
                  <v-icon color="#03C03C">
                    mdi-arrow-up
                  </v-icon>
                </v-btn>

              </v-card-subtitle>
              <Transition name="fade" :duration="300" :key="prodKey">
                <v-card-text v-if="open[index]" >

                  <div class="d-flex flex-md-row flex-column mt-n5 desc-detail">
                    <p class=" text-body-2 font-weight-medium desc-detail">
                      Forma de Pagamento :
                      {{pedido.METODO_PAGAMENTO}}
                    </p>
                    <p class="pl-md-8 text-body-2 font-weight-medium desc-detail">
                      Valor Total :
                      <span v-if="pedido.ID_CUPOM != null">
                        {{pedido.VlTemp.
                        toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                      </span>
                      <span v-else>
                        {{parseFloat(pedido.VALOR_TOTAL).
                        toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                      </span>
                    </p>
                    <p class="pl-md-8 text-body-2 font-weight-medium desc-detail">
                      Desconto :
                      <span v-if="pedido.ID_CUPOM != null">
                        {{parseInt(pedido.DESCONTO)}}%
                      </span>
                      <span v-else>
                        R$ 0,00
                      </span>
                    </p>
                    <p class="pl-md-8 text-body-2 font-weight-medium desc-detail">
                      Subtotal :
                      {{parseFloat(pedido.VALOR_TOTAL).
                      toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                    </p>
                  </div>
                  <v-divider class="mt-2"></v-divider>
                  <v-row class="mt-1 mb-1" v-for="(produto, index) in pedido.PRODUTOS">
                    <v-col cols="6" sm="4" >
                      <v-img max-width="200" :src="produto.IMAGE"></v-img>
                    </v-col>
                    <v-col cols="6" class="d-flex flex-column
                    text-caption text-md-subtitle-1" >
                      <p class="font-weight-medium desc-detail">
                        <b>Nome :</b>
                        {{produto.NOME}}
                      </p>
                      <p class="font-weight-medium desc-detail">
                        <b>Valor :</b>
                        {{parseFloat(produto.VALOR).
                        toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                      </p>
                      <p class="font-weight-medium desc-detail">
                        <b>Quantidade :</b>
                        {{produto.QUANTIDADE}} unidade(s)
                      </p>
                      <p class="font-weight-medium desc-detail">
                        <b>SubTotal : </b>
                        {{parseFloat(produto.VALOR * produto.QUANTIDADE).
                        toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                      </p>
                      <div class="d-flex flex-row desc-detail">
                        <p class="text-caption text-sm-subtitle-1 font-weight-bold
                        desc-detail">Cor: </p>
                        <v-sheet

                          :color="produto.COR_ESCOLHIDA"
                          height="20"
                          width="20"
                          elevation="2"
                          class="ml-1 ml-md-1 mt-md-1 mt-sm-1 mt-0  cores"
                        ></v-sheet>
                      </div>
                      <v-rating
                        :key="alteraNota"
                        class="ml-n1"
                        v-model="produto.AVALIACAO"
                        bg-color="orange-lighten-1"
                        color="#FFD700"
                        density="compact"
                        v-on:change="avaliou($event, produto.ID)"
                        half-increments
                      >
                      </v-rating>
                    </v-col>
                    <v-divider></v-divider>
                  </v-row>

                </v-card-text>
              </Transition>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
  </v-card>
</template>

<script setup>
  import {ref} from 'vue'
  import PedidoComp from '@/CompositionAP/PedidoComp'
  import CrudComp from '@/CompositionAP/CRUD';
  import { useAppStore } from '@/store/app';

  const storeApp = useAppStore()
  const renic = ref(0)
  const alteraNota = ref(0)
  const prodKey = ref(0)

  const {
    getAllPedidos,
    pedidos,
    open} = PedidoComp()

  const {
    post,
    findById} = CrudComp()



  async function openClose(index,id){
      open.value[index] = true
      let payload = {Shop : null}
      let pedido = pedidos.value.find(o => o.ID == id)
      if(pedido){
        pedido.PRODUTOS = await findById('getProdutosFromPedidos', pedido.ID, payload)
      }
      prodKey.value += 1
  }
  function close(index){
    open.value[index] = false

  }
  function reniciar(){
      getPedidos()
      renic.value += 1
  }

 async function avaliou(e, id){
      let payload = {NOTA : e.target.value, ID_PRODUTO : id}
      await post('avaliacoes', payload)
      alteraNota.value += 1
  }

  async function getPedidos(){
    let payload = { current_page: 1, opcao: null, start: null, end: null,
    search: null, Shop: "T", Precos : null, categoria : null};
    pedidos.value = await getAllPedidos(payload)
    console.log(pedidos.value)
    let leng = Object.keys(pedidos).length
    for(let i = 0; i <= leng; i++){
        open.value[i] = false
    }
  }


  getPedidos()
</script>

<style lang="scss" >
  .mod-timeline{
    width: 100%;
    height: 20%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .text-pendente{
    color : #ffef09 !important;
  }
</style>
