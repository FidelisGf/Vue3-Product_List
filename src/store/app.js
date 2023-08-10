// Utilities
import Service from '@/Service/Service'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: "normalApp",
  state: () => ({
      loading : false,
      categorias : [],
      filtros : null,
      msg : '',
      snack : false,
      timeout : 0.5,
      EmpresaNome : null,
      temas : {
          FOOTER : 'background : #5CBBF6',
          NAVBAR : 'background : #5CBBF6'
      }
  }),
  persist: {
    paths: ['EmpresaNome', 'temas']
  },
  actions: {
      async findById(route, id, payload){
          const data = Service.findById(route, id, payload).then((res)=>{

              return res.data
          }).catch((error)=>{
              return error
          })
          return data
      },
      setEmpresa(py){
          this.EmpresaNome = py
      },
      activeSnack(msg){
          this.msg = msg
          this.snack = true
      },
      closeSnack(){
          this.snack = false
      },
      setFiltros(payload){
        this.filtros = payload
      },
      setLoad(Valor){
          this.loading = Valor
      },
      getList(route, payload){
          const data = Service.getList(route, payload).then(async (res)=>{
              if(route == 'categorys'){
                this.setCategorias(res.data)
              }
          }).catch((error)=>{
              return error
          })
      },
      async setCategorias(payload){
          this.categorias = await JSON.parse(JSON.stringify(payload));
      },
      postGeneric(route, payload){
          Service.post(route, payload).then((res)=>{
              this.activeSnack(res.data.message)
          }).catch((error)=>{
              this.activeSnack("Erro :" + error.response.data.message)
          })
      },
      empresaAtiva(){
          let py = {Shop : 'T'}
          Service.get('getEmpresaFromUser', py).then((res)=>{
              this.setEmpresa(res.data)
          }).catch((error)=>{
              return error
          })
      },
      getConfigSite(){
        let payload  = {Shop : 'T'}
        const data = Service.get('getConfigSite', payload).then((res)=>{
            return res.data
        }).catch((error)=>{
            return error
        })
        return data
      },
      getTemasEmpresa(){
        let payload = {Shop : 'T'}
        Service.get('getTema', payload).then((res)=>{
          this.temas = res.data
        }).catch((error) => {
          return error
        })
      }
  },
  getters: {
        getLoad(){
            return this.loading
        },
        getFiltros(){
            return this.filtros
        },
        getSnack(){
            return this.snack
        },
        getMsg(){
            return this.msg
        },
        getTime(){
            return this.timeout
        },
        getEmpresa(){
            return this.EmpresaNome
        },
        getTemas(){
            return this.temas
        }
  }
})
