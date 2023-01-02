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
      },
      addQuantidadeProduto(payload){
          const item = this.itens.find(o => o.ID == payload)
          if(item){
            item.QUANTIDADE += 1
            console.log(this.itens)
          }
      },
      removeQuantidadeProduto(payload){
          const item = this.itens.find(o => o.ID == payload)
          if(item){
            if(item.QUANTIDADE == 1){
                this.itens = this.itens.filter(o => o.ID != payload)
            }else{
                item.QUANTIDADE -= 1
            }
          }
      },
      async getProdutosCarrinho(){
          let data = []
          let payload = {Shop : 'T'}
          for (const item of this.itens){
             await Service.findById('products', item.ID, payload).then((res)=>{
                  let dt = res.data
                  dt.QUANTIDADE = item.QUANTIDADE
                  data.push(dt)
              })
          }
          return data
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
