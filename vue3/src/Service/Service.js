import axios from "axios"
import { useAppStore } from '@/store/app'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
if(localStorage.getItem('token') !=null || localStorage.getItem('token') != undefined){
  axios.defaults.headers.common['Authorization'] =
  'Bearer' + localStorage.getItem('token')
}
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
    if (error.response.status === 401 && access_token) {
        localStorage.setItem('token', error.response.data)
        axios.defaults.headers.common['Authorization'] = 'Bearer' + error.response.data
    }
    storeApp.setLoad(false)
    return Promise.reject(error);
})
export default{

    get(route, payload){
      return axios.get(route, { params: { opcao: payload.opcao,
           start : payload.dtStart, end : payload.dtFinal,
           pdf : payload.pdf, search : payload.search, NOME : payload.NOME}})
    },
    post(route, payload){
      return axios.post(route , payload)
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
    async getList(route, payload){
      return await axios.get(route, {params: {Shop : payload.Shop}})
    },
    update(route, payload, id){
      return axios.put(route + "/" + id, payload)
    }

}
