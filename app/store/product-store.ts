import { defineStore, acceptHMRUpdate } from 'pinia'
import { ProductService } from '~/services/product.service'
import type { ProductCategoryEntity } from '~/types/product'

interface ProductStore {
  categories?: ProductCategoryEntity[]
}

export const useProductStore = defineStore('ProductStore', {
  state: (): ProductStore => ({
    categories: []
  }),

  getters: {},

  actions: {
    async getProductCategories() {
      const res = await ProductService.getProductsCategories()
      if (res.success) {
        this.categories = res.data
      }
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
