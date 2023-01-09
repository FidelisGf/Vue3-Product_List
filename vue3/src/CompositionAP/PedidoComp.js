import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { usePedidoStore } from '@/store/PedidoStore';
export default function PedidoComp(){
  const router = useRouter()


  function getAllPedidos(payload){
    const pedidoApp = usePedidoStore()
    return pedidoApp.getPedidos(payload)
  }
  return {
    getAllPedidos
  }
}
