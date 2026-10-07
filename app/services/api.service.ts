/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import APP_CONSTANTS from '~/constants/app.constants'
import { ENV } from '~/utils/ENV.utils'
import { EncryptedStore } from '~/utils/secureLs.utils'

interface IResponse<T = any> {
  status: number | string
  statusText: number | string
  message: string
  code: number | string
  success: boolean
  data: T
  error: T
}

class ApiResponse<T = any> implements IResponse<T> {
  status: number | string = ''
  statusText: number | string = ''
  success: boolean = false
  message: string = ''
  code: number | string = ''
  data: T
  error: T

  constructor(data: Partial<IResponse<T>>) {
    this.status = data.status ?? ''
    this.statusText = data.statusText ?? ''
    this.success = data.success ?? false
    this.message = data.message ?? ''
    this.code = data.code ?? ''
    this.data = (data.data !== undefined ? data.data : null) as T
    this.error = (data.error !== undefined ? data.error : null) as T
  }
}

export default class ApiService {
  public static GET = 'get'
  public static POST = 'post'
  public static PATCH = 'patch'
  public static PUT = 'put'
  public static DELETE = 'delete'

  private timeout = 5000

  public static http = axios.create({
    baseURL: ENV.API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Initialize interceptors statically
  static initializeInterceptors() {
    ApiService.http.interceptors.request.use((config) => {
      const accessToken = ApiService.getAccessToken()
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken
      }
      return config
    })
  }

  // Static token setter
  public static setAccessToken(token: string) {
    EncryptedStore.set(APP_CONSTANTS.ACCESS_TOKEN, token)
  }

  public static getAccessToken(): string {
    return EncryptedStore.get(APP_CONSTANTS.ACCESS_TOKEN)
  }

  public static deleteAccessToken() {
    EncryptedStore.remove(APP_CONSTANTS.ACCESS_TOKEN)
  }

  public static setRefreshToken(token: string) {
    EncryptedStore.set(APP_CONSTANTS.REFRESH_TOKEN, token)
  }

  public static getRefreshToken(): string {
    return EncryptedStore.get(APP_CONSTANTS.REFRESH_TOKEN)
  }

  // Static run method
  public static async run(request: AxiosRequestConfig) {
    let response

    try {
      const serverResponse = await ApiService.http(request)
      response = new ApiResponse({
        code: serverResponse.data.meta.statusCode,
        success: true,
        message: serverResponse.data?.meta.statusMessage,
        data: serverResponse.data.data
      })
    } catch (err: any) {
      if (!err.response) {
        response = new ApiResponse({
          message:
            err?.message === 'Network Error' ? 'Oops! Check internet connection' : err.message,
          status: -1
        })
      } else if (err instanceof AxiosError) {
        response = new ApiResponse({
          code: err.response.data?.meta?.statusCode,
          message: err.response.data?.error?.message
            ? err.response.data?.error?.message
            : (err.message ?? 'Oops! An unknown error ocurred. Please try again.'),
          status: err.response?.status,
          error: err.response.data?.error
        })

        // No internet
      } else {
        response = new ApiResponse({
          code: err.status ?? -1,
          statusText: err.code ?? '',
          message: err.message ?? 'Oops! Check internet connection',
          status: -500
        })
      }
    }
    return response
  }
}

ApiService.initializeInterceptors()
