<template>
  <v-container class="fill-height" fluid>
        <v-navigation-drawer>
          <v-list>
            <v-list-item>
                <v-list-item-title class="text-h5">
                  Filtros
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-text-field
              solo placeholder="Procure por um produto"
              clearable
              variant="underlined"
              prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                  Valores
              </v-list-item-title>
              <v-radio-group>
                <v-radio label="Todos" value="0"></v-radio>
                <v-radio label="0 a 25" value="1"></v-radio>
                <v-radio label="25 a 50" value="2"></v-radio>
                <v-radio label="50 a 100" value="3"></v-radio>
              </v-radio-group>
            </v-list-item>
            <v-list-item>
                  <v-list-item-title>
                    Categorias
                  </v-list-item-title>
                  <v-autocomplete
                      v-model="categoria"
                      class="mt-2"
                      item-text="NOME_C"
                      :items="categorias"
                      return-object
                      label="Categorias"
                  ></v-autocomplete>
            </v-list-item>
            <v-list-item>
                <v-btn color="green darken-4"  block >
                  <v-icon>
                    mdi-magnify
                  </v-icon>Pesquisar</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn color="#01579B"  block >
                <v-icon >
                  mdi-delete
                </v-icon>Limpar</v-btn>
          </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-row   class="d-flex justify-center flex-column flex-sm-row">

            <v-col v-for="produto in produtos" :key="produto.ID" cols="12" md="4" class="d-flex justify-center " >
              <v-card width="300px"
                    class="cards mx-auto"
                >
                  <v-img :src="produto.IMAGE"
                  height="200px"
                  cover></v-img>
                  <v-card-title class="text-h5">
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text>
                      <v-row>
                        <v-col cols="12" class="text-caption">
                          <p>Valor : R$ {{parseFloat(produto.VALOR).toFixed(2)}}</p>
                        </v-col>
                        <v-col cols="12" class="text-caption">
                          <p>Estoque : 10 </p>
                        </v-col>
                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                      <v-row>
                        <v-col cols="6">
                          <v-btn class="ml-n1" @click="detailProduct(produto.ID)" color="blue accent-2" icon="mdi-information-outline"></v-btn>
                          <v-btn color="teal accent-2" icon="mdi-cart-outline"></v-btn>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col>
                          <v-btn class="ml-4" color="green" icon="mdi-whatsapp"></v-btn>
                        </v-col>
                      </v-row>
                  </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>

<script >
  import { useAppStore } from '@/store/produtoStore'
  import Detail from '@/components/Mixin/CRUD'
  const storeApp = useAppStore()

  export default{
    data(){
      return{
        produtos : null,

        categoria : ''
      }
    },
    mixins: [Detail],
    methods:{
      async getProdutos(){
        let payload = {current_page : 1, opcao: null,
        start : null, end : null, search : null, Shop : 'T'}
        this.produtos = await storeApp.getProdutos(payload)
        console.log(this.produtos)

      },
      detailProduct(id){
        this.$router.push({ path: `/produto/detalhes/${id}` })
      }
    },

    async created(){
      await this.getAllList('categorys')
      this.getProdutos()


    }
  }
</script>

<style lang="scss" scoped>
  .cards:hover{
    transform: translate(0px, -1.0px);
    transition: 1.2s;
    box-shadow: 1px 1.8px 8px #69F0AE;
  }






</style>
