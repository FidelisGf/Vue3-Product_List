import { useCarrinhoStore } from '@/store/CarrinhoStore'
const storeApp = useCarrinhoStore()

export default{
    data(){
      return{
      }
    },
    methods:{
        saveInCarrinho(payload){
            let newPL = {ID : payload}
            storeApp.saveInCarrinho(newPL)
        }
    }
}
