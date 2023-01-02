<template>
  <v-container fluid>
    <v-row class="mt-n3">
      <v-col cols="12">
          <v-btn icon @click="returnStore" variant="text"><v-icon color="red-accent-2">mdi-arrow-left</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between mt-0 mt-md-9 flex-column flex-sm-row mt-n4">
        <v-col cols="12" md="8" class="d-flex flex-sm-row flex-column-reverse ">
          <v-row class="d-flex">
            <v-col  cols="1" class="d-flex flex-md-column flex-row ">
              <div class="d-flex flex-sm-column flex-row justify-start " v-for="cor in produto.CORES" :key="cor.ID">
                <v-sheet
                  :color="cor.HASH"
                  height="40"
                  width="40"
                  class="ml-md-0 ml-2 cores"
              ></v-sheet>
              <br/>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <v-img :src="url"
              class="imagem"
              max-height="450px"
              max-width="450px"
              cover></v-img>
            </v-col>
            <v-col cols="12" md="5">
              <div class="d-flex flex-column  ml-0">
                <p class="text-h5 font-weight-bold ">{{produto.NOME}}</p>
                <p class="text-justify text-subtitle-1 ml-2 font-weight-medium">{{produto.DESC}}...</p>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4" class="d-flex ">
            <v-row>
              <v-col cols="12">
                <v-btn block color="green-darken-4" class="ml-sm-n2 ml-0">
                  <v-icon
                    left
                    dark
                    class="mr-6"
                    color="white"
                  >
                    mdi-cart
                  </v-icon>
                  <p class="mr-5">Adicionar ao Carrinho</p>
                </v-btn>
                <v-btn block color="green-darken-4" class="ml-sm-n2 ml-0 mt-5">
                  <v-icon
                    left
                    dark
                    class="mr-10"
                  >
                    mdi-shopping-outline
                  </v-icon>
                  <p class="mr-16">Comprar Agora</p>
                </v-btn>
                <v-btn block color="green-lighten-1" class="ml-sm-n2 ml-0 mt-5">
                  <v-icon
                    left
                    dark
                    class="ml-3"
                    color="white"
                  >
                    mdi-whatsapp
                  </v-icon>
                  <p class="ml-6 text-white">Tirar duvidas sobre o item</p>
                </v-btn>
              </v-col>

            </v-row>

        </v-col>
        <v-divider class="mt-2"></v-divider>
        <v-col cols="12" md="12" class="d-flex">

            <v-slide-group
              class="pa-4 slides"
              selected-class="bg-success"
              show-arrows
              center-active
            >
              <v-slide-group-item
                v-for="produto in produtos"
                :key="produto.ID"

                v-slot="{toggle, selectedClass }"
              >
                <v-card
                  color="dark"
                  :class="['ma-4', selectedClass, 'cards'] "
                  height="340"

                  width="310"
                  @click="toggle"

                >
                  <v-img :src="produto.IMAGE"
                  height="180px"
                  cover @click="detailProduct(produto.ID)"></v-img>
                  <v-card-title class="text-h5"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" class="text-caption">
                        <p class="text-body-1">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                        <p>Estoque : {{produto.QUANTIDADE}} unidades </p>
                        <p>Categoria : {{produto.NOME_C}}</p>
                      </v-col>

                    </v-row>
                </v-card-text>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
        </v-col>
    </v-row>
  </v-container>
</template>

<script >
  import Detail from '@/components/Mixin/CRUD'
  import { useProdutoStore } from '@/store/produtoStore'
  const storeApp = useProdutoStore()
  export default{
    data(){
      return{
        produto : {
            NOME : '',
            VALOR : 0,
            DESC : '',
            model : true,
            IMAGE : null,
        },
        url : null,
        produtos : []
      }
    },
    mixins: [Detail],
    methods:{
        async findProduto(){
            let payload = {Shop : 'T'}
            this.produto = await this.findById('products', this.$route.params.id, payload)
            this.url = this.produto.IMAGE
            this.getProdutos()
        },
        async getProdutos() {
            this.listKey += 1;
            let payload = { current_page: 1, opcao: null, start: null, end: null,
              search: this.search, Shop: "T", Precos : this.precos, categoria : this.produto.ID_CATEGORIA};
            this.produtos = await storeApp.getProdutos(payload);
            this.produtos = this.produtos.filter(o => o.ID !== this.produto.ID)
        },
        async detailProduct(id) {
            await this.$router.push({ path: `/produto/detalhes/${id}` });
            window.location.reload()
        },
        returnStore(){
            this.$router.push({path : `/produtos` });
        }
    },

   async created(){
        await this.findProduto()
    }
  }
</script>

<style lang="scss" >
  .imagem{
    transition: transform .2s;
    box-shadow: rgba(141, 141, 141, 0.397) 0px 5px 15px;
  }
  .cores{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .imagem:hover{
    transform: scale(1.05);
    transition: 1.2s;
    box-shadow: rgba(230, 193, 241, 0.397) 0px 5px 15px;
  }
  .cores:hover{
    transform: translate(0px, -0.9px);
    height: 45px !important;
    width: 45px !important;
    transition: 0.1s;
    box-shadow: rgba(226, 222, 222, 0.397) 0px 0px 15px;
  }

  .slides{
      width: 100% !important;
  }
</style>
