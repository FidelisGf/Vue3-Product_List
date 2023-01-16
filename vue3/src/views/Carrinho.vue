<template>
  <v-container class="fill-height bg-carrinho" fluid>
    <v-row >
        <v-col cols="12" :key="reni" >
              <v-card
                  dark
                  elevation="4"
                  color="#F0F8FF"
              >
                <v-card-title class="mt-2">
                  <div class="d-flex flex-sm-row flex-column">
                    <div class="d-flex flex-row">
                      <v-icon color="#228B22" class="mt-sm-0 mt-n1">mdi-cart</v-icon>
                      <p class="text-md-h6 text-caption font-weight-bold ml-3 mt-0">Meu Carrinho...</p>
                    </div>
                  <div class="d-flex flex-row">
                    <v-icon color="#228B22" class="mt-sm-0 mt-2 mt-sm-n1
                      mt-md-0 ml-0 ml-sm-6">
                      mdi-cash
                    </v-icon>
                      <p class="ml-2 text-md-h6 text-caption font-weight-bold mt-3 mt-sm-0">Valor total : {{parseFloat(vlTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="finalizarPedido" prepend-icon="mdi-cash" variant="text"
                  class="finalizar mt-sm-0  mt-2">
                      Finalizar Lista
                  </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <TransitionGroup name="list" tag="ul">
                    <v-row v-for="produto in itens" :key="produto.ID" class="mt-2">
                      <v-col  cols="12" class="d-flex flex-row justify-start" >
                        <div class="bg-img">
                          <v-img :src="produto.IMAGE"
                            @click="detailProduct(produto.ID)"

                            width="125"
                            height="125"
                            class="imagem"
                          >
                          </v-img>
                          </div>
                            <div class="d-flex flex-column ml-3">
                              <p class="text-h5 font-weight-black">{{produto.NOME}}</p>
                              <p class="text-caption text-sm-subtitle-1 font-weight-bold">{{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                              <p class="text-caption text-sm-subtitle-1 font-weight-bold">
                                <span v-if="produto.QUANTIDADE != 'Indisponivel'">Quantidade : {{produto.QUANTIDADE}} {{produto.medida.NOME}} (s)</span>
                                <span v-else><p class="text-yellow">Sem Estoque</p></span>
                              </p>
                              <div class="d-flex flex-row">
                                <p class="text-caption text-sm-subtitle-1 font-weight-bold">Cor: </p>
                                <v-sheet
                                  :color="produto.COR_ESCOLHIDA"
                                  height="20"
                                  width="20"
                                  elevation="2"
                                  class="ml-2 ml-md-3 mt-md-1  cores"
                                ></v-sheet>
                              </div>
                          </div>
                          <v-spacer></v-spacer>
                          <div class="d-flex flex-column justify-center">
                            <v-btn icon variant="text" v-if="produto.QUANTIDADE != 'Indisponivel'" color="#228B22" @click="addQuantidadeProduto(produto.ID, produto.COR_ESCOLHIDA)"><v-icon>mdi-plus</v-icon></v-btn>
                            <v-btn icon variant="text" v-if="produto.QUANTIDADE != 'Indisponivel'" color="#228B22" @click="removeQuantidadeProduto(produto.ID, produto.COR_ESCOLHIDA)"><v-icon>mdi-minus</v-icon></v-btn>
                            <v-btn icon variant="text" v-if="produto.QUANTIDADE == 'Indisponivel'" color="red" @click="removeIndis(produto.ID)" ><v-icon>mdi-delete</v-icon></v-btn>
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
      <ModalConfPedido @fechar="fechaModal" :vl-total="vlTotal"></ModalConfPedido>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store/app'
  import Carrinho from '@/CompositionAP/Carrinho'
  import { useRouter } from 'vue-router';
  import ModalConfPedido from '@/components/ModalConfPedido.vue';
import { isArray } from '@vue/shared';
  const {getProdutosCarrinho
  , addQuantidade, removeQuantidade, removeIndisponivel, finalizaPedido} =
  Carrinho()


  const router =
  useRouter()
  const itens = ref([])
  const dialog = ref(false)
  const flag = ref(false)
  const reni = ref(0)
  const vlTotal = computed(()=>
      getValorTotal()
  )


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
  async function addQuantidadeProduto(ID, COR){
      let payload = {ID : ID, COR : COR}
      const dt = await addQuantidade(payload)
      if(dt == 'Success'){
          const item = itens.value.filter(o => o.ID == ID)
          if(item){
            console.log(item)
            const i = item.find(o => o.COR_ESCOLHIDA = COR)
            i.QUANTIDADE += 1
          }
      }
  }

  function finalizarPedido(){
    const storeApp = useAppStore()
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
    //finalizaPedido()
  }
  function removeIndis(ID){
      removeIndisponivel(ID)
      itens.value = itens.value.filter(o => o.ID != ID)
  }

  function removeQuantidadeProduto(ID, COR){
      removeQuantidade(ID)
      const item = itens.value.find(o => o.ID == ID, e => e.COR == COR)
      if(item){
        if(item.QUANTIDADE == 1){
            itens.value = itens.value.filter(o => o.ID != ID)
        }else{
          item.QUANTIDADE -= 1
        }
      }
  }
  function getValorTotal(){
    if(itens.value != null){
      let total = itens.value.reduce((accumulator, object)=>{
      return parseFloat(accumulator) + (parseFloat(object.VALOR)
        * (object.QUANTIDADE != 'Indisponivel' ? parseFloat(object.QUANTIDADE) : 1)) // separa parseFloat
      },0)
      if(isNaN(total)){
        return 0
      }else{
        return total
      }
    }else{
        return 0
      }
  }
  function detailProduct(id){
    router.push({name: 'Produto-Detalhe', params: {id : id}})
  }





</script>

<style lang="scss" scoped>
  .imagem{
    box-shadow: 1px 1.8px 8px #080808;
    background: white !important;
  }
  .imagem:hover{
    transform: scale(1.05);
    transition: 1.2s;
  }
  .bg-carrinho{
    background: #B9D9EB !important;

  }
  .finalizar{
      color : #228B22 !important;
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

</style>
