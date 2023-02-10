import { useCarrinhoStore } from '@/store/CarrinhoStore'
import { ref, computed } from 'vue'
import CrudComp from './CRUD'
export default function CarrinhoComp(){
      const itens = ref([])
      const {
        isNull
      } = CrudComp()

      const vlTotal = computed(()=>
        getValorTotal()
      )
      function getValorTotal(){
        if(itens.value != null){
          let total = itens.value.reduce((accumulator, object)=>{
          return parseFloat(accumulator) + (parseFloat(object.VALOR)
            * (object.QUANTIDADE != 'Indisponivel' ? parseFloat(object.QUANTIDADE) : 1)) // separa parseFloat
          },0)
          if(isNaN(total)){
            return 0
          }else{
            return total
          }
        }else{
            return 0
          }
      }

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
          applyCupom,
          itens,
          vlTotal,
          isNull
      }
}

