<template>
  <v-container class="fill-height" fluid>
        <Filtro @search="makeSearch"></Filtro>
        <v-row   class="d-flex justify-center flex-column flex-sm-row mt-2 mt-lg-0" :key="listKey">

            <v-col  v-for="produto in produtos" :key="produto.ID" cols="12" md="4" class="d-flex justify-center " >
              <v-card width="300px"
                    class="cards mx-auto"
                >
                  <v-img :src="produto.IMAGE"
                  height="200px"
                  cover @click="detailProduct(produto.ID)"></v-img>
                  <v-card-title class="text-h5"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text @click="detailProduct(produto.ID)">
                      <v-row>
                        <v-col cols="12" class="text-caption">
                          <p class="text-body-1">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                          <p>Estoque : {{produto.QUANTIDADE}} unidades </p>
                          <p>Categoria : {{produto.NOME_C}}</p>
                        </v-col>

                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                      <v-row>
                        <v-col cols="6">
                          <v-btn class="ml-n1" @click="detailProduct(produto.ID)" color="blue accent-2" icon="mdi-information-outline">

                          </v-btn>
                          <v-btn color="teal accent-2" @click="saveInCarrinho(produto.ID)" icon="mdi-cart-outline">

                          </v-btn>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col>
                          <v-btn class="ml-4" color="green" icon="mdi-whatsapp"></v-btn>
                        </v-col>
                      </v-row>
                  </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script setup>
  import {ref} from 'vue'
  import { useProdutoStore } from '@/store/produtoStore'
  import Detail from '@/CompositionAP/CRUD'
  import Filtro from '@/components/Filtro.vue'
  import Carrinho from '@/CompositionAP/Carrinho'
  import { useRouter } from 'vue-router';

  const router =
  useRouter()

  const storeApp =
  useProdutoStore()

  const {saveInCarrinho} =
  Carrinho()

  const {getAllList} =
  Detail()

  const produtos = ref(null)
  const tmp = ref("")
  const check = ref("red")
  const listKey = ref(0)
  const search = ref('')
  const precos = ref('')
  const categoria = ref(null)

  getProdutos()
  getCategorias()


  async function getProdutos(){
    listKey.value += 1;
    let payload = { current_page: 1, opcao: null, start: null, end: null,
    search: search.value, Shop: "T", Precos : precos.value, categoria : categoria.value};
    produtos.value = await storeApp.getProdutos(payload);
  }

  async function getCategorias(){
    let payload = {Shop: "T", Precos : precos.value, categoria : categoria.value};
    await getAllList("categorys", payload);
  }

  function detailProduct(id){
    router.push({name: 'Produto-Detalhe', params: {id : id}})
  }

  function makeSearch(e){
      search.value = e.search.toString()
      precos.value = e.check
      categoria.value = e.categoria
      getProdutos()
  }

















</script>

<style lang="scss">
  .cards:hover{
    transform: translate(0px, -1.0px);
    transition: 1.2s;
    box-shadow: 1px 1.8px 8px #69F0AE;
  }






</style>
