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
    ID : ref(0),
    NAME : ref(''),
    PASSWORD : ref(''),
    EMAIL : ref(''),
    CF_PASSWORD : ref(''),
    CPF : ref(''),
    IMAGE : ref('')
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
  async function update(image_file, valido){
    if(valido){
      if(user.CF_PASSWORD.value == user.PASSWORD.value){
        let payload = {ID : user.ID.value, PASSWORD : user.PASSWORD.value}
        let checkPw = await userApp.checkIfPassword(payload)
        if(checkPw){
          console.log(checkPw)
          let form = new FormData()
          form.append('ID', user.ID.value)
          form.append('NAME', user.NAME.value)
          form.append('EMAIL', user.EMAIL.value)
          form.append('CPF', user.CPF.value)
          form.append('SALARIO', parseFloat(0))
          if(image_file.value != null || image_file.value != undefined){
            form.append('IMAGE', image_file.value, image_file.value.name)
          }
          let check = await userApp.updateUser(form)

          if(check == true){

            router.push({ path: '/perfil' })
          }
        }else{
          genericApp.activeSnack('Essa não é sua senha')
        }
      }else{
        genericApp.activeSnack('As senhas divergem')
      }
    }else{
        genericApp.activeSnack('Dados inválidos')
    }
}
  async function login(){
      let form = new FormData()
      form.append('NAME', user.NAME.value)
      form.append('PASSWORD', user.PASSWORD.value)
      const check = await userApp.loginUser(form)
      if(check == true){
        console.log('aaa')
        router.push({ path: '/produtos' })
      }
  }
  function logoutUser(){
     userApp.logoutUser()
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
      update,
      isNameGrande
  }
}
