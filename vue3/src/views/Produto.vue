<template>
  <v-container class="fill-height"
  :style="isNull(storeApp.getTemas.PRIMARIA)
  ? '' : storeApp.getTemas.PRIMARIA"
  fluid>
    <Filtro @search="makeSearch" @searchPage="pageFilter" ></Filtro>
    <v-row color="primary"
    class="
      justify-center
      flex-row mt-2 mt-lg-0"
    :key="listKey">

      <v-col cols="12"
       class="
        d-flex
        ml-md-14 mt-3 mt-md-0
        justify-center
        justify-md-start"
      >
        <p>{{ tmnho }}
          produto(s)
          encontrado(s)

        </p>
      </v-col>
      <v-col
        v-for="(produto, index) in produtos"
        :key="produto.ID"
        cols="6" md="4" xl="3"

      >


              <v-card
                :width="smAndDown ? '' : '330px'"
                class="cards corpo-card"
                elevation="1"
                :height="smAndDown ? '400' : ''"
              >
              <v-row :key="index" >
                <v-col cols="12"
                  class="img-card
                  justify-center
                  align-content-center"
                >
                  <v-img
                    :src="produto.IMAGE"
                    :height="smAndDown ?  '160px' : '290px'"
                    class="img-detail"
                    @click="detailProduct(produto.ID)"
                    ></v-img>
                </v-col>
              </v-row>
              <v-card-title
                class="mt-3
                text-md-h5
                font-weight-bold
                desc-detail"
                @click="detailProduct(produto.ID)"
              >
                {{produto.NOME}}
              </v-card-title>
              <v-card-subtitle
                class="desc-detail text-justify
                text-sm-subtitle-1
                font-weight-medium"
              >
                {{produto.DESC}}
              </v-card-subtitle>
              <v-card-text
               @click="detailProduct(produto.ID)"
              >
                <v-row>
                  <v-col cols="12"
                  class="text-caption">
                    <p class="desc-detail text-body-1
                    font-weight-medium">

                      Valor : {{parseFloat(produto.VALOR).
                      toLocaleString('pt-br',{style: 'currency',
                      currency: 'BRL'})}}
                    </p>
                    <p class="desc-detail font-weight-medium">
                      Estoque : {{produto.QUANTIDADE}} unidades
                    </p>
                    <p class=" desc-detail font-weight-medium">
                      Categoria : {{produto.NOME_C}}
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                  <v-row >
                    <v-col cols="12" sm="6" :align="smAndDown ? 'center' : 'start' ">
                      <v-btn class="ml-n1"
                       @click="detailProduct(produto.ID)"
                        color="#B2FFFF"
                        icon="mdi-information-outline">
                      </v-btn>
                      <v-btn color="#03C03C"
                       @click="defineCor(produto)"
                        icon="mdi-cart-outline"
                      >
                      </v-btn>
                      <v-btn v-if="smAndDown" class="ml-md-4"
                        color="#03C03C"
                        icon="mdi-whatsapp"
                      >
                      </v-btn>
                    </v-col>
                    <v-spacer v-if="!smAndDown"></v-spacer>
                    <v-col cols="3">
                      <v-btn v-if="!smAndDown" class="ml-md-4"
                        color="#03C03C"
                        icon="mdi-whatsapp"
                      >
                      </v-btn>
                    </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row >
        <v-col cols="12"
          class="justify-center">
          <v-pagination
            color="teal lighten-1"
            v-model="current_page"
            :length="lastPage"
            :total-visible="5"
          >
        </v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import {ref, watch, defineAsyncComponent} from 'vue'
  import Detail from '@/CompositionAP/CRUD'
  import Carrinho from '@/CompositionAP/Carrinho'
  import ProdutoComp from '@/CompositionAP/ProdutoComp'
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/store/app';
  import { useDisplay } from 'vuetify/lib/framework.mjs';

  const {
    smAndDown
  }
  = useDisplay()

  const Filtro = defineAsyncComponent(()=>
    import('@/components/Filtro.vue')
  )

  const router =
  useRouter()

  const storeApp =
  useAppStore()


  const {
    getAllProdutos,
    produtos,
    tmp,
    lastPage,
    categoria,
    current_page } = ProdutoComp()

  const {
    saveInCarrinho} = Carrinho()

  const {
    getAllList,
    applyFilter,
    findById,
    isNull} = Detail()


  const tmpSea = ref('')
  const listKey = ref(0)
  const search = ref('')
  const precos = ref('')
  const isActive = ref([])
  const tmnho = ref(null)


  watch(current_page, () => {
    getProdutos()
  })

  getCategorias()

  async function makeSearch(e){
      if(e.search == '' && e.check == null
      && e.categoria == null){
        search.value
        = precos.value =
        categoria.value =
        tmp.value = null
      }else{
        search.value = e.search
        precos.value = e.check
        categoria.value = e.categoria
      }
      await getProdutos()
  }

  async function defineCor(produto){
    let payload = {Shop : 'T'}
    let cor = await
    findById('getOneColorOfProduct',
    produto.ID, payload)
    saveInCarrinho(produto.ID, produto.VALOR, cor[0].HASH)
  }

  async function getProdutos(){
    listKey.value += 1;
    let payload = {current_page: current_page.value,
    search: search.value, Shop: "T",
    Precos : precos.value, categoria : categoria.value};
    produtos.value = await getAllProdutos(payload)
    tmnho.value = produtos.value.length
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
        tmpSea.value = e.search
      }
      tmnho.value = produtos.value.length
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
  .img-detail{
      max-width: 380px !important;
  }
</style>
