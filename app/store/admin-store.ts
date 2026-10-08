import { AdminService } from '~/services/admin.service'
import type { UserEntity } from '~/types/auth'
import type { AccountType } from '~/types/enums'
import type { CategoryEntity, ProductEntity, ProductSearchQuery } from '~/types/product'

interface OrderStore {
  products: ProductEntity[]
  categories: CategoryEntity[]
  users: UserEntity[]
  loadingStates: {
    products: boolean
    deleteUser: boolean
    updatingRole: boolean
    uploadingSpecs: boolean
  }
}
export const useAdminStore = defineStore('AdminStore', {
  state: (): OrderStore => ({
    products: [],
    categories: [],
    users: [],
    loadingStates: {
      products: false,
      deleteUser: false,
      updatingRole: false,
      uploadingSpecs: false
    }
  }),
  getters: {},
  actions: {
    async getAdminUsers() {
      const res = await AdminService.getAllUsers()
      if (res.success) {
        this.users = res.data
      }
    },

    async updateRole(userId: string, role: AccountType) {
      this.loadingStates.updatingRole = true
      const toast = useToast()
      const res = await AdminService.updateUserRole(userId, role)
      if (res.success) {
        toast.add({ title: 'User account type updated to ' + role })
      }
      await this.getAdminUsers()
      this.loadingStates.updatingRole = false
    },

    async deleteUser(userId: string) {
      const toast = useToast()
      this.loadingStates.deleteUser = true
      const res = await AdminService.deleteUser(userId)
      if (res.success) {
        toast.add({ title: 'User account deleted successfully' })
      }
      this.loadingStates.deleteUser = false
    },

    async getAdminProducts(query?: ProductSearchQuery) {
      this.loadingStates.products = true
      const res = await AdminService.getAllProducts(query)
      if (res.success) {
        this.products = res.data.products
      }
      this.loadingStates.products = false
    },

    async getProductCategories() {
      const res = await AdminService.getProductsCategories()
      if (res.success) {
        this.categories = res.data
      }
    },

    async uploadProductSpecs(productId: string, product_file: File) {
      const toast = useToast()
      this.loadingStates.uploadingSpecs = true
      const formData = UtilFunctions.objectToFormData({ product_file })
      const res = await AdminService.uploadSpecs(productId, formData)
      if (res.success) {
        toast.add({ title: 'Product specs updated successfully' })
      }
      this.loadingStates.uploadingSpecs = false
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
