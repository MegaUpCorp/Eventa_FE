import { ListBaseResponse } from 'src/@types/response'
import http from 'src/utils/http'

const adminAPI = {
  getUsers: () => http.get('/accounts'),
}
export default adminAPI