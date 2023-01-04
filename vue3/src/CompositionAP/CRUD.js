import { useAppStore } from '@/store/app'
import { ref, computed } from 'vue'
const storeApp = useAppStore()

export default function CrudComp(){

    async function findById(route, id, payload){
        let data = await storeApp.findById(route, id, payload)
        return data
    }

    async function getAllList(route, payload){
        return storeApp.getList(route, payload)
    }
    return {
        findById,
        getAllList
    }

}


// export default{
//     data(){
//       return{
//           id : 1
//       }
//     },
//     methods:{
//         async findById(route, id, payload){
//               let data = await storeApp.findById(route, id, payload)
//               return data
//         },
//         async getAllList(route, payload){
//           storeApp.getList(route, payload)
//         }
//     }
// }
