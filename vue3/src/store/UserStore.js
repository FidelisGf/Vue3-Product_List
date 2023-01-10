
import UserService from '@/Service/UserService'
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app'
import { useRouter } from 'vue-router';
import Service from '@/Service/Service';
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
      },
      async updateUser(payload, id){
        const genericApp = useAppStore()
        const dt = UserService.update(payload).then((res)=>{
          genericApp.activeSnack(res.data.message)
          return true
        }).catch((error)=>{
          let msg = "Erro :" + error.response.data.message
          genericApp.activeSnack(msg)
          return false
        })
        return dt
      },
      async getUser(){
          const data = UserService.getPerfil().then((res)=>{
            return res.data
          })
          return data
      },
      async checkIfPassword(payload){
        const data = UserService.checkIfPassword(payload).then((res)=>{
            return res.data
        }).catch((error)=>{
            return error
        })
        return data
      },
      loginUser(form){
        //const router = useRouter()
        const genericApp = useAppStore()
        const data = UserService.login(form).then((res)=>{
          localStorage.setItem('token', res.data.access_token)
          genericApp.activeSnack('Login realizado com sucesso !')
          return true
        }).catch((error)=>{
          genericApp.activeSnack("Error : " + error.response.data.message)
          return false
        })
        return data
      },
      logoutUser(){
        UserService.logout().then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
            return error
        })
      }
  }
})
