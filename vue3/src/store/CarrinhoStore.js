import Service from '@/Service/Service'
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app'
import EstoqueService from '@/Service/EstoqueService'
export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
      itens : []
  }),
  persist: true,
  actions: {
      async saveInCarrinho(payload){
          const storeApp = useAppStore()
          const exist = this.itens.find(o => o.ID == payload.ID)
          if(exist){
              const tmp = await EstoqueService.checkIfHasEstoque(payload.ID).then((res)=>{
                return res.data
              }).catch((error)=>{
                return error
              })
              if((exist.QUANTIDADE + 1) > tmp){
                console.log('Ativou')
                storeApp.activeSnack('Estoque insuficiente !')
                return
              }else{
                exist.QUANTIDADE += 1
              }
          }else{
            let pl = {ID : payload.ID , QUANTIDADE : 1, VALOR : payload.VALOR}
            this.itens.push(pl)
          }
          storeApp.activeSnack('Item adicionado ao carrinho')


      },
      async addQuantidadeProduto(payload){
        const storeApp = useAppStore()
          const item = this.itens.find(o => o.ID == payload)
          if(item){
            const tmp = await EstoqueService.checkIfHasEstoque(payload).then((res)=>{
              return res.data
            }).catch((error)=>{
              return error
            })
            if((item.QUANTIDADE + 1) > tmp){
              console.log('Ativou')
              storeApp.activeSnack('Estoque insuficiente !')
              return 'Error'
            }else{
              item.QUANTIDADE += 1
            }
          }
          storeApp.activeSnack('Item adicionado ao carrinho')
          return 'Success'
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
          const storeApp = useAppStore()
          storeApp.activeSnack('Item removido do carrinho')
      },
      async getProdutosCarrinho(){
          let data = []
          let payload = {Shop : 'T'}
          for (const item of this.itens){
             await Service.findById('products', item.ID, payload).then((res)=>{
                  if(item.QUANTIDADE > res.data.ESTOQUE.QUANTIDADE){
                      item.QUANTIDADE = 'Indisponivel'
                  }
                  let dt = res.data
                  dt.QUANTIDADE = item.QUANTIDADE
                  data.push(dt)
              })
          }
          return data
      },
      removeIndisponivel(payload){
        this.itens = this.itens.filter(o => o.ID != payload)
        const storeApp = useAppStore()
        storeApp.activeSnack('Item removido do carrinho')
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
  },

})
