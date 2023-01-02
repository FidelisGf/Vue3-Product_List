import axios from "axios"

export default{
      checkIfHasEstoque(id){
        return axios.get('/getQuantidadeProduct/' + id)
      }
}
