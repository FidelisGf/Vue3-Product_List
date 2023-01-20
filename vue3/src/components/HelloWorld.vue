<template>
  <v-container class="fill-height princip" fluid>
    <v-responsive >
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-window
            v-model="slides"
            show-arrows="hover"
          >
            <v-window-item

            >
              <v-card
                elevation="8"
                height="400"
                width="1000"
                class="d-flex justify-md-center align-md-center sliders"
              >
                <v-card-title>

                </v-card-title>
                <v-card-text class="d-flex justify-md-center align-md-center">
                  <v-row class="d-flex justify-md-center align-md-center">
                    <v-col cols="12" md="5" class="d-flex justify-md-end">
                      <v-img
                        src="@/assets/WeBSHOP__2_-removebg-preview.png"
                        height="500"
                      >
                      </v-img>
                    </v-col>
                    <v-col cols="12" md="7" class="d-flex justify-md-start flex-column">
                      <p class="text-md-h5 font-weight-black desc-detail">O WebShop</p>
                      <div class="text-window">
                        <p class="desc-detail">O WebShop tem como objetivo ser uma lista de produtos online. Mas como assim ? No webshop você apenas irá
                          escolher seus produtos, confirmar seu pedido e envia-lo para a empresa responsável, onde vocês irão discutir
                          os termos de pagamento.
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-window-item>

          </v-window>
        </v-col>
      </v-row>

      <v-row>
          <v-col cols="12" class="d-flex justify-center text-md-h5 desc-detail font-italic font-weight-medium">
            <p class="ml-2 ml-md-3 mt-0">Produtos em destaque para você</p>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-icon  class="mt-2" >mdi-arrow-down</v-icon>
          </v-col>
          <v-col cols="12" class="mt-2">
              <v-slide-group
              class=""
              selected-class="bg-success"
              :show-arrows="false"
              center-active
              >
              <v-slide-group-item
                v-for="produto in destaques"
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
    </v-responsive>
  </v-container>
</template>

<script setup>
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import Detail from '@/CompositionAP/CRUD'
const router =
  useRouter()

const destaques = shallowRef([])
const slides = shallowRef(null)

const {getDestaques} = Detail()


getDest()

function getRoute(route){
  router.push('/' + route)
}
async function getDest(){
    const payload = { opcao: null,
      start : null, end : null,
      pdf : null, search : null, NOME : null
    }
  destaques.value = await getDestaques(payload)
}

</script>
<style lang="scss">
  .bg-home{
    background: linear-gradient(to right, #213c47, #16252b, #0a1418); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .img-card-home{
    background: linear-gradient(to right, #1c313a, #16252b, #142830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .text-window{
    width: 80% !important;
  }
  .sliders{

    background: linear-gradient(to right, #333333, #181717); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
