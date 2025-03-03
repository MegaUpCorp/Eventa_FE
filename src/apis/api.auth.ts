import http from 'src/utils/http'
import { ItemBaseResponse } from 'src/@types/response'
import { LoginAPIResponse } from 'src/@types/users.type'
import { EmailSchema, SignInSchema, SignUpSchema } from 'src/schemas/authSchema'

const authAPI = {
  login: (body: SignInSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/login', body),
  sendVerificationEmail: (body: EmailSchema) => http.post<ItemBaseResponse<unknown>>(`accounts/register/request`, body),
  verifyToken: (token: string) => http.post<ItemBaseResponse<boolean>>(`accounts/register/verify`, { token }),
  signUp: (body: SignUpSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/register/complete', body)
}

export default authAPI
