<template>
  <v-container class="fill-height bg-real" fluid>
        <Filtro @search="makeSearch" @searchPage="pageFilter" ></Filtro>
        <v-row color="primary"  class="d-flex justify-center flex-column flex-sm-row mt-2 mt-lg-0" :key="listKey">

            <v-col  v-for="produto in produtos" :key="produto.ID" cols="12" md="4" class="d-flex justify-center " >
              <v-card  width="355px"
                    class="cards corpo-card"
                    elevation="1"

                >
                  <div class="div-img-cad-produto img-card d-flex  justify-center">
                      <v-img
                      :src="produto.IMAGE"
                      height="325px"
                      cover @click="detailProduct(produto.ID)"></v-img>
                  </div>
                  <v-card-title class="text-h5 font-weight-bold desc-detail"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="desc-detail text-justify text-subtitle-1 font-weight-medium">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text  @click="detailProduct(produto.ID)"

                  >
                      <v-row>
                        <v-col cols="12" class="text-caption">
                          <p class=" desc-detail text-body-1 font-weight-medium">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                          <p class=" desc-detail font-weight-medium">Estoque : {{produto.QUANTIDADE}} unidades </p>
                          <p class=" desc-detail font-weight-medium">Categoria : {{produto.NOME_C}}</p>
                        </v-col>

                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                      <v-row>
                        <v-col cols="6">
                          <v-btn class="ml-n1" @click="detailProduct(produto.ID)"
                          color="#B2FFFF" icon="mdi-information-outline">

                          </v-btn>
                          <v-btn color="#03C03C" @click="saveInCarrinho(produto.ID, produto.VALOR)"
                          icon="mdi-cart-outline">

                          </v-btn>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col>
                          <v-btn class="ml-4" color="#03C03C" icon="mdi-whatsapp"></v-btn>
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
  import {ref, shallowRef, computed, watch, defineAsyncComponent} from 'vue'
  import { useProdutoStore } from '@/store/produtoStore'
  import Detail from '@/CompositionAP/CRUD'
  import Carrinho from '@/CompositionAP/Carrinho'
  import { useRouter } from 'vue-router';

  const Filtro = defineAsyncComponent(()=>
    import('@/components/Filtro.vue')
  )

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
  const tmpSea = ref('')
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
      console.log(e.search)
      if(e.search == '' && e.check == null
      && e.categoria == null){
        search.value = null
        precos.value = null
        categoria.value = null
        tmp.value = null
      }else{
        search.value = e.search
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

 async function filterSearch(e, solo){
    if(e.type != 'Search'){
      e.type = 'Search'
    }
    if(e.search.length <= tmpSea.value.length){
      produtos.value = await applyFilter(e, tmp.value)
    }else{
      if(solo){
        produtos.value = await applyFilter(e, produtos.value)
      }else{
        produtos.value = await applyFilter(e, tmp.value)
      }

    }
  }
 async function filterCheck(e, solo){
    if(e.type != 'Check'){
      e.type = 'Check'
    }
    if(solo){
      produtos.value = await applyFilter(e, tmp.value)
    }else{
      produtos.value = await applyFilter(e, produtos.value)
    }

 }

  async function pageFilter(e){

      if(tmp.value == null){
          let sub = await applyFilter(e, produtos.value)
          tmp.value = produtos.value
          produtos.value = sub
      }else{
          if(e.check == undefined &&
          e.categoria == undefined){
            await filterSearch(e, true)
          }else if(e.categoria == undefined && // check + search
            e.check != undefined && e.search != undefined){
              if(e.search != ''){
                await filterSearch(e, false)
              }
              await filterCheck(e, false)
          }else if(e.check != undefined && e.categoria == undefined
          && e.search == undefined){
            await filterCheck(e, true)
          }
      }
      if(e.search != undefined){
        tmpSea.value = e.search // valor tmp para o search
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

</style>
