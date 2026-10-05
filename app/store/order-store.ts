import { OrderService } from '~/services/order.service'
import type { SalesOrder, SalesOrderItemEntity } from '~/types/order'

interface OrderStore {
  orders: SalesOrder[]
  order: SalesOrderItemEntity | null
  orderLoadingState: {
    order: boolean
  }
}
export const useOrderStore = defineStore('OrderStore', {
  state: (): OrderStore => ({
    orders: [],
    order: null,
    orderLoadingState: { order: false }
  }),
  getters: {},
  actions: {
    async getOrders() {
      const res = await OrderService.getUserOrders()
      if (res.success) {
        this.orders = res.data
      }
    },

    async selectOrder(orderId: string) {
      this.orderLoadingState.order = true
      const res = await OrderService.getOrder(orderId)
      if (res.success) {
        this.order = res.data
      }
      this.orderLoadingState.order = false
    }
  },
  persist: true
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
