import ApiService from './api.service'

export const OrderService = {
  async getUserOrders() {
    return await ApiService.run({
      method: ApiService.GET,
      url: '/transactions/orders'
    })
  },

  async getOrder(orderId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/transactions/orders/${orderId}`
    })
  },
  async payForOrder(orderId: string) {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/transactions/orders/${orderId}/pay`
    })
  }
}
