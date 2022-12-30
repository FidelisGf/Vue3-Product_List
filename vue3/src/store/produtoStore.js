import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
      produtos : []
  }),
  actions: {
    async  getProdutos(payload){
          let data = Service.getPaginado('products', payload).then((res)=>{
              if(res.data.data == undefined || res.data.data == null){
                  let arrayLista = null
                  arrayLista.push(res.data)
                  res.data.data = arrayLista
              }
              return res.data.data
          }).catch((error)=>{
              return error
          })
          return data
      }
  }
})
