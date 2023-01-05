<template>
  <v-container class="fill-height">
    <v-row >
        <v-col cols="12" >
              <v-card
                  dark
              >
                <v-card-title class="mt-2">
                  <div class="d-flex flex-sm-row flex-column">
                    <div class="d-flex flex-row">
                      <v-icon color="green-darken-1" class="mt-sm-0 mt-n1">mdi-cart</v-icon>
                      <p class="text-md-h6 text-caption font-weight-bold ml-3 mt-0">Meu Carrinho...</p>
                    </div>
                  <div class="d-flex flex-row">
                    <v-icon color="green" class="mt-sm-0 mt-2 mt-sm-n1
                      mt-md-0 ml-0 ml-sm-6">
                      mdi-cash
                    </v-icon>
                      <p class="ml-2 text-md-h6 text-caption mt-3 mt-sm-0">Valor total : {{parseFloat(vlTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="finalizarPedido" prepend-icon="mdi-cash" variant="text" class="text-teal-lighten-1 mt-sm-0  mt-2">
                      Finalizar Compra
                  </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-row v-for="produto in itens" :key="produto.ID" class="mt-2">
                    <v-col  cols="12" class="d-flex flex-row justify-start" >
                      <div>
                        <v-img :src="produto.IMAGE"
                          @click="detailProduct(produto.ID)"
                          width="130"
                          height="130"
                          class="imagem"
                        >
                        </v-img>
                        </div>
                          <div class="d-flex flex-column ml-3">
                            <p class="text-h5 font-weight-black">{{produto.NOME}}</p>
                            <p class="text-caption">{{produto.DESC}}</p>
                            <p class="text-caption text-sm-subtitle-1">{{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                            <p class="text-caption text-sm-subtitle-1">
                              <span v-if="produto.QUANTIDADE != 'Indisponivel'">Quantidade : {{produto.QUANTIDADE}} {{produto.medida.NOME}} (s)</span>
                              <span v-else><p class="text-yellow">Sem Estoque</p></span>
                            </p>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="d-flex flex-column justify-center">
                          <v-btn icon variant="text" v-if="produto.QUANTIDADE != 'Indisponivel'" @click="addQuantidadeProduto(produto.ID)"><v-icon>mdi-plus</v-icon></v-btn>
                          <v-btn icon variant="text" v-if="produto.QUANTIDADE != 'Indisponivel'" @click="removeQuantidadeProduto(produto.ID)"><v-icon>mdi-minus</v-icon></v-btn>
                          <v-btn icon variant="text" v-if="produto.QUANTIDADE == 'Indisponivel'" color="red" @click="removeIndis(produto.ID)" ><v-icon>mdi-delete</v-icon></v-btn>
                        </div>
                      </v-col>
                      <v-divider></v-divider>
                  </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store/app'
  import Carrinho from '@/CompositionAP/Carrinho'
  import { useRouter } from 'vue-router';
  const {getProdutosCarrinho
  , addQuantidade, removeQuantidade, removeIndisponivel} =
  Carrinho()


  const router =
  useRouter()
  const itens = ref([])
  const flag = ref(false)
  const vlTotal = computed(()=>
      getValorTotal()
  )

  getCarrinho()


  async function getCarrinho(){
      itens.value = await getProdutosCarrinho()
      flag.value = true
  }
  async function addQuantidadeProduto(ID){
      const dt = await addQuantidade(ID)
      if(dt == 'Success'){
          const item = itens.value.find(o => o.ID == ID )
          if(item){
              item.QUANTIDADE += 1
          }
      }
  }
  function finalizarPedido(){
    const storeApp = useAppStore()
    for(const item of itens.value){
      if(item.QUANTIDADE == 'Indisponivel'){
        storeApp.activeSnack('O carrinho possui itens sem estoque !')
      }else{
        console.log('safe')
      }
    }
  }
  function removeIndis(ID){
      removeIndisponivel(ID)
      itens.value = itens.value.filter(o => o.ID != ID)

  }

  function removeQuantidadeProduto(ID){
      removeQuantidade(ID)
      const item = itens.value.find(o => o.ID == ID)
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
  }
  .imagem:hover{
    transform: scale(1.05);
    transition: 1.2s;
  }
</style>
