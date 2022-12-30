<template>
  <div>
    <v-navigation-drawer>
      <v-list>
        <v-list-item>
            <v-list-item-title class="text-h6">
              Filtros
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-text-field
          solo
          placeholder="Procure por um produto"
          v-model="search"
          variant="underlined"
          prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
              Valores
          </v-list-item-title>
          <v-radio-group v-model="check">
            <v-radio label="Todos" value="0"></v-radio>
            <v-radio label="0 a 25" value="1"></v-radio>
            <v-radio label="25 a 50" value="2"></v-radio>
            <v-radio label="50 a 100" value="3"></v-radio>
            <v-radio label="Acima de 100" value="4"></v-radio>
          </v-radio-group>
        </v-list-item>
        <v-list-item class="mt-n2">
              <v-autocomplete
                  variant="underlined"
                  v-model="categoria"
                  class="mt-2"
                  item-title="NOME_C"
                  solo
                  item-children="ID"
                  :items="categorias"
                  return-object
                  label="Categorias"
              ></v-autocomplete>
        </v-list-item>
        <v-list-item class="mt-n2">
            <v-btn color="green darken-4"   block >
              <v-icon>
                mdi-magnify
              </v-icon>Pesquisar</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn color="#01579B" @click="clear"  block >
            <v-icon >
              mdi-delete
            </v-icon>Limpar</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row class="hidden-lg-and-up">
      <v-expansion-panels >
        <v-expansion-panel
          title="Filtros"
        >
          <v-expansion-panel-text>
            <v-row class="d-flex flex-row">
              <v-col>
                <p>Valores</p>
                <v-radio-group inline v-model="check" title="Valores">
                  <v-radio label="Todos" value="0"></v-radio>
                  <v-radio label="1 a 25" value="1"></v-radio>
                  <v-radio label="25 a 50" value="2"></v-radio>
                  <v-radio label="50 a 100" value="3"></v-radio>
                  <v-radio label="Acima de 100" value="4"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-text-field
                  solo
                  placeholder="Procure por um produto"
                  v-model="search"
                  variant="underlined"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex flex-row">
                <v-col cols="12">
                  <v-autocomplete
                    variant="underlined"
                    v-model="categoria"
                    class="mt-2"
                    item-title="NOME_C"
                    solo
                    item-children="ID"
                    :items="categorias"
                    return-object
                    label="Categorias"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="6" class="">
                  <v-btn class="ma-2"
                  variant="text"
                  icon="mdi-magnify"
                  color="green-darken-3">

                  </v-btn>
                  <v-btn class="ma-2"
                    variant="text"
                    icon="mdi-delete"
                    color="blue-darken-3" @click="clear">

                  </v-btn>
                </v-col>
            </v-row>

          </v-expansion-panel-text>

        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

  </div>

</template>

<script>
import { useAppStore } from '@/store/app'
const genericApp = useAppStore()

export default {
    data(){
      return {
          search : '',
          categoria : null,
          check : '',
          tmp : '',
          tmpLenght : null

      }
    },
    methods:{
      clear(){
          console.log(this.check)
          this.search = ''
          this.check = null,
          this.categoria = null
      },

    },
    computed:{
        categorias : function(){
            return  JSON.parse(JSON.stringify(genericApp.categorias))
        }
    },
    watch: {
        search : function(val) {
          console.log(this.categoria)
          let payload = null
          if(this.categoria != null){
            payload = {search : val.toString(), check : parseFloat(this.check), categoria : this.categoria.ID_CATEGORIA}
          }else{
            payload = {search : val.toString(), check : parseFloat(this.check)}
          }

          if(val.toString().length == 0){
            this.$emit('search', payload)
          }else{
            if(val.toString().length >= this.tmpLenght){
              if (val.toString().length > 2 ) {
                  this.$emit('search', payload)
              }else if(val != this.tmp){
                  this.$emit('search', payload)
              }
              this.tmp = val
            }
            this.tmpLenght = val.toString().length
          }


        }
    },
}
</script>

<style lang="scss" scoped>

</style>
