// src/services/admin.service.ts
import type { ProductSearchQuery } from '~/types/product'
import ApiService from './api.service'
import { AccountType } from '~/types/enums'

export const AdminService = {
  // --- Existing Product & User Admin Endpoints ---
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
  },

  async getFirmwareCategories() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/firmware/categories'
    })
  },

  async createFirmwareCategory(data: { name: string; title: string }) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/firmware/categories',
      data
    })
  },

  async updateFirmwareCategory(id: string, data: { name?: string; title?: string }) {
    return await ApiService.run({
      method: ApiService.PATCH,
      url: `/firmware/categories/${id}`,
      data
    })
  },

  async deleteFirmwareCategory(id: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/firmware/categories/${id}`
    })
  },

  async reorderFirmwareCategories(ids: string[]) {
    return await ApiService.run({
      method: ApiService.PATCH,
      url: '/firmware/categories/reorder',
      data: { ids }
    })
  },

  // --- Firmware Items Endpoints ---
  async getFirmwareItems() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/firmware/items'
    })
  },

  async createFirmwareItem(data: any) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/firmware/items',
      data
    })
  },

  async updateFirmwareItem(id: string, data: any) {
    return await ApiService.run({
      method: ApiService.PATCH,
      url: `/firmware/items/${id}`,
      data
    })
  },

  async deleteFirmwareItem(id: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/firmware/items/${id}`
    })
  },

  async reorderFirmwareItems(ids: string[]) {
    return await ApiService.run({
      method: ApiService.PATCH,
      url: '/firmware/items/reorder',
      data: { ids }
    })
  }
}
