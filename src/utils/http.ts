import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { ErrorResponse, SuccessResponse } from 'src/@types/utils.type'
import { clearLocalStorage, getRefreshTokenFromLS, setTokenToLS } from './auth'
import { isAxiosErrorJWTExpired, isUnAuthorized } from './utils'
import { useUserStore } from 'src/config/zustand/UserStore'

//
//https://showbiz-booking-event-be.onrender.com
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshTokenRequest: Promise<string> | null
  private refreshToken: string
  constructor() {
    this.accessToken = useUserStore.getState().token
    this.refreshTokenRequest = null
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://139.59.101.63:8080/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        this.accessToken = this.accessToken ? this.accessToken : useUserStore.getState().token
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const endPoint = response.config.url?.split('/').pop()
        if (endPoint === 'login') {
          this.accessToken = response.data.token

          useUserStore.getState().login(this.accessToken)

          // setTokenToLS(this.accessToken)
          // setProfileToLS(response.data.data.user)
        } else if (endPoint === 'logout') {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        //nếu là lỗi unprocessable entity hoặc unauthorized thì không hiện toast
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        if (isUnAuthorized<ErrorResponse<object>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          if (isAxiosErrorJWTExpired(error) && config.url != '/users/refresh-token') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token }
              })
            })
          }
          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          // window.location.reload()
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<SuccessResponse<{ access_token: string; refresh_token: string }>>('/users/refresh-token', {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.data
        setTokenToLS(access_token, refresh_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
