<template>
  <v-container class="fill-height princip" fluid>
    <v-responsive >
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-window
            v-model="slides"
            show-arrows="hover"
            :continuous="true"
          >
            <template v-slot:prev="{ props }">
              <v-btn
                color="white"
                icon
                variant="text"
                size="x-small"
                @click="props.onClick"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
              color="white"
              icon
              variant="text"
              size="x-small"
              @click="props.onClick"
              >
              <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template>
            <v-window-item

            >
              <v-card

                elevation="8"
                height="400"
                :min-width="mobile ? '100' : 1000"
                max-width="1000"
                class="d-flex justify-md-center justify-start align-center sliders"
              >

                <v-card-text class="d-flex justify-md-center justify-start align-start
                align-md-center">
                  <v-row class="d-flex justify-center align-center">
                    <v-col cols="12" sm="5" md="6" class="ml-md-n10 d-flex justify-center justify-md-end">
                      <v-img
                        src="@/assets/WeBSHOP__2_-removebg-preview.png"
                        :height="mobile ? '250' : '500px'"
                        :mobile-breakpoint="10"
                      >
                      </v-img>
                    </v-col>
                    <v-col cols="12" sm="7" md="5"
                     class="d-flex justify-start flex-column mt-n5 mt-md-0"
                    >
                      <p class="text-md-h5 font-weight-black desc-detail">O WebShop</p>
                      <div class=" justify-start "
                        >
                        <p class="desc-detail">O WebShop tem como objetivo ser uma lista de
                          produtos online. Mas como assim ? No webshop você apenas irá
                          escolher seus produtos, confirmar
                          seu pedido e envia-lo para a empresa responsável,
                          onde vocês irão discutir
                          os termos de pagamento.
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item>
                <v-card
                  elevation="8"
                  :min-height="smAndDown ? '400' : '400'"
                  :min-width="mobile ? '100' : 1000"
                  max-width="1000"
                  class="d-flex justify-md-center justify-start align-center sliders"
                >
                  <v-card-text>
                      <v-row>
                          <v-col cols="12" sm="5" md="5" class="d-flex justify-center align-center">
                            <v-img
                            class="mt-md-0"
                            :height="mobile ? '150' : '300px'"

                              src="../assets/cupom.png"
                            >

                            </v-img>
                          </v-col>
                          <v-col cols="12" sm="7" md="7" class="d-flex flex-column
                          justify-md-center mt-12 mt-md-0">
                            <p class="text-md-h5 font-weight-black desc-detail">
                              Cupom WELCOME25</p>
                            <div class=" justify-start desc-detail">
                              <p >Aproveite nosso cupom para começar com o
                                pé direito, são 25% de desconto na compra que
                                você utiliza-lo. Basta inserí-lo e aplica-lo
                                ao finalizar um pedido no carrinho. Atenção, é
                                necessário criar uma conta para usufruir do cupom.
                              </p>
                              <v-btn variant="text"
                              @click="getRoute('produtos')"
                              color="white" class="mt-2 ml-n4">
                                <v-icon class="ml-n0  mt-0">
                                  mdi-store
                                </v-icon>
                                <p class="ml-1 desc-detail">Loja</p>
                              </v-btn>
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

                  @click="detailProduct(produto.ID)"

                >
                <div class="
                  d-flex justify-center img-card">
                  <v-img
                    :src="produto.IMAGE"
                    height="210"
                  ></v-img>
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
                        <p class="text-body-1 font-weight-medium">
                          Valor :
                            {{parseFloat(produto.VALOR)
                            .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                          </p>
                        <p class="font-weight-medium">
                          Estoque :
                            {{produto.QUANTIDADE}} unidades
                        </p>
                        <p class="font-weight-medium">
                          Categoria : {{produto.NOME_C}}</p>
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
