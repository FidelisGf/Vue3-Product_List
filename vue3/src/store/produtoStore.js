import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
      produtos : [],
      current_page : 1,
      total_page : 2
  }),
  actions: {
    async  getProdutos(payload){
      let data = Service.getPaginado('products', payload)
      .then((res)=>{

        this.current_page = res.data.current_page
        this.total_page = res.data.last_page

        if(res.data.data == undefined || res.data.data == null){
          let arrayLista = null
          this.setPages(resposta)
          arrayLista.push(res.data)
          res.data.data = arrayLista
        }
          for(let dt of res.data.data){
            dt.IMAGE = 'data:image/png;base64,' + dt.IMAGE
          }
          return res.data.data

      }).catch((error)=>{
        return error
      })
      return data
    },

  },
  getters: {
    getCurrent_Page(){
      return this.current_page
    },
    getLastPage(){
      return this.total_page
    }
  }

})
