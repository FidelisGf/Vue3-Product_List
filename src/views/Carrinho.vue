<template>
  <v-container class="fill-height"
   fluid :style="isNull(storeApp.getTemas.PRIMARIA) ? ''
   : storeApp.getTemas.PRIMARIA">
    <v-row class="line">
        <v-col cols="12" :key="reni" class="mt-n8 ml-n0">
              <v-card
                  dark
                  elevation="4"
                  :style="isNull(storeApp.getTemas.CARD_PEDIDOS) ? ''
                  : storeApp.getTemas.CARD_PEDIDOS"
              >
                <v-card-title>
                  <div class="d-flex flex-sm-row flex-column">
                    <div class="d-flex flex-row">
                      <v-icon color="#2E7D32"
                      class="mt-sm-0 mt-n1">mdi-cart</v-icon>
                      <p class="text-md-h6
                      text-caption font-weight-bold ml-3 mt-0
                      desc-detail">Meu Carrinho...</p>
                    </div>
                  <div class="d-flex flex-row">
                    <v-icon color="#2E7D32"
                      class="mt-sm-0 mt-2
                      mt-sm-n1
                      mt-md-1 ml-0 ml-sm-6 desc-detail"
                    >
                      mdi-cash
                    </v-icon>
                      <p
                      class="ml-2 text-md-h6 text-caption
                      font-weight-bold mt-3 mt-sm-0
                      desc-detail">
                        Valor total : {{parseFloat(vlTotal)
                        .toLocaleString('pt-br',{style: 'currency',
                        currency: 'BRL'})}}
                      </p>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="finalizarPedido"
                  prepend-icon="mdi-cash" variant="text"
                  class="mt-sm-0  mt-2" >
                      Finalizar Lista
                  </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <TransitionGroup name="list" tag="ul">
                    <v-row v-for="(produto, index) in itens"
                    :key="produto.ID" class="mt-2">
                      <v-col  cols="12"
                      class="d-flex flex-row justify-start" >
                        <div class="bg-img">
                          <v-img :src="produto.IMAGE"
                            @click="detailProduct(produto.ID)"

                            width="135"
                            height="135"
                            class="imagem"
                          >
                          </v-img>
                          </div>
                            <div class="d-flex flex-column ml-3">
                              <p class="text-h5
                              font-weight-medium desc-detail">
                                {{produto.NOME}}
                              </p>
                              <p class="text-caption
                              text-sm-subtitle-1 desc-detail
                              font-weight-medium">
                                {{parseFloat(produto.VALOR).
                                  toLocaleString('pt-br',{style:
                                  'currency', currency: 'BRL'})}}
                              </p>
                              <p class="text-caption
                              text-sm-subtitle-1 desc-detail
                              font-weight-medium">
                                <span
                                  v-if="produto.QUANTIDADE !=
                                  'Indisponivel'"
                                >
                                  Quantidade : {{produto.QUANTIDADE}}
                                   {{produto.medida.NOME}} (s)
                                </span>
                                <span v-else>
                                  <p class="text-yellow desc-detail">
                                    Sem Estoque
                                  </p>
                                </span>
                              </p>
                              <div class="d-flex flex-row">
                                <p class="text-caption
                                text-sm-subtitle-1
                                font-weight-medium desc-detail">
                                  Cor:
                                </p>
                                <v-sheet
                                  :color="produto.COR_ESCOLHIDA"
                                  height="20"
                                  width="20"
                                  elevation="2"
                                  class="ml-2 ml-md-3 mt-md-1 cores"
                                ></v-sheet>
                              </div>
                          </div>
                          <v-spacer></v-spacer>
                          <div class="d-flex flex-column
                           justify-center">
                            <v-btn icon variant="text"
                            v-if="produto.QUANTIDADE != 'Indisponivel'"
                            color="#2E7D32"
                            @click="addQuantidadeProduto(index)">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn icon variant="text"
                              v-if="produto.QUANTIDADE
                              != 'Indisponivel'"
                              color="#FF033E"
                              @click="removeQuantidadeProduto(index)"
                            >
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <v-btn icon variant="text"
                              v-if="produto.QUANTIDADE ==
                             'Indisponivel'"
                              color="red" @click="removeIndis(index)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                  </TransitionGroup>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog
        persistent
        v-model="dialog"
        @keydown.escape="dialog = false"
        transition="dialog-bottom-transition"
    >
      <ModalConfPedido @fechar="fechaModal"
      :vl-total="vlTotal"></ModalConfPedido>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import {ref} from 'vue'
  import { useAppStore } from '@/store/app'
  import Carrinho from '@/CompositionAP/Carrinho'
  import { useRouter } from 'vue-router';
  import ModalConfPedido from '@/components/ModalConfPedido.vue';

  const {
  getProdutosCarrinho
  ,addQuantidade,
  removeQuantidade,
  removeIndisponivel ,
  itens,
  isNull,
  vlTotal} = Carrinho()



  const router =
  useRouter()

  const dialog = ref(false)
  const flag = ref(false)
  const reni = ref(0)
  const storeApp = useAppStore()


  getCarrinho()

  function fechaModal(e){
    dialog.value = e
    getCarrinho()
    reni.value += 1
  }


  async function getCarrinho(){
    itens.value = await getProdutosCarrinho()
    console.log(itens.value)
    flag.value = true
  }


  async function addQuantidadeProduto(index){
    const dt = await addQuantidade(index)
    if(dt == 'Success'){
      const item = itens.value[index]
      if(item){
        item.QUANTIDADE += 1
      }
    }
  }

  function finalizarPedido(){

    if(itens.value == null || itens.value.length == 0){
      storeApp.activeSnack('O carrinho não possui nenhum item !')
      return
    }
    for(const item of itens.value){
      if(item.QUANTIDADE == 'Indisponivel'){
        storeApp.activeSnack('O carrinho possui itens sem estoque !')
        return
      }
    }
    dialog.value = true
  }


  function removeIndis(index){
    removeIndisponivel(index)
    const item = itens.value[index]
    if(item){
      itens.value = itens.value.filter(o => o != item)
    }
  }

  function removeQuantidadeProduto(index){
    removeQuantidade(index)
    const item = itens.value[index]
    if(item){
      if(item.QUANTIDADE == 1){
        itens.value = itens.value.filter(o => o != item)
      }else{
        item.QUANTIDADE -= 1
      }
    }
  }
  function detailProduct(id){
    router.push({name: 'Produto-Detalhe', params: {id : id}})
  }
</script>

<style lang="scss" scoped>
  .imagem{
    box-shadow: 0px 0px 0px #080808;
    background: transparent !important;
  }
  .imagem:hover{
    transform: scale(1.05);
    transition: 1.2s;
  }
  .bg-carrinho{
    background: linear-gradient(to right, #253557, #1f365c);

  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .auto{
    color : rgb(255, 252, 252) !important;
    font-weight: bold !important;
  }
  .line{
    display: flex !important;
    align-items: start !important;
    min-height: 100vh !important;
  }


</style>
