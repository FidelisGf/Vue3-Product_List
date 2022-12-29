// Utilities
import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: "normalApp",
  state: () => ({
      loading : false,
      categorias : []
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
      setLoad(){
          this.loading = this.loading == false ? true : false
          console.log(this.loading)
      },
      getList(route){
          const data = Service.getList(route).then((res)=>{
              this.categorias = res.data
          }).catch((error)=>{
              return error
          })
      }
  },
  getters: {
        getLoad(){
            return this.loading
        }
  }
})
