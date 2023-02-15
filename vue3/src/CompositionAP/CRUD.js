import { useAppStore } from '@/store/app'
import { useProdutoStore } from '@/store/produtoStore'
import { useRouter } from 'vue-router';
const produtoApp = useProdutoStore()
export default function CrudComp(){

    const router = useRouter()
    const storeApp = useAppStore()

    async function findById(route, id, payload){
        let data = await storeApp.findById(route, id, payload)
        return data
    }
    async function selecionaCor(){
        storeApp.activeSnack('Cor escolhida com sucesso !')
    }
    function isNull(param){
      if(param != null){
          return false
      }else{
          return true
      }
    }
    async function getAllList(route, payload){
        return storeApp.getList(route, payload)
    }
    async function getDestaques(payload){
        return produtoApp.getDestaques(payload)
    }
    async function post(route, payload){
      storeApp.postGeneric(route, payload)
    }

    function applyFilter(filtros, produtos){
      let res = []
      if(filtros.type == 'Search'){
        if(filtros.search != null){
          for(let item of produtos){
            if(item.NOME.toLowerCase().indexOf(filtros.search.toLowerCase()) > -1){
              res.push(item)
            }
          }
        }
      }else if(filtros.type == 'Check'){
        let v1 = 0
        let v2 = 0
        let flag = false
        switch(filtros.check){
          case '0' :
            res = null
            break;
          case '1':
            v1 = 1
            v2 = 25
            break
          case '2' :
            v1 = 25
            v2 = 50
            break
          case '3':
            v1 = 50
            v2 = 100
            break
          case '4':
            v1 = 100
            v2 = 100
            flag = true
            break
        }
        if(v1 > 0 && v2 > 0){
          for(let item of produtos){
            if(item.VALOR >= v1 && item.VALOR <= v2 && flag == false){
              res.push(item)
            }else if(flag && item.VALOR >= v1){
              res.push(item)
            }
          }
        }
    } else if(filtros.type == 'Cat'){
        for(let item of produtos){
          if(item.ID_CATEGORIA == filtros.categoria.ID_CATEGORIA){
            res.push(item)
          }
        }
      }
      if(res == null){
        return produtos
      }else{
        return res
      }
    }


    return {
        findById,
        getAllList,
        applyFilter,
        post,
        selecionaCor,
        getDestaques,
        isNull,
        storeApp,
        router
    }

}



