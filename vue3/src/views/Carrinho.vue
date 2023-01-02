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
                      <p class="ml-2 text-md-h6 text-caption mt-3 mt-sm-0">Valor total : {{parseFloat(getValorTotal()).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn prepend-icon="mdi-cash" variant="text" class="text-teal-lighten-1 mt-sm-0  mt-2">
                      Finalizar Compra
                  </v-btn>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-row v-for="produto in itens" :key="produto.ID" class="mt-2">
                    <v-col  cols="12" class="d-flex flex-row justify-start" >
                      <div>
                        <v-img :src="produto.IMAGE"
                          width="130"
                          height="130"
                          class="imagem"
                        >
                        </v-img>
                        </div>
                          <div class="d-flex flex-column ml-3">
                            <p class="text-h5 font-weight-black">{{produto.NOME}}</p>
                            <p class="text-caption">{{produto.DESC}}</p>
                            <p class="text-caption text-sm-subtitle-1">R$ {{parseFloat(produto.VALOR).toFixed(2)}}</p>
                            <p class="text-caption text-sm-subtitle-1">Quantidade : {{produto.QUANTIDADE}} {{produto.medida.NOME}} (s)</p>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="d-flex flex-column justify-center">
                          <v-btn icon variant="text" @click="addQuantidadeProduto(produto.ID)"><v-icon>mdi-plus</v-icon></v-btn>
                          <v-btn icon variant="text" @click="removeQuantidadeProduto(produto.ID)"><v-icon>mdi-minus</v-icon></v-btn>
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

<script>
import { useCarrinhoStore } from '@/store/CarrinhoStore'
import Carrinho from '@/components/Mixin/Carrinho'
export default {
    data(){
      return {
          itens : [],
          width : 150,
          height : 250,
          flag : false
      }
    },
    async created(){
        this.itens = await this.getProdutosCarrinho()
    },
    mixins: [Carrinho],
    methods:{
        async getCarrinho(){
            this.itens = await this.getProdutosCarrinho()
            this.flag = true
        },
        addQuantidadeProduto(ID){
          this.addQuantidade(ID)
          const item = this.itens.find(o => o.ID == ID)
          if(item){
            item.QUANTIDADE += 1
          }
        },
        removeQuantidadeProduto(ID){
          this.removeQuantidade(ID)
          const item = this.itens.find(o => o.ID == ID)
          if(item){
            if(item.QUANTIDADE == 1){
              this.itens = this.itens.filter(o => o.ID != ID)
            }else{
              item.QUANTIDADE -= 1
            }

          }
        },
        getValorTotal(){
          if(this.itens != null){
            let total = this.itens.reduce((accumulator, object)=>{
            return parseFloat(accumulator) + (parseFloat(object.VALOR)
            * parseFloat(object.QUANTIDADE)) // separa parseFloat
            },0)
            return total
          }else{
            return 0
          }

        }

    },


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
