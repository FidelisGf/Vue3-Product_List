import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const usePedidoStore = defineStore('pedido', {
  state: () => ({

  }),
  actions: {
      async getPedidos(payload){
          const data = Service.getPaginado('pedidos', payload).then((res)=>{
              return res.data.data
          }).catch((error)=>{
              return error
          })
          return data
      }
  },
  getters: {

  }

})
