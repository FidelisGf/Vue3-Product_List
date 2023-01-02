// Utilities
import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: "normalApp",
  state: () => ({
      loading : false,
      categorias : [],
      filtros : null
  }),
  actions: {
      async findById(route, id, payload){
          const data = Service.findById(route, id, payload).then((res)=>{
              return res.data
          }).catch((error)=>{
              return error
          })
          return data
      },

      setFiltros(payload){
        this.filtros = payload
      },

      //fazer o search dos produtos

      setLoad(Valor){
          this.loading = Valor
      },
      getList(route, payload){
          const data = Service.getList(route, payload).then(async (res)=>{
              if(route == 'categorys'){
                this.setCategorias(res.data)
              }
          }).catch((error)=>{
              return error
          })
      },
      async setCategorias(payload){
          this.categorias = await JSON.parse(JSON.stringify(payload));

      },

  },
  getters: {
        getLoad(){
            return this.loading
        },
        getFiltros(){
            return this.filtros
        }
  }
})
