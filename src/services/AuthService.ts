import http from 'src/utils/http'
import { SignInSchema } from 'src/schemas/authSchema'
import { LoginAPIResponse } from 'src/@types/users.type'

class AuthService {
  async login({ email, password }: SignInSchema) {
    await http.post<LoginAPIResponse>('accounts/login', {
      email,
      password
    })
  }
}

const authService = new AuthService()
export default authService
