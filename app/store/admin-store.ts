// src/stores/admin.store.ts
import { AdminService } from '~/services/admin.service'
import type { UserEntity } from '~/types/auth'
import type { AccountType } from '~/types/enums'
import type { CategoryEntity, ProductEntity, ProductSearchQuery } from '~/types/product'

interface AdminStoreState {
  products: ProductEntity[]
  categories: CategoryEntity[] // Product categories
  firmwareCategories: any[]
  items: any[]
  users: UserEntity[]
  loading: boolean
  loadingStates: {
    products: boolean
    deleteUser: boolean
    updatingRole: boolean
    uploadingSpecs: boolean
    firmware: boolean
  }
}

export const useAdminStore = defineStore('AdminStore', {
  state: (): AdminStoreState => ({
    products: [],
    categories: [],
    firmwareCategories: [],
    items: [],
    users: [],
    loading: false,
    loadingStates: {
      products: false,
      deleteUser: false,
      updatingRole: false,
      uploadingSpecs: false,
      firmware: false
    }
  }),
  getters: {
    categoryOptions: (state) => {
      return state.firmwareCategories.map((cat) => ({
        label: cat.title || cat.name,
        value: cat.id
      }))
    }
  },
  actions: {
    // --- User Actions ---
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

    // --- Product Actions ---
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
    },

    // --- Firmware Categories Actions ---
    async fetchCategories() {
      const res = await AdminService.getFirmwareCategories()
      if (res.success) {
        this.firmwareCategories = res.data
      }
    },

    async createCategory(data: { name: string; title: string }) {
      const toast = useToast()
      this.loading = true
      const res = await AdminService.createFirmwareCategory(data)
      if (res.success) {
        toast.add({ title: 'Firmware category created successfully' })
        await this.fetchCategories()
      }
      this.loading = false
    },

    async updateCategory(id: string, data: { name?: string; title?: string }) {
      const toast = useToast()
      const res = await AdminService.updateFirmwareCategory(id, data)
      if (res.success) {
        toast.add({ title: 'Firmware category updated successfully' })
        await this.fetchCategories()
      }
    },

    async deleteCategory(id: string) {
      const toast = useToast()
      const res = await AdminService.deleteFirmwareCategory(id)
      if (res.success) {
        toast.add({ title: 'Firmware category deleted successfully' })
        await this.fetchCategories()
      }
    },

    async reorderCategories(ids: string[]) {
      await AdminService.reorderFirmwareCategories(ids)
    },

    // --- Firmware Items Actions ---
    async fetchItems() {
      const res = await AdminService.getFirmwareItems()
      if (res.success) {
        this.items = res.data
      }
    },

    async createItem(data: any) {
      const toast = useToast()
      this.loading = true
      const res = await AdminService.createFirmwareItem(data)
      if (res.success) {
        toast.add({ title: 'Firmware item created successfully' })
        await this.fetchItems()
      }
      this.loading = false
    },

    async updateItem(id: string, data: any) {
      const toast = useToast()
      const res = await AdminService.updateFirmwareItem(id, data)
      if (res.success) {
        toast.add({ title: 'Firmware item updated successfully' })
        await this.fetchItems()
      }
    },

    async deleteItem(id: string) {
      const toast = useToast()
      const res = await AdminService.deleteFirmwareItem(id)
      if (res.success) {
        toast.add({ title: 'Firmware item deleted successfully' })
        await this.fetchItems()
      }
    },

    async reorderItems(ids: string[]) {
      await AdminService.reorderFirmwareItems(ids)
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
