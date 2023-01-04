import { useCarrinhoStore } from '@/store/CarrinhoStore'

export default function CarrinhoComp(){

      function  saveInCarrinho(payload){
        let storeApp = useCarrinhoStore()
        let newPL = {ID : payload}
        storeApp.saveInCarrinho(newPL)
      }
      async function getProdutosCarrinho(){
        let storeApp = useCarrinhoStore()
        return storeApp.getProdutosCarrinho()
      }
      function addQuantidade(payload){
        let storeApp = useCarrinhoStore()
        return storeApp.addQuantidadeProduto(payload)
      }
      function removeQuantidade(payload){
        let storeApp = useCarrinhoStore()
        storeApp.removeQuantidadeProduto(payload)
      }
      function removeIndisponivel(payload){
        let storeApp = useCarrinhoStore()
        storeApp.removeIndisponivel(payload)
      }

      return {
          saveInCarrinho,
          getProdutosCarrinho,
          addQuantidade,
          removeQuantidade,
          removeIndisponivel
      }
}

