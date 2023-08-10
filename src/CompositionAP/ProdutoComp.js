import { computed, ref, shallowRef } from 'vue'
import { useProdutoStore } from '@/store/produtoStore'


export default function ProdutoComp(){
  const storeApp =
  useProdutoStore()

  const lastPage = computed(()=>
      storeApp.getLastPage
  )

  const current_page = computed({
      get() {
        return storeApp.getCurrent_Page;
      },
      set(value) {
        storeApp.setPage(value);
      }
    }
  )

  const produto = ref(null)
  const produtos = shallowRef([])
  const tmpAuxiliar = ref([])
  const tmp = shallowRef(null)
  const categoria = shallowRef(null)




  function getAllProdutos(payload){
      return storeApp.getProdutos(payload)
  }
  return {
    getAllProdutos,
    produto,
    produtos,
    tmpAuxiliar,
    tmp,
    categoria,
    lastPage,
    current_page
  }
}
