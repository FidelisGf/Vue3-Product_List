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
            <v-btn color="green darken-4" @click="searchFilter"   block >
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
                  @click="searchFilter"
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

<script setup>
  import { useAppStore } from '@/store/app'
  import {ref, watch, computed, onMounted, onBeforeMount} from 'vue'
  const genericApp = useAppStore()

  const search = ref('')
  const categoria = ref(null)
  const check = ref(0)
  const tmp = ref('')
  const tmpLenght = ref(null)
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
      console.log('deu')
      let filtros = await genericApp.getFiltros
      if(filtros != null){
          let payload = null
          search.value = filtros.search
          check.value = String(filtros.check)
          categoria.value = filtros.categoria
          if(categoria.value != null){
            payload = {search : search.value.toString(),
            check : parseFloat(check.value),
            categoria : categoria.value.ID_CATEGORIA}
          }else{
            payload = {search : search.value.toString(),
            check : parseFloat(check.value)}
          }
          emit('search', payload)
      }else{
          let payload = {search : null, check : null, categoria : null}
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
  watch(search, (val) => {
    let payload = {search : search.value.toString(), type : 'Search'}
    if(val.toString().length == 0){
      emit('searchPage', payload)
    }else{
      if(val.toString().length >= tmpLenght.value){
        if(val.toString().length > 2){
          emit('searchPage', payload)
        }else if(val != tmp.value){
          emit('searchPage', payload)
        }
        tmp.value = val
      }
      tmpLenght.value = val.toString().length
    }
    payload.categoria = categoria.value
    genericApp.setFiltros(payload)
  })
  watch(check, (val)=>{
    let payload = {check : val, type : 'Check'}
    emit('searchPage', payload)
  })


</script>

<style lang="scss" scoped>

</style>
