import type { ProductParams } from '~/types/product'
import ApiService from './api.service'

export const ProductService = {
  async createProduct(data: FormData) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/posts',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

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
        sort: 'created_at',
        embed: 'category,parent,city,savedByLoggedUser,pictures'
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
        postId: productId,
        op: 'similar',
        sort: 'created_at',
        embed: 'category,parent,city,savedByLoggedUser,pictures'
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

  async getUserProducts(params: ProductParams = { page: 1, detailed: 1, perPage: 100 }) {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/posts',
      params: {
        belongLoggedUser: 1,
        ...params,
        embed: 'category,parent,city,savedByLoggedUser,pictures'
      }
    })
  },

  async updateProduct(productId: number, data: FormData) {
    return await ApiService.run({
      method: ApiService.POST,
      url: `/posts/${productId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  async deleteProduct(productId: number) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/posts/${productId}`
    })
  },

  async deleteAllProducts(productIds: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/posts/${productIds}`
    })
  },

  async getSavedProducts() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/savedPosts',
      params: { sortby: 'created_at', embed: 'savedByLoggedUser,post' }
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

  async removeAllSavedProduct(productIds: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/savedPosts/${productIds}`
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

  async getProductCategoryFields(categoryId: number, postId?: number) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `categories/${categoryId}/fields`,
      data: { post_id: postId },
      params: { perPage: 100, sort: 'lft' }
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

  async getProductsByLocation(
    cityName: string,
    params: ProductParams = { page: 1, perPage: 100, detailed: 1, sort: 'lft' }
  ) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/posts`,
      params: {
        ...params,
        perPage: 100,
        sort: 'lft',
        op: 'search',
        location: cityName,
        distance: 100
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
