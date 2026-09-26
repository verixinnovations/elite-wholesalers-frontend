import ApiService from './api.service'

export const UtilService = {
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
