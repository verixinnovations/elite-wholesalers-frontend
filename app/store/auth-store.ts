import { defineStore, acceptHMRUpdate, getActivePinia } from 'pinia'
import type { Pinia, Store } from 'pinia'
import { RouteName } from '~/constants/route-names'
import ApiService from '~/services/api.service'
import { AuthService } from '~/services/auth.service'
import type {
  ChangePassword,
  SignupDetails,
  ForgotPassword,
  ResetPassword,
  signupBusinessDetails,
  UserEntity,
  VerifyOTP
} from '~/types/auth'
import { AccountType } from '~/types/enums'
import { UtilService } from '~/services/utils.service'
import type { LocationEntity } from '~/types'

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>
}

interface AuthStore {
  user: UserEntity | null
  userAccountType: AccountType
  signupDetails: SignupDetails
  signupBusinessDetails: signupBusinessDetails
  signupLocationDetails: LocationEntity

  abnDetails: {
    loading: boolean
    isValid: boolean
    businessName: string | null
    errorReason: string | null
  }
  licenceDetails: {
    loading: boolean
    isValid: boolean
    licenceNumber: string | null
    errorReason: string | null
  }
}

export const useAuthStore = defineStore('AuthStore', {
  state: (): AuthStore => ({
    user: null,
    userAccountType: AccountType.INDIVIDUAL,

    abnDetails: {
      loading: false,
      isValid: false,
      businessName: null,
      errorReason: null
    },

    licenceDetails: {
      loading: false,
      isValid: false,
      licenceNumber: null,
      errorReason: null
    },

    signupDetails: {
      accountType: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_number: ''
    },

    signupBusinessDetails: {
      business_name: '',
      abn: '',
      acn: '',
      business_type: '',
      industry: '',
      license_number: '',
      stateIssued: '',
      business_website: undefined
    },

    signupLocationDetails: {
      country: '',
      country_code: 'ng',
      state: '',
      city: '',
      street: '',
      postal_code: '',
      latitude: 10,
      longitude: 10
    }
  }),

  getters: {
    isLoggedIn: (state: AuthStore) => state.user !== null
  },

  actions: {
    async login(data: { email: string; password: string }, showToast: boolean) {
      const router = useRouter()
      const toast = useToast()
      const route = useRoute()
      const res = await AuthService.login(data)
      if (res.success) {
        this.user = res.data
        if (showToast) toast.add({ title: 'Login Successful!' })
        if (route.redirectedFrom) {
          return router.replace({ path: route.redirectedFrom.fullPath })
        }
        return router.replace({ name: RouteName.Home })
      } else toast.add({ description: res.message })
      return res
    },

    async signupUser(data: SignupDetails) {
      const toast = useToast()
      const res = await AuthService.signup(data)
      if (res.success) {
        await this.login({ email: data.email ?? '', password: data?.password ?? '' }, false)
        toast.add({ title: res.message })
      }
      return res
    },

    async forgotPassword(data: ForgotPassword) {
      const toast = useToast()
      const router = useRouter()
      const res = await AuthService.forgotPassword(data)
      toast.add({ title: res.message })
      if (res.success) {
        router.push({
          name: RouteName.Auth.Verify,
          query: { email: data.email }
        })
      }
      return res
    },

    async verifyOTP(data: VerifyOTP) {
      const router = useRouter()
      router.push({
        name: RouteName.Auth.ResetPassword,
        query: { ...data }
      })
    },

    async resetPassword(data: ResetPassword) {
      const toast = useToast()
      const router = useRouter()
      const res = await AuthService.resetPassword(data)
      toast.add({ title: res.message })
      if (res.success) {
        router.push({
          name: RouteName.Home
        })
      }
      return res
    },

    async changePassword(data: ChangePassword) {
      const res = await AuthService.changePassword(data)
      return res
    },

    async getProfile() {
      const res = await AuthService.getProfile(this.user?.id ?? 0)
      if (res.success) {
        this.user = res.data
      }
    },

    async getABNDetails(abn: string) {
      if (abn.length >= 11) {
        try {
          this.abnDetails.loading = true
          const res = await UtilService.fetchABNDetails(abn)
          if (res.success && res.data.AbnStatus === 'Active') {
            this.abnDetails.businessName = res.data.EntityName
            this.abnDetails.isValid = true
            this.signupBusinessDetails.business_name = res.data.EntityName
            this.signupBusinessDetails.acn = res.data.Acn
            this.abnDetails.errorReason = null
          } else {
            this.abnDetails.isValid = false
            this.abnDetails.errorReason = res.message
          }
        } catch (error: any) {
          console.log(error)
          this.abnDetails.errorReason = error.message
        } finally {
          this.abnDetails.loading = false
        }
      }
    },

    async verifyLicense(licenceNumber: string, stateIssued: string) {
      try {
        this.licenceDetails.loading = true

        const res = await UtilService.fetchLicenseData(licenceNumber, stateIssued)
        if (res.success) {
          this.licenceDetails.licenceNumber = res.data.licenceNumber
          this.licenceDetails.isValid = true
          this.licenceDetails.errorReason = null
        } else {
          this.licenceDetails.isValid = false
          this.licenceDetails.errorReason = res.message
        }
      } catch (err) {
        this.licenceDetails.errorReason = 'Error reaching Licence service. Try again.'
      } finally {
        this.licenceDetails.loading = false
      }
    },

    // async updateProfile(data: CreateUser) {
    //   const toast = useToast()
    //   const formData = UtilFunctions.objectToFormData({ ...data })
    //   const res = await AuthService.updateProfile(formData, this.user?.id ?? 1)
    //   if (res.success) {
    //     toast.add({ title: res.message })
    //     this.getProfile()
    //   }
    //   return res
    // },

    // async updateProfileImage(data: CreateUser, photo_path: File) {
    //   const formData = UtilFunctions.objectToFormData({
    //     photo_path,
    //     _method: 'PUT'
    //   })
    //   const res = await AuthService.updateProfileImage(formData, this.user?.id ?? 0)
    //   if (res.success) {
    //     this.getProfile()
    //   }
    //   return res
    // },

    logout() {
      const router = useRouter()
      const $ResetPinia = (): Record<string | 'all', () => void> => {
        const pinia = getActivePinia() as ExtendedPinia
        const resetStores: Record<string, () => void> = {}
        pinia._s.forEach((store, name) => {
          resetStores[name] = () => store.$reset()
        })
        resetStores.all = () => pinia._s.forEach((store) => store.$reset())
        return resetStores
      }

      $ResetPinia()
      localStorage.clear()
      sessionStorage.clear()
      this.$reset()
      ApiService.deleteAccessToken()
      this.user = null
      router.replace({ name: RouteName.Auth.Login })
    },

    async deleteAccount() {
      const toast = useToast()
      if (this.user) {
        const res = await AuthService.deleteAccount(this.user?.id)
        if (res.success) {
          toast.add({ title: res.message })
          setTimeout(() => this.logout(), 2000)
        }
        return res
      }
    }
  },

  persist: {
    omit: ['abnDetails', 'licenceDetails']
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
