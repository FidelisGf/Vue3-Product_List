import { useAppStore } from '@/store/app'
import { ref, computed } from 'vue'
const storeApp = useAppStore()
export default function CrudComp(){

    async function findById(route, id, payload){
        let data = await storeApp.findById(route, id, payload)
        return data
    }

    async function getAllList(route, payload){
        return storeApp.getList(route, payload)
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
          if(item.ID_CATEGORIA == filtros.categoria){
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
        applyFilter
    }

}



