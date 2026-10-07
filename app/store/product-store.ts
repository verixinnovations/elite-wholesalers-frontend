import { defineStore, acceptHMRUpdate } from 'pinia'
import { RouteName } from '~/constants/route-names'
import { ProductService } from '~/services/product.service'
import type {
  CategoryEntity,
  ProductCategoryEntity,
  ProductDataEntity,
  ProductEntity
} from '~/types/product'

interface ProductStore {
  categories?: ProductCategoryEntity[]
  featuredProducts: ProductEntity[]
  searchedProducts: ProductEntity[]
  categoryProducts: ProductEntity[]
  selectedProduct: ProductDataEntity | null

  selectedCategory: CategoryEntity | null
  parentCategory: CategoryEntity | null
  subCategories: CategoryEntity[]
}

export const useProductStore = defineStore('ProductStore', {
  state: (): ProductStore => ({
    categories: [],
    featuredProducts: [],
    searchedProducts: [],
    categoryProducts: [],
    selectedProduct: null,

    selectedCategory: null,
    parentCategory: null,
    subCategories: []
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

    async getProductByCategoryId(categoryId: string) {
      const res = await ProductService.getProductsByCategoryId(categoryId)
      if (res.success) {
        this.categoryProducts = res.data
      }
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
    },

    async selectCategory(categoryId: string) {
      const router = useRouter()

      // 1. Update route navigation

      this.getProductByCategoryId(categoryId)
      const res = await ProductService.getProductCategory(categoryId)

      if (res.success && res.data) {
        const category: CategoryEntity = res.data
        this.selectedCategory = category

        // Case A: It has ancestors (it's a subcategory)
        if (category.ancestors && category.ancestors.length > 0) {
          const immediateParent = category.ancestors.at(-1)
          this.parentCategory = immediateParent ?? null

          if (category.children.length > 0) {
            // If the clicked category has its own children, use them
            this.parentCategory = category
            this.subCategories = category.children
            router.push({
              name: RouteName.Categories,
              params: { categoryId }
            })
          } else {
            // EDGE CASE: Clicked subcategory has NO children.
            // Check if our existing subCategories in state already belong to the same parent
            // (i.e., they are siblings under `immediateParent?.category_id`).
            const parentId = immediateParent?.category_id ?? category.parent_category_id

            const allCurrentChildrenBelongToSameParent =
              this.subCategories.length > 0 &&
              this.subCategories.every((sub) => sub.parent_category_id === parentId)

            // 1. Update route navigation
            router.push({
              name: RouteName.CategoryProducts,
              params: { categoryId }
            })
            this.subCategories = allCurrentChildrenBelongToSameParent ? this.subCategories : []
          }
        }
        // Case B: It is a top-level parent category (parent_category_id === '-1')
        else if (category.parent_category_id === '-1') {
          this.parentCategory = category
          this.subCategories = category.children
          if (category.children.length === 0) {
            router.push({
              name: RouteName.CategoryProducts,
              params: { categoryId }
            })
          } else {
            this.parentCategory = category
            this.subCategories = category.children
            router.push({
              name: RouteName.Categories,
              params: { categoryId }
            })
          }
        }
        // Case C: Fallback
        else {
          this.parentCategory = category
          this.subCategories = category.children
          router.push({
            name: RouteName.CategoryProducts,
            params: { categoryId }
          })
        }
      }
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
