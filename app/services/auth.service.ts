import type {
  LoginPayload,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  VerifyOTP,
  SignupDetails,
  UserEntity
} from '~/types/auth'
import ApiService from './api.service'

export const AuthService = {
  async login(data: LoginPayload) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/login',
      data
    })
  },

  async signup(data: SignupDetails) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/register',
      data
    })
  },

  async getUsers() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/users'
    })
  },

  async verifyOTP(data: VerifyOTP) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/update-password',
      data
    })
  },

  async logout(userId: string) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/logout',
      data: { userId }
    })
  },

  async forgotPassword(data: ForgotPassword) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/forgot-password',
      data
    })
  },

  async resetPassword(data: ResetPassword) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/reset-password',
      data
    })
  },

  async changePassword(data: ChangePassword) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/auth/update-password',
      data
    })
  },

  async getProfile() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/auth/user'
    })
  },

  async deleteAccount() {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/user/`
    })
  },

  async updateProfile(data: Partial<UserEntity>) {
    return await ApiService.run({
      method: ApiService.PUT,
      url: `/user/`,
      data
    })
  },

  async updateProfileImage(data: FormData) {
    return await ApiService.run({
      method: ApiService.POST,
      url: `/users/photo`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
