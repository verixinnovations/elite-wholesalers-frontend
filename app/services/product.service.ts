import type { ProductParams } from '~/types/product'
import ApiService from './api.service'

export const ProductService = {
  async getProducts(
    params: ProductParams = {
      page: 1,
      perPage: 20,
      detailed: 1
    }
  ) {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/posts',
      params: {
        ...params,
        op: 'latest',
        sort: 'created_at'
      }
    })
  },
  async getSimilarProducts(
    productId: number,
    params: ProductParams = {
      page: 1,
      perPage: 20,
      detailed: 1
    }
  ) {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/posts',
      params: {
        ...params,
        op: 'similar'
      }
    })
  },

  async getProduct(productId: number) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/posts/${productId}`,
      params: { detailed: 1 }
    })
  },

  async fetchUserCart() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/cart'
    })
  },

  async saveProduct(productId: number) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/savedPosts',
      data: { post_id: productId }
    })
  },

  async removeSavedProduct(productId: number) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/savedPosts/${productId}`
    })
  },

  async getProductsCategories() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/products/categories'
    })
  },

  async getProductsSubcategories(categoryId: number = 1) {
    return await ApiService.run({
      method: ApiService.GET,
      url: 'categories',
      params: { parentId: categoryId, perPage: 100, sort: 'lft' }
    })
  },

  async searchProducts(
    searchTerm: string,
    params: ProductParams = {
      page: 1,
      perPage: 20,
      detailed: 1
    }
  ) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/posts`,
      params: {
        ...params,
        perPage: 100,
        sort: 'lft',
        op: 'search',
        keyword: searchTerm
      }
    })
  },

  async getProductsByCategories(categorySlug: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/posts`,
      params: { perPage: 100, sort: 'lft', op: 'search', c: categorySlug }
    })
  },

  async getProductsBySubCategories(categorySlug: string, subCategorySlug: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/posts`,
      params: {
        perPage: 100,
        op: 'search',
        c: categorySlug,
        sc: subCategorySlug
      }
    })
  }
}
