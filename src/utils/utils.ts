/* eslint-disable @typescript-eslint/no-empty-object-type */
import dayjs from 'dayjs'
import axios, { AxiosError } from 'axios'
// import { RegisterSucces } from 'src/@types/event.type'
import { ErrorResponse } from 'src/@types/utils.type'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

type ResponsePaymentEvent = {
  url: string
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorized<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export type NoNullable<T> = Exclude<T, undefined | null>

export function isResponseNoFormHasPaymentType(obj: object): obj is ResponsePaymentEvent {
  return 'url' in obj && typeof 'url' === 'string'
}

// export function isReponseNoPaymentNoForm(obj: unknown): obj is RegisterSucces {
//   return (
//     typeof obj === 'object' &&
//     obj !== null &&
//     '_id' in obj &&
//     'event_id' in obj &&
//     'visitor_id' in obj &&
//     'status_check_in' in obj &&
//     'otp_check_in' in obj &&
//     'time_register' in obj &&
//     'status_register' in obj
//   )
// }

export function isAxiosErrorConflictAndNotPermisson<T>(error: unknown): error is AxiosError<T> {
  return (
    (isAxiosError(error) && error.response?.status === HttpStatusCode.Forbidden) ||
    (isAxiosError(error) && error.response?.status === HttpStatusCode.Conflict)
  )
}

export function isReponseNoPaymentButHaveForm<T>(obj: unknown): obj is T {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'register' in obj &&
    typeof obj.register === 'object' &&
    obj.register !== null
  )
}
export function canCancelEvent(dateEvent: string, timeStart: string): boolean {
  const date = convertToDate(dateEvent)

  const [hours, minutes] = timeStart.split(':').map(Number)
  const eventDate = new Date(date)
  eventDate.setHours(hours, minutes, 0, 0)

  const now = new Date()
  //khoảng cách thời gian hiện tại so với thời gian bắt đầu sự kiện
  const diff = eventDate.getTime() - now.getTime()

  //đổi sang giờ
  const diffInHours = diff / (1000 * 60 * 60)

  return diffInHours >= 48
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number)
  // Month trong Date 0-11 nên trừ 1
  return new Date(year, month - 1, day)
}

export function isValidToFeeback(date_event: string, time_end: string): boolean {
  const timeEvent = dayjs(date_event.split('/').reverse().join('/') + ' ' + time_end).format('YYYY-MM-DD HH:mm')
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  return dayjs(timeEvent).valueOf() - dayjs(nowDate).valueOf() <= 15 * 60 * 1000
}

export function isUnAuthorized<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosErrorJWTExpired(error: unknown): error is AxiosError<ErrorResponse<{}>> {
  return isUnAuthorized<ErrorResponse<{}>>(error) && error.response?.data.message === 'Jwt token expired'
}

export function isCanSeeOTPCheckIn(dateEvent: string, timeStart: string): boolean {
  const timeEvent = dayjs(dateEvent.split('/').reverse().join('/') + ' ' + timeStart).format('YYYY-MM-DD HH:mm')
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
  return -dayjs(timeEvent).minute() + dayjs(nowDate).minute() >= 60
}

/**
 * Hàm nhận chuỗi xong tạo ra slug cho URL
 * @param text : string
 * @example
 * const slug = getFirstPTag("Em yêu lập trình!")
 * @returns string - "em-yeu-lap-trinh-356231061"
 * @author DanhYeuLapTrinh
 * @version 1.0.0.0
 */
export const toSlug = (inputStr: string, noNumber: boolean) => {
  if (inputStr) {
    // Chuyển hết sang chữ thường
    inputStr = inputStr.toLowerCase()

    // xóa dấu
    inputStr = inputStr
      .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    inputStr = inputStr.replace(/[đĐ]/g, 'd')

    // Xóa ký tự đặc biệt
    inputStr = inputStr.replace(/([^0-9a-z-\s])/g, '')

    // Xóa khoảng trắng thay bằng ký tự -
    inputStr = inputStr.replace(/(\s+)/g, '-')

    // Xóa ký tự - liên tiếp
    inputStr = inputStr.replace(/-+/g, '-')

    // xóa phần dư - ở đầu & cuối
    inputStr = inputStr.replace(/^-+|-+$/g, '')

    if (noNumber) {
      return inputStr
    } else {
      const randomNumber = Math.floor(Math.random() * 1000000000)
      inputStr = `${inputStr}-${randomNumber}`
      return inputStr
    }
  }
}
