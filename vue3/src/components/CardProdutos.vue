<template>
  <v-card
    class="ma-3 cards corpo-card"
    :height="heightCard"
    :width="widthCard"
  >
    <v-row :key="index" >
      <v-col cols="12"
        class="img-card
        justify-center
        align-content-center"
      >
        <v-img
          :src="produto.IMAGE"
          :height="heightImg"
          class="img-detail"
          @click="detailProductEsp(produto.ID)"
          ></v-img>
      </v-col>
    </v-row>
    <v-card-title
      class="text-body-1 text-sm-h5 font-weight-medium mt-3 font-card"
    >
      {{produto.NOME}}
    </v-card-title>
    <v-card-subtitle
      class="text-justify
      text-subtitle-1
      font-weight-medium font-card"
    >
      {{produto.DESC}}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" align="start" class="text-caption">
          <p class="font-weight-medium text-h6 font-card">

            {{parseFloat(produto.VALOR).
              toLocaleString('pt-br',{style:
              'currency', currency: 'BRL'})}}
            </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions >
      <v-row class="mt-n8">
        <v-col cols="12" sm="12" align="start">
          <v-btn class="ml-n1"
           @click="detailProductEsp(produto.ID)"
            color="#F0E68C"
            icon="mdi-information-outline"
            :size="smAndDown ? 'small' : ''"
          >
          </v-btn>
          <v-btn color="#32de84"
           @click="defineCor(produto)"
            icon="mdi-cart-outline"
            :size="smAndDown ? 'small' : ''"
          >
          </v-btn>
          <v-btn
            color="#32de84"
            icon="mdi-whatsapp"
            :size="smAndDown ? 'small' : ''"
          >
          </v-btn>
        </v-col>

      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';

const {
  smAndDown
} = useDisplay()
const props = defineProps({
    widthCard : String,
    heightCard : String,
    index : Number,
    produto : Object,
    heightImg : String,
    detail : Boolean
})
const emit
= defineEmits(['detailProductEsp', 'defineCorEsp'])

function detailProductEsp(id){
    emit('detailProductEsp', id)
}
function defineCor(produto){
    emit('defineCorEsp', produto)
}
</script>

<style lang="scss" scoped>
.corpo-card{

  background: linear-gradient(to bottom, #bbb7b7, #5c89c4);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.font-card{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
}
.cards:hover{
  transform: translate(1px, -2.0px);
  transition: 0.5s;
  box-shadow: 2px 5.2px 8px #8a8a8a !important;
}
.img-card{
  background-color: #353535 !important;
  background-image: linear-gradient(160deg, #7e7a7a 0%, #4d4c4c 100%) !important;
}
</style>
