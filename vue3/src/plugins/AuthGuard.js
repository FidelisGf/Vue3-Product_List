import axios from "axios"
import { useAppStore } from '@/store/app'
import { useRouter } from 'vue-router';
export default{

    async auth(next){

      if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined){
        const genericApp = useAppStore()
        genericApp.activeSnack('Esteja logado para isso !')
        next({name: 'Login'})
      }else{
        axios.get("/auth/validateTkn").then((res)=>{
          next('/login')
        }).catch((error)=>{
            const access_token = localStorage.getItem("token");
            if(error.response.status == 401 && access_token){
                localStorage.setItem('token', error.response.data)
                axios.defaults.headers.common['Authorization'] = 'Bearer' + e.response.data
                next()
            }else{
                const genericApp = useAppStore()
                genericApp.activeSnack('Esteja logado para isso !')
                next({name: 'Login'})
            }
        })
      }


    }
}
