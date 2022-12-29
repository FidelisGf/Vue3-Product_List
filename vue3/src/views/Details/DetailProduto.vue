<template>
  <v-container fluid>
    <v-row class="d-flex justify-space-between mt-0 mt-md-9 flex-column flex-sm-row">
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
                <p class="text-h5 ">{{produto.NOME}}</p>
                <p class="text-justify text-subtitle-1 ml-2">{{produto.DESC}}...</p>
              </div>
            </v-col>
          </v-row>



        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4" class="d-flex ">
            <v-row>
              <v-col cols="12">
                <v-btn block color="green darken-3" class="ml-sm-n2 ml-0">
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
                <v-btn block color="#1B5E20" class="ml-sm-n2 ml-0 mt-5">
                  <v-icon
                    left
                    dark
                    class="mr-10"
                  >
                    mdi-shopping-outline
                  </v-icon>
                  <p class="mr-16">Comprar Agora</p>
                </v-btn>
              </v-col>

            </v-row>

        </v-col>
        <v-col cols="12" md="4" class="d-flex">

        </v-col>
    </v-row>
  </v-container>
</template>

<script >
  import Detail from '@/components/Mixin/CRUD'
  export default{
    data(){
      return{
        produto : {
            NOME : '',
            VALOR : 0,
            DESC : '',

            IMAGE : null,
        },
        url : null
      }
    },
    mixins: [Detail],
    methods:{
        async findProduto(){
            let payload = {Shop : 'T'}
            this.produto = await this.findById('products', this.$route.params.id, payload)
            this.url = this.produto.IMAGE

        }
    },

   async created(){
        await this.findProduto()
    }

  }
</script>

<style lang="scss" scoped>
  .imagem{
    box-shadow: rgba(141, 141, 141, 0.397) 0px 5px 15px;
  }
  .cores{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
  .imagem:hover{
    opacity: 0.8;
    transform: translate(0px, -0.0px);
    transition: 1.1s;
    box-shadow: rgba(82, 82, 82, 0.397) 0px 5px 15px;
  }
  .cores:hover{

    transform: translate(0px, -0.9px);
    height: 45px !important;
    width: 45px !important;
    transition: 0.1s;
    box-shadow: rgba(226, 222, 222, 0.397) 0px 0px 15px;
  }
</style>
