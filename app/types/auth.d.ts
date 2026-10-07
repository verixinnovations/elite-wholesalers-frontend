import type { LocationEntity } from './index'
import type { AccountType } from './enums'

export interface BusinessDetails {
  abn: string
  acn: string
  industry: string
  stateIssued: string
  business_name: string
  business_type: string
  licence_number: string
}

export interface UserEntity {
  id: string
  zohoContactId: string
  firstname: string
  lastname: string
  fullname: string
  username: string
  accountType: AccountType
  email: string
  picture: string | null
  password: string
  gender: string
  date_of_birth: string | null
  phone_number: string
  location: LocationEntity
  business_details?: BusinessDetails
  bio: string | null
  is_profile_completed: boolean
  deleted_at: string | null
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
  verification_code: string
  password: string
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
