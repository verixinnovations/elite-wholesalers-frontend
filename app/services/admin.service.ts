import type { ProductSearchQuery } from '~/types/product'
import ApiService from './api.service'
import { AccountType } from '~/types/enums'

export const AdminService = {
  async uploadSpecs(productId: string, data: FormData) {
    return await ApiService.run({
      method: ApiService.POST,
      url: `/admin/products/${productId}/upload-specs`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  async getAllProducts(params?: ProductSearchQuery) {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/admin/products',
      params
    })
  },

  async getProductsCategories() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/admin/categories'
    })
  },

  async getAllUsers() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/admin/users'
    })
  },

  async updateUserRole(userId: string, accountType: AccountType) {
    return await ApiService.run({
      method: ApiService.PUT,
      url: `/admin/users/${userId}/role`,
      data: { accountType }
    })
  },

  async deleteUser(userId: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/admin/users/${userId}`
    })
  }
}
