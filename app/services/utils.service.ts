import ApiService from './api.service'

export const UtilService = {
  async checkDuplicatesDetails(params: {
    email?: string
    phone_number?: string
    username?: string
  }) {
    return ApiService.run({
      method: ApiService.GET,
      url: '/utils/check-duplicates',
      params
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
  }
}
