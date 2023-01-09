import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/UserStore'
import UserService from '@/Service/UserService'
import { useRouter } from 'vue-router';
export default function UserComp(){
  const genericApp = useAppStore()
  const userApp = useUserStore()
  const router = useRouter()
  const isNameGrande = computed(()=>
      ifIsMaior()
  )
  const user = {
    NAME : ref(''),
    PASSWORD : ref(''),
    EMAIL : ref(''),
    CF_PASSWORD : ref(''),
    CPF : ref('')
  }

  function clearUser() {
      user.CF_PASSWORD.value = ''
      user.PASSWORD.value = ''
      user.CPF.value = ''
      user.NAME.value = ''
      user.EMAIL.value = ''

  }
  function ifIsMaior(){
      if(user.NAME.value.length >= 4 ){
        return true
      }else{
        return false
      }
  }
  async function register(image_file, valido){
      if(valido){
        if(user.CF_PASSWORD.value == user.PASSWORD.value){
          let form = new FormData()
          form.append('NAME', user.NAME.value)
          form.append('PASSWORD', user.PASSWORD.value)
          form.append('EMAIL', user.EMAIL.value)
          form.append('CPF', user.CPF.value)
          if(image_file.value != null || image_file.value != undefined){
            form.append('IMAGE', image_file.value, image_file.value.name)
          }else{
            genericApp.activeSnack('A imagem é obrigatoria !')
            return
          }
          form.append('SALARIO', parseFloat(0))
          let check = await userApp.registerUser(form)

          if(check == true){
            console.log('Entrou')
            router.push({ path: '/login' })
          }

        }else{
          genericApp.activeSnack('As senhas divergem')
        }
      }else{
          genericApp.activeSnack('Dados inválidos')
      }
  }
  function login(){
      let form = new FormData()
      form.append('NAME', user.NAME.value)
      form.append('PASSWORD', user.PASSWORD.value)
      UserService.login(form).then((res)=>{
          localStorage.setItem('token', res.data.access_token)
          router.push({ path: '/produtos' })
          genericApp.activeSnack('Login realizado com sucesso !')

      }).catch((error)=>{
          console.log(error)
      })

  }
  function logoutUser(){
        UserService.logout().then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
            return error
        })
  }
  function getPerfil(){
    return userApp.getUser()
  }

  return {
      user,
      register,
      clearUser,
      login,
      logoutUser,
      getPerfil,
      isNameGrande
  }
}
