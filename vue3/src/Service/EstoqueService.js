import axios from "axios"

export default{
      checkIfHasEstoque(id, cor){
        return axios.get('/getQuantidadeProduct/' + id, { params: {COR : cor }})
      }
}
