import http from 'src/utils/http'
import { ItemBaseResponse } from 'src/@types/response'
import { LoginAPIResponse } from 'src/@types/users.type'
import { SignInSchema } from 'src/schemas/authSchema'

const authAPI = {
  login: (body: SignInSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/login', body)
}

export default authAPI
