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
        if(filtros.type == 'search'){
          if(filtros.search != null){
            for(let item of produtos){
                if(item.NOME.indexOf(filtros.search) > -1){
                  res.push(item)
                }
            }
          }
        }else if(filtros.type == 'Check'){

          console.log(filtros.check)
          console.log(typeof(filtros.check))
          switch(filtros.check){
              case '0' :
                  res = null
                  break;
              case '2' :
                for(let item of produtos){
                  if(item.VALOR >= 25 && item.VALOR <= 50){
                    res.push(item)
                  }
                }
                break
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



