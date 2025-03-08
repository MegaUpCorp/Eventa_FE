import http from 'src/utils/http'
import { ItemBaseResponse } from 'src/@types/response'
import { LoginGoogleBody } from 'src/components/AuthDialog'
import { EmailSchema, SignInSchema, SignUpSchema } from 'src/schemas/authSchema'
import { LoginAPIResponse } from 'src/@types/users.type'

const authAPI = {
  login: (body: SignInSchema) => http.post<ItemBaseResponse<LoginAPIResponse>>('accounts/login', body),
  sendVerificationEmail: (body: EmailSchema) => http.post<ItemBaseResponse<unknown>>(`accounts/register/request`, body),
  verifyToken: (token: string) => http.post<ItemBaseResponse<boolean>>(`accounts/register/verify`, { token }),
  signUp: (body: SignUpSchema) => http.post<LoginAPIResponse>('accounts/register/complete', body),
  loginGoogle: (body: LoginGoogleBody) =>
    http.post<
      ItemBaseResponse<{
        data: { accessToken: string; refreshToken: string }
        message: string
      }>
    >('auth/login-google', body)
}
export default authAPI
