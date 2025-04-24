import { ListBaseResponse } from 'src/@types/response'
import http from 'src/utils/http'

const adminAPI = {
  getUsers: () => http.get('/accounts'),
  getAllTransactions: () => http.get('/SepayAuth/getAllOrdersAndTransactions'),
}
export default adminAPI