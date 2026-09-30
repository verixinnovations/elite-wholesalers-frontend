import type { LocationEntity } from './index'
import type { AccountType } from './enums'

export interface UserEntity {
  id: number
  name: string
  username?: string
}

export interface UserAccountType {
  isAdmin: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface VerifyOTP {
  email: string
  token: string
}

export interface ForgotPassword {
  email: string
}
export interface ChangePassword {
  email: string
  auth_field: 'email'
}

export interface ResetPassword {
  email: string
  token: string
  auth_field: 'email'
  password: string
  password_confirmation: string
}

export interface SignupDetails {
  accountType: AccountType | null
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
  phone_number: string
  location?: LocationEntity
  business_details?: signupBusinessDetails
}

export interface signupBusinessDetails {
  business_name: string
  abn: string
  acn: string
  business_type: string
  industry: string
  license_number: string
  stateIssued: string
  business_website?: string
}
