<template>
  <v-container class="fill-height" fluid>
        <Filtro @search="makeSearch"></Filtro>

        <v-row   class="d-flex justify-center flex-column flex-sm-row mt-2 mt-lg-0" :key="listKey">

            <v-col  v-for="produto in produtos" :key="produto.ID" cols="12" md="4" class="d-flex justify-center " >
              <v-card width="300px"
                    class="cards mx-auto"
                >
                  <v-img :src="produto.IMAGE"
                  height="200px"
                  cover @click="detailProduct(produto.ID)"></v-img>
                  <v-card-title class="text-h5"  @click="detailProduct(produto.ID)" >
                    {{produto.NOME}}
                  </v-card-title>
                  <v-card-subtitle class="text-justify text-subtitle-1">
                    {{produto.DESC}}
                  </v-card-subtitle>
                  <v-card-text @click="detailProduct(produto.ID)">
                      <v-row>
                        <v-col cols="12" class="text-caption">
                          <p class="text-body-1">Valor : {{parseFloat(produto.VALOR).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                          <p>Estoque : {{produto.QUANTIDADE}} unidades </p>
                          <p>Categoria : {{produto.NOME_C}}</p>
                        </v-col>

                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                      <v-row>
                        <v-col cols="6">
                          <v-btn class="ml-n1" @click="detailProduct(produto.ID)" color="blue accent-2" icon="mdi-information-outline">

                          </v-btn>
                          <v-btn color="teal accent-2" @click="check = false" icon="mdi-cart-outline">

                          </v-btn>
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
  import { useProdutoStore } from '@/store/produtoStore'
  import Detail from '@/components/Mixin/CRUD'
  import Filtro from '@/components/Filtro.vue'
  const storeApp = useProdutoStore()


  export default{
    data() {
        return {
            produtos: null,
            tmp: "",
            check: "red",
            listKey: 0,
            search : '',
            precos : '',
            categoria : null,
        };
    },
    mixins: [Detail],
    methods: {
        async getProdutos() {
            this.listKey += 1;
            let payload = { current_page: 1, opcao: null, start: null, end: null,
              search: this.search, Shop: "T", Precos : this.precos, categoria : this.categoria};
            this.produtos = await storeApp.getProdutos(payload);
        },
        detailProduct(id) {
            this.$router.push({ path: `/produto/detalhes/${id}` });
        },
        makeSearch(e){
            this.search = e.search.toString()
            this.precos = e.check
            this.categoria = e.categoria
            console.log(this.categoria)
            this.getProdutos()
        }
    },
    async created() {
        await this.getAllList("categorys");
        this.getProdutos();
    },
    components: { Filtro }
}
</script>

<style lang="scss" scoped>
  .cards:hover{
    transform: translate(0px, -1.0px);
    transition: 1.2s;
    box-shadow: 1px 1.8px 8px #69F0AE;
  }






</style>
