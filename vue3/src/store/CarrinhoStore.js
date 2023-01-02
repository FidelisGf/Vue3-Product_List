import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
      itens : []
  }),
  actions: {
      saveInCarrinho(payload){
          const exist = this.itens.find(o => o.ID == payload.ID)
          if(exist){
              exist.QUANTIDADE += 1
          }else{
            let pl = {ID : payload.ID , QUANTIDADE : 1}
            this.itens.push(pl)
            console.log(this.itens)
          }
      }
  },
  getters: {
      getCountCarrinho(){
        if(Object.keys(this.itens).length < 0 || Object.keys(this.itens).length == null){
          return 0
        }else{
          return Object.keys(this.itens).length
        }

      }
  }
})
