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
      class="text-body-1 text-sm-h5 font-weight-bold mt-4"
    >
      {{produto.NOME}}
    </v-card-title>
    <v-card-subtitle
      class="text-justify
      text-subtitle-1
      font-weight-medium"
    >
      {{produto.DESC}}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="text-caption">
          <p class="text-sm-body-1 font-weight-medium text-h6">

            {{parseFloat(produto.VALOR).
              toLocaleString('pt-br',{style:
              'currency', currency: 'BRL'})}}
            </p>
          <p v-if="!smAndDown" class="font-weight-medium">
            Estoque : {{produto.QUANTIDADE}} unidades
          </p>
          <p v-if="!smAndDown" class="font-weight-medium">Categoria :
            {{produto.NOME_C}}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!detail">
      <v-row>
        <v-col cols="12" sm="12" :align="smAndDown ? 'center' : 'start' ">
          <v-btn class="ml-n1"
           @click="detailProductEsp(produto.ID)"
            color="#B2FFFF"
            icon="mdi-information-outline"
            :size="smAndDown ? 'small' : ''"
          >
          </v-btn>
          <v-btn color="#03C03C"
           @click="defineCor(produto)"
            icon="mdi-cart-outline"
            :size="smAndDown ? 'small' : ''"
          >
          </v-btn>
          <v-btn
            color="#03C03C"
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
  background: linear-gradient(to right, #4d4b4b, #284263);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.cards:hover{
  transform: translate(1px, -2.0px);
  transition: 0.5s;
  box-shadow: 2px 5.2px 8px #8a8a8a !important;
}
</style>
