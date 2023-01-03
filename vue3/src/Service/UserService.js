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
    }
}
