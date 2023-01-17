import Service from '@/Service/Service'
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app'
import EstoqueService from '@/Service/EstoqueService'
export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
      itens : [],
      id_pedido : 0
  }),
  persist: true,
  actions: {
      async saveInCarrinho(payload){
          console.log(payload)
          const storeApp = useAppStore()
          const ex = this.itens.filter(o => o.ID == payload.ID)
          let pl = {ID : payload.ID , QUANTIDADE : 1, VALOR : payload.VALOR, COR : payload.COR}
          if(ex){
              const exist = ex.find(o=> o.COR == payload.COR)
              if(exist){
                const tmp = await EstoqueService.checkIfHasEstoque(payload.ID, payload.COR).then((res)=>{
                    return res.data
                }).catch((error)=>{
                    return error
                })
                if((exist.QUANTIDADE + 1) > tmp){
                    storeApp.activeSnack('Estoque insuficiente !')
                    return
                }else{
                  exist.QUANTIDADE += 1
                }
              }else{
                this.itens.push(pl)
                //else das cores
              }
          }else{
            this.itens.push(pl)
            storeApp.activeSnack('Item adicionado ao carrinho')
          }
          console.log(this.itens)
      },
      async getCupomDesc(payload){
        const storeApp = useAppStore()
        const dt = Service.get('cupons', payload).then((res)=>{
            storeApp.activeSnack("Cupom Aplicado com sucesso !")
            return res.data
        }).catch((error)=>{
            storeApp.activeSnack("Error : " + error.response.data.message)
            return null
        })
        return dt
      },
      async applyCupomDesc(payload){
        const storeApp = useAppStore()
         Service.post('cupons', payload).then(()=>{
        }).catch((error)=>{
          storeApp.activeSnack("Error : " + error.response.data.message)
        })
      },
      async addQuantidadeProduto(payload){
        const storeApp = useAppStore()
        const i = this.itens[payload]
        if(i){
          const tmp = await EstoqueService.checkIfHasEstoque(i.ID, i.COR).then((res)=>{
          return res.data
        }).catch((error)=>{
          return error
        })
          if((i.QUANTIDADE + 1) > tmp){
            storeApp.activeSnack('Estoque insuficiente !')
            return 'Error'
          }else{
            i.QUANTIDADE += 1
          }
        }
        storeApp.activeSnack('Item adicionado ao carrinho')
        return 'Success'
      },
      removeQuantidadeProduto(payload){
          const item = this.itens[payload]
          if(item){
            if(item.QUANTIDADE == 1){
                this.itens = this.itens.filter(o => o != item)
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
                  dt.COR_ESCOLHIDA = item.COR
                  data.push(dt)
              })
          }
          return data
      },
      removeIndisponivel(payload){
        this.itens = this.itens.filter(o => o.ID != payload)
        const storeApp = useAppStore()
        storeApp.activeSnack('Item removido do carrinho')
      },
      async finalizarPedido(payload){
        const storeApp = useAppStore()
        let form = new FormData()
        let itens = JSON.stringify(this.itens)
        if(payload.ID != null){
          form.append('ID_CUPOM', payload.ID)
        }
        form.append('PRODUTOS', itens)
        form.append('aprovado', 'F')
        form.append('METODO_PAGAMENTO', 'Dinheiro')
        const data = await Service.post('pedidosInternet', form).then((res)=>{
           return res.data
        }).catch((error)=>{
            return error
        })
        storeApp.activeSnack(data.message)
        this.id_pedido = data.data
        this.itens = []
      }
  },
  getters: {
      getCountCarrinho(){
        if(Object.keys(this.itens).length < 0 || Object.keys(this.itens).length == null){
          return 0
        }else{
          return Object.keys(this.itens).length
        }

      },
      getIdPedido(){
        return this.id_pedido
      }
  },

})
