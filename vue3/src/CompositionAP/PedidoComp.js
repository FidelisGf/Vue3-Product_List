import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router';
import { usePedidoStore } from '@/store/PedidoStore';
export default function PedidoComp(){
  const router =
  useRouter()


  const pedidos  = shallowRef(null)
  const open = ref([])


  function getAllPedidos(payload){
    const pedidoApp = usePedidoStore()
    return pedidoApp.getPedidos(payload)
  }
  return {
    getAllPedidos,
    pedidos,
    open
  }
}
