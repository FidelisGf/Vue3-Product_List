<template>
  <v-container fluid :key="restart"
    class="fill-height"
    :style="isNull(storeApp.getTemas.SECUNDARIA)
    ? '' : storeApp.getTemas.SECUNDARIA"
  >
    <v-row class="d-flex
    justify-space-between mt-0 mt-md-0
    flex-column flex-sm-row mt-n4">
        <v-col class="mt-md-n6" cols=12>
          <v-btn icon @click="returnRoute"
          class="ml-md-n1" variant="text" >
            <v-icon color="white">
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="12" lg="12"
        class="d-flex flex-md-row
        flex-column-reverse ">
          <v-row class="d-flex">
            <v-col  cols="12" md="4" lg="2" xl="2"
            class="d-flex flex-md-column flex-row ">
              <div class="ml-lg-0 ml-md-8 ml-xl-5
              ml-n4 d-flex justify-center flex-row flex-md-column"
               v-for="(cor, index) in produto.CORES" :key="cor.ID"
              >
                <v-sheet
                  :color="cor.HASH"
                  height="45"
                  width="45"
                  rounded
                  @click="saveCor(cor.HASH, index)"
                  active
                  class="ml-7 mt-md-2 mt-0 cores-selec
                  d-flex justify-center align-center"
                >
                <v-icon
                  v-if="choosen[index] == true"
                  color="green"
                >
                  mdi-check
                </v-icon></v-sheet>
              </div>
            </v-col >
            <v-col cols="12" md="5" lg="5" xl="5" class="d-flex
              justify-md-start justify-center">
              <div class="d-flex justify-center
              justify-md-center
              justify-lg-center">
               <ImageZoom
                  :img-normal="produto.IMAGE"
                  :scale="'2.0'"
                  :min_height_md_lg="'230px'"
                  :max_height_md_lg="'348px'"
                  :max_height="'330px'"
                  :min_height="'180px'"
                  :max_height_xl="'400px'"
                  :min_height_xl="'348px'"
               >
               </ImageZoom>
              </div>

            </v-col>
            <v-col cols="12" md="12" lg="5" >
              <v-row>
                <v-col cols="12" class="d-flex justify-center
                flex-column">
                  <p class="desc-detail
                  text-md-h6 text-body-2
                  font-weight-bold ml-md-n3 text-white
                  d-flex justify-center justify-lg-start">
                    {{produto.NOME}}
                    ({{parseFloat(produto.VALOR).
                      toLocaleString('pt-br',{style: 'currency',
                      currency: 'BRL'})}})
                    [{{produto.ESTOQUE}}] {{produto.medida.NOME}}(s).
                  </p>
                  <div class="d-flex justify-lg-start
                  justify-center mt-n4 mt-md-0 mt-lg-n2
                  ml-md-n6  div-rating">
                    <v-rating
                      class="mt-4"
                      v-model="produto.AVALIACAO"
                      bg-color="orange-lighten-1"
                      color="#FFD700"
                      disabled
                      half-increments
                    >
                    </v-rating>
                    <v-tooltip
                      activator="parent"
                      location="start"

                      >Popularidade do item
                    </v-tooltip>
                  </div>
                  <v-btn @click="chooseColor(false)"
                   class="desc-detail
                   text-black ml-sm-n2
                   ml-0 mt-4 mt-md-3 btns-detail" rounded>
                    <v-icon
                      left
                      dark
                      class="mr-6"
                    >
                      mdi-cart
                    </v-icon>
                    <p class="mr-5">Adicionar ao Carrinho</p>

                  </v-btn>
                  <v-btn  @click="chooseColor(true)"
                   class=" desc-detail text-black
                   ml-sm-n2 ml-0 mt-5  btns-detail"
                    rounded>
                    <v-icon
                      left
                      dark
                      class="mr-10"
                    >
                      mdi-shopping-outline
                    </v-icon>
                    <p class="mr-16">Comprar Agora</p>
                  </v-btn>
                  <v-btn @click="goWhats"  rounded
                  class="text-black ml-sm-n2 ml-0 mt-5 btns-detail">
                    <v-icon
                      left
                      dark
                      class="ml-3 "
                    >
                      mdi-whatsapp
                    </v-icon>
                    <p class="ml-6 mt-n1 desc-detail">
                      Tirar duvidas sobre o
                      item
                    </p>
                  </v-btn>

                </v-col>

              </v-row>
            </v-col>
            <v-col cols="12" md="12" lg="12" class="d-flex
            justify-start mt-lg-8 mt-0 ">
              <div class="d-flex flex-column
              ml-0 ml-lg-10 text-detail ">
                <p
                  class="text-justify
                  text-caption
                  text-md-body-1 ml-1
                  font-weight-medium ml-lg-6
                  desc-detail"
                >
                  {{produto.DESC}}...
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="dividers" ></v-divider>
        <v-col cols="12" md="12" class="d-flex mt-lg-6">
            <v-slide-group
              selected-class="bg-success"
              :show-arrows="smAndDown ? false : true"
              center-active
            >
              <v-slide-group-item
                v-for="(produto, index) in produtos"
                :key="produto.ID"

                v-slot="{toggle, selectedClass }"
              >
                <CardProdutos
                    :width-card="smAndDown ?  '180' : '210'"
                    :height-card="smAndDown ? '280' :  '365'"
                    :height-img="smAndDown ? '120' : '180'"
                    :index="index"
                    :produto="produto"
                    @detail-product-esp="detailProduct"
                    :detail="true"
                >
                </CardProdutos>
              </v-slide-group-item>
            </v-slide-group>
        </v-col>
    </v-row>
    <v-dialog
      persistent
      v-model="dialog"
      @keydown.escape="dialog = false"

    >
      <ModalEscCor :produto="produto" @close="close"
      @corEsc="defineCor"
      ></ModalEscCor>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import {ref, defineAsyncComponent, watch} from 'vue'
  import Carrinho from '@/CompositionAP/Carrinho'
  import Detail from '@/CompositionAP/CRUD'
  import ProdutoComp from '@/CompositionAP/ProdutoComp';
  import { useRoute } from 'vue-router';
  import ImageZoom from '@/components/ImageZoom.vue';
  import 'vue-image-zoomer/dist/style.css';
  import { useDisplay } from 'vuetify/lib/framework.mjs';


  const CardProdutos = defineAsyncComponent(()=>
      import('@/components/CardProdutos.vue')
  )

  const ModalEscCor = defineAsyncComponent(()=>
      import('@/components/ModalEscCor.vue')
  )



  const {smAndDown} = useDisplay()

  const {
    saveInCarrinho
  } = Carrinho()



  const {
    findById,
    selecionaCor,
    isNull,
    storeApp,
    router
  } = Detail()

  const {
    getAllProdutos,
    produto,
    produtos,
    tmpAuxiliar
  } = ProdutoComp()

  const route =
  useRoute()

  const restart
  = ref(0)

  const prevRoute
  = ref(null)

  const fRoute
  = ref(null)

  const flag
  = ref(false)

  const dialog
  = ref(false)

  const buy
  = ref(false)

  const selectedColor
  = ref(null)

  const choosen
  = ref([])

  const tmpChosen
  = ref(null)


  await findProduto()



  function close(e){
      dialog.value = e
  }


  async function findProduto(){
      let payload = {Shop : 'T'}
      produto.value = await findById('products', route.params.id,
      payload)
      getProdutos()
      restart.value += 1
  }

  function chooseColor(boolean, index){
    if(selectedColor.value == null){
      dialog.value = true
      buy.value = boolean
    }else{
      saveInCarrinho(produto.value.ID, produto.value.VALOR,
      selectedColor.value)
    }
  }

  function defineCor(e){
      saveInCarrinho(produto.value.ID, produto.value.VALOR, e.color)
      if(buy.value == true){
          router.push('/carrinho')
      }
      if(selectedColor.value == null){
          saveCor(e.color, e.index)
      }
      dialog.value = false
  }


  function goWhats(){
      const url = "https://api.whatsapp.com/send?phone="
      const number = '45998463475'
      const msg = "Boa%20Tarde%20gostaria%20de%20ter%20informações%20sobre%20o%20item%20" +
      produto.value.NOME + "%20Codigo%20" + produto.value.ID
      const end_url = `${url}${number}&text=${msg}`
      window.open(end_url, '_blank').focus();
  }


  function saveCor(cor, index){
      if(tmpChosen.value != index){
        choosen.value[tmpChosen.value] = false
      }
      choosen.value[index] = true
      selectedColor.value = cor
      tmpChosen.value = index
      selecionaCor()
  }

  async function getProdutos(){

    let payload = { current_page: 1, opcao: null,
    start: null, end: null, search: null,
    Shop: "T", Precos : null,
    categoria : produto.value.ID_CATEGORIA};

    if(flag.value){
      produtos.value = tmpAuxiliar.value
      produtos.value = produtos.value
      .filter(o => o.ID !== produto.value.ID)
    }else{
      produtos.value = await getAllProdutos(payload)
      tmpAuxiliar.value = produtos.value
      produtos.value = produtos.value
      .filter(o => o.ID !== produto.value.ID)
    }
    flag.value = true

  }


  async function detailProduct(e){
      console.log(e)
      await router.push({name: 'Produto-Detalhe', params: {id : parseInt(e)}})
      choosen.value[tmpChosen.value] = false
      selectedColor.value = null
      findProduto()
  }



  async function returnRoute(){

    window.location.reload();
    router.go(-1)
    restart.value += 1
  }





</script>

<style lang="scss">
  .card-cores{
      max-width: 500px !important;
      min-width: 300px !important;
  }
  .btns-detail{
    background: #C9CCD3 !important;
    background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%) !important;
    background-blend-mode: lighten !important;
  }

</style>
