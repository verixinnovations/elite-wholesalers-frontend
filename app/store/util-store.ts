import { defineStore, acceptHMRUpdate } from 'pinia'
import { UtilService } from '~/services/utils.service'

interface UtilStore {
  countries: any[]
  states: any[]
  cities: any[]
  firmwares: any[]
  utilsLoadingStates: {
    country: boolean
    states: boolean
    cities: boolean
  }
}

export const useUtilStore = defineStore('UtilStore', {
  state: (): UtilStore => ({
    countries: [],
    states: [],
    cities: [],
    firmwares: [],
    utilsLoadingStates: {
      country: false,
      states: false,
      cities: false
    }
  }),

  getters: {},

  actions: {
    async getFirmwares() {
      const res = await UtilService.getFirmwares()
      if (res.success) {
        this.firmwares = res.data
      }
    },
    async getCountries() {
      this.utilsLoadingStates.country = true
      const res = await UtilService.getCountries()
      if (res.success) {
        this.countries = res.data
        this.getStatesByCountry('AU')
      }
      this.utilsLoadingStates.country = false
    },

    async getStatesByCountry(countryCode: string) {
      this.utilsLoadingStates.states = true
      const res = await UtilService.getStatesByCountry(countryCode)
      if (res.success) {
        this.states = res.data
      }
      this.utilsLoadingStates.states = false
    },

    async getCitiesByState(countryCode: string, stateCode: string) {
      this.utilsLoadingStates.cities = true
      const res = await UtilService.getCitiesByState(countryCode, stateCode)
      if (res.success) {
        this.cities = res.data
      }
      this.utilsLoadingStates.cities = false
    }
  },
  persist: { pick: ['firmwares'] }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUtilStore, import.meta.hot))
}
