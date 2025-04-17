import axios from 'axios'
import { decodeJwt, JWTPayload } from 'jose'
import http from './http'

export interface JwtPayload extends JWTPayload {
  aud: string
  jti: string
  iat: number
  nbf: number
  exp: number
  sub: string
  scopes: string[]
}

export const sepayInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}` || `${import.meta.env.VITE_API_LOCAL_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

const isCloseToExpiration = (accessToken?: string, threshold: number = 5 * 60 * 1000) => {
  try {
    if (!accessToken) {
      return true
    }
    const decoded = decodeJwt<JwtPayload>(accessToken)
    if (!decoded || !decoded.exp) {
      return true
    }
    const now = Date.now()
    const timeLeft = decoded.exp * 1000 - now
    return timeLeft <= threshold
  } catch (error) {
    console.error('JWT validation error:', error)
    return true
  }
}

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await http.post<{ token: { access_token: string; refresh_token: string } }>('SepayAuth/refresh', {
      refreshToken
    })

    const { access_token, refresh_token } = data.token

    localStorage.setItem('sepay-access-token', access_token)
    localStorage.setItem('sepay-refresh-token', refresh_token)
    return access_token
  } catch (error) {
    console.error('Failed to refresh token:', error)
    localStorage.removeItem('sepay-access-token')
    localStorage.removeItem('sepay-refresh-token')
    return null
  }
}

sepayInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('sepay-access-token')
    const refreshToken = localStorage.getItem('sepay-refresh-token')

    if (!accessToken || isCloseToExpiration(accessToken)) {
      if (refreshToken) {
        accessToken = await refreshAccessToken(refreshToken)
        if (!accessToken) {
          return config
        }
      } else {
        return config
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
