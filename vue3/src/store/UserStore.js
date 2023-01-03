
import UserService from '@/Service/UserService'
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app'
export const useUserStore = defineStore('user', {
  state: () => ({

  }),
  actions: {
      registerUser(payload){
          const genericApp = useAppStore()
          UserService.register(payload).then((res)=>{
              genericApp.activeSnack(res.data.message)
          }).catch((error)=>{
              let msg = "Erro :" + error.response.data.message
              genericApp.activeSnack(msg)
          })
      }
  }
})
