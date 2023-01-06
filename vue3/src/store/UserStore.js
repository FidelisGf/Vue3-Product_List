
import UserService from '@/Service/UserService'
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app'
export const useUserStore = defineStore('user', {
  state: () => ({

  }),
  actions: {
      async registerUser(payload){
          const genericApp = useAppStore()
          const dt = UserService.register(payload).then((res)=>{
              genericApp.activeSnack(res.data.message)
              return true
          }).catch((error)=>{
              let msg = "Erro :" + error.response.data.message
              genericApp.activeSnack(msg)
              return false
          })
          return dt
      }
  }
})
