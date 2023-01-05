<template>
  <v-container class="fill-height bg-real" fluid>
        <Filtro @search="makeSearch" @searchPage="filterOnPage"></Filtro>
        <v-row color="primary"  class="d-flex justify-center flex-column flex-sm-row mt-2 mt-lg-0" :key="listKey">

            <v-col  v-for="produto in produtos" :key="produto.ID" cols="12" md="4" class="d-flex justify-center " >
              <v-card   width="320px"
                    class="cards mx-auto corpo-card"
                    elevation="1"

                >
                  <v-img :src="produto.IMAGE"
                  height="230px"
                  class="img-card"
                  cover @click="detailProduct(produto.ID)"></v-img>
                  <v-card-title class="text-h5 font-weight-bold"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1 font-weight-medium">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text  @click="detailProduct(produto.ID)"

                  >
                      <v-row>
                        <v-col cols="12" class="text-caption">
                          <p class="text-body-1 font-weight-medium">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                          <p class="font-weight-medium">Estoque : {{produto.QUANTIDADE}} unidades </p>
                          <p class="font-weight-medium">Categoria : {{produto.NOME_C}}</p>
                        </v-col>

                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                      <v-row>
                        <v-col cols="6">
                          <v-btn class="ml-n1" @click="detailProduct(produto.ID)" color="blue-darken-4" icon="mdi-information-outline">

                          </v-btn>
                          <v-btn color="teal-darken-3" @click="saveInCarrinho(produto.ID)" icon="mdi-cart-outline">

                          </v-btn>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col>
                          <v-btn class="ml-4" color="green-darken-3" icon="mdi-whatsapp"></v-btn>
                        </v-col>
                      </v-row>
                  </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-row">
            <v-col cols="12" class="d-flex flex-row justify-center">
              <v-pagination
                color="teal lighten-1"
                v-model="current_page"
                  :length="storeApp.getLastPage"
                  :total-visible="5"
                >
              </v-pagination>
            </v-col>
        </v-row>

  </v-container>
</template>

<script setup>
  import {ref, shallowRef, computed, watch} from 'vue'
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

  const {getAllList, applyFilter} =
  Detail()

  const current_page = ref(1)
  current_page.value = storeApp.getCurrent_Page

  const totalPage = computed(()=>
    storeApp.getLastPage
  )

  const produtos = shallowRef(null)
  const tmp = shallowRef(null)
  const check = ref("red")
  const listKey = ref(0)
  const search = ref('')
  const precos = ref('')
  const categoria = shallowRef(null)
  const flagFiltroPagina = ref(false)


  watch(current_page, (val) => {
    getProdutos()
  })

  getCategorias()


  function makeSearch(e){

      if(e == undefined || e == null){
        search.value = null
        precos.value = null
        categoria.value = null
        tmp.value = null
      }else{
        if(e.search != null){
          search.value = e.search.toString()
        }
        precos.value = e.check
        categoria.value = e.categoria

      }
      getProdutos()

  }


  async function getProdutos(){

    listKey.value += 1;
    let payload = { current_page: current_page.value, opcao: null, start: null, end: null,
    search: search.value, Shop: "T", Precos : precos.value, categoria : categoria.value};
    produtos.value = await storeApp.getProdutos(payload);
  }

  function filterOnPage(e){
      if(tmp.value == null){
          let sub = applyFilter(e, produtos.value)
          tmp.value = produtos.value
          produtos.value = sub
      }else{

          if(e.type != 'Check' && flagFiltroPagina.value == false
          && e.check == 0 && e.categoria != null){
            console.log('1')
            produtos.value = applyFilter(e, tmp.value)
          }else{

            if(e.search != undefined && e.check != ''
            ){
              console.log('2')
              let pl = {search : e.search, type : 'Search'}
              let pl2 = {check : e.check, type : 'Check'}
              produtos.value = applyFilter(pl, tmp.value)
              produtos.value = applyFilter(pl2, produtos.value)

              if(e.categoria != null || e.categoria != undefined){
                  let pl3 = {categoria : e.categoria, type : 'Cat'}
                  produtos.value = applyFilter(pl3, produtos.value)
              }


            }else if(e.search == undefined && e.categoria != null){


              let pl = {check : e.check, type : 'Check'}
              produtos.value = applyFilter(pl, tmp.value)
              let pl3 = {categoria : e.categoria, type : 'Cat'}
              produtos.value = applyFilter(pl3, produtos.value)


            }else if(e.check == undefined && e.categoria != null ){

              let pl2 = {check : e.check, type : 'Check'}
              produtos.value = applyFilter(pl2, produtos.value)
              let pl3 = {categoria : e.categoria, type : 'Cat'}
              produtos.value = applyFilter(pl3, produtos.value)
            }else if( e.categoria == null
            && e.search == undefined ){
              let pl2 = {check : e.check, type : 'Check'}
              produtos.value = applyFilter(pl2, tmp.value)
            }
            else{


              if(e.categoria != null){
                let pl3 = {categoria : e.categoria, type : 'Cat'}
                produtos.value = applyFilter(pl3, tmp.value)
              }else{
                produtos.value = tmp.value
              }
            }
          }
      }
  }

  async function getCategorias(){
    let payload = {Shop: "T", Precos : precos.value, categoria : categoria.value};
    await getAllList("categorys", payload);
  }

  function detailProduct(id){
    router.push({name: 'Produto-Detalhe', params: {id : id}})
  }



















</script>

<style lang="scss">
  .cards:hover{
    transform: translate(1px, -2.0px);
    transition: 1.2s;
    box-shadow: 2px 5.2px 8px #141414 !important;
  }
  .corpo-card{
    background: #E1EBEE !important;

  }
  .img-card{
    background: white !important;
  }
  .bg-real{
    background : #F0F8FF !important
  }





</style>
