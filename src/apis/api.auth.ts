import http from 'src/utils/http'
import { ItemBaseResponse } from 'src/@types/response'
import { LoginAPIResponse } from 'src/@types/users.type'
import { SignInSchema } from 'src/schemas/authSchema'

const authAPI = {
  login: (body: SignInSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/login', body),
  sendVerificationEmail: (email: string) =>
    http.post<ItemBaseResponse<unknown>>(`accounts/register/request`, { email }),
  verifyToken: (token: string) => http.post<ItemBaseResponse<boolean>>(`accounts/register/verify`, { token })
}

export default authAPI
