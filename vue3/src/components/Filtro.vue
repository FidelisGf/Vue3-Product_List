<template>
  <div>
    <v-navigation-drawer class="filtros">
      <v-list>
        <v-list-item>
            <v-list-item-title class="text-h6 auto">
              Filtros
            </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-text-field
          solo
          placeholder="Procure por um produto"
          v-model="search"
          class="auto"
          variant="underlined"
          prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
              Valores
          </v-list-item-title>
          <v-radio-group v-model="check" class="auto">
            <v-radio class="auto text-black" label="Todos" value="0"></v-radio>
            <v-radio label="0 a 25" value="1"></v-radio>
            <v-radio label="25 a 50" value="2"></v-radio>
            <v-radio label="50 a 100" value="3"></v-radio>
            <v-radio label="Acima de 100" value="4"></v-radio>
          </v-radio-group>
        </v-list-item>
        <v-list-item class="mt-n2 ">
              <v-autocomplete
                  variant="underlined"
                  v-model="categoria"
                  class="mt-2 auto"
                  item-title="NOME_C"
                  solo
                  item-children="ID"
                  :items="categorias"
                  return-object
                  clearable

                  label="Categorias"
              ></v-autocomplete>

        </v-list-item>
        <v-list-item class="mt-n2">
            <v-btn color="#00674b" @click="searchFilter"   block >
              <v-icon>
                mdi-magnify
              </v-icon>Pesquisar</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn color="#00416A"   @click="clear"  block >
            <v-icon >
              mdi-delete
            </v-icon>Limpar</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row class="hidden-lg-and-up " v-if="mobile">
      <v-expansion-panels  >
        <v-expansion-panel
          title="Filtros"
          class="bg-real"
        >
          <v-expansion-panel-text  class="bg-real">
            <v-row   class="d-flex flex-row">
              <v-col >
                <p>Valores</p>
                <v-radio-group  inline v-model="check" title="Valores">
                  <v-radio label="Todos" value="0"></v-radio>
                  <v-radio label="0 a 25" value="1"></v-radio>
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
                <v-col cols="12" class="d-flex flex-row">
                  <v-autocomplete
                    variant="underlined"
                    v-model="categoria"
                    class="mt-2"
                    item-title="NOME_C"
                    solo
                    clearable
                    item-children="ID"
                    :items="categorias"
                    return-object
                    label="Categorias"
                  ></v-autocomplete>

                </v-col>

                <v-col cols="6" class="">
                  <v-btn class="ma-2 auto"
                  variant="text"
                  icon="mdi-magnify"
                  @click="searchFilter"
                  color="#66CDAA">

                  </v-btn>
                  <v-btn class="ma-2 auto"
                    variant="text"
                    icon="mdi-delete"
                    color="#B9D9EB"  @click="clear">
                  </v-btn>
                </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

  </div>

</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import {ref, watch, computed, onBeforeMount} from 'vue'
  import { useDisplay } from 'vuetify/lib/framework.mjs';

  const {mobile} = useDisplay()
  const genericApp = useAppStore()

  const search = ref('')
  const categoria = ref(null)
  const check = ref(null)
  const tmp = ref('')
  const tmpCheck = ref('')
  const execSetFiltros = ref(false)
  const emit = defineEmits(['search', 'searchPage'])




  const categorias = computed(()=>
    JSON.parse(JSON.stringify(genericApp.categorias))
  )

  onBeforeMount(async ()=>{
    await setFiltrosStore()
  })






  async function clear(){
      search.value = ''
      check.value = null
      categoria.value = null
      let payload = {search : search.value.toString(),
      check : parseFloat(check.value)}
      emit('search', payload)
  }



  async function setFiltrosStore(){
      let filtros = await genericApp.getFiltros
      if(filtros != null){
          let payload = null
          if(filtros.search){
            search.value = filtros.search
          }
          if(filtros.check){
            check.value = filtros.check
          }
          if(filtros.categoria){
            categoria.value = filtros.categoria
          }

          if(categoria.value != null && check.value == undefined){
            payload = {search : search.value,
            check : parseFloat(check.value),
            categoria : categoria.value}
          }
          else if(categoria.value == null && check.value != undefined){
            payload = {search : search.value,
            check : parseFloat(check.value)}
          }else{
            payload = {search : search.value}
          }
          execSetFiltros.value = true
          tmpCheck.value = null

          emit('search', payload)
      }else{
          let payload = {search : '', check : null, categoria : null}
          emit('search', payload)
      }
  }



  function searchFilter(){
    let payload = null
    if(categoria.value != null){
      payload = {search : search.value.toString(),
      check : parseFloat(check.value),
      categoria : categoria.value.ID_CATEGORIA}
    }else{
      payload = {search : search.value.toString(),
      check : parseFloat(check.value)}
    }
    emit('search', payload)
    payload.categoria = categoria.value
    genericApp.setFiltros(payload)
  }
  watch(search, (val) =>{
     if(tmp.value != ''){  // para que não execute quando o usuario voltar para essa tela.
        let payload = {
        search : search.value,
        type : 'Search'
        }

        if(check.value != undefined){
          payload.check = check.value

        }

        if(categoria.value != null){
          payload.categoria = categoria.value
        }

        genericApp.setFiltros(payload)

        if(val.length == 0){
          emit('search', payload)
          return
        }
        else{

          if(val.length >= 2){
            if(execSetFiltros.value){
              emit('search', payload)
            }else{
              emit('searchPage', payload)
            }
          }else if(val.length < tmp.value.length){
              if(execSetFiltros.value){
                emit('search', payload)
              }else{
                emit('searchPage', payload)
              }
          }
          if(val.length == 1){
              if(check.value != undefined ){
                if(check.value == 0){
                  execSetFiltros.value = false
                }
              }else{
                execSetFiltros.value = false
              }
          }
        }
     }
     tmp.value = search.value

  })
  watch(check, (val)=>{
    if(tmpCheck.value != null){
      let payload = {
          check : val,
          type : 'Check'
      }
      if(search.value != ''){
        payload.search = search.value
      }
      if(categoria.value != null){
        payload.categoria = categoria.value
      }
      if(execSetFiltros.value){
        emit('search', payload)
      }else{
        emit('searchPage', payload)
      }
      if(check.value == 0){
        execSetFiltros.value = false
      }

      genericApp.setFiltros(payload)
    }
    tmpCheck.value = check.value
  })

</script>

<style lang="scss" scoped>
  .auto{
    color : rgb(255, 252, 252) !important;
    font-weight: bold !important;
  }
  .bg-fundo{
    background: #f0f8ff !important;
  }
</style>
