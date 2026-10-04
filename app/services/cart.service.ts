import type { CartEntity } from '~/types/product'
import ApiService from './api.service'

export const ProductService = {
  async getUserCart() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/cart'
    })
  },

  async createUserCart(data: CartEntity) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/cart',
      data
    })
  },

  async updateUserCart(cartId: string, data: CartEntity) {
    return await ApiService.run({
      method: ApiService.PUT,
      url: `/cart/${cartId}`,
      data
    })
  },

  async removeCart(cartId: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/cart/${cartId}`
    })
  }
}
