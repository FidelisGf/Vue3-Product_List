import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('produto', {
  state: () => ({
      produtos : []
  }),
  actions: {
    async  getProdutos(payload){
          let data = Service.getPaginado('products', payload).then((res)=>{
              return res.data.data
          }).catch((error)=>{
              return error
          })
          return data
      }
  }
})
