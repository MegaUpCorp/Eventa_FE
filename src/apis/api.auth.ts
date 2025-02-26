import http from 'src/utils/http'
import { ItemBaseResponse } from 'src/@types/response'
import { LoginAPIResponse } from 'src/@types/users.type'
import { SignInSchema } from 'src/schemas/authSchema'

const authAPI = {
  login: (body: SignInSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/login', body),
  sendVerificationEmail: (email: string) => http.post<ItemBaseResponse<unknown>>(`accounts/register/request`, { email })
}

export default authAPI
