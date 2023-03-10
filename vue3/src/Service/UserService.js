import axios from "axios"

export default{
  register(payload){
    return axios.post('/register', payload)
  },
  login(payload){
    return axios.post('/login', payload)
  },
  logout(){
    return axios.get('/logout')
  },
  getPerfil(){
    return axios.get('/getPerfilUserInternet')
  },
  update(payload){
    return axios.post('usuariosUp', payload)
  },
  checkIfPassword(payload){
    return axios.get('checkIfPassword', {params: {PASSWORD : payload.PASSWORD, ID : payload.ID}})
  }

}
