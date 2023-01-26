<template>
  <v-parallax src="@/assets/paralax.jpg"
    class="paralax">
    <v-container class="fill-height " fluid>

      <v-responsive>
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-img
              src="@/assets/WeBSHOP__2_-removebg-preview.png"
              :height="mobile ? '250' : '520'"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center text-md-h5
            desc-detail font-italic font-weight-medium mt-n0 mt-xl-0">
              <p class="ml-2 ml-md-3 mt-0">Produtos em destaque para você</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-icon  class="mt-2" >mdi-arrow-down</v-icon>
            </v-col>
        </v-row>
        <v-slide-group
          class="mt-10 ml-n3 ml-sm-0"
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
                @click="detailProduct(produto.ID)"
              >
              <div class="
                d-flex justify-center ">
                <v-img
                  :src="produto.IMAGE"
                  height="210"
                ></v-img>
              </div>
              <v-card-title class=" text-h5 font-weight-bold desc-detail"  @click="detailProduct(produto.ID)" >
                {{produto.NOME}}
              </v-card-title>
              <v-card-subtitle class="text-justify text-subtitle-1 ,
              font-weight-medium desc-detail">
                {{produto.DESC}}
              </v-card-subtitle>
              <v-card-text>
                  <v-row>
                    <v-col cols="12" class="text-caption">
                    <p class="text-body-1 font-weight-medium desc-detail">
                      Valor :
                      {{parseFloat(produto.VALOR)
                      .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                    </p>
                    <p class="font-weight-medium desc-detail">
                      Estoque :
                      {{produto.QUANTIDADE}} unidades
                    </p>
                    <p class="font-weight-medium desc-detail">
                    Categoria : {{produto.NOME_C}}
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-responsive>
    </v-container>
  </v-parallax>

</template>

<script setup>
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import Detail from '@/CompositionAP/CRUD'
const router =
  useRouter()

const {mobile, smAndDown} =
  useDisplay()
const destaques = shallowRef([])
const slides = shallowRef(null)

const {getDestaques} = Detail()


getDest()

function getRoute(route){
  router.push('/' + route)
}
function detailProduct(id){
  router.push({name: 'Produto-Detalhe', params: {id : id}})
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

  .sliders{
    background: linear-gradient(to right, #333333, #181717); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

</style>
