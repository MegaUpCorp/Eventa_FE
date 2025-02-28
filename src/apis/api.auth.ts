import { ItemBaseResponse, ListBaseResponse } from "src/@types/response";
import { LoginGoogleBody } from "src/components/AuthDialog";
import { SignInSchema } from "src/schemas/authSchema";
import http from "src/utils/http";
import { RegisterSchema } from "src/utils/rules";

const authAPI = {
  login: (body: SignInSchema) =>
    http.post<
      ItemBaseResponse<{
        data: { accessToken: string; refreshToken: string }
        message: string
      }>
    >('api/Account/login', body),
  loginGoogle: (body: LoginGoogleBody) =>
    http.post<
      ItemBaseResponse<{
        data: { accessToken: string; refreshToken: string }
        message: string
      }>
    >('api/auth/login-google', body),
  // register: (body: Omit<RegisterSchema, 'confirmPassword'>) =>
  //   http.post<ListBaseResponse<{}>>('api/auth/register', body),
  // logout: (body: { token: string }) => http.post<ListBaseResponse<{ message: string }>>('api/auth/logout', body)
}
export default authAPI