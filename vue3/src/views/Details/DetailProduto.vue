<template>
  <v-container fluid :key="restart" class="princip fill-height">
    <v-row class="d-flex justify-space-between mt-0 mt-md-0 flex-column flex-sm-row mt-n4">
        <v-col class="mt-md-n6" cols=12>
          <v-btn icon @click="returnStore"
          class="ml-md-n1" variant="text" >
            <v-icon color="white">
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="12" lg="8" class="d-flex flex-md-row flex-column-reverse ">
          <v-row class="d-flex">
            <v-col  cols="12" md="4" lg="2" xl="2" class="d-flex flex-md-column flex-row ">
              <div class="ml-lg-0 ml-md-8 ml-xl-5 ml-n4 d-flex justify-center flex-row flex-md-column"
               v-for="(cor, index) in produto.CORES" :key="cor.ID"
              >
                <v-sheet
                  :color="cor.HASH"
                  height="45"
                  width="45"
                  rounded
                  @click="saveCor(cor.HASH, index)"
                  active
                  class="ml-7 mt-md-2 mt-0 cores-selec d-flex justify-center align-center"
                ><v-icon v-if="choosen[index] == true" color="green">mdi-check</v-icon></v-sheet>
              </div>
            </v-col >
            <v-col cols="12" md="5" lg="5" xl="5" class="d-flex justify-start ">
              <div class="mod-imagem">
                <inner-image-zoom
                :src="url"
                :zoomSrc="url"
                :zoomScale="0.9"
                :fadeDuration="150"
                class="img ml-lg-n12  ml-md-n12 ml-0 "
                :hideHint="true"
                ></inner-image-zoom>
              </div>

            </v-col>
            <v-col cols="12" md="12" lg="4" xl="4" class="d-flex justify-md-center justify-start mt-lg-0 mt-0 mt-md-2">
              <div class="d-flex flex-column  ml-0 ml-lg-n6 ml-xl-0 text-detail ">
                <p class="desc-detail text-md-h5 text-h6 font-weight-bold ml-lg-n2 text-white ">{{produto.NOME}}
                   ({{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}})
                </p>
                <p class="text-justify text-caption text-md-subtitle-1 ml-1 font-weight-medium ml-lg-n0
                desc-detail">
                  {{produto.DESC}}...
                </p>
                <p class="desc-detail text-justify text-md-h6 text-subtitle-1 ml-1 font-weight-bold ml-lg-n0">
                  [{{produto.ESTOQUE}}] {{produto.medida.NOME}}(s) em estoque.
                </p>

              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer ></v-spacer>
        <v-col cols="12" md="12" lg="4" class="d-flex">
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-lg-start justify-center mt-n4 mt-md-0 mt-lg-n2  ml-md-n6  div-rating">

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
                <v-btn @click="chooseColor(false)" block
                 class="desc-detail text-black ml-sm-n2 ml-0 mt-4 mt-md-3 btns" rounded>
                  <v-icon
                    left
                    dark
                    class="mr-6"
                  >
                    mdi-cart
                  </v-icon>
                  <p class="mr-5">Adicionar ao Carrinho</p>

                </v-btn>
                <v-btn block @click="chooseColor(true)"
                 class=" desc-detail text-black ml-sm-n2 ml-0 mt-5  btns" rounded>
                  <v-icon
                    left
                    dark
                    class="mr-10"
                  >
                    mdi-shopping-outline
                  </v-icon>
                  <p class="mr-16">Comprar Agora</p>
                </v-btn>
                <v-btn @click="goWhats" block rounded  class="text-black ml-sm-n2 ml-0 mt-5 btns">
                  <v-icon
                    left
                    dark
                    class="ml-3 "
                  >
                    mdi-whatsapp
                  </v-icon>
                  <p class="ml-6 mt-n1 desc-detail">Tirar duvidas sobre o
                    item</p>
                </v-btn>

              </v-col>

            </v-row>
        </v-col>
        <v-divider class="dividers" ></v-divider>
        <v-col cols="12" md="12" class="d-flex mt-lg-6">
            <v-slide-group
              selected-class="bg-success"
              :show-arrows="false"
              center-active
            >
              <v-slide-group-item
                v-for="produto in produtos"
                :key="produto.ID"

                v-slot="{toggle, selectedClass }"
              >
                <v-card

                  :class="['ma-3', selectedClass, 'cards', 'corpo-card'] "
                  min-height="365"
                  max-width="250"
                  min-width="220"
                  max-height="395"

                  @click="toggle"

                >
                  <div class="div-img-cad-detail">
                    <v-img :src="produto.IMAGE"
                    height="220px"
                    cover @click="detailProduct(produto.ID)" class="img-card"></v-img>
                  </div>

                  <v-card-title class=" text-h5 font-weight-bold"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1 font-weight-medium">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" class="text-caption">
                        <p class="text-body-1 font-weight-medium">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                        <p class="font-weight-medium">Estoque : {{produto.QUANTIDADE}} unidades </p>
                        <p class="font-weight-medium">Categoria : {{produto.NOME_C}}</p>
                      </v-col>

                    </v-row>
                </v-card-text>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
        </v-col>
    </v-row>
    <v-dialog
      persistent
      v-model="dialog"
      @keydown.escape="dialog = false"

    >
      <div class="d-flex justify-center">
        <v-card class="card-cores" >

          <v-card-title class="text-body-2 d-flex justify-space-between">
            <small class="ml-1">Escolha a cor</small>
          </v-card-title>
            <v-card-text>
              <v-row class="d-flex ml-1 flex-row">
                <v-col
                class="d-flex justify-start"
                v-for="(cor, index ) in produto.CORES" :key="cor.ID">
                  <v-sheet
                    :color="cor.HASH"
                    height="50"
                    width="50"
                    @click="defineColor(cor.HASH, index)"
                    elevation="2"
                    class="ml-md-0  cores-selec"
                  ></v-sheet>
                  <small class="ml-2">{{cor.ESTOQUE}} Unidades(s)</small>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
              <v-btn @click="dialog = false" color="red"
              variant="text" size="small">
                Fechar
              </v-btn>
            </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import {ref, watch, shallowRef} from 'vue'
  import Carrinho from '@/CompositionAP/Carrinho'
  import Detail from '@/CompositionAP/CRUD'
  import { useProdutoStore } from '@/store/produtoStore'
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import InnerImageZoom from 'vue-inner-image-zoom'
  import 'vue-image-zoomer/dist/style.css';
  const router = useRouter()

  const storeApp =
  useProdutoStore()

  const {saveInCarrinho} =
  Carrinho()

  const {findById, selecionaCor} =
  Detail()

  const route = useRoute()
  const produto = ref(null)
  const url = ref(null)
  const produtos = shallowRef([])
  const tmpAuxiliar = ref([])
  const restart = ref(0)
  const flag = ref(false)
  const dialog = ref(false)
  const buy = ref(false)
  const selectedColor = ref(null)
  const choosen = ref([])
  const tmpChosen = ref(null)
  await findProduto()




  async function findProduto(){
      let payload = {Shop : 'T'}
      produto.value = await findById('products', route.params.id,
      payload)
      url.value = await produto.value.IMAGE
      getProdutos()
      restart.value += 1
  }
  function chooseColor(boolean, index){
    if(selectedColor.value == null){
      dialog.value = true
      buy.value = boolean
    }else{
      defineColor(selectedColor.value)
    }
  }
  function defineColor(color, index){
      saveInCarrinho(produto.value.ID, produto.value.VALOR, color)
      if(buy.value == true){
        router.push('/carrinho')
      }
      if(selectedColor.value == null){
        saveCor(selectedColor.value, index)
      }
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
      produtos.value = produtos.value.filter(o => o.ID !== produto.value.ID)
    }else{
      produtos.value = await storeApp.getProdutos(payload)
      tmpAuxiliar.value = produtos.value
      produtos.value = produtos.value.filter(o => o.ID !== produto.value.ID)
    }
    flag.value = true

  }

  async function detailProduct(id){
      await router.push({name: 'Produto-Detalhe', params: {id : id}})
      choosen.value[tmpChosen.value] = false
      selectedColor.value = null
      findProduto()
  }

  function returnStore(){
    router.push({path : `/produtos`})
  }


</script>

<style lang="scss">
  .card-cores{
      max-width: 500px !important;
      min-width: 300px !important;
  }

</style>
