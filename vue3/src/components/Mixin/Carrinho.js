import { useCarrinhoStore } from '@/store/CarrinhoStore'


export default{

    data(){
      return{
      }
    },
    methods:{
        saveInCarrinho(payload){
            let storeApp = useCarrinhoStore()
            let newPL = {ID : payload}
            storeApp.saveInCarrinho(newPL)
        },
        async getProdutosCarrinho(){
            let storeApp = useCarrinhoStore()
            return storeApp.getProdutosCarrinho()
        },
        addQuantidade(payload){
            let storeApp = useCarrinhoStore()
            return storeApp.addQuantidadeProduto(payload)
        },
        removeQuantidade(payload){
            let storeApp = useCarrinhoStore()
            storeApp.removeQuantidadeProduto(payload)
        },
        removeIndisponivel(payload){
          let storeApp = useCarrinhoStore()
          storeApp.removeIndisponivel(payload)
        }
    }
}
