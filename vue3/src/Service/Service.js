import axios from "axios"
import { useAppStore } from '@/store/app'

axios.defaults.baseURL = 'http://laravelempresarial.test/api/';
axios.defaults.headers.common['Authorization'] =
      'Bearer' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjAuMTQwXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjcyNDMwMjk4LCJleHAiOjE2NzI0MzM4OTgsIm5iZiI6MTY3MjQzMDI5OCwianRpIjoiZlhCY201b1gwSDk2TXZBSSIsInN1YiI6NjUsInBydiI6IjBiMGNmNTBhZjEyM2Q4NTA2ZTE2ZWJhN2NiNjc2Mjk3NGRhM2FjM2EifQ.UIvPKumMBdIItsD_-ZQTqi0tvQyhXHqhLN7DdOzsQqI'
axios.interceptors.request.use((config)=>{
  const storeApp = useAppStore()
     storeApp.setLoad(true)
      return config;
  }, (erorr)=>{
      const storeApp = useAppStore()
      storeApp.setLoad(false)
      return Promise.reject(erorr)
  })
    axios.interceptors.response.use((response)=>{
    const storeApp = useAppStore()
    storeApp.setLoad(false)
    return response
  },async function (error) {
    const storeApp = useAppStore()

    const access_token = localStorage.getItem("token");
      // if (error.response.status === 401 && access_token) {
      //   localStorage.setItem('token', error.response.data)
      //   axios.defaults.headers.common['Authorization'] = 'Bearer' + error.response.data
      // }
    storeApp.setLoad(false)
    return Promise.reject(error);
})

export default{

    get(route, payload){
      return axios.get(route, { params: { opcao: payload.opcao,
           start : payload.dtStart, end : payload.dtFinal,
           pdf : payload.pdf, search : payload.search} })
    },
    post(route, payload){
      return axios.post(route, payload)
    },
    getPaginado(route, payload){
      return  axios.get(route + "?page=" + payload.current_page,
       { params: { opcao: payload.opcao, start : payload.dtStart,
        end : payload.dtFinal, pdf : payload.pdf, search : payload.search,
        Shop : payload.Shop, Precos : payload.Precos, categoria : payload.categoria} })
    },
    findById(route, id, payload){
      return axios.get(route + "/" + id, {params: {Shop : payload.Shop}})
    },
    async getList(route){
      return await axios.get(route)
    },
}
