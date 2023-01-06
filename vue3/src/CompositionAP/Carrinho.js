import { useCarrinhoStore } from '@/store/CarrinhoStore'

export default function CarrinhoComp(){

      function  saveInCarrinho(ID, VALOR){
        let storeApp = useCarrinhoStore()
        let newPL = {ID : ID, VALOR : VALOR}
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
      function finalizaPedido(payload){

      }

      return {
          saveInCarrinho,
          getProdutosCarrinho,
          addQuantidade,
          removeQuantidade,
          removeIndisponivel
      }
}

