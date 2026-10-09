import type { ContactUsFormData } from '~/types'
import ApiService from './api.service'

export const UtilService = {
  async sendContactUsMessage(data: ContactUsFormData) {
    return ApiService.run({
      method: ApiService.POST,
      url: '/utils/contact-us',
      data
    })
  },

  async checkDuplicatesDetails(data: { field: string; value: any }) {
    return ApiService.run({
      method: ApiService.POST,
      url: '/utils/check-duplicates',
      data
    })
  },

  async fetchABNDetails(abn: string) {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/verify-abn',
      params: { abn }
    })
  },

  async fetchLicenseData(licenceNumber: string, stateIssued: string) {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/verify-licence',
      params: { licenceNumber, stateIssued }
    })
  },

  async getFirmwares() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/firmware/categories'
    })
  },

  async getCountries() {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/countries'
    })
  },

  async getStatesByCountry(countryCode: string) {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/states',
      params: { country: countryCode }
    })
  },

  async getCitiesByState(countryCode: string, stateCode: string) {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/cities',
      params: { country: countryCode, state: stateCode }
    })
  }
}
