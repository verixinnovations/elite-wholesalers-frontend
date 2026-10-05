import type { CartEntity, CartEntityPayload } from '~/types/product'
import ApiService from './api.service'

export const CartService = {
  async getUserCart() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/cart'
    })
  },

  async createUserCart(data: CartEntityPayload) {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/cart',
      data
    })
  },

  async initializeCheckout() {
    return await ApiService.run({
      method: ApiService.POST,
      url: '/cart/checkout'
    })
  },

  async updateUserCart(cartId: string, data: { quantity: number }) {
    return await ApiService.run({
      method: ApiService.PATCH,
      url: `/cart/${cartId}`,
      data
    })
  },

  async removeCart(cartId: string) {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/cart/${cartId}`
    })
  },

  async deleteCart() {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/cart/`
    })
  }
}
