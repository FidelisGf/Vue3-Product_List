<template>
  <div class="d-flex justify-center">
    <v-card class="card-cores"
    :style="isNull(storeApp.getTemas.CARDS_PERFIL)
    ? '' : storeApp.getTemas.CARDS_PERFIL">
      <v-card-title class="text-body-2 d-flex justify-space-between">
        <small class="ml-1 text-h6">Escolha a cor do item...</small>
      </v-card-title>
        <v-card-text>
          <v-row class="d-flex ml-1 flex-row">
            <v-col
            :cols="Object.keys(produto.CORES).length < 4 ? '6' : '3'"
            class="d-flex justify-start  flex-column"
            v-for="(cor, index) in produto.CORES" :key="cor.ID">
              <v-sheet
                :color="cor.HASH"
                height="50"
                width="50"
                @click="defineColor(cor.HASH, index)"
                elevation="2"
                class="ml-md-0  cores-selec"
              ></v-sheet>
              <small >{{cor.ESTOQUE}} Unidades(s)</small>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="close" color="#EF5350"
          variant="text" size="small">
            Fechar
          </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { useAppStore } from '@/store/app';
  import CrudComp from '@/CompositionAP/CRUD';

  const {isNull} = CrudComp()
  const storeApp = useAppStore();
  const props = defineProps({
    produto : Object
  })
  const emit = defineEmits(['corEsc', 'close'])
  function defineColor(color, index){
      let payload = {color : color,
      index : index }
      emit('corEsc', payload)
  }
  function close(){
      emit('close', false)
  }
</script>

<style lang="scss" scoped>

</style>
