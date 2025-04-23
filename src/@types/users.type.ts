import { UserRole, UserVerifyStatus } from './enum'

export interface User {
  id: string
  username: string
  fullName: string
  address: []
  email: string
  status: UserVerifyStatus
  password: string
  phoneNumber: string
  date_of_birth: string
  roleName: string
  delFlg: boolean
  profilePicture: string
  point: string
  premium: boolean
  createdAt: string
  updatedAt: string
  bio: string
  insDate: string
  updDate: string
  type: string
  role: UserRole
}


export type ProfileUpdate = {
  user_name: string
  email: string
  phone_number: string
  date_of_birth: string
}

export type LoginAPIResponse = {
  token: string
}

export type DecodedUserToken = {
  id: string
  email: string
  profilePicture: string
  role: UserRole
  username: string
  exp: number
}
