import { useAppStore } from '@/store/app'
const storeApp = useAppStore()

export default{
    data(){
      return{
          id : 1
      }
    },
    methods:{
        async findById(route, id, payload){
              let data = await storeApp.findById(route, id, payload)
              return data
        },
        async getAllList(route){
          storeApp.getList(route)
        }
    }
}
