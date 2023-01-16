import { useCarrinhoStore } from '@/store/CarrinhoStore'

export default function CarrinhoComp(){

      function  saveInCarrinho(ID, VALOR, COR){
        let storeApp = useCarrinhoStore()
        let newPL = {ID : ID, VALOR : VALOR, COR : COR}
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
        let storeApp = useCarrinhoStore()
        storeApp.finalizarPedido(payload)
      }
      function getCupom(payload){
        let storeApp = useCarrinhoStore()
        return storeApp.getCupomDesc(payload)
      }
      function applyCupom(payload){
        let storeApp = useCarrinhoStore()
        storeApp.applyCupomDesc(payload)
      }

      return {
          saveInCarrinho,
          getProdutosCarrinho,
          addQuantidade,
          removeQuantidade,
          removeIndisponivel,
          finalizaPedido,
          getCupom,
          applyCupom
      }
}

