import { select } from '#build/ui'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { RouteName } from '~/constants/route-names'
import { ProductService } from '~/services/product.service'
import type { ProductCategoryEntity, ProductDataEntity, ProductEntity } from '~/types/product'

interface ProductStore {
  categories?: ProductCategoryEntity[]
  featuredProducts: ProductEntity[]
  searchedProducts: ProductEntity[]
  categoryProducts: ProductEntity[]
  subCategories?: {
    parentCategory: ProductCategoryEntity
    subCategories: ProductCategoryEntity[]
  }
  selectedProduct: ProductDataEntity | null
  selectedCategory: ProductCategoryEntity | null
  selectedSubCategory: ProductCategoryEntity | null
}

export const useProductStore = defineStore('ProductStore', {
  state: (): ProductStore => ({
    categories: [],
    featuredProducts: [],
    searchedProducts: [],
    categoryProducts: [],
    subCategories: {
      parentCategory: {} as ProductCategoryEntity,
      subCategories: []
    },
    selectedProduct: null,
    selectedCategory: null,
    selectedSubCategory: null
  }),

  getters: {},

  actions: {
    async getFeaturedProducts() {
      const res = await ProductService.getFeaturedProducts()
      if (res.success) {
        this.featuredProducts = res.data
      }
    },

    async searchProducts(keyword: string) {
      const res = await ProductService.getProducts({ name_contains: keyword })
      if (res.success) {
        this.searchedProducts = res.data
      }
    },

    async getProductCategories() {
      const res = await ProductService.getProductsCategories()
      if (res.success) {
        this.categories = res.data
      }
    },

    async getProductSubCategories(categoryId: string) {
      const res = await ProductService.getProductsSubcategories(categoryId)
      if (res.success) {
        this.subCategories = res.data
        if (res.data.subCategories.length === 0) {
          this.selectSubCategory(res.data.parentCategory)
        } else this.selectSubCategory(res.data.subCategories[0])
      }
    },

    async getProductByCategoryId(categoryId: string) {
      const res = await ProductService.getProductsByCategoryId(categoryId)
      if (res.success) {
        this.categoryProducts = res.data
      }
    },

    selectCategory(category: ProductCategoryEntity) {
      const router = useRouter()
      router.push({
        name: RouteName.Categories,
        params: { categoryId: category.category_id }
      })
      this.selectedCategory = category
    },

    selectSubCategory(subCategory: ProductCategoryEntity) {
      const router = useRouter()
      router.push({
        name: RouteName.Categories,
        params: { categoryId: this.selectedCategory?.category_id },
        query: { subCategoryId: subCategory.category_id }
      })
      this.getProductByCategoryId(subCategory.category_id)
      this.selectedSubCategory = subCategory
    },

    async selectProduct(productId: string) {
      if (this.selectedProduct?.item_id === productId) {
        return this.selectedProduct
      } else {
        const res = await ProductService.getProduct(productId)
        if (res.success) {
          this.selectedProduct = res.data
        }
      }
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
