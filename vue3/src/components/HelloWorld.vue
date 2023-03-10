<template>
  <v-parallax :src="img_fundo"
    class="paralax">
    <v-container class="fill-height " fluid>

      <v-responsive>
        <v-row>
          <v-col
          cols="12"
          class="d-flex justify-center align-center">
            <img
              :src="icon"
              :height="mobile ? '560' : '520'"
            >
          </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              class="d-flex
              justify-center text-md-h5
              text-body-1
              font-home
              font-italic font-weight-medium
              mt-n10 mt-md-0"
            >
              <p class="ml-2 ml-md-3 mt-0">
                Produtos em destaque para você
              </p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-icon  class="mt-2" >mdi-arrow-down</v-icon>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
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
              <card-produtos
                :width-card="smAndDown ?  '180' : '200'"
                :height-card="smAndDown ? '280' :  '345'"
                :height-img="smAndDown ? '120' : '160'"
                :index="index"
                :produto="produto"
                @detail-product-esp="detailProduct"
              >
              </card-produtos>
            </v-slide-group-item>
          </v-slide-group>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-parallax>

</template>

<script setup>
import { shallowRef, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import Detail from '@/CompositionAP/CRUD'
import { useAppStore } from '@/store/app';
import CardProdutos from './CardProdutos.vue';

const router =
  useRouter()

const storeApp =
  useAppStore()

const {
  mobile, smAndDown} = useDisplay()

const destaques = shallowRef([])
const {getDestaques} = Detail()
const img_fundo = ref(null)
const icon = ref(null)





onBeforeMount(async ()=>{
    await getConfigSite()
})

getDest()



async function getConfigSite(){
  const dt = await storeApp.getConfigSite()
  img_fundo.value = dt.fundo
  icon.value = dt.icon
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
    background: linear-gradient(to right, #213c47, #16252b, #0a1418);

  }
  .img-card-home{
    background: linear-gradient(to right, #1c313a, #16252b, #142830);

  }
  .sliders{
    background: linear-gradient(to right, #333333, #181717);
  }
  .font-home {
    font-family:'Courier New', Courier, monospace !important;
    font-weight: bold !important;
  }
  .card-in-home{
    background: #141E30;
    background: -webkit-linear-gradient(to right, #243B55, #141E30);
    background: linear-gradient(to right, #243B55, #141E30) ;

  }

</style>
