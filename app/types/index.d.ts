export interface LocationEntity {
  country: string
  country_code: string
  state: string
  city: string
  street: string
  postal_code: string
  latitude: number
  longitude: number
}
interface ContactUsFormData {
  firstname: string
  lastname: string
  email: string
  phone_number?: string
  message: string
}
